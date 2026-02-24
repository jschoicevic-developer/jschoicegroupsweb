import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Providers Laverton | JS Choice Care & Support",
    description: "Discover NDIS Providers Laverton services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-providers-laverton' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
