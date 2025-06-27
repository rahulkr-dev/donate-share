import type { NextConfig } from "next"

// https://source.unsplash.com/600x400/?art,supplies

// ["https://burst.shopifycdn.com/photos/yellow-couch-by-black-and-white-mural_925x.jpg","https://burst.shopifycdn.com/photos/house-plant-in-white-pot_925x.jpg","https://burst.shopifycdn.com/photos/condominium-interior-livingroom_925x.jpg"]

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      // new URL("wappify.fly.storage.tigris.dev")
      {
        protocol: "https",
        hostname: "wappify.fly.storage.tigris.dev",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "burst.shopifycdn.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
}

export default nextConfig
