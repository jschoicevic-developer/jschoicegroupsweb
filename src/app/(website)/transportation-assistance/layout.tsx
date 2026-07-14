import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "NDIS Transport Assistance Melbourne | Disability Transport Services" },
    description: "Access reliable NDIS transport assistance in Melbourne with JS Choice Group. We provide safe, dependable disability transport services for appointments, shopping, community activities and daily travel needs.",
    keywords: ["NDIS Transport Services Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/transportation-assistance' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
