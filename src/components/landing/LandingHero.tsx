"use client";

import { Suspense } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckCircle, Phone } from "lucide-react";
import LandingForm from "./LandingForm";

const VALUE_PILLS = ["Neuro-Affirming", "Culturally Inclusive", "Participant-Led"];

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

export default function LandingHero() {
  const scrollToForm = () => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative bg-gradient-to-br from-[#1A202C] to-[#2D3748] py-12 sm:py-16 lg:py-20 overflow-hidden">
      {/* Background image - visible on desktop */}
      <div className="hidden lg:block absolute inset-0">
        <Image
          src="/images/home/hero3.webp"
          alt=""
          fill
          className="object-cover opacity-10"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#1A202C] via-[#1A202C]/95 to-[#1A202C]/70" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
          {/* Left: Content (60%) */}
          <motion.div
            className="w-full lg:w-[60%]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* Eyebrow Badge */}
            <span className="inline-block bg-primary text-[#1A202C] px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider mb-5">
              Trusted NDIS Provider in Melbourne
            </span>

            {/* H1 */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight font-heading mb-5">
              NDIS Support Coordination &amp; Daily Life Assistance in Melbourne
            </h1>

            {/* Subheading */}
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed mb-7">
              Navigating the NDIS shouldn&apos;t feel overwhelming. Whether
              you&apos;re seeking support for yourself or a loved one, our
              experienced coordinators help you access the right services —
              so you can focus on what matters most.
            </p>

            {/* Value Pills */}
            <ul className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-8">
              {VALUE_PILLS.map((pill) => (
                <li key={pill} className="flex items-center gap-2">
                  <CheckCircle size={18} className="text-green-400 flex-shrink-0" />
                  <span className="text-white text-sm font-semibold">{pill}</span>
                </li>
              ))}
            </ul>

            {/* Dual CTA — desktop only */}
            <div className="hidden lg:flex items-center gap-4">
              <button
                onClick={scrollToForm}
                className="relative overflow-hidden bg-primary text-[#1A202C] px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-wider shadow-lg hover:shadow-xl hover:brightness-110 hover:-translate-y-0.5 transition-all duration-300"
              >
                <span className="absolute inset-0 opacity-15 bg-[radial-gradient(#000_0.5px,transparent_0.5px)] bg-[length:4px_4px] pointer-events-none" />
                Get My Free Referral
              </button>

              <a
                href="tel:1300572464"
                className="flex items-center gap-2 border border-white/30 text-white px-6 py-3.5 rounded-full font-bold text-sm hover:bg-white/10 transition-all duration-300"
              >
                <Phone size={16} />
                1300 572 464
              </a>
            </div>
          </motion.div>

          {/* Right: Form (40%) */}
          <motion.div
            className="w-full lg:w-[40%]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
          >
            <Suspense fallback={<FormShimmer />}>
              <LandingForm />
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
