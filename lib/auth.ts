const AUTH_COOKIE_NAME = "nodepad-auth"
const AUTH_COOKIE_TTL_SECONDS = 60 * 60 * 24 * 30

function getPassword(): string {
  return process.env.NODEPAD_AUTH_PASSWORD?.trim() || ""
}

async function hashValue(value: string): Promise<string> {
  const encoded = new TextEncoder().encode(value)
  const digest = await crypto.subtle.digest("SHA-256", encoded)
  return Array.from(new Uint8Array(digest))
    .map(byte => byte.toString(16).padStart(2, "0"))
    .join("")
}

export function authCookieName() {
  return AUTH_COOKIE_NAME
}

export function authCookieMaxAge() {
  return AUTH_COOKIE_TTL_SECONDS
}

export function authEnabled() {
  return getPassword().length > 0
}

export async function createAuthCookieValue() {
  const password = getPassword()
  if (!password) return ""
  return hashValue(`nodepad-auth:${password}`)
}

export async function isAuthenticated(cookieValue?: string) {
  if (!authEnabled()) return true
  if (!cookieValue) return false
  const expected = await createAuthCookieValue()
  return cookieValue === expected
}

export async function isValidPassword(password: string) {
  const expected = getPassword()
  if (!expected) return true
  return password === expected
}
