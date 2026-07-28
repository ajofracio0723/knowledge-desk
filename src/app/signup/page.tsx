import { SiteHeader } from "@/components/site-header";
import { AuthForm } from "@/components/auth-form";

export default function SignupPage() {
  return (
    <div className="min-h-screen">
      <SiteHeader compact showAuth={false} />
      <main className="mx-auto flex w-full max-w-md flex-col px-6 pb-16 pt-8">
        <div className="animate-rise rounded-2xl border border-line/80 bg-white/75 p-6 shadow-[0_24px_70px_-45px_rgba(11,18,32,0.45)] backdrop-blur sm:p-8">
          <p className="text-xs uppercase tracking-[0.18em] text-teal">Free to start</p>
          <h1 className="mt-2 font-[family-name:var(--font-fraunces)] text-3xl text-ink">
            Create your desk
          </h1>
          <p className="mt-2 mb-6 text-sm text-ink/60">
            Sign up with email, upload a doc, and ask your first grounded question.
          </p>
          <AuthForm mode="signup" />
        </div>
      </main>
    </div>
  );
}
