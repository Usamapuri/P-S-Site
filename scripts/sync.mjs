// Copies template/ into each sites/<brand>/, preserving brand-owned files.
//   pnpm sync          → write changes
//   pnpm sync:check    → report drift, exit 1 if any
import { existsSync } from "node:fs"
import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises"
import path from "node:path"
import { pathToFileURL } from "node:url"

export const SITES = ["ps", "medivance", "sterlingmed"]

const SKIP_DIRS = new Set(["node_modules", ".next", ".turbo", ".vercel"])
const SKIP_FILES = new Set(["next-env.d.ts"])

export function isBrandOwned(rel) {
  const p = rel.replaceAll("\\", "/")
  return p === "brand.config.ts" || p === "railway.json" || p.startsWith("public/brand/") || /^\.env/.test(p)
}

function isSkippedFile(name) {
  return SKIP_FILES.has(name) || name.endsWith(".tsbuildinfo")
}

async function walk(root, rel = "") {
  let entries
  try {
    entries = await readdir(path.join(root, rel), { withFileTypes: true })
  } catch {
    return []
  }
  const files = []
  for (const entry of entries) {
    const childRel = rel ? `${rel}/${entry.name}` : entry.name
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) files.push(...(await walk(root, childRel)))
    } else if (!isSkippedFile(entry.name)) {
      files.push(childRel)
    }
  }
  return files
}

export async function syncSite(templateDir, siteDir, { check = false } = {}) {
  const templateFiles = (await walk(templateDir)).filter((f) => !isBrandOwned(f))
  const templateSet = new Set(templateFiles)
  const changed = []
  const removed = []

  for (const rel of templateFiles) {
    const source = await readFile(path.join(templateDir, rel))
    const target = path.join(siteDir, rel)
    const current = existsSync(target) ? await readFile(target) : null
    if (current && source.equals(current)) continue
    changed.push(rel)
    if (!check) {
      await mkdir(path.dirname(target), { recursive: true })
      await writeFile(target, source)
    }
  }

  for (const rel of (await walk(siteDir)).filter((f) => !isBrandOwned(f))) {
    if (templateSet.has(rel)) continue
    removed.push(rel)
    if (!check) await rm(path.join(siteDir, rel))
  }

  return { changed, removed }
}

async function main() {
  const check = process.argv.includes("--check")
  const root = path.resolve(import.meta.dirname, "..")
  const templateDir = path.join(root, "template")
  let drift = false

  for (const site of SITES) {
    const siteDir = path.join(root, "sites", site)
    if (!existsSync(path.join(siteDir, "brand.config.ts"))) {
      console.error(`✗ sites/${site}/brand.config.ts is missing`)
      process.exitCode = 1
      continue
    }
    const { changed, removed } = await syncSite(templateDir, siteDir, { check })
    if (changed.length || removed.length) drift = true
    console.log(`${site}: ${changed.length} ${check ? "out of date" : "updated"}, ${removed.length} ${check ? "stale" : "removed"}`)
    if (check) {
      for (const f of changed) console.log(`  ~ ${f}`)
      for (const f of removed) console.log(`  - ${f}`)
    }
  }

  if (check && drift) {
    console.error("\nSites have drifted from template/. Run `pnpm sync`.")
    process.exitCode = 1
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) await main()
