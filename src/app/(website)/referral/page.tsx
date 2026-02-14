import PageHeader from "@/components/ui/PageHeader";
import ReferralForm from "@/components/sections/referral/ReferralForm";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Referral | JS Choice Care & Support",
    description: "Refer a participant to JS Choice Care & Support. Complete our online referral form to get started.",
};

export default function ReferralPage() {
    return (
        <main className="flex flex-col min-h-screen w-full overflow-x-hidden">
            <PageHeader
                title="Referral"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Referral" }
                ]}
            />

            <ReferralForm />
        </main>
    );
}
