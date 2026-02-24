import PageHeader from "@/components/ui/PageHeader";
import BlogList from "@/components/sections/blog/BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | JS Choice Care & Support",
    description: "Discover professional insights, NDIS resources, and comprehensive care strategies from the JS Choice Care & Support team.",
    alternates: {
        canonical: "/blog",
    },
};

export default function BlogPage() {
    return (
        <main className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <PageHeader
                title="Blog"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Blog" }
                ]}
            />

            <BlogList />
        </main>
    );
}
