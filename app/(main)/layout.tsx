import type React from "react"
import { Navigation } from "@/components/navigation"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <main>
      <Navigation />

      {children}
    </main>
  )
}
