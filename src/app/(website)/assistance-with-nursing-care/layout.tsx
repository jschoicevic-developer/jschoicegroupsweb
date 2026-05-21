import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "Assistance with Nursing Care Melbourne | JS Choice" },
    description: "NDIS Assistance with Nursing Care in Melbourne — expert clinical support at home.",
    alternates: { canonical: 'https://jschoicegroup.com.au/assistance-with-nursing-care' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
