import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Providers in Williams Landing",
    description: "Find trusted NDIS providers in Williams Landing. JS Choice Group delivers personalised disability support and NDIS services across Melbourne's west.",
    keywords: ["NDIS Provider Williams Landing"],
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-providers-williams-landing' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
