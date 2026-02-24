import Hero from "@/components/sections/home/Hero";
import About from "@/components/sections/home/About";
import Services from "@/components/sections/home/Services";
import WhyChooseUs from "@/components/sections/home/WhyChooseUs";
import GettingStarted from "@/components/sections/home/GettingStarted";
import Faq from "@/components/sections/home/Faq";
import AreasServed from "@/components/sections/home/AreasServed";
import SeamlessNDIS from "@/components/sections/home/SeamlessNDIS";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen w-full overflow-x-hidden">
      <Hero />
      <About />
      <Services />
      <WhyChooseUs />
      <GettingStarted />
      <Faq />
      <AreasServed />
      <SeamlessNDIS />
    </main>
  );
}
