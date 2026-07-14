import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: { absolute: "Contact JS Choice Group | NDIS Provider Melbourne" },
    description: "Contact JS Choice Group, your trusted NDIS provider in Melbourne. Speak with our friendly team for personalised disability support, service enquiries or a free consultation today.",
    keywords: ["Contact NDIS Provider Melbourne"],
    alternates: { canonical: 'https://jschoicegroup.com.au/contact-us' }
};

export default function Layout({ children }: { children: React.ReactNode }) {
    return children;
}
