import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Accommodation in Geelong",
    description: "Find NDIS accommodation in Geelong with JS Choice Group. We provide SDA, SIL and supported housing solutions for NDIS participants in the Geelong region.",
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-accommodation-geelong' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
