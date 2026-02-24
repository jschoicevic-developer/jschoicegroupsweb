import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Providers Altona North | JS Choice Care & Support",
    description: "Discover NDIS Providers Altona North services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-providers-altona-north' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
