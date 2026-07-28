import Link from "next/link";
import { BookOpenCheck } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/how-it-works", label: "How it works" },
  { href: "/stack", label: "Tech stack" },
  { href: "/about", label: "About" },
];

export function SiteHeader({
  compact = false,
  showAuth = true,
}: {
  compact?: boolean;
  showAuth?: boolean;
}) {
  return (
    <header
      className={cn(
        "relative z-20 flex items-center justify-between gap-4",
        compact ? "px-4 py-4 sm:px-6" : "mx-auto w-full max-w-6xl px-6 py-6",
      )}
    >
      <Link href="/" className="group flex items-center gap-3">
        <span className="grid size-10 place-items-center rounded-xl bg-ink text-mist transition group-hover:bg-teal-deep">
          <BookOpenCheck className="size-5" strokeWidth={1.75} />
        </span>
        <span className="leading-tight">
          <span className="block font-[family-name:var(--font-fraunces)] text-xl tracking-tight text-ink">
            Knowledge Desk
          </span>
          {!compact && (
            <span className="block text-xs uppercase tracking-[0.18em] text-ink/55">
              Ask your documents
            </span>
          )}
        </span>
      </Link>

      <div className="flex items-center gap-1 sm:gap-2">
        <nav className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink/65 transition hover:bg-white/60 hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {showAuth && (
          <nav className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/login"
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink/70 transition hover:bg-white/60 hover:text-ink"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-ink px-3.5 py-2 text-sm font-medium text-paper transition hover:bg-teal-deep"
            >
              Get started
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}
