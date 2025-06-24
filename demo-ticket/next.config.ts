import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://intranet.cennext.com/api/:path*',
      },
      {
        source: '/api/chat/:path*',
        destination: 'https://n8n.cennos.intranet/webhook/:path*'
      }
    ];
  },
};

export default nextConfig;
