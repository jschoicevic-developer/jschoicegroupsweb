import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Providers Altona | JS Choice Care & Support",
    description: "Discover NDIS Providers Altona services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-providers-altona' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
