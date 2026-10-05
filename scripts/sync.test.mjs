import assert from "node:assert/strict"
import { existsSync } from "node:fs"
import { mkdir, mkdtemp, readFile, writeFile } from "node:fs/promises"
import os from "node:os"
import path from "node:path"
import { test } from "node:test"
import { isBrandOwned, syncSite } from "./sync.mjs"

async function put(root, rel, content) {
  const file = path.join(root, rel)
  await mkdir(path.dirname(file), { recursive: true })
  await writeFile(file, content)
}

async function fixture() {
  const dir = await mkdtemp(path.join(os.tmpdir(), "sync-"))
  const t = path.join(dir, "template")
  const s = path.join(dir, "site")
  await put(t, "app/page.tsx", "new page")
  await put(t, "lib/new.ts", "new lib")
  await put(t, "brand.config.ts", "TEMPLATE BRAND")
  await put(t, "public/brand/mark.svg", "template mark")
  await put(t, "node_modules/x/index.js", "template dep")
  await put(t, ".next/cache/t", "template build")
  await put(t, "next-env.d.ts", "generated")
  await put(s, "app/page.tsx", "old page")
  await put(s, "app/stale.tsx", "stale")
  await put(s, "brand.config.ts", "SITE BRAND")
  await put(s, "public/brand/mark.svg", "site mark")
  await put(s, "public/brand/photos/hero.jpg", "site hero")
  await put(s, ".env.local", "SECRET=1")
  await put(s, "railway.json", "{}")
  await put(s, "node_modules/y/index.js", "site dep")
  await put(s, ".next/cache/a", "site build")
  return { t, s }
}

const read = (root, rel) => readFile(path.join(root, rel), "utf8")

test("check mode reports drift without writing anything", async () => {
  const { t, s } = await fixture()
  const result = await syncSite(t, s, { check: true })
  assert.deepEqual(result.changed.sort(), ["app/page.tsx", "lib/new.ts"])
  assert.deepEqual(result.removed, ["app/stale.tsx"])
  assert.equal(await read(s, "app/page.tsx"), "old page")
  assert.ok(existsSync(path.join(s, "app/stale.tsx")))
  assert.ok(!existsSync(path.join(s, "lib/new.ts")))
})

test("sync copies template files and removes stale synced files", async () => {
  const { t, s } = await fixture()
  await syncSite(t, s)
  assert.equal(await read(s, "app/page.tsx"), "new page")
  assert.equal(await read(s, "lib/new.ts"), "new lib")
  assert.ok(!existsSync(path.join(s, "app/stale.tsx")))
})

test("sync never touches brand-owned files, dependencies, or build output", async () => {
  const { t, s } = await fixture()
  await syncSite(t, s)
  assert.equal(await read(s, "brand.config.ts"), "SITE BRAND")
  assert.equal(await read(s, "public/brand/mark.svg"), "site mark")
  assert.equal(await read(s, "public/brand/photos/hero.jpg"), "site hero")
  assert.equal(await read(s, ".env.local"), "SECRET=1")
  assert.equal(await read(s, "railway.json"), "{}")
  assert.equal(await read(s, "node_modules/y/index.js"), "site dep")
  assert.equal(await read(s, ".next/cache/a"), "site build")
  assert.ok(!existsSync(path.join(s, "node_modules/x")))
  assert.ok(!existsSync(path.join(s, ".next/cache/t")))
  assert.ok(!existsSync(path.join(s, "next-env.d.ts")))
})

test("a freshly synced site reports no drift", async () => {
  const { t, s } = await fixture()
  await syncSite(t, s)
  assert.deepEqual(await syncSite(t, s, { check: true }), { changed: [], removed: [] })
})

test("isBrandOwned handles both path separators", () => {
  assert.equal(isBrandOwned("public\\brand\\mark.svg"), true)
  assert.equal(isBrandOwned("public/brand/photos/hero.jpg"), true)
  assert.equal(isBrandOwned(".env.production"), true)
  assert.equal(isBrandOwned("railway.json"), true)
  assert.equal(isBrandOwned("brand.config.ts"), true)
  assert.equal(isBrandOwned("public/photos/products/cane.jpg"), false)
  assert.equal(isBrandOwned("app/page.tsx"), false)
})
