"use client";

import { motion } from "framer-motion";
import { Phone } from "lucide-react";

export default function LandingFinalCta() {
  return (
    <section className="py-16 sm:py-24 px-4 bg-gradient-to-br from-[#1A202C] to-[#2D3748]">
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-black text-white font-heading mb-4">
            Ready to Get the Support You Deserve?
          </h2>
          <p className="text-gray-300 text-lg mb-10 leading-relaxed">
            Request your free referral today. Our team will be in touch within
            24 hours.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#lead-form"
              className="relative overflow-hidden w-full sm:w-auto bg-primary text-[#1A202C] px-10 py-4 rounded-full font-black uppercase tracking-wider text-sm text-center"
            >
              {/* Dot pattern overlay */}
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{
                  backgroundImage:
                    "radial-gradient(circle, #1A202C 1px, transparent 1px)",
                  backgroundSize: "12px 12px",
                }}
              />
              <span className="relative">Request a Free Referral</span>
            </a>

            <a
              href="tel:1300572464"
              className="w-full sm:w-auto flex items-center justify-center gap-2 border-2 border-secondary text-white hover:bg-secondary/10 px-10 py-4 rounded-full font-black uppercase tracking-wider text-sm transition-colors"
            >
              <Phone className="w-4 h-4 shrink-0" />
              Call 1300 572 464
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
