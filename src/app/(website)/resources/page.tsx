import PageHeader from "@/components/ui/PageHeader";
import ResourcesList from "@/components/sections/resources/ResourcesList";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Resources | JS Choice Care & Support",
    description: "Access helpful resources, guides, and information for NDIS participants and families.",
};

export default function ResourcesPage() {
    return (
        <main className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <PageHeader
                title="Resources"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Resources" }
                ]}
            />

            <ResourcesList />
        </main>
    );
}
