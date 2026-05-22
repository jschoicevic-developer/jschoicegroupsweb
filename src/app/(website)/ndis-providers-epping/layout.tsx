import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Providers in Epping",
    description: "Find trusted NDIS providers in Epping. JS Choice Group delivers personalised disability support and NDIS services across Melbourne's northern suburbs.",
    keywords: ["NDIS Provider Epping"],
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-providers-epping' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
