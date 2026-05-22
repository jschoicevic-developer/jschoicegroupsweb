import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "Assistance with Daily Life in Melbourne | JS Choice" },
    description: "NDIS Assistance with Daily Life in Melbourne — personal care, meals, and home support.",
    keywords: ["Daily Living Support Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/assistance-with-daily-life' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
