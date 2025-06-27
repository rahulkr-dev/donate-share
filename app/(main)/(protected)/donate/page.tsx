"use client"

import * as z from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ImageUpload } from "@/components/image-upload"

import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import { toast } from "sonner"
import { Gift, Sparkles, User, Mail, MapPin, Heart } from "lucide-react"
import { useMutation } from "@tanstack/react-query"

const donationSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .max(255, "Title must be less than 255 characters"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description must be less than 1000 characters"),
  category: z.string().min(1, "Category is required"),
  location: z
    .string()
    .min(1, "Location is required")
    .max(255, "Location must be less than 255 characters"),
  donorName: z
    .string()
    .min(1, "Your name is required")
    .max(255, "Name must be less than 255 characters"),
  donorEmail: z.string().email("Please enter a valid email address"),
  donorPhone: z.string().optional(),
  donorId: z.string().optional(),
  imageUrls: z.string().array().min(1, "At least one image is required"),
})

export type DonationFormData = z.infer<typeof donationSchema>
export type Donation = DonationFormData & {
  id: string
  imageUrls: string[]
  status: string | null
  createdAt: Date | null
  updatedAt: Date | null
}

const categories = [
  "Clothing",
  "Books",
  "Furniture",
  "Electronics",
  "Toys",
  "Kitchen",
  "Sports",
  "Home Decor",
  "Other",
]

const createDonation = async (data: DonationFormData) => {
  const response = await fetch("/api/donations", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error("Failed to create donation")
  }

  return response.json()
}

export default function DonatePage() {
  const router = useRouter()
  const { data: session } = authClient.useSession()

  const form = useForm<DonationFormData>({
    resolver: zodResolver(donationSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      location: "",
      donorName: session?.user?.name || "",
      donorEmail: session?.user?.email || "",
      donorPhone: "",
      donorId: session?.user?.id || "",
      imageUrls: [],
    },
  })

  const createDonationMutation = useMutation({
    mutationFn: createDonation,
    onSuccess: (result) => {
      toast.success("Donation posted successfully!", {
        description: "Thank you for your generosity!",
      })
      router.push(`/items/${result.id}`)
    },
    onError: (error) => {
      console.error(error)
      toast.error("Failed to post donation", {
        description: "Please try again later.",
      })
    },
  })

  const onSubmit = (data: DonationFormData) => {
    createDonationMutation.mutate(data)
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 sm:py-20">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/10" />
          <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] dark:bg-grid-slate-700/25 dark:[mask-image:linear-gradient(0deg,rgba(255,255,255,0.1),rgba(255,255,255,0.5))]" />

          <div className="relative text-center mb-12">
            <Badge variant="secondary" className="mb-6 px-4 py-2">
              <Gift className="w-4 h-4 mr-2" />
              Share Your Generosity
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6 tracking-tight">
              Post a <span className="text-primary">Donation</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Share items you no longer need with your community. Every donation
              makes a difference and helps build stronger neighborhood
              connections.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section className="pb-16">
          <Card className="border-border bg-card shadow-lg">
            <CardHeader className="pb-8">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <CardTitle className="text-2xl text-foreground">
                    Donation Details
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    Fill out the form below to share your item with the
                    community
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Title</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Vintage Leather Sofa"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Give your item a clear, descriptive title
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Describe the item's condition, size, color, and any other relevant details..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Provide detailed information to help potential
                          recipients
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Image Upload Section */}
                  <FormField
                    control={form.control}
                    name="imageUrls"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Item Images</FormLabel>
                        <FormControl>
                          <ImageUpload
                            value={field.value}
                            onChange={field.onChange}
                            maxFiles={3}
                            maxSize={500 * 1024} // 500KB
                          />
                        </FormControl>
                        <FormDescription>
                          {`Upload clear photos of your item to help recipients
                          understand what you're offering`}
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g., Downtown, City Center"
                              {...field}
                            />
                          </FormControl>
                          <FormDescription>
                            General area for pickup
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Contact Information Section */}
                  <div className="space-y-6 pt-6 border-t border-border">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-chart-2/10 flex items-center justify-center">
                        <User className="w-4 h-4 text-chart-2" />
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        Contact Information
                      </h3>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={form.control}
                        name="donorName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center space-x-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              <span>Your Name</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter your full name"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="donorEmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="flex items-center space-x-2">
                              <Mail className="w-4 h-4 text-muted-foreground" />
                              <span>Email Address</span>
                            </FormLabel>
                            <FormControl>
                              <Input
                                type="email"
                                placeholder="your@email.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="donorPhone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center space-x-2">
                            <MapPin className="w-4 h-4 text-muted-foreground" />
                            <span>Phone Number (Optional)</span>
                          </FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., +1-555-0123" {...field} />
                          </FormControl>
                          <FormDescription className="text-muted-foreground">
                            Provide a phone number for faster communication
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-4 pt-6 border-t border-border">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      className="order-2 sm:order-1"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      disabled={createDonationMutation.isPending}
                      className="order-1 sm:order-2 group"
                    >
                      {createDonationMutation.isPending ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                          Posting...
                        </>
                      ) : (
                        <>
                          <Heart className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                          Post Donation
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  )
}
