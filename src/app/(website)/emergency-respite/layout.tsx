import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "Emergency Respite Melbourne | NDIS Respite Care Services" },
    description: "Get trusted emergency respite care in Melbourne with JS Choice Group. We provide short-term NDIS respite services, in-home support and quality care when you need it most.",
    keywords: ["Emergency Respite Care Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/emergency-respite' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
