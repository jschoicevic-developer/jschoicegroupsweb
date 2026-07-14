import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "NDIS Access Requests Melbourne | Apply for NDIS Support Help" },
    description: "Get expert help with NDIS access requests in Melbourne. JS Choice Group supports you through eligibility, documentation and application to help you successfully access NDIS funding and services.",
    keywords: ["NDIS Access Request Help Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-access-requests' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
