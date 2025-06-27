import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Heart, Users, Recycle, Shield, Mail, MapPin, Sparkles, ArrowRight, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 sm:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />
          <div className="relative text-center">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              About Our Mission
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6 tracking-tight">
              About <span className="text-primary">DonateShare</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Building stronger communities through the power of sharing and caring. Our platform connects neighbors 
              to reduce waste and help those in need while fostering meaningful relationships.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16">
          <Card className="border-border bg-card hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center pb-6">
              <Badge variant="outline" className="mb-4 w-fit mx-auto">
                Our Mission
              </Badge>
              <CardTitle className="text-3xl text-foreground">
                Connecting Communities Through Giving
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-muted-foreground leading-relaxed text-lg">
                {`DonateShare was created with a simple belief: every item has value, and every act of giving 
                strengthens our community. We provide a platform where people can easily share items they no 
                longer need with those who can benefit from them.`}
              </p>
              <p className="text-muted-foreground leading-relaxed text-lg">
                {`By facilitating these connections, we're not just reducing waste – we're building relationships, 
                fostering generosity, and creating a more sustainable way of living together.`}
              </p>
              <div className="flex justify-center pt-4">
                <Link href="/donate">
                  <Button className="group">
                    Start Sharing Today
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Values Section */}
        <section className="py-16">
          <div className="text-center mb-12">
            <Badge variant="outline" className="mb-4">
              Our Values
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              What Drives Us Forward
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              These core values guide everything we do and shape how we build our community
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border bg-card">
              <CardHeader className="pb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-chart-1/10 rounded-full blur-xl" />
                  <Heart className="relative h-10 w-10 text-chart-1 mb-4 group-hover:scale-110 transition-transform" />
                </div>
                <CardTitle className="text-foreground">Community First</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  {`We believe in the power of community. Every donation, no matter how small, makes a difference in
                  someone's life and strengthens the bonds between neighbors.`}
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border bg-card">
              <CardHeader className="pb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-chart-3/10 rounded-full blur-xl" />
                  <Recycle className="relative h-10 w-10 text-chart-3 mb-4 group-hover:scale-110 transition-transform" />
                </div>
                <CardTitle className="text-foreground">Sustainability</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  By giving items a second life, we reduce waste and promote sustainable living. Every item shared 
                  is one less item in a landfill.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border bg-card">
              <CardHeader className="pb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-chart-2/10 rounded-full blur-xl" />
                  <Users className="relative h-10 w-10 text-chart-2 mb-4 group-hover:scale-110 transition-transform" />
                </div>
                <CardTitle className="text-foreground">Accessibility</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  Our platform is designed to be simple and accessible to everyone, regardless of technical 
                  expertise or economic background.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-105 border-border bg-card">
              <CardHeader className="pb-4">
                <div className="relative">
                  <div className="absolute inset-0 bg-chart-4/10 rounded-full blur-xl" />
                  <Shield className="relative h-10 w-10 text-chart-4 mb-4 group-hover:scale-110 transition-transform" />
                </div>
                <CardTitle className="text-foreground">Trust & Safety</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed">
                  We prioritize the safety and security of our community members through verification processes 
                  and secure communication channels.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16">
          <Card className="border-border bg-card hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center pb-8">
              <Badge variant="outline" className="mb-4 w-fit mx-auto">
                Simple Process
              </Badge>
              <CardTitle className="text-3xl text-foreground mb-4">How It Works</CardTitle>
              <CardDescription className="text-lg text-muted-foreground">
                Getting started is easy and free - join our community in just four simple steps
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-8 md:grid-cols-2">
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary font-bold text-lg">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 text-chart-1 mr-2" />
                      Sign Up
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Create your free account to start sharing and receiving donations in your local community.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary font-bold text-lg">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 text-chart-2 mr-2" />
                      Post or Browse
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Share items you no longer need or browse available donations in your area with detailed photos.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary font-bold text-lg">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 text-chart-3 mr-2" />
                      Connect
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Contact donors directly through our secure messaging system to coordinate details.
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                    <span className="text-primary font-bold text-lg">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2 flex items-center">
                      <CheckCircle className="w-5 h-5 text-chart-4 mr-2" />
                      Arrange Pickup
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Coordinate a convenient time and place for item exchange that works for everyone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center pt-8 mt-8 border-t border-border">
                <Link href="/auth/signup">
                  <Button size="lg" className="group">
                    Get Started Now
                    <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Contact Section */}
        <section className="py-16">
          <Card className="border-border bg-card hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="text-center pb-8">
              <Badge variant="outline" className="mb-4 w-fit mx-auto">
                Get in Touch
              </Badge>
              <CardTitle className="text-3xl text-foreground mb-4">
                {`We're Here to Help`}
              </CardTitle>
              <CardDescription className="text-lg text-muted-foreground max-w-2xl mx-auto">
                {`Have questions, suggestions, or need support? We'd love to hear from you and help 
                build a stronger community together.`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-8">
                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-chart-1/10 rounded-full flex items-center justify-center group-hover:bg-chart-1/20 transition-colors">
                    <Mail className="h-6 w-6 text-chart-1" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">Email Us</h3>
                    <p className="text-muted-foreground mb-2">support@donateshare.com</p>
                    <p className="text-sm text-muted-foreground">
                      We typically respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4 group">
                  <div className="flex-shrink-0 w-12 h-12 bg-chart-2/10 rounded-full flex items-center justify-center group-hover:bg-chart-2/20 transition-colors">
                    <MapPin className="h-6 w-6 text-chart-2" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground text-lg mb-2">Community</h3>
                    <p className="text-muted-foreground mb-2">
                      Serving communities nationwide
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Building connections one donation at a time
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center pt-8 mt-8 border-t border-border">
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/items">
                    <Button variant="outline" size="lg" className="group hover:bg-accent">
                      Browse Donations
                      <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </Link>
                  <Link href="/donate">
                    <Button size="lg" className="group">
                      Start Donating
                      <Heart className="ml-2 w-4 h-4 transition-transform group-hover:scale-110" />
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
