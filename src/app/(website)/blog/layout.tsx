import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Blog | JS Choice Care & Support",
    description: "Discover Blog services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    keywords: ["NDIS Blog Melbourne"],
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
