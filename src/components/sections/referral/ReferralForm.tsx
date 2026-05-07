"use client";

import { useRouter } from "next/navigation";
import QuestionnaireModal from "@/components/ndis/QuestionnaireModal";

const ReferralForm = () => {
    const router = useRouter();

    return (
        <QuestionnaireModal
            isOpen={true}
            onClose={() => router.push("/")}
            onSuccess={() => router.push("/thank-you")}
            source="referral"
            sourcePage="/referral"
            inline={true}
        />
    );
};

export default ReferralForm;
