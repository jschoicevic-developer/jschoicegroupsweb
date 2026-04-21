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

            <Suspense>
                <ReferralForm />
            </Suspense>
        </main>
    );
}
