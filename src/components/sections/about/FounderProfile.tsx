"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, Megaphone, Sparkles } from "lucide-react";

const values = [
    {
        icon: "🤝",
        title: "Compassion",
        desc: "Care rooted in real, lived experience",
    },
    {
        icon: "📣",
        title: "Advocacy",
        desc: "Unwavering voice for every participant",
    },
    {
        icon: "🌟",
        title: "Empowerment",
        desc: "Helping people reach their aspirations",
    },
];

const FounderProfile = () => {
    return (
        <section className="relative py-20 lg:py-32 bg-[#F8FAFC] overflow-hidden">
            {/* Background Decorators */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#ABB3F1]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#F1ABAB]/5 rounded-full blur-[100px]" />
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(#ABB3F1_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(circle_at_100%_0%,white,transparent_40%)] opacity-15" />
            </div>

            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-14"
                >
                    <div className="flex items-center justify-center gap-3 text-[var(--primary)] font-black uppercase text-xs tracking-[0.2em] mb-4">
                        <span className="h-px w-8 bg-[var(--primary)]" />
                        Leadership
                        <span className="h-px w-8 bg-[var(--primary)]" />
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] leading-[1.1] tracking-tight uppercase">
                        Meet <span className="text-[#ABB3F1]">Our Founder</span>
                    </h2>
                </motion.div>

                {/* ── FOUNDER CARD ── */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9 }}
                    className="grid grid-cols-1 lg:grid-cols-[280px_1fr] rounded-[28px] overflow-hidden shadow-[0_24px_80px_-12px_rgba(0,0,0,0.12)] bg-white max-w-5xl mx-auto"
                >
                    {/* ── LEFT PANEL ── */}
                    <div className="relative bg-gradient-to-b from-[#1A202C] via-[#2D3748] to-[#3a4a6b] flex flex-col items-center justify-between px-6 pt-10 pb-8 overflow-hidden">
                        {/* Decorative circles */}
                        <div className="absolute bottom-[-80px] right-[-80px] w-[240px] h-[240px] rounded-full border-[48px] border-white/5 pointer-events-none" />
                        <div className="absolute top-[-40px] left-[-40px] w-[130px] h-[130px] rounded-full border-[28px] border-white/6 pointer-events-none" />
                        {/* Subtle primary glow */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-[#ABB3F1]/10 blur-3xl pointer-events-none" />

                        {/* Photo */}
                        <div className="relative z-10 w-[170px] h-[210px] rounded-[18px] border-4 border-white/25 overflow-hidden shadow-2xl">
                            <Image
                                quality={85}
                                src="/JanImage.jpeg"
                                alt="Jan Fardowsi – Founder & Director"
                                fill
                                sizes="170px"
                                className="object-cover object-top"
                            />
                        </div>

                        {/* Name / role */}
                        <div className="relative z-10 text-center mt-6">
                            <p className="text-[9px] font-bold uppercase tracking-[3px] text-white/50 mb-1">
                                Founder &amp; Director
                            </p>
                            <p className="text-[20px] font-black text-white leading-tight">Jan Fardowsi</p>
                            <p className="text-[11px] text-white/55 mt-1 tracking-wide">JS Choice Group</p>
                        </div>

                        {/* Pill */}
                        <div className="relative z-10 mt-6 px-5 py-2 rounded-full bg-[#ABB3F1]/20 border border-[#ABB3F1]/30 text-[9px] font-bold uppercase tracking-[2px] text-[#ABB3F1]">
                            <Sparkles size={10} className="inline mr-1 -mt-0.5" />
                            Leader by Purpose
                        </div>
                    </div>

                    {/* ── RIGHT PANEL ── */}
                    <div className="flex flex-col px-8 md:px-12 py-10">
                        {/* Eyebrow */}
                        <div className="flex items-center gap-3 mb-5">
                            <span className="w-7 h-0.5 bg-[#ABB3F1] rounded-full shrink-0" />
                            <span className="text-[9.5px] font-bold uppercase tracking-[2.5px] text-[#5A67D8]">
                                A Leader Shaped by Purpose &amp; Resilience
                            </span>
                        </div>

                        {/* Bio */}
                        <div className="space-y-4 text-[14px] leading-[1.85] text-gray-500 font-medium mb-6">
                            <p>
                                <span className="font-bold text-[#2D3748]">Jan Fardowsi</span>, Founder and Director of JS Choice Group, brings an extraordinary combination of professional expertise and profound personal insight to disability support services. Her journey into this sector wasn&apos;t merely a career decision — it was a calling born from her own experiences as a devoted mother of children with special needs.
                            </p>
                            <p>
                                Having navigated the complexities of the NDIS system firsthand, Jan established JS Choice Group with a crystal-clear vision: to create a provider that genuinely listens, authentically supports, and consistently empowers every participant to achieve their aspirations.
                            </p>
                        </div>

                        {/* Pull quote */}
                        <blockquote className="border-l-4 border-[#ABB3F1] bg-[#ABB3F1]/8 rounded-r-xl px-5 py-4 mb-7">
                            <p className="text-[14.5px] italic font-medium text-[#2D3748] leading-[1.7]">
                                &ldquo;Every participant deserves to feel heard, valued, and equipped to achieve their aspirations.&rdquo;
                            </p>
                        </blockquote>

                        {/* Value cards */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {values.map((v) => (
                                <div
                                    key={v.title}
                                    className="bg-[#F8F9FF] border border-[#E6E2F8] rounded-2xl p-4 flex flex-col gap-2 hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
                                >
                                    <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#5A67D8] to-[#ABB3F1] flex items-center justify-center text-base">
                                        {v.icon}
                                    </div>
                                    <p className="text-[12px] font-bold text-[#2D3748]">{v.title}</p>
                                    <p className="text-[11px] text-gray-400 leading-snug">{v.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FounderProfile;
