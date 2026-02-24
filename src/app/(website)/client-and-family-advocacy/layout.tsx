import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Client And Family Advocacy | JS Choice Care & Support",
    description: "Discover Client And Family Advocacy services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/client-and-family-advocacy' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
