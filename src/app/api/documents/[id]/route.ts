import fs from "node:fs/promises";
import { NextResponse } from "next/server";
import { getSessionUser } from "@/lib/auth";
import { getDb, mapDocument } from "@/lib/db";

export const runtime = "nodejs";

type Params = { params: Promise<{ id: string }> };

export async function DELETE(_request: Request, { params }: Params) {
  const { id } = await params;
  const user = await getSessionUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const db = await getDb();
  const result = await db.execute({
    sql: "select * from documents where id = ? and user_id = ?",
    args: [id, user.id],
  });

  const row = result.rows[0];
  if (!row) {
    return NextResponse.json({ error: "Document not found" }, { status: 404 });
  }

  const document = mapDocument(row as unknown as Record<string, unknown>);
  if (document.storage_path) {
    await fs.unlink(document.storage_path).catch(() => undefined);
  }

  await db.execute({
    sql: "delete from documents where id = ?",
    args: [id],
  });

  return NextResponse.json({ ok: true });
}
