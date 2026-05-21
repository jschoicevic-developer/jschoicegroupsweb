import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "NDIS Access Requests Support Melbourne | JS Choice" },
    description: "NDIS Access Requests help in Melbourne — guidance from eligibility to approval.",
    alternates: { canonical: 'https://jschoicegroup.com.au/ndis-access-requests' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
