import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Remove turbo config as it's causing TypeScript errors
  // The Turbopack warning can be safely ignored or fix the project structure
};

export default nextConfig;