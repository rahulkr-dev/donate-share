"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Heart,
  Menu,
  Sparkles,
  Home,
  Package,
  Gift,
  Info,
  User,
  LogOut,
  Loader2,
} from "lucide-react"
import { useState } from "react"
import { authClient } from "@/lib/auth-client"
import { cn } from "@/lib/utils"

const navigationItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/items", label: "Browse Items", icon: Package },
  { href: "/donate", label: "Donate", icon: Gift },
  { href: "/about", label: "About", icon: Info },
]

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [isSigningOut, setIsSigningOut] = useState(false)
  const { data: session, isPending } = authClient.useSession()
  const pathname = usePathname()

  // Todo : use of tanstack query
  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)
      await authClient.signOut()
      setIsOpen(false)
    } catch (error) {
      console.error("Sign out error:", error)
    } finally {
      setIsSigningOut(false)
    }
  }

  const isActivePage = (href: string) => {
    if (href === "/") {
      return pathname === "/"
    }
    return pathname.startsWith(href)
  }

  return (
    <nav className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative">
                <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:blur-lg transition-all" />
                <Heart className="relative h-8 w-8 text-primary group-hover:scale-110 transition-transform" />
              </div>
              <span className="font-bold text-xl text-foreground group-hover:text-primary transition-colors">
                DonateShare
              </span>
              <Badge
                variant="secondary"
                className="hidden sm:inline-flex text-xs"
              >
                <Sparkles className="w-3 h-3 mr-1" />
                Beta
              </Badge>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  isActivePage(item.href)
                    ? "text-primary bg-primary/10 hover:bg-primary/15"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                {item.label}
              </Link>
            ))}

            <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-border">
              <ThemeToggle />

              {isPending ? (
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Loading...
                  </span>
                </div>
              ) : session?.user ? (
                <div className="flex items-center space-x-3">
                  <span className="text-sm text-muted-foreground">
                    Hello,{" "}
                    <span className="text-foreground font-medium">
                      {session.user.name}
                    </span>
                  </span>
                  <Button
                    onClick={handleSignOut}
                    variant="outline"
                    size="sm"
                    disabled={isSigningOut}
                  >
                    {isSigningOut ? (
                      <>
                        <Loader2 className="h-3 w-3 animate-spin mr-2" />
                        Signing Out...
                      </>
                    ) : (
                      "Sign Out"
                    )}
                  </Button>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="hover:bg-accent"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button size="sm" className="shadow-sm">
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-accent">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle navigation menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 sm:w-96">
                <SheetHeader className="text-left pb-4">
                  <SheetTitle className="flex items-center space-x-2">
                    <Heart className="h-6 w-6 text-primary" />
                    <span>DonateShare</span>
                    <Badge variant="secondary" className="text-xs">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Beta
                    </Badge>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex flex-col space-y-2 py-4">
                  {navigationItems.map((item) => {
                    const Icon = item.icon
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center space-x-3 px-3 py-3 text-base font-medium rounded-lg transition-colors",
                          isActivePage(item.href)
                            ? "text-primary bg-primary/10 hover:bg-primary/15"
                            : "text-muted-foreground hover:text-foreground hover:bg-accent"
                        )}
                      >
                        <Icon className="h-5 w-5" />
                        <span>{item.label}</span>
                      </Link>
                    )
                  })}
                </div>

                <div className="border-t border-border pt-6 mt-6">
                  {isPending ? (
                    <div className="flex items-center justify-center space-x-2 py-4">
                      <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        Loading profile...
                      </span>
                    </div>
                  ) : session?.user ? (
                    <div className="space-y-4">
                      <div className="flex items-center space-x-3 px-3 py-2 bg-accent/50 rounded-lg">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {session.user.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {session.user.email}
                          </p>
                        </div>
                      </div>
                      <Button
                        onClick={handleSignOut}
                        variant="outline"
                        size="sm"
                        disabled={isSigningOut}
                        className="w-full justify-start hover:bg-destructive hover:text-destructive-foreground"
                      >
                        {isSigningOut ? (
                          <>
                            <Loader2 className="h-4 w-4 animate-spin mr-2" />
                            Signing Out...
                          </>
                        ) : (
                          <>
                            <LogOut className="h-4 w-4 mr-2" />
                            Sign Out
                          </>
                        )}
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <Link href="/login" onClick={() => setIsOpen(false)}>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full justify-start"
                        >
                          <User className="h-4 w-4 mr-2" />
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/signup" onClick={() => setIsOpen(false)}>
                        <Button size="sm" className="w-full shadow-sm">
                          Get Started
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
