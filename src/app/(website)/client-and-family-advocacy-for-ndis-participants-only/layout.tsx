import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "NDIS Family Advocacy for Participants Melbourne | JS Choice" },
    description: "NDIS Family Advocacy for Participants in Melbourne — your voice, your rights.",
    keywords: ["NDIS Participant Advocacy Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/client-and-family-advocacy-for-ndis-participants-only' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
