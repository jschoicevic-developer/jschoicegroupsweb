import PageHeader from "@/components/ui/PageHeader";
import BlogList from "@/components/sections/blog/BlogList";
import JsonLd from "@/components/schema/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | JS Choice Care & Support",
    description: "Discover professional insights, NDIS resources, and comprehensive care strategies from the JS Choice Care & Support team.",
    alternates: {
        canonical: "https://jschoicegroup.com.au/blog",
    },
};

const blogSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": "https://jschoicegroup.com.au/blog#webpage",
    url: "https://jschoicegroup.com.au/blog",
    name: "Blog | JS Choice Group",
    description:
        "Discover professional insights, NDIS resources, and comprehensive care strategies from the JS Choice Group team.",
    publisher: { "@id": "https://jschoicegroup.com.au/#organization" },
    isPartOf: { "@id": "https://jschoicegroup.com.au/#website" },
    inLanguage: "en-AU",
    breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://jschoicegroup.com.au" },
            { "@type": "ListItem", position: 2, name: "Blog", item: "https://jschoicegroup.com.au/blog" },
        ],
    },
};

export default function BlogPage() {
    return (
        <main className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <JsonLd data={blogSchema} />
            <PageHeader
                title="Blog"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Blog" }
                ]}
            />

            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 pt-12 pb-2">
                <h2 className="text-2xl md:text-3xl font-black text-[#2D3748] uppercase tracking-tight">Latest Articles</h2>
            </div>
            <BlogList />
        </main>
    );
}
