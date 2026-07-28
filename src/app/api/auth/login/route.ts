import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { createSessionToken, setSessionCookie } from "@/lib/auth";
import { getDb, type DbUser } from "@/lib/db";

export const runtime = "nodejs";

const schema = z.object({
  email: z.string().trim().email().max(200),
  password: z.string().min(6).max(200),
});

export async function POST(request: Request) {
  const json = await request.json().catch(() => null);
  const parsed = schema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Enter a valid email and password." },
      { status: 400 },
    );
  }

  const email = parsed.data.email.toLowerCase();
  const db = await getDb();
  const result = await db.execute({
    sql: "select * from users where email = ?",
    args: [email],
  });

  const row = result.rows[0] as unknown as DbUser | undefined;
  if (!row) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 },
    );
  }

  const ok = await bcrypt.compare(parsed.data.password, row.password_hash);
  if (!ok) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 },
    );
  }

  const token = await createSessionToken({ id: row.id, email: row.email });
  const response = NextResponse.json({ ok: true, email: row.email });
  setSessionCookie(response, token);
  return response;
}
