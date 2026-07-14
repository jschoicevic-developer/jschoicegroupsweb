import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "Assistance with Daily Life Melbourne | Daily Living Support" },
    description: "Receive personalised assistance with daily life in Melbourne. JS Choice Group provides daily living support, personal care, meal preparation, housekeeping and home maintenance to help you live independently.",
    keywords: ["Daily Living Support Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/assistance-with-daily-life' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
