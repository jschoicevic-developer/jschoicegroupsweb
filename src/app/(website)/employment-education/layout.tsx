import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Employment & Education Support",
    description: "JS Choice Group helps NDIS participants find employment and pursue education. Expert support to build skills, confidence and independence in Victoria.",
    alternates: { canonical: 'https://jschoicegroup.com.au/employment-education' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
