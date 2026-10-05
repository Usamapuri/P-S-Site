import type { Metadata, Viewport } from "next"
import { Fraunces, Inter } from "next/font/google"
import type { CSSProperties, ReactNode } from "react"
import brand from "@/brand.config"
import { brandCssVars, findPlaceholders } from "@/lib/brand"
import "./globals.css"

const fraunces = Fraunces({ subsets: ["latin"], variable: "--font-fraunces", display: "swap" })
const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" })

const placeholders = findPlaceholders(brand)
if (placeholders.length > 0) {
  console.warn(
    `\n[brand:${brand.id}] ${placeholders.length} value(s) in brand.config.ts still need real content:\n  - ${placeholders.join("\n  - ")}\n`,
  )
}

const INIT_SCRIPT = `document.documentElement.classList.add("js");try{if(localStorage.getItem("text-size")==="large")document.documentElement.classList.add("text-lg-mode")}catch(e){}`

export const metadata: Metadata = {
  metadataBase: new URL(brand.seo.url),
  title: brand.seo.title,
  description: brand.seo.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: brand.name,
    title: brand.seo.title,
    description: brand.seo.description,
    locale: "en_US",
  },
  twitter: { card: "summary_large_image" },
  icons: { icon: "/brand/mark.svg" },
}

export const viewport: Viewport = { themeColor: brand.colors.primary }

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable}`}
      style={brandCssVars(brand) as CSSProperties}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: INIT_SCRIPT }} />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-lg focus:bg-surface focus:px-5 focus:py-3 focus:font-semibold focus:shadow-lg"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  )
}
