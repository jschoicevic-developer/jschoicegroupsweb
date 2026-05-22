import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Resources | JS Choice Care & Support",
    description: "Discover Resources services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    keywords: ["NDIS Resources Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/resources' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
