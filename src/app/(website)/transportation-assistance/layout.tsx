import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Transportation Assistance",
    description: "JS Choice Group provides reliable NDIS transportation assistance across Melbourne and Victoria. Expert support for disability transport needs.",
    alternates: { canonical: 'https://jschoicegroup.com.au/transportation-assistance' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
