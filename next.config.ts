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
        hostname: '*.supabase.co',
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
          { key: 'Content-Security-Policy', value: "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://*.clarity.ms https://connect.facebook.net; script-src-elem 'self' 'unsafe-inline' https://www.googletagmanager.com https://googleads.g.doubleclick.net https://www.googleadservices.com https://*.clarity.ms https://connect.facebook.net; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob: https://www.googletagmanager.com; font-src 'self' data:; connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://analytics.google.com https://*.doubleclick.net https://www.googleadservices.com https://www.google.com https://www.google.com.pk https://*.clarity.ms https://www.facebook.com https://connect.facebook.net; frame-src https://www.google.com https://maps.google.com https://www.googletagmanager.com;" }
        ],
      }
    ];
  },
  async rewrites() {
    return [
      // Meta webhook: /admin/facebook-leads → /api/facebook-leads/webhook
      {
        source: '/admin/facebook-leads',
        has: [{ type: 'query', key: 'hub.mode' }],
        destination: '/api/facebook-leads/webhook',
      },
      {
        source: '/admin/facebook-leads',
        has: [{ type: 'header', key: 'x-hub-signature-256' }],
        destination: '/api/facebook-leads/webhook',
      },
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
      },
      {
        source: '/service-matcher',
        destination: '/tools/service-matcher',
        permanent: true,
      },
      {
        source: '/ndis-price-guide',
        destination: '/tools/ndis-price-guide',
        permanent: true,
      },
      {
        source: '/ndis-budget-calculator',
        destination: '/tools/ndis-budget-calculator',
        permanent: true,
      },
      {
        source: '/consultations',
        destination: '/referral',
        permanent: true,
      },
      {
        source: '/consultations/:path*',
        destination: '/referral/:path*',
        permanent: true,
      }
    ];
  }
};

export default nextConfig;
//