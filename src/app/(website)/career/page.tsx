import PageHeader from "@/components/ui/PageHeader";
import CareerForm from "@/components/sections/career/CareerForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Career | JS Choice Care & Support",
    description: "Join the JS Choice Care & Support team. Apply for a position and help us empower NDIS participants.",
};

export default function CareerPage() {
    return (
        <main className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <PageHeader
                title="Career"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Career" }
                ]}
            />

            <CareerForm />
        </main>
    );
}
