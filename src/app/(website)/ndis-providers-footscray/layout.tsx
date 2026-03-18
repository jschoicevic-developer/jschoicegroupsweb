import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Providers in Footscray",
    description: "Find trusted NDIS providers in Footscray. JS Choice Group delivers personalised disability support and NDIS services across Melbourne's western suburbs.",
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-providers-footscray' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
