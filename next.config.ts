import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  images: {
    domains: ["localhost", "9fDeOMRF8RcfTt1w.public.blob.vercel-storage.com"],
    remotePatterns: [
      { hostname: "9fDeOMRF8RcfTt1w.public.blob.vercel-storage.com" },
    ]
  }
};

export default nextConfig;
