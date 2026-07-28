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
          Knowledge should be easy to ask, not hard to hunt for
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/65 animate-rise-delay">
          Knowledge Desk helps people get answers from the documents they
          already trust: policies, handbooks, FAQs, and internal notes.
        </p>

        <section className="mt-14 max-w-3xl space-y-6 border-t border-line/80 pt-10 text-base leading-relaxed text-ink/70">
          <p>
            Most teams already wrote the answers. They just live in PDFs,
            folders, and shared drives that are slow to search. Knowledge Desk
            gives those documents a simple chat interface.
          </p>
          <p>
            Upload your files, ask a question, and get a clear reply based on
            what you uploaded. No need to remember exact filenames or skim
            twenty pages to find one paragraph.
          </p>
          <p>
            We built Knowledge Desk for people who want practical answers at
            work: support, operations, product, and anyone managing a growing
            set of documents.
          </p>
        </section>

        <section className="mt-14 grid gap-8 border-t border-line/80 pt-10 sm:grid-cols-3">
          {[
            {
              title: "Private",
              body: "Your library belongs to your account. Documents stay separated by user.",
            },
            {
              title: "Simple",
              body: "Upload, ask, and get an answer. No complicated setup for everyday use.",
            },
            {
              title: "Grounded",
              body: "Responses are based on your files, so you stay closer to the source of truth.",
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
            Create your desk
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </main>

      <SiteFooter />
    </div>
  );
}
