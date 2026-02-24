import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Assistance With Nursing Care | JS Choice Care & Support",
    description: "Discover Assistance With Nursing Care services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/assistance-with-nursing-care' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
