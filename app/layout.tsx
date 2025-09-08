import type React from "react"
import type { Metadata } from "next"
import { Work_Sans } from "next/font/google"
import { Open_Sans } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import "./globals.css"

const workSans = Work_Sans({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-work-sans",
})

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  variable: "--font-open-sans",
})

export const metadata: Metadata = {
  title: "P&S Med Services - Your Partner in Health",
  description:
    "P&S Med Services provides quality durable medical equipment (DME) to elderly and disabled patients. We handle insurance billing and deliver directly to your home.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${workSans.variable} ${openSans.variable}`}>
        <Suspense fallback={null}>{children}</Suspense>
        <Analytics />
      </body>
    </html>
  )
}
