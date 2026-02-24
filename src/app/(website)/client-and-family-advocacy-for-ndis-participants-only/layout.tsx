import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Client And Family Advocacy For NDIS Participants Only | JS Choice Care & Support",
    description: "Discover Client And Family Advocacy For NDIS Participants Only services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/client-and-family-advocacy-for-ndis-participants-only' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
