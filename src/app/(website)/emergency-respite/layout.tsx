import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Emergency Respite | JS Choice Care & Support",
    description: "Discover Emergency Respite services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/emergency-respite' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
