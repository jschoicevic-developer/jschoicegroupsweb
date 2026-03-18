import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Providers in Tarneit",
    description: "Find trusted NDIS providers in Tarneit. JS Choice Group delivers personalised disability support and NDIS services across Melbourne's western suburbs.",
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-providers-tarneit' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
