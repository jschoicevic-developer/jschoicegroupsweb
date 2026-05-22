import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Providers in Laverton",
    description: "Find trusted NDIS providers in Laverton. JS Choice Group delivers personalised disability support and NDIS services across Melbourne's western suburbs.",
    keywords: ["NDIS Provider Laverton"],
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-providers-laverton' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
