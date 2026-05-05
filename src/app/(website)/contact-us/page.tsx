import PageHeader from "@/components/ui/PageHeader";
import ContactContent from "@/components/sections/contact/ContactContent";
import JsonLd from "@/components/schema/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | JS Choice Care & Support",
    description: "Get in touch with JS Choice Care & Support. We are here to answer your questions and provide the support you need.",
};

const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "@id": "https://jschoicegroup.com.au/contact-us#webpage",
    url: "https://jschoicegroup.com.au/contact-us",
    name: "Contact Us | JS Choice Group",
    description:
        "Get in touch with JS Choice Group. We are here to answer your questions and provide NDIS disability support across Melbourne.",
    isPartOf: { "@id": "https://jschoicegroup.com.au/#website" },
    about: { "@id": "https://jschoicegroup.com.au/#organization" },
    breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://jschoicegroup.com.au" },
            { "@type": "ListItem", position: 2, name: "Contact Us", item: "https://jschoicegroup.com.au/contact-us" },
        ],
    },
};

export default function ContactPage() {
    return (
        <main className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <JsonLd data={contactPageSchema} />
            <PageHeader
                title="Contact Us"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Contact Us" }
                ]}
            />

            {/* Added SEO Content to resolve Thin Content warning */}
            <section className="bg-white py-12 px-4 shadow-sm border-b border-gray-100">
                <div className="max-w-4xl mx-auto text-center space-y-4">
                    <h2 className="text-2xl font-bold text-[#2D3748]">Why Choose JS Choice Facilities?</h2>
                    <p className="text-gray-600 leading-relaxed font-medium">
                        At JS Choice Care & Support, delivering exceptional NDIS facilities is our top priority. We understand that finding the right disability service provider can be overwhelming. That is why our dedicated team in Melbourne provides personalized assistance, ensuring every participant receives comprehensive care right in their community. Reach out through the form below to learn how our tailored plans can transform your daily living, and let us help you achieve a more autonomous and fulfilling life.
                    </p>
                </div>
            </section>

            <ContactContent />
        </main>
    );
}
