import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "Access to Community Activities Melbourne | Community Participation" },
    description: "Enhance your independence with access to community activities in Melbourne. JS Choice Group provides personalised community participation support to build confidence, social connections and life skills.",
    keywords: ["Community Access Support Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/access-to-community-activities' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
