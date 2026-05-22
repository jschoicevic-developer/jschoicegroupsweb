import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Providers in Altona",
    description: "Find trusted NDIS providers in Altona. JS Choice Group delivers personalised disability support and NDIS services across Melbourne's western suburbs.",
    keywords: ["NDIS Provider Altona"],
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-providers-altona' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
