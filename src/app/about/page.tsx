import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

export default function AboutPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[50vh] bg-[url('/desk-grid.svg')] bg-[length:48px_48px] opacity-[0.28]"
      />
      <SiteHeader />

      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-6 pb-20 pt-10">
        <p className="animate-rise font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.18em] text-teal">
          About
        </p>
        <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-fraunces)] text-4xl tracking-tight text-ink sm:text-5xl animate-rise">
          A portfolio project that proves AI + product engineering
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/65 animate-rise-delay">
          Knowledge Desk was built to show more than a chat UI. It combines
          authentication, document ingestion, vector retrieval, and a
          production deploy on free-tier infrastructure.
        </p>

        <section className="mt-14 max-w-3xl space-y-6 border-t border-line/80 pt-10 text-base leading-relaxed text-ink/70">
          <p>
            Many portfolio AI demos stop at a single prompt box. This project
            focuses on the full loop companies care about: store private docs,
            retrieve relevant context, and answer from that context.
          </p>
          <p>
            The product is intentionally simple to demo. Upload a short
            document, ask a real question, and see a grounded reply. Under the
            hood it still uses the same shape as production RAG systems.
          </p>
          <p>
            Live demo:{" "}
            <a
              href="https://knowledge-desk.vercel.app"
              className="font-medium text-teal hover:text-teal-deep"
              target="_blank"
              rel="noreferrer"
            >
              knowledge-desk.vercel.app
            </a>
            . Source:{" "}
            <a
              href="https://github.com/ajofracio0723/knowledge-desk"
              className="font-medium text-teal hover:text-teal-deep"
              target="_blank"
              rel="noreferrer"
            >
              github.com/ajofracio0723/knowledge-desk
            </a>
            .
          </p>
        </section>

        <section className="mt-14 grid gap-8 border-t border-line/80 pt-10 sm:grid-cols-3">
          {[
            {
              title: "Problem",
              body: "Generic chatbots invent answers. Teams need answers from their own documents.",
            },
            {
              title: "Approach",
              body: "Chunk, embed, retrieve, then generate. Keep the UX clean enough for a portfolio demo.",
            },
            {
              title: "Outcome",
              body: "A deployable RAG product with auth, storage, and a live Vercel URL.",
            },
          ].map((item) => (
            <div key={item.title}>
              <h2 className="font-[family-name:var(--font-fraunces)] text-2xl text-ink">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/65">
                {item.body}
              </p>
            </div>
          ))}
        </section>

        <div className="mt-12">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-teal-deep"
          >
            Open the desk
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
