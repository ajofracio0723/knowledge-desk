import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const layers = [
  {
    title: "Frontend",
    items: [
      "Next.js 16 App Router",
      "React 19 + TypeScript",
      "Tailwind CSS 4",
      "Fraunces + Source Sans 3",
    ],
  },
  {
    title: "Backend and data",
    items: [
      "Turso / libSQL for production",
      "Local SQLite fallback for development",
      "Cookie sessions with jose",
      "Password hashing with bcrypt",
    ],
  },
  {
    title: "AI and RAG",
    items: [
      "Gemini embeddings (gemini-embedding-001)",
      "Gemini chat (gemini-flash-latest)",
      "Custom text chunking",
      "Cosine similarity retrieval",
      "Serverless PDF extraction with unpdf",
    ],
  },
  {
    title: "Hosting",
    items: [
      "Vercel production deploy",
      "Environment-based secrets",
      "GitHub-connected continuous deploys",
    ],
  },
];

export default function StackPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[50vh] bg-[url('/desk-grid.svg')] bg-[length:48px_48px] opacity-[0.28]"
      />
      <SiteHeader />

      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-6 pb-20 pt-10">
        <p className="animate-rise font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.18em] text-teal">
          Tech stack
        </p>
        <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-fraunces)] text-4xl tracking-tight text-ink sm:text-5xl animate-rise">
          Tools chosen for demos that stay online
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/65 animate-rise-delay">
          The stack is intentionally free-tier friendly. Turso avoids paused
          cloud databases, Gemini handles embeddings and chat, and Vercel hosts
          the app.
        </p>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          {layers.map((layer) => (
            <section
              key={layer.title}
              className="border-t border-line/80 pt-6"
            >
              <h2 className="font-[family-name:var(--font-fraunces)] text-2xl text-ink">
                {layer.title}
              </h2>
              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-ink/65">
                {layer.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <section className="mt-16 border-t border-line/80 pt-12">
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl text-ink">
            Why this stack
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/65">
            Recruiters can open a live demo without waiting for a sleeping
            database. The architecture still shows real full-stack work: auth,
            file ingestion, vector search, and grounded generation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="https://github.com/ajofracio0723/knowledge-desk"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-teal-deep"
            >
              View GitHub repo
              <ArrowRight className="size-4" />
            </a>
            <Link
              href="/how-it-works"
              className="inline-flex items-center gap-2 rounded-xl border border-line bg-white/70 px-5 py-3 text-sm font-semibold text-ink transition hover:bg-white"
            >
              How it works
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
