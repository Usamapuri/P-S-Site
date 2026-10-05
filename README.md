# P&S Med Services · Medivance · Sterlingmed

Landing pages for three sister DME brands. Each site in `sites/<brand>/` is a complete Next.js app and deploys on its own to Railway.

## Layout

| Path | What it is |
|---|---|
| `template/` | The one source of truth for all shared code, styles, and product photos. Edit here. |
| `sites/<brand>/` | Deployable app: synced template plus brand-owned files. |
| `scripts/sync.mjs` | Copies `template/` into every site. |
| `scripts/fetch-images.mjs` | Pexels photo pipeline. |

Brand-owned files (never overwritten by sync): `brand.config.ts`, `railway.json`, `public/brand/**`, `.env*`.

## Everyday workflow

```bash
cd template && pnpm install && pnpm dev   # work on shared UI (uses the template preview brand)
cd .. && pnpm sync                        # copy changes into all three sites
pnpm sync:check                           # must print 0 out of date / 0 stale before committing
```

To preview a specific brand: `cd sites/medivance && pnpm install && pnpm dev`.
Tests: `pnpm test` inside `template/` or any site; `pnpm test:scripts` at the root.

## Brand content still to fill in

The build prints a warning listing every placeholder that's still in a brand's `brand.config.ts`. Before launch:

- **All brands:** service region, plus real customer reviews (remove `sample: true`).
- **Medivance and Sterlingmed:** phone, email, hours, legal name, and production URL.

Also confirm the marketing copy with the client: the hero trust points and the "within one business day" call-back promise.

## Photos

```bash
cp .env.example .env            # add PEXELS_API_KEY
pnpm images:candidates [key]    # contact sheets in .image-candidates/<key>/sheet.jpg
# edit scripts/photo-picks.json
pnpm images:apply               # writes photos + docs/photo-credits.md
pnpm sync
```

## Deploying to Railway

Create one service per brand from this GitHub repo. For each service:

1. **Settings → Source → Root Directory:** `/sites/ps` (or `/sites/medivance`, `/sites/sterlingmed`).
2. **Settings → Config-as-code → Railway config file:** `/sites/ps/railway.json`. Railway needs the absolute path because the config file does not follow the Root Directory.
3. **Variables:**
   - `RESEND_API_KEY`: a Resend API key
   - `LEAD_TO_EMAIL`: where leads are sent
   - `LEAD_FROM_EMAIL`: a sender on a domain verified in Resend, e.g. `leads@psmedservices.com`
4. **Networking:** generate a domain or attach the brand's custom domain, then set `seo.url` in that brand's `brand.config.ts` to match.

The watch paths in each `railway.json` mean a push only rebuilds the sites whose directory changed.

## Adding a brand

1. Add the id to `BrandId` in `template/lib/brand.ts` and to `SITES` in `scripts/sync.mjs`.
2. Create `sites/<id>/brand.config.ts`, `railway.json`, and `public/brand/{mark.svg,photos/}`.
3. Run `pnpm sync`, then `cd sites/<id> && pnpm install && pnpm test && pnpm build`.
