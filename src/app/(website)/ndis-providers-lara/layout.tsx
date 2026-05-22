import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Providers in Lara",
    description: "Find trusted NDIS providers in Lara. JS Choice Group delivers personalised disability support and NDIS services across the Geelong region.",
    keywords: ["NDIS Provider Lara"],
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-providers-lara' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
