import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "NDIS Psychosocial Recovery Coach Melbourne | JS Choice" },
    description: "NDIS Psychosocial Recovery Coach in Melbourne — trauma-informed mental health support.",
    keywords: ["Psychosocial Recovery Coach Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/psychosocial-recovery-coach' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
