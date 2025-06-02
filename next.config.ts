import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  images: {
    domains: ["localhost", "waifu-metaverse-web.vercel.app"],
    remotePatterns: [
      { hostname: "public.blob.vercel-storage.com" },
    ]
  }
};

export default nextConfig;
