import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "NDIS Accommodation Melbourne | Supported Independent Living" },
    description: "Find quality NDIS accommodation in Melbourne with JS Choice Group. We offer Supported Independent Living (SIL), Short-Term Accommodation (STA) and Medium-Term Accommodation (MTA) tailored to your needs.",
    keywords: ["NDIS Accommodation Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-accommodation' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
