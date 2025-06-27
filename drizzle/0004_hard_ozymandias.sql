ALTER TABLE "donations" ADD COLUMN "image_urls" jsonb NOT NULL;--> statement-breakpoint
ALTER TABLE "donations" DROP COLUMN "image_url";