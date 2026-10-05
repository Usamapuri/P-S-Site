"use client"

import { CheckCircle2, Loader2, Phone } from "lucide-react"
import { useEffect, useState, type FormEvent, type ReactNode } from "react"
import { buttonClasses } from "@/components/ui/button"
import { EQUIPMENT_EVENT } from "@/lib/events"
import { CALL_TIMES, INSURANCE_OPTIONS, leadSchema } from "@/lib/lead-schema"

type Status = "idle" | "submitting" | "success" | "error"
type Errors = Partial<Record<string, string>>

const control =
  "mt-2 block min-h-14 w-full rounded-xl border-2 border-line bg-surface px-4 text-lg text-ink placeholder:text-muted/70 focus:border-primary aria-[invalid=true]:border-red-700"

function firstErrors(fields: Record<string, string[] | undefined>): Errors {
  return Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, v?.[0]]))
}

function Field({ name, label, error, children }: { name: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={`lead-${name}`} className="block font-semibold text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`lead-${name}-error`} className="mt-2 font-medium text-red-700">
          {error}
        </p>
      )}
    </div>
  )
}

export function LeadForm({ equipment, phone, phoneHref }: { equipment: string[]; phone: string; phoneHref: string }) {
  const [status, setStatus] = useState<Status>("idle")
  const [errors, setErrors] = useState<Errors>({})
  const [selected, setSelected] = useState("")
  const [firstName, setFirstName] = useState("")

  useEffect(() => {
    const onRequest = (event: Event) => setSelected((event as CustomEvent<string>).detail)
    window.addEventListener(EQUIPMENT_EVENT, onRequest)
    return () => window.removeEventListener(EQUIPMENT_EVENT, onRequest)
  }, [])

  const a11y = (name: string) => ({
    id: `lead-${name}`,
    name,
    "aria-invalid": errors[name] ? true : undefined,
    "aria-describedby": errors[name] ? `lead-${name}-error` : undefined,
  })

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>
    const parsed = leadSchema.safeParse(data)
    if (!parsed.success) {
      const fieldErrors = firstErrors(parsed.error.flatten().fieldErrors)
      setErrors(fieldErrors)
      form.querySelector<HTMLElement>(`[name="${Object.keys(fieldErrors)[0]}"]`)?.focus()
      return
    }
    setErrors({})
    setStatus("submitting")
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setFirstName(parsed.data.name.split(/\s+/)[0])
        setStatus("success")
        return
      }
      if (res.status === 400) {
        const body = await res.json().catch(() => null)
        if (body?.fields) setErrors(firstErrors(body.fields))
        setStatus("idle")
        return
      }
      setStatus("error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 py-6">
        <CheckCircle2 className="h-12 w-12 text-primary" aria-hidden />
        <h3 className="text-3xl text-ink">Thanks, {firstName}.</h3>
        <p className="text-lg text-muted">We&apos;ll call you within one business day to check your coverage.</p>
        <p className="text-lg text-ink">
          Need us sooner?{" "}
          <a href={phoneHref} className="font-semibold text-primary underline underline-offset-4">
            Call {phone}
          </a>
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="grid gap-6 sm:grid-cols-2" aria-describedby="lead-privacy">
      <div className="sm:col-span-2">
        <Field name="name" label="Full name" error={errors.name}>
          <input {...a11y("name")} type="text" autoComplete="name" className={control} />
        </Field>
      </div>
      <Field name="phone" label="Phone number" error={errors.phone}>
        <input {...a11y("phone")} type="tel" autoComplete="tel" inputMode="tel" placeholder="(555) 555-5555" className={control} />
      </Field>
      <Field name="zip" label="ZIP code" error={errors.zip}>
        <input {...a11y("zip")} type="text" autoComplete="postal-code" inputMode="numeric" maxLength={10} className={control} />
      </Field>
      <div className="sm:col-span-2">
        <Field name="equipment" label="Equipment you need" error={errors.equipment}>
          <select {...a11y("equipment")} value={selected} onChange={(e) => setSelected(e.target.value)} className={control}>
            <option value="">Choose equipment…</option>
            {equipment.map((name) => (
              <option key={name} value={name}>
                {name}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field name="insurance" label="Insurance" error={errors.insurance}>
        <select {...a11y("insurance")} defaultValue="" className={control}>
          <option value="" disabled>
            Choose your plan…
          </option>
          {INSURANCE_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>
      <Field name="callTime" label="Best time to call" error={errors.callTime}>
        <select {...a11y("callTime")} defaultValue="" className={control}>
          <option value="" disabled>
            Choose a time…
          </option>
          {CALL_TIMES.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      </Field>

      {/* Honeypot: hidden from people and assistive tech; bots fill it in. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="lead-website">Website</label>
        <input id="lead-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl bg-red-50 p-4 font-medium text-red-800 sm:col-span-2">
          Something went wrong sending your request. Please call us at{" "}
          <a href={phoneHref} className="underline">
            {phone}
          </a>
          .
        </p>
      )}

      <div className="flex flex-col gap-4 sm:col-span-2">
        <button type="submit" disabled={status === "submitting"} className={buttonClasses({ size: "lg", className: "w-full" })}>
          {status === "submitting" ? <Loader2 className="h-5 w-5 animate-spin" aria-hidden /> : null}
          {status === "submitting" ? "Sending…" : "Check my coverage"}
        </button>
        <p id="lead-privacy" className="text-sm text-muted">
          Free and no obligation. We only use your details to call you back. Please don&apos;t include medical details here.
        </p>
        <a href={phoneHref} className="inline-flex items-center gap-2 font-semibold text-primary sm:hidden">
          <Phone className="h-5 w-5" aria-hidden />
          Or call {phone}
        </a>
      </div>
    </form>
  )
}
