import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "NDIS Emergency Respite Care in Melbourne | JS Choice" },
    description: "NDIS Emergency Respite in Melbourne — rapid short-term care when you need it most.",
    alternates: { canonical: 'https://jschoicegroup.com.au/emergency-respite' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
