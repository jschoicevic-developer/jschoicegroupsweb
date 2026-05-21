import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "NDIS Group & Centre Activities Melbourne | JS Choice" },
    description: "NDIS Group and Centre Activities in Melbourne — connect, learn, and belong.",
    alternates: { canonical: 'https://jschoicegroup.com.au/group-centre-activities' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
