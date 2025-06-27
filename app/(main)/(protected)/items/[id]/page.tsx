import { notFound } from "next/navigation"
import { db } from "@/db/db"
import { donations } from "@/db/schema"
import { eq } from "drizzle-orm"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  MapPin,
  Clock,
  Mail,
  Phone,
  ArrowLeft,
  User,
  Heart,
  Share2,
} from "lucide-react"
import Link from "next/link"
import { ImageGalleryClient } from "./image-gallery-client"

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

async function getDonation(id: string): Promise<Donation | null> {
  try {
    const donation = await db
      .select()
      .from(donations)
      .where(eq(donations.id, id))
      .limit(1)

    const donationData = donation[0]
    return donationData || null
  } catch (error) {
    console.error("Failed to fetch donation:", error)
    return null
  }
}

interface DonationDetailPageProps {
  params: Promise<{ id: string }>
}

export default async function DonationDetailPage({
  params,
}: DonationDetailPageProps) {
  const donation = await getDonation((await params).id)

  if (!donation) {
    notFound()
  }

  const createdAt = donation.createdAt
    ? new Date(donation.createdAt)
    : new Date()
  const emailSubject = encodeURIComponent(`Interest in: ${donation.title}`)
  const emailBody = encodeURIComponent(
    `Hi ${donation.donorName},\n\nI'm interested in your donation: ${donation.title}.\n\nCould we arrange a time to discuss pickup details?\n\nThank you!`
  )

  const statusColor =
    donation.status === "available"
      ? "bg-chart-3/10 text-chart-3 border-chart-3/20"
      : "bg-muted text-muted-foreground border-border"

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Navigation */}
        <div className="mb-6">
          <Link href="/items">
            <Button variant="outline" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Items
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Section */}
          <div>
            <ImageGalleryClient
              images={donation.imageUrls}
              title={donation.title}
            />
          </div>

          {/* Details Section */}
          <div className="space-y-6">
            {/* Header */}
            <div className="space-y-4">
              <div className="flex items-start justify-between gap-4">
                <h1 className="text-3xl font-bold text-foreground leading-tight">
                  {donation.title}
                </h1>
                <div className="flex gap-2">
                  <Badge variant="outline">{donation.category}</Badge>
                  <Button variant="outline" size="icon">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  <span>{donation.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>Posted {createdAt.toLocaleDateString()}</span>
                </div>
              </div>

              {/* Status Badge */}
              <div
                className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg border ${statusColor}`}
              >
                <Heart className="w-4 h-4" />
                <span className="font-medium capitalize">
                  {donation.status || "Available"}
                </span>
              </div>
            </div>

            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                  {donation.description}
                </p>
              </CardContent>
            </Card>

            {/* Donor Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5" />
                  Contact Donor
                </CardTitle>
                <CardDescription>
                  Get in touch with {donation.donorName} to arrange pickup
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <span className="font-medium text-foreground">Donor:</span>
                  <span className="text-foreground">{donation.donorName}</span>
                </div>

                <div className="space-y-3">
                  <a
                    href={`mailto:${donation.donorEmail}?subject=${emailSubject}&body=${emailBody}`}
                    className="block"
                  >
                    <Button className="w-full gap-2">
                      <Mail className="h-4 w-4" />
                      Send Email
                    </Button>
                  </a>

                  {donation.donorPhone && (
                    <a href={`tel:${donation.donorPhone}`} className="block">
                      <Button variant="outline" className="w-full gap-2">
                        <Phone className="w-4 h-4" />
                        Call {donation.donorPhone}
                      </Button>
                    </a>
                  )}
                </div>

                <div className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                  <strong className="text-foreground">
                    Pickup Information:
                  </strong>{" "}
                  Please coordinate directly with the donor to arrange a
                  convenient pickup time and location.
                </div>
              </CardContent>
            </Card>

            {/* Additional Actions */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 gap-2">
                <Heart className="w-4 h-4" />
                Save Item
              </Button>
              <Button variant="outline" className="flex-1 gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* Similar Items Section */}
        <div className="mt-12 pt-8 border-t border-border">
          <h2 className="text-2xl font-bold text-foreground mb-6">
            More from this category
          </h2>
          <div className="text-center py-8 text-muted-foreground">
            <p>Similar items will be shown here in the future</p>
          </div>
        </div>
      </div>
    </div>
  )
}
