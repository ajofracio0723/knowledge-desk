import Link from "next/link";
import { redirect } from "next/navigation";
import { BookOpenCheck, LogOut } from "lucide-react";
import { DeskApp } from "@/components/desk-app";
import { getSessionUser } from "@/lib/auth";
import { getDb, isTursoConfigured, mapDocument } from "@/lib/db";
import type { KnowledgeDocument } from "@/lib/types";
import { isGeminiConfigured } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DeskPage() {
  const user = await getSessionUser();
  if (!user) {
    redirect("/login");
  }

  const db = await getDb();
  const result = await db.execute({
    sql: `select * from documents
          where user_id = ?
          order by datetime(created_at) desc`,
    args: [user.id],
  });

  const documents: KnowledgeDocument[] = result.rows.map((row) => {
    const doc = mapDocument(row as unknown as Record<string, unknown>);
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
  });

  return (
    <div className="min-h-screen">
      <header className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid size-9 place-items-center rounded-xl bg-ink text-mist">
            <BookOpenCheck className="size-4" strokeWidth={1.75} />
          </span>
          <span className="font-[family-name:var(--font-fraunces)] text-lg text-ink">
            Knowledge Desk
          </span>
        </Link>
        <form action="/auth/signout" method="post">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-ink/65 transition hover:bg-white/70 hover:text-ink"
          >
            <LogOut className="size-4" />
            Sign out
          </button>
        </form>
      </header>

      <div className="mx-auto mb-2 max-w-7xl space-y-2 px-4 sm:px-6">
        {!isGeminiConfigured() && (
          <p className="rounded-xl border border-amber/25 bg-amber/5 px-3 py-2 text-sm text-ink/75">
            Answers are temporarily unavailable. Please try again later.
          </p>
        )}
        {!isTursoConfigured() && (
          <p className="rounded-xl border border-line bg-white/70 px-3 py-2 text-sm text-ink/65">
            Running in local mode. Your documents stay on this machine.
          </p>
        )}
      </div>

      <DeskApp initialDocuments={documents} userEmail={user.email} />
    </div>
  );
}
