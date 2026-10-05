import { ImageResponse } from "next/og"
import brand from "@/brand.config"
import { readableOn } from "@/lib/brand"

export const alt = brand.name
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpengraphImage() {
  const fg = readableOn(brand.colors.primary)
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background: brand.colors.primary,
          color: fg,
        }}
      >
        <div style={{ display: "flex", fontSize: 34, opacity: 0.85 }}>Medical equipment, covered by insurance</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, fontWeight: 700, lineHeight: 1 }}>{brand.name}</div>
          <div style={{ display: "flex", fontSize: 38, marginTop: 28, maxWidth: 960 }}>{brand.tagline}</div>
        </div>
        <div style={{ display: "flex", width: 120, height: 10, borderRadius: 5, background: brand.colors.accent }} />
      </div>
    ),
    size,
  )
}
