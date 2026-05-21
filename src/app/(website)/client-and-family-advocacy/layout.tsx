import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "NDIS Client & Family Advocacy Melbourne | JS Choice" },
    description: "NDIS Client and Family Advocacy in Melbourne — guidance and support for participants.",
    alternates: { canonical: 'https://jschoicegroup.com.au/client-and-family-advocacy' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
