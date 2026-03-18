import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Providers in Point Cook",
    description: "Find trusted NDIS providers in Point Cook. JS Choice Group is based in Point Cook delivering personalised disability support across Melbourne's west.",
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-providers-point-cook' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
