"use client";

import { Phone } from "lucide-react";

interface ServiceCTAProps {
  heading?: string;
  subheading?: string;
}

export default function ServiceCTA({
  heading = "Ready to Get Started?",
  subheading = "Request your free referral today. Our team will be in touch within 24 hours.",
}: ServiceCTAProps) {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-12 sm:py-16 px-4 bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-black text-[#1A202C] mb-3">
          {heading}
        </h2>
        <p className="text-[#1A202C]/70 text-lg mb-8 max-w-xl mx-auto">
          {subheading}
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <button
            onClick={scrollToForm}
            className="relative overflow-hidden bg-[#1A202C] text-white px-8 py-4 rounded-full font-black uppercase tracking-wider text-sm hover:opacity-90 transition-opacity"
          >
            <span className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_0.5px,transparent_0.5px)] bg-[length:4px_4px] pointer-events-none" />
            <span className="relative">Get a Free Referral</span>
          </button>
          <a
            href="tel:1300572464"
            className="flex items-center gap-2 border-2 border-[#1A202C]/30 text-[#1A202C] px-6 py-4 rounded-full font-bold text-sm hover:bg-[#1A202C]/5 transition-colors"
          >
            <Phone size={16} />
            1300 572 464
          </a>
        </div>
      </div>
    </section>
  );
}
