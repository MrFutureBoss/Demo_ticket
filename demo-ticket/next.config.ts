import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://intranet.cennext.com/api/:path*',
      },
    ];
  },
};

export default nextConfig;
