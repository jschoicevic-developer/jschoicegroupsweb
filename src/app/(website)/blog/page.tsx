import PageHeader from "@/components/ui/PageHeader";
import BlogList from "@/components/sections/blog/BlogList";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog | JS Choice Care & Support",
    description: "Stay updated with the latest news, insights, and stories from JS Choice Care & Support and the NDIS community.",
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
