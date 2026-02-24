import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Contact Us | JS Choice Care & Support",
    description: "Discover Contact Us services from expert support workers. JS Choice Group provides comprehensive disability support and NDIS assistance.",
    alternates: { canonical: 'https://jschoicegroup.com.au/contact-us' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
