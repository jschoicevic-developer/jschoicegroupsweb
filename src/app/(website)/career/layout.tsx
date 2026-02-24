import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Career | JS Choice Care & Support",
    description: "Discover Career services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/career' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
