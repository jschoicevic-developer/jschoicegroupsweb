import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "NDIS Short Term Accommodation in Geelong | JS Choice" },
    description: "NDIS Accommodation in Geelong — SIL, MTA, and STA for safe, supported living.",
    keywords: ["NDIS Accommodation Geelong"],
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-accommodation-geelong' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
