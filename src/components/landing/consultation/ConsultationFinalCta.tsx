"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const scrollToForm = () => {
  document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
};

const ConsultationFinalCta = () => {
  return (
    <section className="relative py-20 lg:py-24 bg-[#ABB3F1] overflow-hidden">
      {/* Background decorations — identical to SeamlessNDIS */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-0 right-0 w-[40%] h-full bg-white/5 skew-x-12 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[30%] h-full bg-black/5 -skew-x-12 -translate-x-1/4" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:32px_32px] opacity-30" />
        <div className="absolute top-10 left-[10%] w-24 h-24 border-2 border-white/10 rounded-full" />
        <div className="absolute bottom-10 right-[15%] w-32 h-32 border-4 border-black/5 rounded-3xl rotate-12" />
      </div>

      <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight">
            Ready to Get NDIS Support That Actually{" "}
            <span className="text-[#2D3748]">Fits You?</span>
          </h2>

          <p className="text-lg md:text-xl text-white/90 font-medium mb-12 max-w-2xl mx-auto leading-relaxed">
            Speak with a care coordinator today — free, no-obligation, and tailored to
            your goals.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Button 1 — white fill, scrolls to form */}
            <motion.button
              onClick={scrollToForm}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-14 px-10 rounded-full bg-white text-[#2D3748] font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-2xl hover:shadow-xl hover:bg-gray-50 transition-all min-w-[240px]"
            >
              Request Free Callback
              <ArrowRight size={18} />
            </motion.button>

            {/* Button 2 — dark outlined, scrolls to form */}
            <motion.button
              onClick={scrollToForm}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-14 px-10 rounded-full bg-[#2D3748] hover:bg-black text-white font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all min-w-[240px]"
            >
              Book a Free Consultation
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Branding text */}
      <div className="absolute bottom-6 left-0 w-full text-center pointer-events-none opacity-20">
        <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">
          Expert Care • Seamless Support • Independence
        </span>
      </div>
    </section>
  );
};

export default ConsultationFinalCta;
