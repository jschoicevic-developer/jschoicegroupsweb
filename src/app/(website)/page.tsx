import Hero from "@/components/sections/home/Hero";
import About from "@/components/sections/home/About";
import Services from "@/components/sections/home/Services";
import WhyChooseUs from "@/components/sections/home/WhyChooseUs";
import GettingStarted from "@/components/sections/home/GettingStarted";
import Faq from "@/components/sections/home/Faq";
import AreasServed from "@/components/sections/home/AreasServed";
import SeamlessNDIS from "@/components/sections/home/SeamlessNDIS";
import JsonLd from "@/components/schema/JsonLd";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "NDIS Service Providers in Melbourne | JS Choice",
  },
  description:
    "NDIS Service Providers in Melbourne offering compassionate disability support.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "NDIS Service Providers in Melbourne | JS Choice",
    description:
      "NDIS Service Providers in Melbourne offering compassionate disability support.",
    url: "https://jschoicegroup.com.au",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "NDIS Service Providers in Melbourne | JS Choice",
    description:
      "NDIS Service Providers in Melbourne offering compassionate disability support.",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": "https://jschoicegroup.com.au/#website",
  url: "https://jschoicegroup.com.au",
  name: "JS Choice Group",
  description:
    "Registered NDIS Provider in Melbourne delivering disability support services across Victoria",
  publisher: { "@id": "https://jschoicegroup.com.au/#organization" },
  inLanguage: "en-AU",
};

const homePageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": "https://jschoicegroup.com.au/#webpage",
  url: "https://jschoicegroup.com.au",
  name: "NDIS Service Providers in Melbourne | JS Choice Care and Support",
  description:
    "JS Choice Group are trusted NDIS Service Providers in Melbourne, delivering compassionate, participant-led disability support across Victoria.",
  isPartOf: { "@id": "https://jschoicegroup.com.au/#website" },
  about: { "@id": "https://jschoicegroup.com.au/#organization" },
  breadcrumb: {
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://jschoicegroup.com.au" },
    ],
  },
};

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <JsonLd data={[websiteSchema, homePageSchema]} />
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <GettingStarted />
      <AreasServed />
      <Faq />
      <SeamlessNDIS />
    </main>
  );
}
