import type { Metadata } from "next";
import AdsContent from "./AdsContent";

export const metadata: Metadata = {
    title: "NDIS Support Services Melbourne | JS Choice Group - Get Consultations",
    description:
        "Melbourne's trusted NDIS provider. Personalised daily living support, nursing care, psychosocial coaching & more. Neuro-affirming, culturally inclusive. Get Consultations today!",
    openGraph: {
        title: "NDIS Support Services Melbourne | JS Choice Group",
        description:
            "Empowering lives through inclusive care. 500+ participants supported across Melbourne. Get your free consultation today.",
        type: "website",
    },
};

export default function AdsPage() {
    return <AdsContent />;
}
