import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-line/70 bg-white/40">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-[family-name:var(--font-fraunces)] text-xl text-ink">
            Knowledge Desk
          </p>
          <p className="mt-2 max-w-sm text-sm leading-relaxed text-ink/60">
            A portfolio RAG product for private document Q&A, built with
            Next.js, Turso, and Gemini.
          </p>
        </div>

        <div className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink/60">
          <Link href="/how-it-works" className="transition hover:text-ink">
            How it works
          </Link>
          <Link href="/stack" className="transition hover:text-ink">
            Tech stack
          </Link>
          <Link href="/about" className="transition hover:text-ink">
            About
          </Link>
          <a
            href="https://github.com/ajofracio0723/knowledge-desk"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-ink"
          >
            GitHub
          </a>
          <a
            href="https://knowledge-desk.vercel.app"
            target="_blank"
            rel="noreferrer"
            className="transition hover:text-ink"
          >
            Live demo
          </a>
        </div>
      </div>
    </footer>
  );
}
