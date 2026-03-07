import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Innovative Community Participation",
    description: "Explore innovative community participation and volunteering opportunities with JS Choice Group's expert NDIS disability support services in Victoria.",
    alternates: { canonical: 'https://jschoicegroup.com.au/innovative-community-participation-including-volunteer-opportunities' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
