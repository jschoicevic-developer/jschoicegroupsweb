"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageCircleQuestion, Users, Sparkles, ChevronRight, Heart, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const benefits = [
    {
        title: "Personalised Supports",
        text: "We provide personalised supports to make your life easier",
        icon: Sparkles,
        color: "#ABB3F1"
    },
    {
        title: "Expert Coordination",
        text: "Our support workers are trained, experienced, and will coordinate with you and your family",
        icon: Users,
        color: "#F1ABAB"
    },
    {
        title: "Social Inclusion",
        text: "Our providers promote social inclusion and help you reach your goals",
        icon: Sparkles,
        color: "#68D391"
    },
    {
        title: "NDIS Compliance",
        text: "We comply with NDIS guidelines to provide effective supports to participants",
        icon: CheckCircle2,
        color: "#ABB3F1"
    }
];

const Features = () => {
    return (
        <section className="relative py-24 bg-white overflow-hidden">
            {/* FRIENDLY & INCLUSIVE BACKGROUND - White & Clean */}
            <div className="absolute inset-0 z-0 pointer-events-none bg-white">
                {/* Soft Organic Blobs for a 'Homely' feel */}
                <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-[var(--primary)]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-[var(--secondary)]/5 rounded-full blur-[100px]" />

                {/* Micro-Patterns: Differentiated from other sections */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 100 100" preserveAspectRatio="none">
                    <pattern id="grid-features" width="10" height="10" patternUnits="userSpaceOnUse">
                        <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" />
                    </pattern>
                    <rect width="100" height="100" fill="url(#grid-features)" />
                </svg>

                {/* Playful & Caring Floating Icons */}
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[15%] left-[10%] text-[var(--primary)] opacity-[0.15]"
                >
                    <Heart size={120} strokeWidth={0.5} fill="currentColor" />
                </motion.div>

                <motion.div
                    animate={{ y: [0, 20, 0], scale: [1, 1.1, 1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-[20%] right-[10%] text-[var(--secondary)] opacity-[0.15]"
                >
                    <Sparkles size={140} strokeWidth={0.5} />
                </motion.div>

                {/* Soft Dot Clusters - More 'Child-Friendly' & Visible */}
                <div className="absolute top-[40%] left-[5%] w-48 h-48 bg-[radial-gradient(var(--primary)_3px,transparent_3px)] [background-size:24px_24px] opacity-[0.1]" />
                <div className="absolute top-[20%] right-[5%] w-48 h-48 bg-[radial-gradient(var(--secondary)_3px,transparent_3px)] [background-size:24px_24px] opacity-[0.1]" />

                {/* Friendly Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12vw] font-black text-gray-500/[0.02] select-none uppercase tracking-tighter leading-none pointer-events-none">
                    Homely
                </div>
            </div>

            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">

                    {/* Left Column: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col space-y-8"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-[var(--primary)] font-black uppercase text-xs tracking-[0.3em]">
                                <span className="h-px w-10 bg-[var(--primary)]" />
                                Friendly Support
                                <span className="h-px w-10 bg-[var(--primary)]" />
                            </div>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] leading-[1.05] tracking-tighter uppercase drop-shadow-sm">
                                Why We are the <br className="hidden lg:block" /> <span className="text-[var(--secondary)]">Ideal NDIS Providers?</span>
                            </h2>
                        </div>

                        <p className="text-lg text-gray-600 font-medium leading-relaxed">
                            Js Choice – Care and Support is undoubtedly the most suitable NDIS organisation in Melbourne since:
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {benefits.map((item, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    className="p-6 rounded-[2rem] bg-white border-2 border-gray-50 group hover:shadow-2xl hover:border-[var(--primary)]/20 transition-all duration-500 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
                                >
                                    <div
                                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5 transition-transform group-hover:scale-110 shadow-inner"
                                        style={{ backgroundColor: `${item.color}15`, color: item.color }}
                                    >
                                        <item.icon size={24} strokeWidth={2.5} />
                                    </div>
                                    <p className="text-lg font-black text-[#2D3748] leading-tight uppercase tracking-tighter">
                                        {item.title}
                                    </p>
                                    <p className="text-sm text-gray-500 font-bold leading-relaxed mt-2">
                                        {item.text}
                                    </p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="pt-4 flex flex-col sm:flex-row items-center gap-6">
                            <Button asChild className="h-14 px-10 rounded-full bg-primary hover:brightness-105 text-[#1A202C] font-black text-xs uppercase tracking-[0.2em] shadow-lg hover:shadow-primary/30 transition-all border-none relative overflow-hidden group">
                                <Link href="/contact" className="flex items-center gap-2">
                                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(circle_at_2px_2px,currentColor_1px,transparent_0)] bg-[size:8px_8px]" />
                                    <span className="relative z-10">Get in Touch</span>
                                    <ChevronRight size={16} strokeWidth={3} className="relative z-10" />
                                </Link>
                            </Button>

                            <div className="flex items-center gap-3">
                                <div className="p-2 rounded-xl bg-[var(--primary)]/10 text-[var(--primary)]">
                                    <MessageCircleQuestion size={20} />
                                </div>
                                <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Have questions? Ask us.</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Column: Image */}
                    <motion.div
                        initial={{ opacity: 0, x: 50, scale: 0.95 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative"
                    >
                        <div className="relative rounded-[3rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.15)] border-[12px] border-white group aspect-[4/5] w-full">
                            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                            <Image quality={80}
                                src="/images/home/feature1.webp"
                                alt="Why choose us"
                                fill
                                className="object-cover transform transition-transform duration-1000 group-hover:scale-105"
                            />
                        </div>

                        {/* Floating Credibility Patch */}
                        <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-[2rem] shadow-xl z-20 border border-gray-50 flex flex-col gap-2">
                            <span className="text-[10px] font-black text-[#ABB3F1] uppercase tracking-[0.2em]">Committed to</span>
                            <span className="text-lg font-black text-[#2D3748]">NDIS Guidelines</span>
                            <div className="flex -space-x-2 mt-2">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 overflow-hidden relative">
                                        <Image quality={80}
                                            src={`/images/home/avatar-${i}.webp`}
                                            alt="Avatar"
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                ))}
                                <div className="w-8 h-8 rounded-full border-2 border-white bg-[#F1ABAB] flex items-center justify-center text-[10px] font-black text-white">
                                    5k+
                                </div>
                            </div>
                        </div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};

export default Features;
