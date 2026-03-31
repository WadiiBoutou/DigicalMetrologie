import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Next.js 16 refuses to optimize remote images when DNS resolves to addresses
     * it classifies as “local” (e.g. NAT64 / IPv6-mapped CDN IPs). Manutan CDN can
     * hit this in dev; enable only for trusted hosts in `remotePatterns`.
     */
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "images.pexels.com",
      },
      {
        protocol: "https",
        hostname: "www.manutan.fr",
      },
      {
        protocol: "https",
        hostname: "www.manutan.co.uk",
      },
    ],
  },
};

export default nextConfig;
