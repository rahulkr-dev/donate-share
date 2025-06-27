import { Suspense } from "react"
import { desc } from "drizzle-orm"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Clock, User, Heart, Eye } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { db } from "@/db/db"
import { donations } from "@/db/schema"
// Define the Donation type based on the actual database schema
type Donation = {
  id: string
  title: string
  description: string
  category: string
  location: string
  imageUrls: string[]
  donorId: string
  donorName: string
  donorEmail: string
  donorPhone: string | null
  status: string | null
  createdAt: Date | null
  updatedAt: Date | null
}

async function getDonations() {
  try {
    const allDonations = await db
      .select()
      .from(donations)
      .orderBy(desc(donations.createdAt))
    return allDonations
  } catch (error) {
    console.error("Failed to fetch donations:", error)
    return []
  }
}

function DonationCard({ donation }: { donation: Donation }) {
  const primaryImage = donation.imageUrls?.[0] || "/placeholder.svg"
  const imageCount = donation.imageUrls?.length || 0
  const createdAt = donation.createdAt
    ? new Date(donation.createdAt)
    : new Date()

  return (
    <Link href={`/items/${donation.id}`} className="group">
      <Card className="h-full transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-border bg-card">
        <div className="aspect-video relative overflow-hidden rounded-t-lg">
          <Image
            src={primaryImage}
            alt={donation.title}
            fill
            className="object-cover transition-transform duration-200 group-hover:scale-105"
          />
          {imageCount > 1 && (
            <div className="absolute top-2 right-2 bg-background/80 backdrop-blur-sm text-foreground px-2 py-1 rounded-md text-xs font-medium">
              +{imageCount - 1} more
            </div>
          )}
          <Badge
            variant={donation.status === "available" ? "default" : "secondary"}
            className="absolute top-2 left-2"
          >
            {donation.status || "Available"}
          </Badge>
        </div>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-start gap-2">
            <CardTitle className="text-lg line-clamp-2 text-foreground group-hover:text-primary transition-colors">
              {donation.title}
            </CardTitle>
            <Badge variant="outline" className="shrink-0">
              {donation.category}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <CardDescription className="line-clamp-2 text-muted-foreground">
            {donation.description}
          </CardDescription>

          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              <span className="truncate">{donation.location}</span>
            </div>
            <div className="flex items-center gap-1 shrink-0">
              <Clock className="h-4 w-4" />
              <span>{createdAt.toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground truncate">
                {donation.donorName}
              </span>
            </div>
            <div className="flex items-center gap-1 text-primary">
              <Heart className="h-4 w-4" />
              <Eye className="h-4 w-4" />
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

function DonationsGrid({ donations }: { donations: Donation[] }) {
  if (donations.length === 0) {
    return (
      <div className="text-center py-16 space-y-4">
        <div className="w-20 h-20 mx-auto bg-muted rounded-full flex items-center justify-center">
          <Heart className="w-10 h-10 text-muted-foreground" />
        </div>
        <div className="space-y-2">
          <h3 className="text-xl font-semibold text-foreground">
            No donations available yet
          </h3>
          <p className="text-muted-foreground max-w-md mx-auto">
            Be the first to share something wonderful with your community and
            make a difference!
          </p>
        </div>
        <Link href="/donate">
          <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">
            <Heart className="w-4 h-4" />
            Post a Donation
          </div>
        </Link>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between mb-6">
        <div className="text-sm text-muted-foreground">
          {donations.length} {donations.length === 1 ? "item" : "items"}{" "}
          available
        </div>
        <div className="flex gap-2">
          {/* Add filter/sort options here in the future */}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {donations.map((donation) => (
          <DonationCard key={donation.id} donation={donation} />
        ))}
      </div>
    </>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-4 w-24 bg-muted animate-pulse rounded" />
        <div className="h-4 w-32 bg-muted animate-pulse rounded" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(8)].map((_, i) => (
          <Card key={i} className="h-full overflow-hidden">
            <div className="aspect-video bg-muted animate-pulse" />
            <CardHeader className="space-y-2">
              <div className="flex justify-between items-start gap-2">
                <div className="space-y-2 flex-1">
                  <div className="h-5 bg-muted animate-pulse rounded" />
                  <div className="h-5 bg-muted animate-pulse rounded w-3/4" />
                </div>
                <div className="h-6 w-16 bg-muted animate-pulse rounded-full" />
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="h-4 bg-muted animate-pulse rounded" />
                <div className="h-4 bg-muted animate-pulse rounded w-5/6" />
              </div>
              <div className="flex justify-between items-center">
                <div className="h-4 w-20 bg-muted animate-pulse rounded" />
                <div className="h-4 w-16 bg-muted animate-pulse rounded" />
              </div>
              <div className="flex justify-between items-center pt-2">
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                <div className="flex gap-2">
                  <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                  <div className="h-4 w-4 bg-muted animate-pulse rounded" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default async function ItemsPage() {
  const donations = await getDonations()

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h1 className="text-4xl font-bold text-foreground">
              Available Donations
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover amazing items shared by community members. Click on any
              item to learn more and connect with the donor.
            </p>
          </div>

          {/* Quick Stats */}
          <div className="flex justify-center gap-8 pt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {donations.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Items Available
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {new Set(donations.map((d) => d.donorId)).size}
              </div>
              <div className="text-sm text-muted-foreground">Active Donors</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">
                {new Set(donations.map((d) => d.category)).size}
              </div>
              <div className="text-sm text-muted-foreground">Categories</div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Suspense fallback={<LoadingSkeleton />}>
          <DonationsGrid donations={donations} />
        </Suspense>

        {/* Call to Action */}
        {donations.length > 0 && (
          <div className="text-center py-8">
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-foreground">
                Want to contribute?
              </h3>
              <p className="text-muted-foreground">
                Join our community of generous donors and share items you no
                longer need.
              </p>
              <Link href="/donate">
                <div className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-medium">
                  <Heart className="w-4 h-4" />
                  Post a Donation
                </div>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
