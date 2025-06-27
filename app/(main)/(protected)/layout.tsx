import { ProtectedWrapper } from "@/components/wrapper"
import type React from "react"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ProtectedWrapper>{children}</ProtectedWrapper>
}
