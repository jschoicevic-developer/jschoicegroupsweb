import type { Metadata } from "next";
import ConsultationHeader from "@/components/landing/consultation/ConsultationHeader";
import ConsultationHero from "@/components/landing/consultation/ConsultationHero";
import ConsultationServices from "@/components/landing/consultation/ConsultationServices";
import ConsultationWhyChoose from "@/components/landing/consultation/ConsultationWhyChoose";
import ConsultationAreasServed from "@/components/landing/consultation/ConsultationAreasServed";
import ConsultationFaq from "@/components/landing/consultation/ConsultationFaq";
import ConsultationFinalCta from "@/components/landing/consultation/ConsultationFinalCta";
import ConsultationFooter from "@/components/landing/consultation/ConsultationFooter";

export const metadata: Metadata = {
  title: "NDIS Support Provider in Melbourne | JS Choice Care & Support",
  description:
    "JS Choice Group is a registered NDIS provider in Melbourne offering support coordination, daily life assistance, allied health, and more. Request a free consultation today.",
  robots: { index: false, follow: false },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "JS Choice Group Pty Ltd",
  url: "https://jschoicegroup.com.au/ndis-provider-melbourne",
  telephone: "+611300572464",
  email: "info@jschoicegroup.com.au",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Suite 104, Level 1, C5 2 Main Street",
    addressLocality: "Point Cook",
    addressRegion: "VIC",
    postalCode: "3030",
    addressCountry: "AU",
  },
  areaServed: [
    "Point Cook", "Tarneit", "Werribee", "Hoppers Crossing", "Truganina",
    "Craigieburn", "Williams Landing", "Laverton", "Altona", "Footscray",
    "Epping", "Geelong", "South Morang", "Lara", "Shepparton",
  ].map((name) => ({ "@type": "City", name })),
  serviceType: ["NDIS Support Coordination", "Assistance with Daily Life"],
  priceRange: "NDIS Funded",
};

export default function NdisProviderMelbournePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <ConsultationHeader />
      <main>
        <ConsultationHero />
        <ConsultationServices />
        <ConsultationWhyChoose />
        <ConsultationAreasServed />
        <ConsultationFaq />
        <ConsultationFinalCta />
      </main>
      <ConsultationFooter />
    </>
  );
}
