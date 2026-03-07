import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Providers in Craigieburn",
    description: "Find trusted NDIS providers in Craigieburn. JS Choice Group delivers personalised disability support and NDIS services across Melbourne's north.",
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-providers-craigieburn' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
