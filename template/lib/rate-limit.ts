const MAX_KEYS = 10_000

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
      if (recent.length === 0) hits.delete(key)
      if (hits.size > MAX_KEYS) {
        for (const [k, times] of hits) {
          if (t - times[times.length - 1] >= windowMs) hits.delete(k)
        }
      }
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
  const real = headers.get("x-real-ip")?.trim()
  if (real) return real
  const first = headers.get("x-forwarded-for")?.split(",")[0]?.trim()
  return first || "unknown"
}
