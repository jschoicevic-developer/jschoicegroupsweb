import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Assistance with Nursing Care",
    description: "JS Choice Group provides professional nursing care assistance for NDIS participants across Melbourne. Expert, compassionate support for complex needs.",
    alternates: { canonical: 'https://jschoicegroup.com.au/assistance-with-nursing-care' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
