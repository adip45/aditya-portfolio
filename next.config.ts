import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  // The site is fully static — no image domains, no remote assets.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
