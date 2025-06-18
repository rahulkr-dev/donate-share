import type { NextConfig } from "next"

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
    ],
  },
}

export default nextConfig
