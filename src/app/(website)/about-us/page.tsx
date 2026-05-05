import AboutBanner from "@/components/sections/about/AboutBanner";
import OurStory from "@/components/sections/about/OurStory";
import FounderProfile from "@/components/sections/about/FounderProfile";
import OurValues from "@/components/sections/about/OurValues";
import WhyFamiliesChoose from "@/components/sections/about/WhyFamiliesChoose";
import OurCommitment from "@/components/sections/about/OurCommitment";
import JsonLd from "@/components/schema/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us - Compassionate NDIS Support",
    description: "JS Choice Group is a family-led NDIS provider in Melbourne, delivering ethical, culturally responsive and participant-centred disability support.",
};

const aboutPageSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "@id": "https://jschoicegroup.com.au/about-us#webpage",
    url: "https://jschoicegroup.com.au/about-us",
    name: "About Us | JS Choice Group - Compassionate NDIS Support",
    description:
        "JS Choice Group is a family-led NDIS provider in Melbourne, delivering ethical, culturally responsive and participant-centred disability support.",
    isPartOf: { "@id": "https://jschoicegroup.com.au/#website" },
    about: { "@id": "https://jschoicegroup.com.au/#organization" },
    breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://jschoicegroup.com.au" },
            { "@type": "ListItem", position: 2, name: "About Us", item: "https://jschoicegroup.com.au/about-us" },
        ],
    },
};

const founderSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Jan Fardowsi",
    jobTitle: "Founder & Director",
    worksFor: { "@id": "https://jschoicegroup.com.au/#organization" },
    url: "https://jschoicegroup.com.au/about-us",
};

export default function AboutPage() {
    return (
        <main className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <JsonLd data={[aboutPageSchema, founderSchema]} />
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
