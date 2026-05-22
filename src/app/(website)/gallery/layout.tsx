import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Gallery | JS Choice Care & Support",
    description: "Discover Gallery services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    keywords: ["JS Choice Group Gallery Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/gallery' },
    robots: { index: false, follow: true }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
