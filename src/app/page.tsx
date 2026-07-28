import Link from "next/link";
import { ArrowRight, FileSearch, ShieldCheck, Sparkles } from "lucide-react";
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

      <main className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-6 pb-16 pt-6">
        <section className="grid min-h-[70vh] items-center gap-12 lg:grid-cols-[1.05fr_0.95fr]">
          <div className="animate-rise">
            <p className="mb-4 font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.22em] text-teal">
              Portfolio RAG product
            </p>
            <h1 className="max-w-xl font-[family-name:var(--font-fraunces)] text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]">
              Knowledge Desk
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">
              Upload docs. Ask questions. Get answers with citations — Turso
              (deploy-ready) or local SQLite, plus free Gemini.
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
                href="/login"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white/70 px-5 py-3 text-sm font-semibold text-ink transition hover:bg-white"
              >
                Log in
              </Link>
            </div>

            {(!geminiReady || !tursoReady) && (
              <div className="mt-8 max-w-lg rounded-2xl border border-amber/25 bg-amber/5 px-4 py-3 text-sm text-ink/75 animate-rise-delay">
                <p className="font-semibold text-amber">Free setup</p>
                <ul className="mt-2 list-disc space-y-1 pl-4">
                  {!geminiReady && (
                    <li>
                      Add <code className="font-mono text-xs">GEMINI_API_KEY</code>{" "}
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
                  original packaging. [Source 1]
                </div>
                <div className="rounded-xl border border-amber/30 bg-amber/10 px-3 py-2 text-xs text-amber-100">
                  Source 1 · refund-policy.md · 91% match
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-8 grid gap-4 sm:grid-cols-3 animate-rise-delay-2">
          {[
            {
              icon: FileSearch,
              title: "Ingest",
              body: "PDF and text files are chunked, embedded, and stored in Turso/SQLite.",
            },
            {
              icon: Sparkles,
              title: "Retrieve",
              body: "Questions find the closest passages before Gemini drafts an answer.",
            },
            {
              icon: ShieldCheck,
              title: "Cite",
              body: "Every reply can show the exact source chunks it relied on.",
            },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-line/80 bg-white/65 p-5 backdrop-blur"
            >
              <item.icon className="size-5 text-teal" strokeWidth={1.75} />
              <h2 className="mt-3 font-[family-name:var(--font-fraunces)] text-xl text-ink">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-ink/65">
                {item.body}
              </p>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
}
