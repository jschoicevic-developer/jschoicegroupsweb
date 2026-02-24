import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Service Matcher | JS Choice Care & Support",
    description: "Discover Service Matcher services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/service-matcher' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
