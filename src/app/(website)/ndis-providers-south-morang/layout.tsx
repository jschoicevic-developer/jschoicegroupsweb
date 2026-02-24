import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Providers South Morang | JS Choice Care & Support",
    description: "Discover NDIS Providers South Morang services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-providers-south-morang' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
