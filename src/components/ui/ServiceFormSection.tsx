"use client";

import { Suspense } from "react";
import { ShieldCheck, Star, Clock, Phone } from "lucide-react";
import LandingForm from "@/components/landing/LandingForm";

interface ServiceFormSectionProps {
  source?: string;
  sourcePage: string;
  defaultService?: string;
}

function FormShimmer() {
  return (
    <div className="bg-white rounded-[2rem] shadow-2xl p-6 sm:p-8 animate-pulse">
      <div className="h-7 bg-gray-200 rounded-xl w-3/4 mb-2" />
      <div className="h-4 bg-gray-100 rounded-xl w-1/3 mb-6" />
      {[...Array(4)].map((_, i) => (
        <div key={i} className="h-14 bg-gray-100 rounded-2xl mb-3" />
      ))}
      <div className="h-14 bg-gray-200 rounded-full mt-1" />
    </div>
  );
}

const trustSignals = [
  { icon: ShieldCheck, label: "Registered NDIS Provider" },
  { icon: Star, label: "5-Star Google Rated" },
  { icon: Clock, label: "We Respond Within 24 Hours" },
];

export default function ServiceFormSection({
  source = "service_page",
  sourcePage,
  defaultService = "",
}: ServiceFormSectionProps) {
  return (
    <section className="py-16 sm:py-24 px-4 bg-gradient-to-br from-[#1A202C] to-[#2D3748]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: Trust copy */}
          <div className="w-full lg:w-1/2 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-5">
              Get Your Free NDIS Referral
            </h2>
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-8">
              Fill out the short form and our team will be in touch within 24
              hours to discuss your needs. No obligations, no pressure.
            </p>

            {/* Trust badges */}
            <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-4 mb-8 justify-center lg:justify-start">
              {trustSignals.map(({ icon: Icon, label }) => (
                <li key={label} className="flex items-center gap-2">
                  <Icon size={18} className="text-green-400 flex-shrink-0" />
                  <span className="text-white text-sm font-semibold">{label}</span>
                </li>
              ))}
            </ul>

            {/* Phone */}
            <a
              href="tel:1300572464"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-6 py-3.5 rounded-full font-bold text-sm hover:bg-white/10 transition-all duration-300"
            >
              <Phone size={16} />
              1300 572 464
            </a>
          </div>

          {/* Right: Form */}
          <div className="w-full lg:w-1/2">
            <Suspense fallback={<FormShimmer />}>
              <LandingForm
                source={source}
                sourcePage={sourcePage}
                defaultService={defaultService}
              />
            </Suspense>
          </div>
        </div>
      </div>
    </section>
  );
}
