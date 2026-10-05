import type { Brand } from "@/lib/brand"
import type { Lead } from "@/lib/lead-schema"

const ENTITIES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }

export function escapeHtml(s: string): string {
  return s.replace(/[&<>"']/g, (c) => ENTITIES[c])
}

export function formatPhone(digits: string): string {
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`
}

export function buildLeadEmail(lead: Lead, brand: Pick<Brand, "id" | "name">) {
  const rows: [string, string][] = [
    ["Name", lead.name],
    ["Phone", formatPhone(lead.phone)],
    ["ZIP", lead.zip],
    ["Equipment", lead.equipment],
    ["Insurance", lead.insurance],
    ["Best time to call", lead.callTime],
    ["Brand", `${brand.name} (${brand.id})`],
  ]
  const html =
    `<h2 style="font-family:Arial,sans-serif">New lead from ${escapeHtml(brand.name)}</h2>` +
    `<table style="font-family:Arial,sans-serif;font-size:16px;border-collapse:collapse">` +
    rows
      .map(
        ([k, v]) =>
          `<tr><td style="padding:6px 16px 6px 0;color:#555">${escapeHtml(k)}</td>` +
          `<td style="padding:6px 0"><strong>${escapeHtml(v)}</strong></td></tr>`,
      )
      .join("") +
    `</table>`
  return {
    subject: `New lead — ${brand.name} — ${lead.equipment}`,
    text: rows.map(([k, v]) => `${k}: ${v}`).join("\n"),
    html,
  }
}
