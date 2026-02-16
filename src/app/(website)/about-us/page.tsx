import PageHeader from "@/components/ui/PageHeader";
import WhoWeAre from "@/components/sections/about/WhoWeAre"; // Includes Director Profile
import WhyChooseUs from "@/components/sections/home/WhyChooseUs";
import AreasServed from "@/components/sections/home/AreasServed";
import SeamlessNDIS from "@/components/sections/home/SeamlessNDIS";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | JS Choice Care & Support",
    description: "Learn about JS Choice Care & Support, a registered NDIS provider in Melbourne dedicated to empowering individuals with neuro-affirming care.",
};

export default function AboutPage() {
    return (
        <main className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <PageHeader
                title="About Us"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "About Us" }
                ]}
            />

            <WhoWeAre />

            {/* Reusing Home Page Sections as requested */}
            <WhyChooseUs />
            <AreasServed />

            {/* CTA Section */}
            <SeamlessNDIS />
        </main>
    );
}
