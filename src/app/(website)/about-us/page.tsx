import AboutBanner from "@/components/sections/about/AboutBanner";
import OurStory from "@/components/sections/about/OurStory";
import FounderProfile from "@/components/sections/about/FounderProfile";
import OurValues from "@/components/sections/about/OurValues";
import WhyFamiliesChoose from "@/components/sections/about/WhyFamiliesChoose";
import OurCommitment from "@/components/sections/about/OurCommitment";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | JS Choice Group - Compassionate NDIS Support",
    description: "Learn about JS Choice Group, a family-led registered NDIS provider in Melbourne. Founded by Jan Fardowsi, we deliver ethical, culturally responsive, and participant-centred disability support rooted in lived experience.",
};

export default function AboutPage() {
    return (
        <main className="flex flex-col min-h-screen w-full overflow-x-hidden">
            {/* Hero Banner */}
            <AboutBanner />

            {/* Our Story */}
            <OurStory />

            {/* Meet Jan Fardowsi - Founder Profile */}
            <FounderProfile />

            {/* Our Values */}
            <OurValues />

            {/* Why Families Choose JS Choice Group */}
            <WhyFamiliesChoose />

            {/* Our Commitment + Building Futures + CTA */}
            <OurCommitment />
        </main>
    );
}
