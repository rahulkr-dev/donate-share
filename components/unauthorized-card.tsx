import Link from "next/link"
import { Button } from "./ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card"
import { ArrowRight, User } from "lucide-react"

export function UnauthorizedCard() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <section className="relative overflow-hidden py-20 sm:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

          <div className="relative">
            <Card className="border-border bg-card hover:shadow-lg transition-shadow duration-300 max-w-md mx-auto">
              <CardHeader className="text-center pb-6">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <User className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl text-foreground">
                  Sign In Required
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  You need to be signed in to post a donation and help your
                  community.
                </CardDescription>
              </CardHeader>
              <CardContent className="text-center space-y-4">
                <Link href="/auth/signin">
                  <Button className="w-full group">
                    Sign In to Continue
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
                <p className="text-sm text-muted-foreground">
                  {`Don't have an account?`}
                  <Link
                    href="/auth/signup"
                    className="text-primary hover:underline font-medium"
                  >
                    Sign up here
                  </Link>
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}
