import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "Access to Community Activities Melbourne | JS Choice" },
    description: "NDIS Access to Community Activities in Melbourne — connect, engage, and thrive.",
    alternates: { canonical: 'https://jschoicegroup.com.au/access-to-community-activities' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
