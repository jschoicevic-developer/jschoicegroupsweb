import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Access To Community Activities | JS Choice Care & Support",
    description: "Discover Access To Community Activities services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/access-to-community-activities' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
