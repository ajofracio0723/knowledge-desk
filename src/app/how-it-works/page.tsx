import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const steps = [
  {
    step: "01",
    title: "Create your account",
    body: "Sign up with your email. Your documents and conversations stay private to your desk.",
  },
  {
    step: "02",
    title: "Upload your documents",
    body: "Add PDFs, Markdown, TXT, CSV, or JSON files. Knowledge Desk reads them and prepares them for search.",
  },
  {
    step: "03",
    title: "Ask in plain language",
    body: "Type the question you would normally ask a teammate. No special search syntax required.",
  },
  {
    step: "04",
    title: "Get a clear answer",
    body: "Knowledge Desk finds the most relevant passages in your files and writes a complete reply from that information.",
  },
];

export default function HowItWorksPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[50vh] bg-[url('/desk-grid.svg')] bg-[length:48px_48px] opacity-[0.28]"
      />
      <SiteHeader />

      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-6 pb-20 pt-10">
        <p className="animate-rise font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.18em] text-teal">
          How it works
        </p>
        <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-fraunces)] text-4xl tracking-tight text-ink sm:text-5xl animate-rise">
          From upload to answer in four steps
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/65 animate-rise-delay">
          Knowledge Desk is built for people who need reliable answers from
          their own documents, without digging through folders every time.
        </p>

        <ol className="mt-14 space-y-10">
          {steps.map((item) => (
            <li
              key={item.step}
              className="grid gap-3 border-t border-line/80 pt-8 sm:grid-cols-[100px_1fr] sm:gap-8"
            >
              <span className="font-[family-name:var(--font-ibm-mono)] text-sm tracking-[0.16em] text-teal">
                {item.step}
              </span>
              <div>
                <h2 className="font-[family-name:var(--font-fraunces)] text-2xl text-ink sm:text-3xl">
                  {item.title}
                </h2>
                <p className="mt-3 max-w-2xl text-base leading-relaxed text-ink/65">
                  {item.body}
                </p>
              </div>
            </li>
          ))}
        </ol>

        <section className="mt-16 border-t border-line/80 pt-12">
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl text-ink">
            What people ask first
          </h2>
          <ul className="mt-5 max-w-2xl space-y-3 text-base leading-relaxed text-ink/65">
            <li>What is our return window for accessories?</li>
            <li>Where do we document onboarding steps?</li>
            <li>What decisions were made in last week’s notes?</li>
          </ul>
          <Link
            href="/signup"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-ink px-5 py-3 text-sm font-semibold text-paper transition hover:bg-teal-deep"
          >
            Start free
            <ArrowRight className="size-4" />
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
