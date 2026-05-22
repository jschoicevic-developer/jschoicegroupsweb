import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Price Guide Navigator",
    description: "Search NDIS support item prices across all Australian regions. JS Choice Group's free price guide tool provides detailed pricing and claim information.",
    keywords: ["NDIS Price Guide Search"],
    alternates: { canonical: 'https://jschoicegroup.com.au/tools/ndis-price-guide' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
