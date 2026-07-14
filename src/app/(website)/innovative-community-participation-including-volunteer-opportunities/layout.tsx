import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "Innovative Community Participation Melbourne | Volunteer Opportunities NDIS" },
    description: "Explore innovative community participation in Melbourne with JS Choice Group. We offer NDIS-supported programs, skill-building activities, and volunteer opportunities to build confidence, independence and social connection.",
    keywords: ["Innovative Community Participation Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/innovative-community-participation-including-volunteer-opportunities' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
