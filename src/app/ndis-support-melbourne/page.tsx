import LandingHeader from "@/components/landing/LandingHeader";
import LandingHero from "@/components/landing/LandingHero";
import LandingTrustStrip from "@/components/landing/LandingTrustStrip";
import LandingServices from "@/components/landing/LandingServices";
import LandingWhyChoose from "@/components/landing/LandingWhyChoose";
import LandingSupport from "@/components/landing/LandingSupport";
import LandingFaq from "@/components/landing/LandingFaq";
import LandingFinalCta from "@/components/landing/LandingFinalCta";
import LandingFooter from "@/components/landing/LandingFooter";
import StickyMobileCTA from "@/components/landing/StickyMobileCTA";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "JS Choice Group Pty Ltd",
  url: "https://jschoicegroup.com.au/ndis-support-melbourne",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "What is NDIS Support Coordination?",
      acceptedAnswer: { "@type": "Answer", text: "Support Coordination helps you understand and use your NDIS plan effectively. Your support coordinator connects you with the right providers, helps resolve issues, and ensures you're getting the most from your funding." },
    },
    {
      "@type": "Question",
      name: "How do I get a referral to JS Choice?",
      acceptedAnswer: { "@type": "Answer", text: "Fill out the referral form on this page with your name, phone, and email — it takes less than 60 seconds. Our team will contact you within 24 hours." },
    },
    {
      "@type": "Question",
      name: "Do you provide NDIS support in my area?",
      acceptedAnswer: { "@type": "Answer", text: "Yes! JS Choice Group provides NDIS support across Melbourne and regional Victoria, including Point Cook, Tarneit, Werribee, Hoppers Crossing, Truganina, Craigieburn, Williams Landing, Laverton, Altona, Footscray, Epping, Geelong, South Morang, Lara, and Shepparton." },
    },
    {
      "@type": "Question",
      name: "Can I change my NDIS support coordinator?",
      acceptedAnswer: { "@type": "Answer", text: "Absolutely. You have the right to change your support coordinator at any time. JS Choice can help make the switch smooth and stress-free." },
    },
    {
      "@type": "Question",
      name: "What does Assistance with Daily Life include?",
      acceptedAnswer: { "@type": "Answer", text: "It covers personal care, meal preparation, household tasks, medication management, and community access — tailored to your routine." },
    },
  ],
};

export default function NdisSupportMelbournePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <LandingHeader />
      <main>
        <LandingHero />
        <LandingTrustStrip />
        <LandingServices />
        <LandingWhyChoose />
        <LandingSupport />
        <LandingFaq />
        <LandingFinalCta />
      </main>
      <LandingFooter />
      <StickyMobileCTA />
    </>
  );
}
