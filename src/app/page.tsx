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

export default function HomePage() {
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
              Document intelligence
            </p>
            <h1 className="max-w-xl font-[family-name:var(--font-fraunces)] text-5xl leading-[1.05] tracking-tight text-ink sm:text-6xl lg:text-[4.25rem]">
              Knowledge Desk
            </h1>
            <p className="mt-5 max-w-md text-lg leading-relaxed text-ink/70">
              Upload your documents, ask questions in plain language, and get
              clear answers from your own files.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-teal-deep"
              >
                Get started free
                <ArrowRight className="size-4" />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-line bg-white/70 px-5 py-3 text-sm font-semibold text-ink transition hover:bg-white"
              >
                See how it works
              </Link>
            </div>
          </div>

          <div className="relative animate-rise-delay">
            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-teal/15 via-transparent to-ink/10 blur-2xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/70 bg-ink text-paper shadow-[0_40px_100px_-50px_rgba(11,18,32,0.8)]">
              <div className="border-b border-white/10 px-5 py-4">
                <p className="font-[family-name:var(--font-fraunces)] text-xl">
                  Instant answers
                </p>
                <p className="mt-1 text-sm text-white/55">
                  From your private document library
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
            The problem
          </p>
          <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-fraunces)] text-3xl tracking-tight text-ink sm:text-4xl">
            Important answers are buried in your files
          </h2>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink/65 sm:text-lg">
            Policies, handbooks, FAQs, and project notes pile up fast. Searching
            page by page wastes time. Knowledge Desk turns those documents into
            a private place you can ask questions.
          </p>
        </section>

        <section className="mt-16 grid gap-10 sm:grid-cols-3">
          {[
            {
              icon: FileSearch,
              title: "Upload",
              body: "Add PDFs and text files to your personal library in seconds.",
            },
            {
              icon: Sparkles,
              title: "Ask",
              body: "Type a normal question, the same way you would ask a teammate.",
            },
            {
              icon: ShieldCheck,
              title: "Trust",
              body: "Answers come from your documents, not from random web guesses.",
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
              Everything you need
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-fraunces)] text-3xl tracking-tight text-ink sm:text-4xl">
              A calm workspace for your knowledge
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink/65">
              Create an account, keep your files private, and chat with your
              library whenever you need a fast answer.
            </p>
          </div>
          <div className="space-y-6">
            {[
              {
                icon: Library,
                title: "Document library",
                body: "Store PDFs, Markdown, TXT, CSV, and JSON in one place.",
              },
              {
                icon: MessageSquareText,
                title: "Natural chat",
                body: "Ask follow-up questions and get clear, complete replies.",
              },
              {
                icon: ShieldCheck,
                title: "Private by default",
                body: "Your documents stay tied to your account and are not shared.",
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
            Built for real work
          </p>
          <h2 className="mt-3 max-w-2xl font-[family-name:var(--font-fraunces)] text-3xl tracking-tight text-ink sm:text-4xl">
            Useful the moment your documents are uploaded
          </h2>
          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {[
              {
                title: "Support teams",
                body: "Answer policy and process questions without digging through folders.",
              },
              {
                title: "Operators",
                body: "Keep handbooks and SOPs easy to query during busy days.",
              },
              {
                title: "Founders",
                body: "Turn notes, FAQs, and product docs into an always-ready assistant.",
              },
            ].map((item) => (
              <div key={item.title} className="border-t border-line/70 pt-5">
                <h3 className="font-[family-name:var(--font-fraunces)] text-xl text-ink">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/65">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <Link
            href="/use-cases"
            className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-teal transition hover:text-teal-deep"
          >
            Explore use cases
            <ArrowRight className="size-4" />
          </Link>
        </section>

        <section className="mt-20 rounded-[1.75rem] bg-ink px-6 py-12 text-paper sm:px-10">
          <p className="font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.18em] text-teal">
            Get started
          </p>
          <h2 className="mt-3 max-w-xl font-[family-name:var(--font-fraunces)] text-3xl tracking-tight sm:text-4xl">
            Create your desk and ask your first question today
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
            Upload a policy, FAQ, or handbook. Then ask something you usually
            have to search for by hand.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/signup"
              className="inline-flex items-center gap-2 rounded-xl bg-paper px-5 py-3 text-sm font-semibold text-ink transition hover:bg-mist"
            >
              Get started free
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-5 py-3 text-sm font-semibold text-paper transition hover:bg-white/10"
            >
              About Knowledge Desk
            </Link>
          </div>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
