import brand from "@/brand.config"
import { createLeadHandler } from "@/lib/lead-handler"
import { createRateLimiter } from "@/lib/rate-limit"

export const POST = createLeadHandler({
  brand,
  env: {
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    LEAD_TO_EMAIL: process.env.LEAD_TO_EMAIL,
    LEAD_FROM_EMAIL: process.env.LEAD_FROM_EMAIL,
  },
  limiter: createRateLimiter({ limit: 5, windowMs: 10 * 60 * 1000 }),
})
