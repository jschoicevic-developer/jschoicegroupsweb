import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Support Coordination | JS Choice Care & Support",
    description: "Discover Support Coordination services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/support-coordination' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
