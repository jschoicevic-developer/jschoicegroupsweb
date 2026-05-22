import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "NDIS Assist with Employment & Education | JS Choice" },
    description: "NDIS Assist with Employment and Education in Melbourne — skills, training, and jobs.",
    keywords: ["NDIS Employment Support Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/employment-education' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
