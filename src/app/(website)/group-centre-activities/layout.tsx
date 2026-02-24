import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Group Centre Activities | JS Choice Care & Support",
    description: "Discover Group Centre Activities services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/group-centre-activities' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
