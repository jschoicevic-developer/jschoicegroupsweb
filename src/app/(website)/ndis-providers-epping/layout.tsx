import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Providers Epping | JS Choice Care & Support",
    description: "Discover NDIS Providers Epping services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-providers-epping' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
