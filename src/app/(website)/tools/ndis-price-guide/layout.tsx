import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Price Guide | JS Choice Care & Support",
    description: "Discover NDIS Price Guide services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-price-guide' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
