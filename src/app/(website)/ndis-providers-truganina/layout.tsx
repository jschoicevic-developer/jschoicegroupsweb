import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Providers in Truganina",
    description: "Find trusted NDIS providers in Truganina. JS Choice Group delivers personalised disability support and NDIS services across Melbourne's western suburbs.",
    keywords: ["NDIS Provider Truganina"],
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-providers-truganina' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
