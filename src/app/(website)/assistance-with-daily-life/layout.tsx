import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "NDIS Assistance with Daily Life Melbourne | NDIS Daily Living Support" },
    description: "Receive personalised NDIS Assistance with Daily Life in Melbourne. JS Choice Group provides NDIS daily living support for personal care, meal prep, housekeeping and home maintenance, funded under NDIS Core Supports.",
    keywords: ["Daily Living Support Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/assistance-with-daily-life' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
