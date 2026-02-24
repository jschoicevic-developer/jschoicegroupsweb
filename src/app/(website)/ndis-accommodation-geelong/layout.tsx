import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Accommodation Geelong | JS Choice Care & Support",
    description: "Discover NDIS Accommodation Geelong services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-accommodation-geelong' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
