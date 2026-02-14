import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'jschoicegroup.com.au',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'browkzylcbkgaoacijqm.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'jschoicegroup.com.au',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
