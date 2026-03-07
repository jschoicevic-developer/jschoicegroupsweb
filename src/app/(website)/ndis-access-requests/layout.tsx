import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Access Requests",
    description: "Get expert help with NDIS access requests from JS Choice Group. Our team guides you through eligibility checks and applications across Melbourne and Victoria.",
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-access-requests' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
