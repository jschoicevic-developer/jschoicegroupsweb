"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, ChevronRight, HeartHandshake, Brain, Globe } from "lucide-react";
import Link from "next/link";

const heroImages = [
    "/images/home/about-3.webp",
    "/images/home/hero2.webp",
    "/images/home/hero3.webp",
    "/images/home/hero1.webp",
];

const Hero = () => {
    const [currentImage, setCurrentImage] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImage((prev) => (prev + 1) % heroImages.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative w-full h-[90vh] min-h-[600px] overflow-hidden bg-[#2D3748]">
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
                        src={heroImages[currentImage]}
                        alt="Hero Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    {/* Strong Left-to-Right Gradient for Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#1A202C]/90 via-[#1A202C]/60 to-transparent z-10" />
                    {/* Subtle Overlay to unify image tone */}
                    <div className="absolute inset-0 bg-[#2D3748]/20 mix-blend-multiply z-10" />
                </motion.div>
            </AnimatePresence>

            {/* MAIN CONTENT */}
            <div className="relative z-20 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-start text-left">

                {/* 1. Badge */}
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

                {/* 2. Headline Hierarchy */}
                <div className="space-y-4 max-w-3xl mb-10">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-2xl sm:text-3xl font-bold text-white/80"
                    >
                        Js Choice
                    </motion.h2>
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight drop-shadow-xl"
                    >
                        Care And <span className="text-[#ABB3F1]">Support</span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-lg font-medium pt-4"
                    >
                        At Js Choice – Care and Support, we understand <span className="text-white font-bold">neurodiversity</span>, embrace <span className="text-white font-bold">cultural diversity</span>, and acknowledge <span className="text-white font-bold">inclusion in care</span>.
                    </motion.p>
                </div>

                {/* Value Indicators (Subtle Chips) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="flex flex-wrap gap-4 mb-12"
                >
                    {
                        [
                            { icon: Brain, label: "Neurodiversity" },
                            { icon: Globe, label: "Diversity" },
                            { icon: HeartHandshake, label: "Inclusion" }
                        ].map((item, i) => (
                            <div key={item.label} className="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
                                <item.icon size={18} className="text-[#ABB3F1]" strokeWidth={2.5} />
                                <span className="text-sm font-semibold text-white tracking-wide">{item.label}</span>
                            </div>
                        ))
                    }
                </motion.div>

                {/* 3. CTA Design */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="flex flex-col sm:flex-row items-start gap-5"
                >
                    <Button
                        asChild
                        className="h-14 px-10 rounded-full bg-[#ABB3F1] hover:bg-[#9CA5E5] text-[#1A202C] font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
                    >
                        <Link href="/referral" className="flex items-center gap-2">
                            Get Consultations
                            <ChevronRight size={18} strokeWidth={3} />
                        </Link>
                    </Button>

                    <a
                        href="tel:130057246423"
                        className="h-14 px-8 rounded-full border border-white/30 hover:bg-white/10 flex items-center gap-3 text-white transition-all hover:scale-105"
                    >
                        <Phone size={18} />
                        <span className="font-semibold tracking-wide">130057246423</span>
                    </a>
                </motion.div>

                {/* Slider Indicators (Bottom Left) */}
                <div className="absolute bottom-10 left-8 sm:left-12 lg:left-16 flex gap-3 z-30">
                    {
                        heroImages.map((_, idx) => (
                            <button
                                key={idx}
                                onClick={() => setCurrentImage(idx)}
                                className={`h-1.5 rounded-full transition-all duration-500 ${currentImage === idx ? "w-10 bg-[#ABB3F1]" : "w-1.5 bg-white/40 hover:bg-white/80"}`}
                                aria-label={`Go to slide ${idx + 1}`}
                            />
                        ))
                    }
                </div>
            </div>
        </section>
    );
};

export default Hero;