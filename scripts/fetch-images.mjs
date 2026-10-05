// Pexels image pipeline.
//   node scripts/fetch-images.mjs candidates [key...]  → .image-candidates/<key>/{*.jpg,index.json,sheet.jpg}
//   node scripts/fetch-images.mjs apply                → writes picked photos into template/ and sites/
import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import sharp from "sharp"

const ROOT = path.resolve(import.meta.dirname, "..")
const CANDIDATES_DIR = path.join(ROOT, ".image-candidates")
const MANIFEST = JSON.parse(await readFile(path.join(ROOT, "scripts", "photo-manifest.json"), "utf8"))
const PICKS_PATH = path.join(ROOT, "scripts", "photo-picks.json")

function outputPathFor(key) {
  const [scope, name] = key.split(":")
  return scope === "product"
    ? path.join(ROOT, "template", "public", "photos", "products", `${name}.jpg`)
    : path.join(ROOT, "sites", scope, "public", "brand", "photos", `${name}.jpg`)
}

function candidateDir(key) {
  return path.join(CANDIDATES_DIR, key.replace(":", "--"))
}

function apiKey() {
  try {
    process.loadEnvFile(path.join(ROOT, ".env"))
  } catch {
    // fall through to the check below
  }
  const key = process.env.PEXELS_API_KEY
  if (!key) {
    console.error("PEXELS_API_KEY is missing. Copy .env.example to .env and set it.")
    process.exit(1)
  }
  return key
}

async function pexels(url, key) {
  const res = await fetch(url, { headers: { Authorization: key } })
  if (!res.ok) throw new Error(`Pexels ${res.status} for ${url}: ${await res.text()}`)
  return res.json()
}

async function fetchBuffer(url) {
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Download ${res.status}: ${url}`)
  return Buffer.from(await res.arrayBuffer())
}

async function contactSheet(index, out) {
  const W = 400
  const H = 300
  const COLS = 4
  const rows = Math.max(1, Math.ceil(index.length / COLS))
  const tiles = await Promise.all(
    index.map(async (p, i) => {
      const label = Buffer.from(
        `<svg width="${W}" height="${H}" xmlns="http://www.w3.org/2000/svg">` +
          `<rect x="0" y="0" width="${W}" height="40" fill="black" fill-opacity="0.7"/>` +
          `<text x="12" y="28" font-family="Arial" font-size="22" fill="white">${i + 1}: ${p.id}</text></svg>`,
      )
      const input = await sharp(p.file).resize(W, H, { fit: "cover" }).composite([{ input: label, top: 0, left: 0 }]).jpeg().toBuffer()
      return { input, left: (i % COLS) * W, top: Math.floor(i / COLS) * H }
    }),
  )
  await sharp({ create: { width: W * COLS, height: H * rows, channels: 3, background: "#ffffff" } })
    .composite(tiles)
    .jpeg({ quality: 80 })
    .toFile(out)
}

async function candidates(keys) {
  const key = apiKey()
  for (const k of keys) {
    const entry = MANIFEST[k]
    if (!entry) throw new Error(`Unknown manifest key: ${k}`)
    const params = new URLSearchParams({ query: entry.query, per_page: "8", orientation: entry.orientation ?? "landscape" })
    const data = await pexels(`https://api.pexels.com/v1/search?${params}`, key)
    const dir = candidateDir(k)
    await mkdir(dir, { recursive: true })
    const index = []
    for (const p of data.photos) {
      const file = path.join(dir, `${p.id}.jpg`)
      await writeFile(file, await fetchBuffer(p.src.medium))
      index.push({ id: p.id, alt: p.alt, photographer: p.photographer, url: p.url, file })
    }
    await writeFile(path.join(dir, "index.json"), JSON.stringify(index, null, 2))
    if (index.length > 0) await contactSheet(index, path.join(dir, "sheet.jpg"))
    console.log(`${k}: ${index.length} candidates → ${path.relative(ROOT, path.join(dir, "sheet.jpg"))}`)
  }
}

async function apply() {
  const key = apiKey()
  const picks = JSON.parse(await readFile(PICKS_PATH, "utf8"))
  const missing = Object.keys(MANIFEST).filter((k) => !(k in picks))
  if (missing.length) {
    console.error(`No pick for: ${missing.join(", ")}`)
    process.exit(1)
  }
  const ids = Object.values(picks).filter((v) => typeof v === "number")
  const dupes = ids.filter((v, i) => ids.indexOf(v) !== i)
  if (dupes.length) {
    console.error(`The same Pexels photo is picked more than once: ${dupes.join(", ")}`)
    process.exit(1)
  }
  const credits = []
  for (const [k, pick] of Object.entries(picks)) {
    let input
    if (typeof pick === "string" && pick.startsWith("local:")) {
      const rel = pick.slice("local:".length)
      input = await readFile(path.join(ROOT, rel))
      credits.push(`- \`${k}\`: original P&S asset (\`${rel}\`)`)
    } else {
      const p = await pexels(`https://api.pexels.com/v1/photos/${pick}`, key)
      input = await fetchBuffer(p.src.large2x)
      credits.push(`- \`${k}\`: Photo by [${p.photographer}](${p.photographer_url}) on [Pexels](${p.url})`)
    }
    const out = outputPathFor(k)
    await mkdir(path.dirname(out), { recursive: true })
    const width = k.startsWith("product:") ? 1200 : 2000
    await sharp(input)
      .rotate()
      .resize({ width, withoutEnlargement: true })
      .flatten({ background: "#ffffff" })
      .jpeg({ quality: 82, mozjpeg: true })
      .toFile(out)
    console.log(`✓ ${k} → ${path.relative(ROOT, out)}`)
  }
  await writeFile(
    path.join(ROOT, "docs", "photo-credits.md"),
    `# Photo credits\n\nPexels photos are used under the [Pexels License](https://www.pexels.com/license/).\n\n${credits.join("\n")}\n`,
  )
}

const [cmd, ...rest] = process.argv.slice(2)
if (cmd === "candidates") await candidates(rest.length ? rest : Object.keys(MANIFEST))
else if (cmd === "apply") await apply()
else {
  console.error("Usage: node scripts/fetch-images.mjs candidates [key...] | apply")
  process.exit(1)
}
