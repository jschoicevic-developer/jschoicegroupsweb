import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Providers in Shepparton",
    description: "Find trusted NDIS providers in Shepparton. JS Choice Group delivers personalised disability support and NDIS services across regional Victoria.",
    keywords: ["NDIS Provider Shepparton"],
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-providers-shepparton' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
