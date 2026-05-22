import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "NDIS Innovative Community Participation | JS Choice" },
    description: "NDIS Innovative Community Participation in Melbourne — skills, growth, and purpose.",
    keywords: ["Innovative Community Participation Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/innovative-community-participation-including-volunteer-opportunities' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
