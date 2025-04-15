import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  // stops Next.js image optimization + static export conflict 
  images: {
    unoptimized: true, 
  },
};

export default nextConfig;
