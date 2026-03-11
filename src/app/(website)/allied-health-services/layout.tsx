import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Allied Health Services",
    description: "Access NDIS allied health services through JS Choice Group. Physiotherapy, occupational therapy and more to improve your health and independence.",
    alternates: { canonical: 'https://jschoicegroup.com.au/allied-health-services' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
