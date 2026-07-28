import Link from "next/link";
import {
  ArrowRight,
  FileSearch,
  Library,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { isGeminiConfigured } from "@/lib/utils";
import { isTursoConfigured } from "@/lib/db";

export default function HomePage() {
  const geminiReady = isGeminiConfigured();
  const tursoReady = isTursoConfigured();

  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[70vh] bg-[url('/desk-grid.svg')] bg-[length:48px_48px] opacity-[0.35]"
      />
      <SiteHeader />

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pb-20 pt-6">
        <section className="grid min-h-[70vh] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-rise">
            <p className="mb-4 font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.22em] text-teal">
              Portfolio RAG product
            </p>
            <h1 className="max-w-xl font-[family-name:var(--font-fraunces)] text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]">
              Knowledge Desk
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">
              Upload docs. Ask questions. Get answers from your files. Built
              with Next.js, Turso, and free Gemini.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-teal-deep"
              >
                Open the desk
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white/70 px-5 py-3 text-sm font-semibold text-ink transition hover:bg-white"
              >
                See how it works
              </Link>
            </div>

            {(!geminiReady || !tursoReady) && (
              <div className="mt-8 max-w-lg rounded-2xl border border-amber/25 bg-amber/5 px-4 py-3 text-sm text-ink/75 animate-rise-delay">
                <p className="font-semibold text-amber">Free setup</p>
                <ul className="mt-2 list-disc space-y-1 pl-4">
                  {!geminiReady && (
                    <li>
                      Add{" "}
                      <code className="font-mono text-xs">GEMINI_API_KEY</code>{" "}
                      for AI chat
                    </li>
                  )}
                  {!tursoReady && (
                    <li>
                      Optional for deploy: Turso URL + token (local SQLite works
                      until then)
                    </li>
                  )}
                </ul>
              </div>
            )}
          </div>

          <div className="relative animate-rise-delay">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-teal/15 via-transparent to-ink/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-ink text-paper shadow-[0_40px_100px_-50px_rgba(11,18,32,0.8)]">
              <div className="border-b border-white/10 px-5 py-4">
                <p className="font-[family-name:var(--font-fraunces)] text-xl">
                  Grounded answer
                </p>
                <p className="mt-1 text-sm text-white/55">
                  Retrieved from your private document library
                </p>
              </div>
              <div className="space-y-4 px-5 py-5">
                <div className="rounded-2xl bg-white/8 px-4 py-3 text-sm text-white/80">
                  What’s our refund window for accessories?
                </div>
                <div className="rounded-2xl bg-teal/20 px-4 py-3 text-sm leading-relaxed text-paper">
                  Accessories can be returned within 14 days if unused and in
                  original packaging.
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-20 border-t border-line/80 pt-16 animate-rise-delay-2">
          <p className="font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.18em] text-teal">
            What it is
          </p>
          <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-fraunces)] text-3xl tracking-tight text-ink sm:text-4xl">
            A private desk for documents and questions
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/65 sm:text-lg">
            Knowledge Desk is a RAG app: it reads your uploaded files, finds the
            most relevant passages, and answers with Gemini. Perfect for policy
            docs, product FAQs, project writeups, and portfolio demos.
          </p>
        </section>

        <section className="mt-16 grid gap-10 sm:grid-cols-3">
          {[
            {
              icon: FileSearch,
              title: "Ingest",
              body: "PDF and text files are chunked, embedded, and stored in Turso.",
            },
            {
              icon: Sparkles,
              title: "Retrieve",
              body: "Your question finds the closest passages before Gemini drafts a reply.",
            },
            {
              icon: ShieldCheck,
              title: "Answer",
              body: "Replies stay grounded in your files instead of inventing details.",
            },
          ].map((item) => (
            <div key={item.title} className="border-t border-line/80 pt-5">
              <item.icon className="size-5 text-teal" strokeWidth={1.75} />
              <h3 className="mt-4 font-[family-name:var(--font-fraunces)] text-2xl text-ink">
                {item.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                {item.body}
              </p>
            </div>
          ))}
        </section>

        <section className="mt-20 grid gap-10 border-t border-line/80 pt-16 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.18em] text-teal">
              Inside the desk
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-fraunces)] text-3xl tracking-tight text-ink sm:text-4xl">
              Built like a real product, not a toy chat UI
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/65">
              Sign up, upload a library, and chat in a protected workspace. Each
              user only sees their own documents. Data lives in Turso for
              deploy, with a local SQLite fallback for development.
            </p>
          </div>
          <div className="space-y-6">
            {[
              {
                icon: Library,
                title: "Document library",
                body: "Upload PDF, Markdown, TXT, CSV, or JSON. Delete anytime.",
              },
              {
                icon: MessageSquareText,
                title: "Desk chat",
                body: "Ask natural questions and get complete answers from your files.",
              },
              {
                icon: ShieldCheck,
                title: "Account auth",
                body: "Email/password signup with cookie sessions and private data.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <item.icon
                  className="mt-1 size-5 shrink-0 text-teal"
                  strokeWidth={1.75}
                />
                <div>
                  <h3 className="font-semibold text-ink">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ink/65">
                    {item.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-20 border-t border-line/80 pt-16">
          <p className="font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.18em] text-teal">
            Tech stack
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-fraunces)] text-3xl tracking-tight text-ink sm:text-4xl">
            Modern, free-tier friendly tools
          </h2>
          <div className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
            {[
              ["App", "Next.js 16, React 19, TypeScript, Tailwind CSS 4"],
              ["Database", "Turso / libSQL with local SQLite fallback"],
              ["AI", "Google Gemini embeddings + chat"],
              ["Auth", "Cookie sessions with jose and bcrypt"],
              ["Hosting", "Vercel production deploy"],
              ["RAG flow", "Chunking, vector search, grounded generation"],
            ].map(([label, value]) => (
              <div
                key={label}
                className="flex flex-col gap-1 border-t border-line/70 pt-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6"
              >
                <span className="text-sm font-semibold text-ink">{label}</span>
                <span className="text-sm text-ink/65 sm:text-right">
                  {value}
                </span>
              </div>
            ))}
          </div>
          <Link
            href="/stack"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-teal transition hover:text-teal-deep"
          >
            Full stack details
            <ArrowRight className="size-4" />
          </Link>
        </section>

        <section className="mt-20 rounded-[1.75rem] bg-ink px-6 py-12 text-paper sm:px-10">
          <p className="font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.18em] text-teal">
            Try it
          </p>
          <h2 className="mt-3 max-w-xl font-[family-name:var(--font-fraunces)] text-3xl tracking-tight sm:text-4xl">
            Create an account and ask your first document question
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
            Use a short FAQ or project doc, then ask something specific. That’s
            the fastest way to see the RAG flow.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-paper px-5 py-3 text-sm font-semibold text-ink transition hover:bg-mist"
            >
              Get started
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-paper transition hover:bg-white/10"
            >
              About the project
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
