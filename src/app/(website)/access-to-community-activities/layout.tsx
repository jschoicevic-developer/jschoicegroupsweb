import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Access to Community Activities",
    description: "Support your participation in community activities with JS Choice Group's expert NDIS disability care services across Melbourne and Victoria.",
    alternates: { canonical: 'https://jschoicegroup.com.au/access-to-community-activities' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
