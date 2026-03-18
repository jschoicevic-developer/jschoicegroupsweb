import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Group & Centre Activities",
    description: "Join engaging NDIS group and centre activities with JS Choice Group. Socialise, build skills and connect with others in a safe, supportive environment.",
    alternates: { canonical: 'https://jschoicegroup.com.au/group-centre-activities' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
