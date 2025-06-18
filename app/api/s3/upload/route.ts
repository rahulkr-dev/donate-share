import { NextResponse } from "next/server"
import { nanoid } from "nanoid"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { S3 } from "@/lib/S3Client"
import { z } from "zod"

const uploeadRequestSchema = z.object({
  filename: z.string(),
  contentType: z.string(),
  size: z.number(),
})

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const validation = uploeadRequestSchema.safeParse(body)

    if (!validation.success) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      )
    }

    const { filename, contentType, size } = validation.data

    const uniqueKey = `${nanoid()}-${filename}`

    const command = new PutObjectCommand({
      Bucket: process.env.S3_BUCKET,
      Key: uniqueKey,
      ContentType: contentType,
      ContentLength: size,
    })

    const presignedUrl = await getSignedUrl(S3, command, {
      expiresIn: 360, // URL expires in 6 minutes
    })

    const response = {
      presignedUrl,
      key: uniqueKey,
      publicUrl: `https://${process.env.S3_BUCKET}.fly.storage.tigris.dev/${uniqueKey}`,
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error("Error generating presigned URL:", error)
    return NextResponse.json(
      { error: "Failed to generate upload URL" },
      { status: 500 }
    )
  }
}
