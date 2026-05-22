import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Budget Calculator",
    description: "Estimate your annual NDIS support costs with JS Choice Group's free budget calculator. Add support items, set frequency, and download your budget summary.",
    keywords: ["NDIS Budget Calculator Australia"],
    alternates: { canonical: 'https://jschoicegroup.com.au/tools/ndis-budget-calculator' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
