import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Providers in South Morang",
    description: "Find trusted NDIS providers in South Morang. JS Choice Group delivers personalised disability support and NDIS services across Melbourne's north.",
    keywords: ["NDIS Provider South Morang"],
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-providers-south-morang' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
