import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "Support Coordination Melbourne | NDIS Plan Management Support" },
    description: "Get expert support coordination in Melbourne with JS Choice Group. We help you understand your NDIS plan, connect with providers, manage services and build independence to achieve your goals.",
    keywords: ["NDIS Support Coordination Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/support-coordination' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
