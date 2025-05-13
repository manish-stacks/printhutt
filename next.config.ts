import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = withPWA({
  dest: "public",
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
})({
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },{
        protocol: "https",
        hostname: "s3.ap-south-1.amazonaws.com",
      }
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});

export default nextConfig