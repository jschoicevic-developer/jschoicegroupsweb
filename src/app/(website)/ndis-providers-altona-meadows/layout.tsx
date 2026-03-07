import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Providers in Altona Meadows",
    description: "Find trusted NDIS providers in Altona Meadows. JS Choice Group delivers personalised disability support and NDIS services across Melbourne.",
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-providers-altona-meadows' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
