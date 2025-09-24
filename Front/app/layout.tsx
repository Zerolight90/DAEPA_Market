import type React from "react"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"

export const metadata = {
  title: "대파 - 신선한 중고거래",
  description: "믿을 수 있는 중고거래 플랫폼 대파에서 안전하고 편리하게 거래하세요",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={`${GeistSans.variable} ${GeistMono.variable} antialiased`}>
      <body className="font-sans">{children}</body>
    </html>
  )
}
