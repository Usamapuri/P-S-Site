import { z } from "zod"

export const INSURANCE_OPTIONS = [
  "Medicare",
  "Medicaid",
  "Medicare Advantage",
  "Aetna",
  "Blue Cross Blue Shield",
  "Cigna",
  "Humana",
  "UnitedHealthcare",
  "Other",
  "Not sure",
] as const

export const CALL_TIMES = ["Morning", "Afternoon", "Evening"] as const

const singleLine = /^[^\r\n]*$/

export const leadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Please enter your full name")
    .max(100, "Please use 100 characters or fewer")
    .regex(singleLine, "Please enter your name on one line"),
  phone: z
    .string()
    .transform((s) => s.replace(/\D/g, ""))
    .transform((d) => (d.length === 11 && d.startsWith("1") ? d.slice(1) : d))
    .refine((d) => d.length === 10, "Please enter a 10-digit phone number"),
  zip: z.string().trim().regex(/^\d{5}(-\d{4})?$/, "Please enter a 5-digit ZIP code"),
  equipment: z
    .string()
    .trim()
    .min(1, "Please choose the equipment you need")
    .max(100)
    .regex(singleLine, "Please choose the equipment you need"),
  insurance: z.enum(INSURANCE_OPTIONS, { errorMap: () => ({ message: "Please choose your insurance" }) }),
  callTime: z.enum(CALL_TIMES, { errorMap: () => ({ message: "Please choose a time" }) }),
})

export type LeadInput = z.input<typeof leadSchema>
export type Lead = z.output<typeof leadSchema>
