# Multi-Brand DME Landing Pages — Design

**Date:** 2026-10-06
**Status:** Approved in conversation; awaiting written-spec review

## 1. Goal

Redesign the P&S Med Services landing page and produce two sister-brand landing pages
(**Medivance**, **Sterlingmed**) for the same owner. All three sell durable medical
equipment (DME) to elderly/disabled patients in different US regions, handle insurance
billing, and deliver to the home. All three live in this one repo, each in its own
directory, deployable independently to Railway via a per-service Root Directory.

**Success criteria**

- Three production-buildable Next.js apps at `sites/ps`, `sites/medivance`, `sites/sterlingmed`.
- Each deploys on Railway with only its own directory as Root Directory.
- Shared UI is written once (`template/`) and synced; a drift check fails if a site diverges.
- Modern, distinct-per-brand visual design that meets WCAG AA and is comfortable for older readers.
- Working lead form that emails submissions; phone click-to-call is always one tap away.

**Decisions made with the client's designer (user)**

| Question | Decision |
|---|---|
| Number of sites | 3: P&S (redesign), Medivance, Sterlingmed |
| Brand assets for new brands | Designed by us; contact details are placeholders in config |
| Primary conversion | Click-to-call + lead form emailed via Resend |
| Repo structure | Option A: self-contained site dirs + shared `template/` synced in |

## 2. Repository layout

```
/
├─ template/                    # single source of truth for shared code
│  ├─ app/                      # layout.tsx, page.tsx, globals.css, api/lead/route.ts
│  ├─ components/               # sections/*, ui/*
│  ├─ lib/                      # lead-schema.ts, rate-limit.ts, brand types, catalog data
│  ├─ public/photos/            # Pexels images (committed)
│  ├─ public/insurers/          # insurer logos (moved from current public/logos)
│  ├─ next.config.mjs, tsconfig.json, postcss.config.mjs, package.json
├─ sites/
│  ├─ ps/                       # full Next.js app = synced template + brand files
│  │  ├─ brand.config.ts        # BRAND-OWNED (never overwritten by sync)
│  │  ├─ public/brand/          # BRAND-OWNED: logo.svg, favicon, og image
│  │  └─ …synced files…
│  ├─ medivance/
│  └─ sterlingmed/
├─ scripts/
│  ├─ sync.mjs                  # copy template → sites; `--check` reports drift, exits 1
│  └─ fetch-images.mjs          # Pexels download (reads PEXELS_API_KEY from root .env)
├─ docs/
├─ .env.example                 # PEXELS_API_KEY=
└─ package.json                 # root scripts only: sync, sync:check, images, build:all
```

**Sync rules**

- `sync.mjs` mirrors every file under `template/` into each `sites/<brand>/`, deleting
  synced files that no longer exist in the template.
- Brand-owned paths are never touched: `brand.config.ts`, `public/brand/**`, and the
  site's own `.env*`.
- Synced files get no header comment (keeps them byte-identical); instead each site has a
  `SYNCED_FILES.md` note: "Do not edit synced files here — edit `template/` and run `pnpm sync`."
- `pnpm sync:check` is the drift guard; run before commits and in the verification step.
- Each site has its own `package.json` + lockfile (synced from template) so Railway's
  Nixpacks/Railpack build works with nothing outside the root directory.

## 3. Brand configuration

`brand.config.ts` exports a typed `Brand` object (type defined in `template/lib/brand.ts`):

```ts
{
  id: "ps" | "medivance" | "sterlingmed",
  name, shortName, tagline,
  region: { label, states: string[] },
  contact: { phone, phoneHref, email, hours },
  colors: { primary, primaryForeground, accent, accentForeground },
  heroImage, stepImages: [3], lifestyleImages,   // keys into public/photos
  catalog: { hide?: string[], add?: Product[] },
  testimonials: Testimonial[],
  legalName, parentCompany?: string,
  seo: { title, description, url }
}
```

Colors are injected as CSS custom properties on `<html>` in `layout.tsx`; all components
use tokens only (no hardcoded brand colors).

**Placeholder guard:** any string containing `[PLACEHOLDER` (or phone `(000) 000-0000`)
triggers a `console.warn` listing the fields at build time. Build does not fail.

### Brand identities

| Brand | Personality | Primary | Accent (CTA) | Mark |
|---|---|---|---|---|
| P&S Med Services | Trusted, local | Deep teal `#0F4C5C` | Coral `#E8735A` | Ampersand in soft rounded square |
| Medivance | Forward, energetic | Indigo `#2B2D6E` | Mint `#2EC4A6` | Chevron "advance" forming an M |
| Sterlingmed | Premium, established | Forest `#1F3D2B` | Brass `#C9A24A` | Shield-shaped S monogram |

Shared neutrals: background `#FAF7F2`, ink `#1A1A1A`, muted ink `#4A4A4A`.
Accent buttons use whichever foreground (ink or white) passes AA (≥4.5:1) against the accent;
verified per brand during implementation and adjusted (darken/lighten) if a pair fails.

Logos are hand-built SVG wordmarks (mark + name set in Fraunces) in `public/brand/`.

**P&S real contact:** phone `628-262-7713`, email `support@psmedservices.com`.
Medivance/Sterlingmed: placeholders, e.g. phone `(000) 000-0000`,
email `[PLACEHOLDER]@medivance.com`, region `[PLACEHOLDER REGION]`.

## 4. Visual system

- **Type:** Fraunces (headings, via `next/font/google`), Inter (body). Body ≥ 18px,
  line-height 1.6; H1 clamp(2.5rem → 4.5rem).
- **Text size toggle:** header "A+" button toggles a root class that scales base font
  to 20px; persisted in `localStorage` (wrapped in try/catch).
- **Layout:** max-width 1200px, 12-col grid, 16px mobile gutter, large radius (20–28px)
  image cards, generous section padding.
- **Color use:** accent reserved for primary actions; primary for headings/bands.
- **Motion:** IntersectionObserver fade/translate on section entry; disabled under
  `prefers-reduced-motion`. No blob/wave animations.
- **Accessibility:** WCAG AA contrast, 48px minimum tap targets, visible focus rings,
  skip-to-content link, semantic landmarks, labelled form controls, alt text on all images.
- **Dark mode:** not in scope (audience and brand photography favor a single light theme).

## 5. Page sections (single page, same order on all brands)

1. **Header** — logo, anchor nav (How it works, Equipment, Insurance, FAQ, Contact),
   A+ toggle, phone button. Mobile: logo + call icon + menu sheet.
   **Sticky mobile call bar** fixed at bottom on < md screens.
2. **Hero** — headline, subcopy, Call button (accent) + "Check my coverage" (scrolls to form),
   trust row (Medicare accepted · Free home delivery · We handle the paperwork), hero photo.
3. **Insurance strip** — insurer logos, grayscale → color on hover/focus; line
   "Plus most Medicare Advantage and Medicaid plans."
4. **How it works** — 3 steps with photo, number, title, one-sentence copy.
5. **Equipment catalog** — category filter chips (All, Mobility, Bathroom safety, Bedroom,
   Respiratory, Daily living); product cards (photo, name, one-liner, "Ask about this"
   which sets the form's equipment field and scrolls to the form).
   Base catalog = the 13 current products; brand `catalog.hide/add` applied.
6. **Why us** — 4 icon benefits + one stat band.
7. **Testimonials** — 3 cards. Content is placeholder, marked
   `[PLACEHOLDER — replace with real customer review]` in config; not presented as genuine.
8. **FAQ** — Radix accordion, 6 Q&As (coverage, cost, delivery time, setup, repairs/returns,
   which areas served). Emits FAQPage JSON-LD.
9. **Lead form + contact** — form (left), phone/email/hours/region card (right).
10. **Footer** — logo, region, legal name, optional parent-company line, privacy note,
    © year.

SEO: per-brand `metadata` (title, description, OpenGraph image from `public/brand/og.png`),
`LocalBusiness`/`MedicalBusiness` JSON-LD, `robots.txt`, `sitemap.xml`.

## 6. Lead form

**Fields:** full name, phone, ZIP code, equipment (select from catalog + "Other"),
insurance carrier (select: Medicare, Medicaid, Medicare Advantage, Aetna, BCBS, Cigna,
Humana, UnitedHealthcare, Other, Not sure), best time to call (Morning/Afternoon/Evening),
honeypot field (visually hidden).

**Not collected:** member ID, date of birth, diagnosis, or any other PHI.

**Flow**

1. Client validates with shared zod schema (`lib/lead-schema.ts`); inline errors.
2. POST JSON to `/api/lead`.
3. Route: reject if honeypot filled (respond 200 silently); rate-limit 5 requests / 10 min
   per IP (in-memory map — acceptable for single-instance Railway service);
   re-validate with zod; send email via Resend REST API (`fetch`, no SDK) to
   `LEAD_TO_EMAIL` from `LEAD_FROM_EMAIL`, subject `New lead — <Brand> — <equipment>`,
   including brand id.
4. Success → form replaced by confirmation ("Thanks, <name>. We'll call you within one
   business day.") plus phone number.
5. Failure or missing `RESEND_API_KEY` → route returns 503; UI shows
   "Something went wrong — please call us at <phone>." Server logs the error.

**Env vars per Railway service:** `RESEND_API_KEY`, `LEAD_TO_EMAIL`, `LEAD_FROM_EMAIL`.

## 7. Imagery (Pexels)

- `scripts/fetch-images.mjs` reads `PEXELS_API_KEY` from root `.env` (git-ignored;
  `.env.example` committed). Uses a curated manifest of search queries / photo IDs:
  hero (3 variants, one per brand), steps (3 per brand), lifestyle (per category),
  product shots per catalog item where Pexels has suitable results.
- Downloads `large2x` (≈1880px) JPEGs to `template/public/photos/<key>.jpg` and writes
  `template/public/photos/CREDITS.md` (photographer + Pexels URL).
- Images are committed; builds never call Pexels; the key never reaches client code.
- Where Pexels lacks a suitable product shot (e.g. toilet safety frame), keep the
  existing local image from `public/images/`.
- Image curation (choosing among results) is done by reviewing downloaded candidates,
  not blindly taking the first result.
- `next/image` optimization enabled (remove `unoptimized: true`); `sharp` added as a dependency.

## 8. Stack

- Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS v4, lucide-react,
  Radix (accordion, dialog/sheet, select only), zod.
- `next.config.mjs`: `output: "standalone"`; remove `ignoreBuildErrors` and
  `ignoreDuringBuilds` (builds must type-check).
- Remove: vue, vue-router, svelte, @sveltejs/kit, @remix-run/react, @vercel/analytics,
  unused Radix packages, recharts, embla, cmdk, vaul, input-otp, react-day-picker,
  react-resizable-panels, date-fns, sonner, next-themes, geist.
- Package manager: pnpm. Node 20+ (`engines` field set).
- Current root-level app (`app/`, `components/`, `public/`, `styles/`, etc.) is migrated
  into `template/` + `sites/ps/` and removed from root.

## 9. Deployment (Railway)

Three services in one Railway project, all connected to this GitHub repo:

| Service | Root Directory | Watch paths |
|---|---|---|
| ps | `sites/ps` | `sites/ps/**` |
| medivance | `sites/medivance` | `sites/medivance/**` |
| sterlingmed | `sites/sterlingmed` | `sites/sterlingmed/**` |

Build `pnpm install --frozen-lockfile && pnpm build`; start `pnpm start` (binds `$PORT`).
Each site has a `railway.json` with these commands. README documents setup and env vars.
Provisioning the Railway services themselves is done by the user (or by us on explicit
request) — not part of the code work.

## 10. Testing & verification

- **Unit (vitest, in template):** lead schema (valid/invalid cases), `/api/lead` handler
  (honeypot, rate limit, missing key → 503, success path with mocked `fetch`),
  brand placeholder detector.
- **Drift:** `pnpm sync:check` exits 0.
- **Builds:** `pnpm build` succeeds in each of the 3 site dirs, run from that dir only
  (simulates Railway root-dir isolation).
- **Visual:** run each site locally; screenshot at 390px and 1440px; check no horizontal
  scroll, sticky call bar, form states.
- **Accessibility:** Lighthouse accessibility score ≥ 95 per site; manual keyboard pass
  of nav, filters, accordion, form.

## 11. Out of scope

- Real testimonials, real contact details for Medivance/Sterlingmed (placeholders only).
- CRM integration, analytics, cookie banner, CMS.
- Multi-page sites (product detail pages, blog).
- Dark mode.
- Creating Railway services/domains (documented, not performed unless asked).
