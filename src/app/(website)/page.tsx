import Hero from "@/components/sections/home/Hero";
import About from "@/components/sections/home/About";
import Services from "@/components/sections/home/Services";
import WhyChooseUs from "@/components/sections/home/WhyChooseUs";
import Reviews from "@/components/sections/home/Reviews";
import GettingStarted from "@/components/sections/home/GettingStarted";
import Faq from "@/components/sections/home/Faq";
import AreasServed from "@/components/sections/home/AreasServed";
import SeamlessNDIS from "@/components/sections/home/SeamlessNDIS";
import JsonLd from "@/components/schema/JsonLd";
import type { Metadata } from "next";
import { GMB_PROFILE, GMB_REVIEWS } from "@/data/gmb-reviews";
import { getDisplayableReviews } from "@/lib/gmb-reviews-utils";

export const metadata: Metadata = {
  title: {
    absolute: "Registered NDIS Provider Melbourne | Disability Support",
  },
  description:
    "JS Choice Group is a registered NDIS provider in Melbourne offering personalised disability support, support coordination, respite care, allied health and daily living assistance.",
  keywords: ["NDIS Provider Melbourne"],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Registered NDIS Provider Melbourne | Disability Support",
    description:
      "JS Choice Group is a registered NDIS provider in Melbourne offering personalised disability support, support coordination, respite care, allied health and daily living assistance.",
    url: "https://jschoicegroup.com.au",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Registered NDIS Provider Melbourne | Disability Support",
    description:
      "JS Choice Group is a registered NDIS provider in Melbourne offering personalised disability support, support coordination, respite care, allied health and daily living assistance.",
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

const displayableReviews = getDisplayableReviews(GMB_REVIEWS);

const reviewsSchema =
  displayableReviews.length > 0
    ? {
        "@context": "https://schema.org",
        "@type": "LocalBusiness",
        name: GMB_PROFILE.businessName,
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: GMB_PROFILE.rating,
          reviewCount: GMB_PROFILE.totalReviews,
        },
        review: displayableReviews.map((review) => ({
          "@type": "Review",
          author: { "@type": "Person", name: review.author },
          reviewRating: {
            "@type": "Rating",
            ratingValue: review.rating,
          },
          reviewBody: review.text,
        })),
      }
    : null;

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <JsonLd
        data={
          reviewsSchema
            ? [websiteSchema, homePageSchema, reviewsSchema]
            : [websiteSchema, homePageSchema]
        }
      />
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <Reviews />
      <GettingStarted />
      <AreasServed />
      <Faq />
      <SeamlessNDIS />
    </main>
  );
}
