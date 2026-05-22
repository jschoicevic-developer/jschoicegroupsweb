import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "NDIS Support Coordination in Melbourne | JS Choice" },
    description: "NDIS Support Coordination in Melbourne — turn your plan into the right supports.",
    keywords: ["NDIS Support Coordination Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/support-coordination' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
