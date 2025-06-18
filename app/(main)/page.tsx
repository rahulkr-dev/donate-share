import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Heart, Users, Recycle, Shield, ArrowRight, Sparkles } from "lucide-react"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary/5 via-background to-accent/10 py-24 sm:py-32">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2 text-sm font-medium">
              <Sparkles className="w-4 h-4 mr-2" />
              Connecting Communities Through Giving
            </Badge>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-6 tracking-tight">
              Share. Care. <br />
              <span className="text-primary">Make a Difference</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
              Connect with your community through our donation exchange platform. Give items a second life while helping
              those in need and building stronger neighborhoods.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/items">
                <Button size="lg" className="w-full sm:w-auto group">
                  Browse Donations
                  <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
              <Link href="/donate">
                <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary">
                  Donate Items
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-4">
              How It Works
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Simple Steps to Share & Care
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform makes it effortless to give and receive donations while building meaningful connections
              in your community
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border bg-card">
              <CardHeader className="pb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-chart-1/10 rounded-full blur-xl" />
                  <Heart className="relative h-12 w-12 text-chart-1 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                </div>
                <CardTitle className="text-foreground">Easy Donations</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Post items you no longer need with just a few clicks. Include photos and descriptions to help others
                  find what they need.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border bg-card">
              <CardHeader className="pb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-chart-2/10 rounded-full blur-xl" />
                  <Users className="relative h-12 w-12 text-chart-2 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                </div>
                <CardTitle className="text-foreground">Community Focused</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Connect directly with people in your area. Build lasting relationships while helping your neighbors
                  and strengthening bonds.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border bg-card">
              <CardHeader className="pb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-chart-3/10 rounded-full blur-xl" />
                  <Recycle className="relative h-12 w-12 text-chart-3 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                </div>
                <CardTitle className="text-foreground">Eco-Friendly</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Reduce waste by giving items a second life. Help create a more sustainable community and protect
                  our environment.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border bg-card">
              <CardHeader className="pb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-chart-4/10 rounded-full blur-xl" />
                  <Shield className="relative h-12 w-12 text-chart-4 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                </div>
                <CardTitle className="text-foreground">Safe & Secure</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">
                  Verified users and secure messaging ensure safe exchanges within your community with complete peace
                  of mind.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:radial-gradient(ellipse_at_center,white,transparent)] dark:bg-grid-slate-700/25" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Badge variant="secondary" className="mb-6">
            Join Our Community
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Ready to Make a Difference?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
            Join thousands of community members who are already sharing and caring through DonateShare. 
            Start your journey of giving today and experience the joy of helping others.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signup">
              <Button size="lg" className="w-full sm:w-auto group shadow-lg">
                Get Started Today
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="w-full sm:w-auto border-2 hover:bg-secondary hover:text-secondary-foreground">
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
