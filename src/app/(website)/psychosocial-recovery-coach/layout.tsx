import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Psychosocial Recovery Coach",
    description: "Get expert psychosocial recovery coaching from JS Choice Group. We provide compassionate NDIS mental health support across Melbourne and Victoria.",
    alternates: { canonical: 'https://jschoicegroup.com.au/psychosocial-recovery-coach' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
