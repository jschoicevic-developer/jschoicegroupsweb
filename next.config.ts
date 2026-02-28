import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  trailingSlash: false,
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
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob: https://www.googletagmanager.com; font-src 'self' data:; connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net; frame-src https://www.google.com https://maps.google.com https://www.googletagmanager.com;" }
        ],
      }
    ];
  },
  async redirects() {
    return [
      {
        source: '/services/daily-life',
        destination: '/assistance-with-daily-life',
        permanent: true,
      },
      {
        source: '/services/group-centre',
        destination: '/group-centre-activities',
        permanent: true,
      },
      {
        source: '/services/emergency-respite',
        destination: '/emergency-respite',
        permanent: true,
      },
      {
        source: '/services/transportation',
        destination: '/transportation-assistance',
        permanent: true,
      },
      {
        source: '/services/recovery-coaching',
        destination: '/psychosocial-recovery-coach',
        permanent: true,
      },
      {
        source: '/services/nursing-care',
        destination: '/assistance-with-nursing-care',
        permanent: true,
      },
      {
        source: '/services/community-activities',
        destination: '/access-to-community-activities',
        permanent: true,
      },
      {
        source: '/services/allied-health',
        destination: '/allied-health-services',
        permanent: true,
      }
    ];
  }
};

export default nextConfig;
