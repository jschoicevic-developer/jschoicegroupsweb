import { Suspense } from "react";
import PageHeader from "@/components/ui/PageHeader";
import ReferralForm from "@/components/sections/referral/ReferralForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Consultations | JS Choice Care & Support",
    description: "Refer a participant to JS Choice Care & Support. Complete our online consultationsform to get started.",
};

export default function ReferralPage() {
    return (
        <main className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <PageHeader
                title="Consultations"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Consultations" }
                ]}
            />

            <Suspense>
                <ReferralForm />
            </Suspense>
        </main>
    );
}
