import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Allied Health Services | JS Choice Care & Support",
    description: "Discover Allied Health Services services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/allied-health-services' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
