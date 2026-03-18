import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Support Coordination",
    description: "JS Choice Group provides expert NDIS support coordination in Melbourne. We help participants build skills, connect with services and reach their goals.",
    alternates: { canonical: 'https://jschoicegroup.com.au/support-coordination' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
