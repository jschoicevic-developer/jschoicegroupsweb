import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Providers in Altona North",
    description: "Find trusted NDIS providers in Altona North. JS Choice Group delivers personalised disability support and NDIS services across Melbourne's west.",
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-providers-altona-north' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
