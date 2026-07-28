import fs from "node:fs/promises";
import path from "node:path";
import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { chunkText, extractTextFromFile } from "@/lib/ai/chunk";
import { embedTexts } from "@/lib/ai/gemini";
import {
  getDb,
  getUploadsDir,
  isTursoConfigured,
  mapDocument,
  type DbDocument,
} from "@/lib/db";
import type { KnowledgeDocument } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_BYTES = 8 * 1024 * 1024;

function toPublicDocument(doc: DbDocument): KnowledgeDocument {
  return {
    id: doc.id,
    title: doc.title,
    file_name: doc.file_name,
    file_type: doc.file_type,
    status: doc.status,
    error_message: doc.error_message,
    chunk_count: doc.chunk_count,
    created_at: doc.created_at,
  };
}

export async function GET() {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await getDb();
  const result = await db.execute({
    sql: `select * from documents
          where user_id = ?
          order by datetime(created_at) desc`,
    args: [user.id],
  });

  const documents = result.rows.map((row) =>
    toPublicDocument(mapDocument(row as unknown as Record<string, unknown>)),
  );

  return NextResponse.json({ documents });
}

export async function POST(request: Request) {
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json(
      { error: "Missing GEMINI_API_KEY in .env.local" },
      { status: 500 },
    );
  }

  const form = await request.formData();
  const file = form.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "file is required" }, { status: 400 });
  }

  if (file.size > MAX_BYTES) {
    return NextResponse.json(
      { error: "File too large. Keep uploads under 8MB." },
      { status: 400 },
    );
  }

  let text = "";
  try {
    text = await extractTextFromFile(file);
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to read file" },
      { status: 400 },
    );
  }

  const chunks = chunkText(text);
  if (chunks.length === 0) {
    return NextResponse.json(
      { error: "No extractable text found in that file." },
      { status: 400 },
    );
  }

  const documentId = crypto.randomUUID();
  const title = file.name.replace(/\.[^.]+$/, "") || file.name;

  // Local-only file copy. On Turso/deploy, chunks in DB are enough for RAG.
  let storagePath: string | null = null;
  if (!isTursoConfigured()) {
    const uploadsDir = getUploadsDir();
    const storageName = `${user.id}-${documentId}-${file.name}`;
    storagePath = path.join(uploadsDir, storageName);
    await fs.writeFile(storagePath, Buffer.from(await file.arrayBuffer()));
  }

  const db = await getDb();
  await db.execute({
    sql: `insert into documents
      (id, user_id, title, file_name, file_type, storage_path, status)
     values (?, ?, ?, ?, ?, ?, 'processing')`,
    args: [
      documentId,
      user.id,
      title,
      file.name,
      file.type || "application/octet-stream",
      storagePath,
    ],
  });

  try {
    const embeddings = await embedTexts(chunks);

    const statements = chunks.map((content, index) => ({
      sql: `insert into chunks
        (id, document_id, user_id, content, chunk_index, embedding)
       values (?, ?, ?, ?, ?, ?)`,
      args: [
        crypto.randomUUID(),
        documentId,
        user.id,
        content,
        index,
        JSON.stringify(embeddings[index]),
      ],
    }));

    statements.push({
      sql: `update documents
            set status = 'ready', chunk_count = ?, error_message = null
            where id = ?`,
      args: [chunks.length, documentId],
    });

    await db.batch(statements, "write");

    const ready = await db.execute({
      sql: "select * from documents where id = ?",
      args: [documentId],
    });

    const document = mapDocument(
      ready.rows[0] as unknown as Record<string, unknown>,
    );

    return NextResponse.json({ document: toPublicDocument(document) });
  } catch (error) {
    await db.execute({
      sql: `update documents
            set status = 'error', error_message = ?
            where id = ?`,
      args: [
        error instanceof Error ? error.message : "Indexing failed",
        documentId,
      ],
    });

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : "Indexing failed",
        documentId,
      },
      { status: 500 },
    );
  }
}
