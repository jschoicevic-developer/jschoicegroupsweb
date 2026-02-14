import PageHeader from "@/components/ui/PageHeader";
import ContactContent from "@/components/sections/contact/ContactContent";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Contact Us | JS Choice Care & Support",
    description: "Get in touch with JS Choice Care & Support. We are here to answer your questions and provide the support you need.",
};

export default function ContactPage() {
    return (
        <main className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <PageHeader
                title="Contact Us"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Contact Us" }
                ]}
            />

            <ContactContent />
        </main>
    );
}
