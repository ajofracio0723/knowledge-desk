import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { createSessionToken, setSessionCookie } from "@/lib/auth";
import { getDb } from "@/lib/db";

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
      {
        error:
          "Enter a valid email and a password with at least 6 characters.",
      },
      { status: 400 },
    );
  }

  const email = parsed.data.email.toLowerCase();
  const db = await getDb();

  const existing = await db.execute({
    sql: "select id from users where email = ?",
    args: [email],
  });

  if (existing.rows[0]) {
    return NextResponse.json(
      { error: "An account with that email already exists." },
      { status: 409 },
    );
  }

  const id = crypto.randomUUID();
  const passwordHash = await bcrypt.hash(parsed.data.password, 10);

  await db.execute({
    sql: "insert into users (id, email, password_hash) values (?, ?, ?)",
    args: [id, email, passwordHash],
  });

  const token = await createSessionToken({ id, email });
  const response = NextResponse.json({ ok: true, email });
  setSessionCookie(response, token);
  return response;
}
