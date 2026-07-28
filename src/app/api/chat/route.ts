import { NextResponse } from "next/server";
import { z } from "zod";
import { getSessionUser } from "@/lib/auth";
import { embedText, generateGroundedAnswer } from "@/lib/ai/gemini";
import { rankChunksBySimilarity } from "@/lib/ai/similarity";
import { getDb } from "@/lib/db";
import type { Citation } from "@/lib/types";

export const runtime = "nodejs";
export const maxDuration = 60;

const bodySchema = z.object({
  question: z.string().trim().min(3).max(2000),
});

export async function POST(request: Request) {
  try {
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

    const json = await request.json().catch(() => null);
    const parsed = bodySchema.safeParse(json);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid question" }, { status: 400 });
    }

    const question = parsed.data.question;
    const queryEmbedding = await embedText(question);
    const db = await getDb();

    const result = await db.execute({
      sql: `select
              c.id,
              c.document_id,
              c.content,
              c.chunk_index,
              c.embedding,
              d.title as document_title
            from chunks c
            join documents d on d.id = c.document_id
            where c.user_id = ?
              and d.status = 'ready'`,
      args: [user.id],
    });

    const ranked = rankChunksBySimilarity({
      queryEmbedding,
      chunks: result.rows.map((row) => ({
        id: String(row.id),
        document_id: String(row.document_id),
        content: String(row.content),
        chunk_index: Number(row.chunk_index),
        document_title: String(row.document_title),
        embedding: JSON.parse(String(row.embedding)) as number[],
      })),
      matchCount: 10,
      matchThreshold: 0.3,
    });

    const citations: Citation[] = ranked.map((row) => ({
      documentId: row.document_id,
      documentTitle: row.document_title,
      chunkIndex: row.chunk_index,
      content: row.content,
      similarity: row.similarity,
    }));

    const answer = await generateGroundedAnswer({
      question,
      contextBlocks: ranked.map((row) => ({
        title: row.document_title,
        content: row.content,
        index: row.chunk_index,
      })),
    });

    return NextResponse.json({ answer, citations });
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Chat request failed";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
