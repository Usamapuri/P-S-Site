export interface RateLimiter {
  check(key: string): boolean
}

/** In-memory sliding window. Fine for a single Railway instance per site. */
export function createRateLimiter({
  limit,
  windowMs,
  now = () => Date.now(),
}: {
  limit: number
  windowMs: number
  now?: () => number
}): RateLimiter {
  const hits = new Map<string, number[]>()
  return {
    check(key) {
      const t = now()
      const recent = (hits.get(key) ?? []).filter((at) => t - at < windowMs)
      if (recent.length >= limit) {
        hits.set(key, recent)
        return false
      }
      recent.push(t)
      hits.set(key, recent)
      return true
    },
  }
}

export function clientIp(headers: Headers): string {
  const forwarded = headers.get("x-forwarded-for")
  const first = forwarded?.split(",")[0]?.trim()
  if (first) return first
  return headers.get("x-real-ip")?.trim() || "unknown"
}
