import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Privacy Policy | JS Choice Care & Support",
    description: "Discover Privacy Policy services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    keywords: ["JS Choice Group Privacy Policy"],
    alternates: { canonical: 'https://jschoicegroup.com.au/privacy-policy' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
