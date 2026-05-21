import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "NDIS Transportation Assistance Melbourne | JS Choice" },
    description: "NDIS Transportation Assistance in Melbourne — safe, supported door-to-door travel.",
    alternates: { canonical: 'https://jschoicegroup.com.au/transportation-assistance' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
