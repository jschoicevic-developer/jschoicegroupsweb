import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "Allied Health Services Melbourne | NDIS Allied Health Support" },
    description: "Access professional allied health services in Melbourne with JS Choice Group. We provide NDIS allied health assistance, therapy support, and coordinated care to improve independence and wellbeing.",
    keywords: ["Allied Health Services Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/allied-health-services' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
