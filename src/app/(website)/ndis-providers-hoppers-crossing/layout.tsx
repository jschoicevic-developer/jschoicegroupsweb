import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Providers in Hoppers Crossing",
    description: "Find trusted NDIS providers in Hoppers Crossing. JS Choice Group delivers personalised disability support and NDIS services across Melbourne.",
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-providers-hoppers-crossing' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
