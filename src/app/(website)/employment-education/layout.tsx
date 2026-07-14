import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "Employment & Education Support Melbourne | NDIS Job Pathways" },
    description: "Explore employment and education support in Melbourne with JS Choice Group. We help NDIS participants build skills, access training, and develop pathways to meaningful work and independence.",
    keywords: ["NDIS Employment Support Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/employment-education' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
