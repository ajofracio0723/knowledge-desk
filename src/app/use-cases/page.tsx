import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

const cases = [
  {
    title: "Customer support",
    body: "Upload refund, shipping, and warranty policies. Agents ask the desk instead of searching long PDFs mid-conversation.",
  },
  {
    title: "People and operations",
    body: "Keep handbooks, leave policies, and process guides ready for quick questions from managers and new hires.",
  },
  {
    title: "Product teams",
    body: "Store specs, release notes, and FAQs in one place, then ask for summaries or exact wording when you need it.",
  },
  {
    title: "Founders and solo operators",
    body: "Turn scattered notes, SOPs, and client docs into a private assistant that remembers what you already wrote.",
  },
];

export default function UseCasesPage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-[50vh] bg-[url('/desk-grid.svg')] bg-[length:48px_48px] opacity-[0.28]"
      />
      <SiteHeader />

      <main className="relative z-10 mx-auto w-full max-w-6xl flex-1 px-6 pb-20 pt-10">
        <p className="animate-rise font-[family-name:var(--font-ibm-mono)] text-xs uppercase tracking-[0.18em] text-teal">
          Use cases
        </p>
        <h1 className="mt-3 max-w-3xl font-[family-name:var(--font-fraunces)] text-4xl tracking-tight text-ink sm:text-5xl animate-rise">
          Made for teams who live in documents
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink/65 animate-rise-delay">
          If the answer already exists in a file, Knowledge Desk helps you find
          it faster and explain it clearly.
        </p>

        <div className="mt-14 grid gap-10 sm:grid-cols-2">
          {cases.map((item) => (
            <section key={item.title} className="border-t border-line/80 pt-6">
              <h2 className="font-[family-name:var(--font-fraunces)] text-2xl text-ink">
                {item.title}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-ink/65 sm:text-base">
                {item.body}
              </p>
            </section>
          ))}
        </div>

        <section className="mt-16 rounded-[1.75rem] bg-ink px-6 py-10 text-paper sm:px-10">
          <h2 className="font-[family-name:var(--font-fraunces)] text-3xl tracking-tight">
            Ready to try it with your own files?
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/65">
            Create an account, upload one document, and ask the question you
            usually waste time searching for.
          </p>
          <Link
            href="/signup"
            className="mt-7 inline-flex items-center gap-2 rounded-xl bg-paper px-5 py-3 text-sm font-semibold text-ink transition hover:bg-mist"
          >
            Get started free
            <ArrowRight className="size-4" />
          </Link>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
