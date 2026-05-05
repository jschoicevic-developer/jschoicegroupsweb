import { Suspense } from "react";
import PageHeader from "@/components/ui/PageHeader";
import ReferralForm from "@/components/sections/referral/ReferralForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Free NDIS Referral | JS Choice Group",
    description: "Refer a participant to JS Choice Care & Support. Complete our online referral form to get started.",
};

export default function ReferralPage() {
    return (
        <main className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <PageHeader
                title="Free NDIS Referral"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Referral" }
                ]}
            />

            <div className="max-w-4xl mx-auto px-4 md:px-6 lg:px-8 pt-10 pb-2">
                <h2 className="text-2xl md:text-3xl font-black text-[#2D3748] tracking-tight">
                    Submit Your NDIS Referral Online
                </h2>
                <p className="text-gray-500 font-medium mt-2 text-base leading-relaxed">
                    Complete the secure form below to refer a participant to JS Choice Group. Our team will be in touch.
                </p>
            </div>

            <Suspense>
                <ReferralForm />
            </Suspense>
        </main>
    );
}
