import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Psychosocial Recovery Coach | JS Choice Care & Support",
    description: "Discover Psychosocial Recovery Coach services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/psychosocial-recovery-coach' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
