import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Consultations | JS Choice Care & Support",
    description: "Discover Consultations services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/consultations' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
