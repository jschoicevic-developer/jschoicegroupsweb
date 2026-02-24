import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About Us | JS Choice Care & Support",
    description: "Discover About Us services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/about-us' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
