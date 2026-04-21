import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Free NDIS Referral | JS Choice Group",
    description: "Start your free NDIS referral online. JS Choice Group makes it easy to request disability support services across Melbourne and Victoria.",
    alternates: { canonical: 'https://jschoicegroup.com.au/referral' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
