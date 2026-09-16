import type { Metadata } from "next"
import { Figtree, Fraunces, Geist_Mono } from "next/font/google"

import "./globals.css"

const figtree = Figtree({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
})

const fraunces = Fraunces({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Opstart — hoe we communiceren",
  description:
    "Kleine kickoff voor Fleur: taal, kanalen, tempo, keuzes en feedback. Een levend document dat je kunt bijstellen.",
}

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="nl"
      className={`${figtree.variable} ${fraunces.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
