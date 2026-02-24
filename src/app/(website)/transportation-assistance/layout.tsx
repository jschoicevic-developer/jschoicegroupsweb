import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Transportation Assistance | JS Choice Care & Support",
    description: "Discover Transportation Assistance services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/transportation-assistance' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
