import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Terms And Conditions | JS Choice Care & Support",
    description: "Discover Terms And Conditions services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/terms-and-conditions' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
