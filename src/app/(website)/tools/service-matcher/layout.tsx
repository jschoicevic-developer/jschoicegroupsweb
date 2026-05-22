import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: "NDIS Service Matcher",
    description: "Find the right NDIS services for your needs with JS Choice Group's free service matcher tool. Get personalised disability support recommendations.",
    keywords: ["NDIS Service Matcher Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/tools/service-matcher' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
