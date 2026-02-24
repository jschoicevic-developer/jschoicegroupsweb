import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Ads | JS Choice Care & Support",
    description: "Discover Ads services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/ads' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
