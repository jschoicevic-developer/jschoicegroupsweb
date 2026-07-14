import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "Psychosocial Recovery Coach Melbourne | NDIS Recovery Coaching" },
    description: "Achieve your recovery goals with compassionate psychosocial recovery coaching in Melbourne. JS Choice Group provides personalised NDIS recovery coaching to build resilience, independence and wellbeing.",
    keywords: ["Psychosocial Recovery Coach Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/psychosocial-recovery-coach' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
