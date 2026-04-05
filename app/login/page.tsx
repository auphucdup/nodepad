import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { authCookieName, authEnabled, isAuthenticated } from "@/lib/auth"

type LoginPageProps = {
  searchParams: Promise<{
    error?: string
    next?: string
  }>
}

export default async function LoginPage({ searchParams }: LoginPageProps) {
  const params = await searchParams
  const cookieStore = await cookies()

  if (!authEnabled()) {
    redirect("/")
  }

  const authenticated = await isAuthenticated(cookieStore.get(authCookieName())?.value)
  if (authenticated) {
    redirect(params.next && params.next.startsWith("/") ? params.next : "/")
  }

  const error = params.error === "1"
  const nextPath = params.next && params.next.startsWith("/") ? params.next : "/"

  return (
    <main className="relative min-h-screen overflow-hidden bg-background text-foreground">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,oklch(0.72_0.19_155_/_.14),transparent_28%),radial-gradient(circle_at_80%_20%,oklch(0.7_0.15_250_/_.12),transparent_32%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_35%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="relative flex min-h-screen items-center justify-center p-4">
        <section className="w-full max-w-md overflow-hidden rounded-sm border border-white/10 bg-card/90 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl">
          <div className="border-b border-white/6 px-6 py-5">
            <div className="mb-2 flex items-center gap-2">
              <div className="flex items-center gap-0.5">
                <span className="inline-block h-2.5 w-2.5 rounded-sm bg-primary" />
                <span className="inline-block h-2.5 w-2.5 rounded-sm bg-primary/60" />
                <span className="inline-block h-2.5 w-2.5 rounded-sm bg-primary/30" />
              </div>
              <span className="font-mono text-sm font-black tracking-tight">nodepad</span>
            </div>

            <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-primary/80">
              Private Workspace
            </p>
            <h1 className="mt-3 text-xl font-semibold tracking-tight">Enter password</h1>
            <p className="mt-2 max-w-sm text-sm leading-6 text-muted-foreground">
              This instance is password-protected. Authentication is stored in a cookie so you do not need to re-enter it on every visit.
            </p>
          </div>

          <form action="/auth/login" method="post" className="space-y-4 px-6 py-6">
            <input type="hidden" name="next" value={nextPath} />

            <label className="block">
              <span className="mb-2 block font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground/80">
                Password
              </span>
              <input
                name="password"
                type="password"
                autoFocus
                autoComplete="current-password"
                className="w-full rounded-sm border border-white/10 bg-black/20 px-3 py-3 font-mono text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground/35 focus:border-primary/50 focus:ring-1 focus:ring-primary/35"
                placeholder="Enter instance password"
                aria-invalid={error}
              />
            </label>

            {error && (
              <p className="rounded-sm border border-red-500/20 bg-red-500/8 px-3 py-2 font-mono text-xs text-red-200/90">
                Incorrect password.
              </p>
            )}

            <button
              type="submit"
              className="w-full rounded-sm border border-primary/20 bg-primary px-3 py-3 font-mono text-xs font-bold uppercase tracking-[0.28em] text-primary-foreground transition-all hover:brightness-105"
            >
              Unlock nodepad
            </button>
          </form>
        </section>
      </div>
    </main>
  )
}
