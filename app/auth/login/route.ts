import { NextRequest, NextResponse } from "next/server"
import { authCookieMaxAge, authCookieName, authEnabled, createAuthCookieValue, isValidPassword } from "@/lib/auth"

function sanitizeNext(next: string | null) {
  if (!next || !next.startsWith("/")) return "/"
  return next
}

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const password = String(formData.get("password") ?? "")
  const nextPath = sanitizeNext(String(formData.get("next") ?? "/"))

  if (!authEnabled()) {
    return NextResponse.redirect(new URL(nextPath, req.url), 303)
  }

  if (!(await isValidPassword(password))) {
    return NextResponse.redirect(new URL(`/login?error=1&next=${encodeURIComponent(nextPath)}`, req.url), 303)
  }

  const res = NextResponse.redirect(new URL(nextPath, req.url), 303)
  res.cookies.set({
    name: authCookieName(),
    value: await createAuthCookieValue(),
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: authCookieMaxAge(),
  })
  return res
}
