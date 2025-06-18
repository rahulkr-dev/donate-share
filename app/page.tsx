"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { authClient } from "@/lib/auth-client"
import { useRouter } from "next/navigation"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

export default function Home() {
  const data = authClient.useSession()
  const router = useRouter()

  const logout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push("/login")
        },
      },
    })
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6 p-4">
      Main Page
    </div>
  )
}
