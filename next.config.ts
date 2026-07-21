import type { NextConfig } from "next";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || (process.env.NODE_ENV !== "production" ? "http://127.0.0.1:8000" : "");

const nextConfig: NextConfig = {
  async rewrites() {
    if (!BACKEND_URL) {
      return [];
    }

    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
