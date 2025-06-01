import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  env: {
    NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
  }
};

export default nextConfig;
