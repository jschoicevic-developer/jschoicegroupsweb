import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Access Requests | JS Choice Care & Support",
    description: "Discover NDIS Access Requests services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-access-requests' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
