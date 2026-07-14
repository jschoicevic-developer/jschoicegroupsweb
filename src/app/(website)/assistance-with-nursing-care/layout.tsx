import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "Community Nursing Care Melbourne | NDIS Nursing Care" },
    description: "Access professional community nursing care in Melbourne with JS Choice Group. We provide personalised NDIS nursing care, medication management, wound care, health monitoring and chronic disease support.",
    keywords: ["NDIS Nursing Care Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/assistance-with-nursing-care' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
