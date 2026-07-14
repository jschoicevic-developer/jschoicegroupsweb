import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "Group & Centre Activities Melbourne | NDIS Group Activities" },
    description: "Join engaging NDIS group and centre activities in Melbourne with JS Choice Group. Build confidence, develop life skills, make friends and enjoy inclusive community programs in a supportive environment.",
    keywords: ["NDIS Group Activities Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/group-centre-activities' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
