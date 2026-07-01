"use client";

import { Suspense } from "react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Phone, Brain, Globe, HeartHandshake } from "lucide-react";
import ConsultationForm from "./ConsultationForm";

const heroImages = [
  "/images/home/hero2.webp",
  "/images/home/hero3.webp",
  "/images/home/hero1.webp",
];

export default function ConsultationHero() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative w-full min-h-[100vh] overflow-hidden bg-[#2D3748]">
      {/* BACKGROUND SLIDER */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={currentImage}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 z-0"
        >
          <Image
            quality={80}
            src={heroImages[currentImage]}
            alt="Hero Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#1A202C]/90 via-[#1A202C]/70 to-[#1A202C]/50 z-10" />
          <div className="absolute inset-0 bg-[#2D3748]/20 mix-blend-multiply z-10" />
        </motion.div>
      </AnimatePresence>

      {/* MAIN CONTENT — two columns on lg */}
      <div className="relative z-20 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-full min-h-[100vh] flex items-center py-16 lg:py-20">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* LEFT: text content */}
          <div className="flex flex-col items-start text-left">

            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-8"
            >
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white/90 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ABB3F1] animate-pulse" />
                NDIS Registered Provider
              </span>
            </motion.div>

            {/* Headline */}
            <div className="space-y-4 max-w-xl mb-10">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl sm:text-3xl font-bold text-white/80"
              >
                Js Choice
              </motion.p>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight drop-shadow-xl"
              >
                <span className="sr-only">NDIS Service Providers in Melbourne – </span>
                Care And <span className="text-[#ABB3F1]">Support</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-lg font-medium pt-4"
              >
                At Js Choice – Care and Support, we understand{" "}
                <span className="text-white font-bold">neurodiversity</span>, embrace{" "}
                <span className="text-white font-bold">cultural diversity</span>, and
                acknowledge{" "}
                <span className="text-white font-bold">inclusion in care</span>.
              </motion.p>
            </div>

            {/* Value chips */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              {[
                { icon: Brain, label: "Neurodiversity" },
                { icon: Globe, label: "Diversity" },
                { icon: HeartHandshake, label: "Inclusion" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity"
                >
                  <item.icon size={18} className="text-[#ABB3F1]" strokeWidth={2.5} />
                  <span className="text-sm font-semibold text-white tracking-wide">
                    {item.label}
                  </span>
                </div>
              ))}
            </motion.div>

            {/* Phone CTA only (no referral button) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <a
                href="tel:1300572464"
                className="h-14 px-8 rounded-full border border-white/30 hover:bg-white/10 flex items-center gap-3 text-white transition-all hover:scale-105"
              >
                <Phone size={18} />
                <span className="font-semibold tracking-wide">1300 JS CHOICE</span>
              </a>
            </motion.div>
          </div>

          {/* RIGHT: consultation form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="w-full"
          >
            <Suspense fallback={null}>
              <ConsultationForm />
            </Suspense>
          </motion.div>
        </div>
      </div>

      {/* Slider Indicators */}
      <div className="absolute bottom-10 left-8 sm:left-12 lg:left-16 flex gap-3 z-30">
        {heroImages.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentImage(idx)}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              currentImage === idx
                ? "w-10 bg-[#ABB3F1]"
                : "w-1.5 bg-white/40 hover:bg-white/80"
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
