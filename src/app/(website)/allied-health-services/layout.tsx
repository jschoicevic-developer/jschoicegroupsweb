import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "NDIS Allied Health Services in Melbourne | JS Choice" },
    description: "NDIS Allied Health Services in Melbourne — therapy support that builds independence.",
    alternates: { canonical: 'https://jschoicegroup.com.au/allied-health-services' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
