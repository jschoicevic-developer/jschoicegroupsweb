import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Thank You | JS Choice Care & Support",
    description: "Discover Thank You services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    keywords: ["NDIS Enquiry Thank You Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/thank-you' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
