import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Accommodation Melbourne",
    description: "Find suitable NDIS accommodation in Melbourne with JS Choice Group. We provide SDA, SIL and supported housing options for NDIS participants across Victoria.",
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-accommodation' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
