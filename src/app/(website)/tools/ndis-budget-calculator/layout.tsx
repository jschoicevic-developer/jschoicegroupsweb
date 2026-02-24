import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Budget Calculator | JS Choice Care & Support",
    description: "Discover NDIS Budget Calculator services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-budget-calculator' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
