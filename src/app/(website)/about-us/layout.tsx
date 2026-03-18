import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "About Us - Compassionate NDIS Support",
    description: "JS Choice Group is a family-led NDIS provider in Melbourne, delivering ethical, culturally responsive and participant-centred disability support.",
    alternates: { canonical: 'https://jschoicegroup.com.au/about-us' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
