import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Assistance with Daily Life",
    description: "JS Choice Group provides personalised NDIS daily life support in Melbourne. Personal care, meal preparation, housekeeping and more for greater independence.",
    alternates: { canonical: 'https://jschoicegroup.com.au/assistance-with-daily-life' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
