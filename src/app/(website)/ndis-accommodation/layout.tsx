import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "NDIS Short Term Accommodation Melbourne | JS Choice" },
    description: "NDIS Accommodation in Melbourne — SIL, MTA, and STA homes built around you.",
    keywords: ["NDIS Accommodation Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-accommodation' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
