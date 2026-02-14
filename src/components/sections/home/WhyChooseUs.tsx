"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, Heart, Sparkles, ShieldCheck, Brain, Globe } from "lucide-react";
import Link from "next/link";

const WhyChooseUs = () => {
    return (
        <section className="relative py-24 lg:py-32 overflow-hidden min-h-[85vh] flex items-center justify-center">
            {/* 1. BACKGROUND IMAGES WITH FIXED POSITION (PARALLAX FEEL) */}
            <div className="absolute inset-0 z-0">
                {/* Image 1: Decorative Frame */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: "url('/banner-frame-img.webp')",
                        backgroundAttachment: "fixed"
                    }}
                />

                {/* Image 2: Main Image */}
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90"
                    style={{
                        backgroundImage: "url('/images/home/choose-us-bg.webp')",
                        backgroundAttachment: "fixed"
                    }}
                />

                {/* Dark Overlay - LIGHTER THAN BEFORE (60% instead of 85%) */}
                <div className="absolute inset-0 bg-black/60" />

                {/* Gradient Overlay for Text Readability - Similar to Hero */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#1A202C]/80 via-[#1A202C]/40 to-transparent z-10" />
            </div>

            {/* 2. CONTENT IN FRONT */}
            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-20 w-full">

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Left: Content Text */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-8"
                    >
                        {/* Header Section */}
                        <div className="space-y-6">
                            <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="flex items-center gap-3 text-[#ABB3F1] font-bold uppercase text-xs tracking-widest mb-4">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#ABB3F1] animate-pulse" />
                                    Distinguished Support
                                </div>
                                <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight uppercase drop-shadow-xl mb-6">
                                    Why Melbourne Families Choose JS Choice?
                                </h2>
                                <p className="text-lg text-white/90 font-medium leading-relaxed max-w-xl">
                                    JS Choice – Care and Support is a trusted choice for NDIS participants across Melbourne because we prioritise people, always.
                                </p>
                                <p className="text-lg text-white/80 font-medium leading-relaxed max-w-xl mt-4">
                                    We embrace all diversity within our community. We design plans that best suit your needs. We do not decide for you; we give you the tools needed to navigate the NDIS landscape.
                                </p>
                            </motion.div>
                        </div>

                        <div className="pt-4">
                            <Button asChild className="h-14 px-10 rounded-full bg-[#ABB3F1] hover:bg-[#9CA5E5] text-[#1A202C] font-bold text-base uppercase tracking-widest shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all border-none relative overflow-hidden group">
                                <Link href="/about" className="flex items-center gap-2">
                                    <span className="relative z-10">Learn More</span>
                                    <ChevronRight size={18} strokeWidth={3} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Right: Feature Cards Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        {[
                            { icon: Brain, title: "Neuro-Affirming Approach", desc: "We embrace all diversity. We understand neurodivergence (ASD, ADHD, PDA) and adapt our communication and support styles to suit you.", color: "text-[#ABB3F1]", bg: "bg-[#ABB3F1]" },
                            { icon: Globe, title: "Culturally Inclusive", desc: "We respect your background, traditions, and language, ensuring your care feels like home.", color: "text-pink-400", bg: "bg-pink-500" },
                            { icon: Sparkles, title: "Capacity Building", desc: "We coordinate with you to build your skills for the future.", color: "text-blue-400", bg: "bg-blue-500" },
                            { icon: ShieldCheck, title: "Compliance & Trust", desc: "Fully NDIS registered and compliant, ensuring your safety and quality of care are never compromised.", color: "text-green-400", bg: "bg-green-500" }
                        ].map((feature, idx) => (
                            <motion.div
                                key={idx}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 + (idx * 0.1) }}
                                className="p-6 rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group h-full"
                            >
                                <div className={`h-12 w-12 rounded-xl ${feature.bg}/20 flex items-center justify-center ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                                    <feature.icon size={24} strokeWidth={2.5} />
                                </div>
                                <h4 className="text-base font-bold text-white uppercase tracking-wider leading-tight mb-2">
                                    {feature.title}
                                </h4>
                                <p className="text-sm text-white/70 font-medium leading-relaxed">
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

            </div>


            <div className="absolute bottom-10 right-10 opacity-20 animate-pulse delay-700 pointer-events-none">
                <Sparkles size={100} className="text-[#ABB3F1]" />
            </div>
        </section>
    );
};

export default WhyChooseUs;
