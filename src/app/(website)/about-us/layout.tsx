import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "About JS Choice Group | Registered NDIS Provider Melbourne" },
    description: "Learn about JS Choice Group, a trusted registered NDIS provider in Melbourne offering personalised disability support, support coordination and community-focused care tailored to your goals.",
    keywords: ["NDIS Disability Support Provider Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/about-us' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
