import { db } from "@/db/db"
import { donations } from "@/db/schema"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    console.log("Received donation data:", body)
    const newDonation = await db
      .insert(donations)
      .values({
        title: body.title,
        description: body.description,
        category: body.category,
        location: body.location,
        imageUrls: body.imageUrls,
        donorName: body.donorName,
        donorEmail: body.donorEmail,
        donorPhone: body.donorPhone,
        donorId: body.donorId,
        status: "available",
      })
      .returning()

    return NextResponse.json(newDonation[0])
  } catch (error) {
    console.error("Failed to create donation:", error)
    return NextResponse.json(
      { error: "Failed to create donation" },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const allDonations = await db.select().from(donations)
    return NextResponse.json(allDonations)
  } catch (error) {
    console.error("Failed to fetch donations:", error)
    return NextResponse.json(
      { error: "Failed to fetch donations" },
      { status: 500 }
    )
  }
}
