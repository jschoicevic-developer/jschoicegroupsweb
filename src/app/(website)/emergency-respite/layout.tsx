import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Emergency Respite Services",
    description: "JS Choice Group provides reliable NDIS emergency respite services across Melbourne. Support carers and participants with compassionate short-term care.",
    alternates: { canonical: 'https://jschoicegroup.com.au/emergency-respite' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
