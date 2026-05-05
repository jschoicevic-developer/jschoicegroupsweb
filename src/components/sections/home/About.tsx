"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ChevronRight, HeartHandshake, ShieldCheck, MapPin, Users, Brain, Globe, Heart, Sparkles } from "lucide-react";
import Link from "next/link";

const About = () => {
    return (
        <section className="relative py-12 lg:py-32 bg-white overflow-hidden flex flex-col gap-16 lg:gap-32">
            {/* ENHANCED UI DECORATORS: Expert Level Richness */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-white">
                {/* Floating SVGs & Icons */}
                <motion.div
                    animate={{ y: [0, -40, 0], x: [0, 20, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[5%] left-[3%] text-[var(--primary)] opacity-[0.1]"
                >
                    <Heart size={180} strokeWidth={0.3} fill="currentColor" />
                </motion.div>

                <motion.div
                    animate={{ scale: [1, 1.3, 1], rotate: 45 }}
                    transition={{ duration: 10, repeat: Infinity }}
                    className="absolute top-[15%] right-[2%] text-[var(--secondary)] opacity-[0.1]"
                >
                    <Sparkles size={120} strokeWidth={0.5} />
                </motion.div>

                {/* Abstract Line Paths */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.05]" viewBox="0 0 1440 800">
                    <motion.path
                        d="M-100 200 C 200 100, 400 300, 600 200 S 1000 100, 1540 200"
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 5, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <motion.path
                        d="M-100 600 C 300 700, 600 500, 900 600 S 1200 700, 1540 600"
                        fill="none"
                        stroke="var(--secondary)"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 7, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                    />
                </svg>

                {/* Scattered Micro-Decorators (Dots, Pluses, Circles) */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={`decor-${i}`}
                        className="absolute"
                        style={{
                            left: `${(i * 7) % 100}%`,
                            top: `${(i * 11) % 100}%`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.15 }}
                    >
                        {i % 4 === 0 ? <div className="w-1.5 h-1.5 rounded-full bg-[var(--primary)]" /> :
                            i % 4 === 1 ? <div className="w-1 h-1 rounded-full bg-[var(--secondary)]" /> :
                                i % 4 === 2 ? <ShieldCheck size={12} className="text-gray-400" /> :
                                    <div className="w-1 h-1 bg-gray-300 rotate-45" />}
                    </motion.div>
                ))}

                {/* Large Background Text / Watermark - Professional Expert Touch */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[18vw] font-black text-gray-500/[0.03] select-none pointer-events-none uppercase tracking-tighter">
                    Empower
                </div>
            </div>

            {/* PART 1: NDIS Service Providers (Image Left 35%, Text Right 65%) */}
            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-[0.7fr_1.3fr] gap-6 lg:gap-8 items-center">

                    {/* Image Block - MAXIMIZED WIDTH TO REMOVE GAP */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative order-2 lg:order-1 w-full"
                    >
                        <div className="relative z-10 w-full pr-4">
                            {/* Masked Image Container - Broader aspect to eliminate gap */}
                            <div
                                className="relative aspect-[4/3] lg:aspect-[1.3] overflow-hidden shadow-2xl group border-8 border-white"
                                style={{ borderRadius: '40% 60% 70% 30% / 40% 50% 60% 70%' }}
                            >
                                <Image quality={80}
                                    src="/images/home/about-1.webp"
                                    alt="Care in Melbourne"
                                    fill
                                    className="object-cover transform transition-transform duration-1000 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-primary/5 group-hover:bg-transparent transition-colors duration-500" />
                            </div>
                        </div>

                        {/* Decorative Background Blob behind image */}
                        <div className="absolute -inset-4 bg-primary/5 blur-2xl rounded-full -z-10" />
                    </motion.div>

                    {/* Text Block */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col space-y-8 order-1 lg:order-2"
                    >
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-secondary font-black uppercase text-xs tracking-[0.2em] sm:text-[10px] md:text-xs">
                                <span className="h-px w-8 bg-secondary" />
                                Your Local Melbourne Partner
                            </div>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground leading-[1.1] tracking-tight uppercase">
                                NDIS Service Providers in <span className="text-primary">Melbourne</span>
                            </h2>
                        </div>
                        <div className="space-y-4 text-lg text-gray-600 leading-relaxed font-medium">
                            <p>
                                Navigating the NDIS can be complex, but you don’t have to do it alone. Based in Point Cook, <span className="text-[#2D3748] font-bold">Js Choice</span> is a registered NDIS provider committed to enhancing the well-being of participants across Melbourne’s Western and Northern suburbs.
                            </p>
                            <p className="text-gray-500">
                                Our focus is simple, enhancing everyday wellbeing through personalised, respectful, and participant-led support. Whether you need help at home, in the community, or with specialist services, our team is here to support you in reaching your goals.
                            </p>
                        </div>
                        <div className="pt-2">
                            <Button asChild className="h-14 px-10 rounded-full bg-primary hover:brightness-105 text-[#1A202C] font-bold text-sm uppercase tracking-wider gap-3 shadow-xl transition-all border-none">
                                <Link href="/about-us" className="flex items-center">
                                    <span>About JS Choice Group</span>
                                    <ChevronRight size={18} strokeWidth={3} className="ml-1 text-[#1A202C]" />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* PART 2: About Us (Text Left 65%, Image Right 35%) */}
            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 w-full">
                <div className="grid grid-cols-1 lg:grid-cols-[1.3fr_0.7fr] gap-6 lg:gap-8 items-center">

                    {/* Text Block */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col space-y-8 relative z-10"
                    >
                        <div className="space-y-3">
                            <div className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-[0.2em]">
                                <span className="h-px w-8 bg-primary" />
                                Committed to Inclusion
                            </div>
                            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-foreground relative z-10 leading-[1.1] tracking-tight uppercase">
                                Serving the Melbourne <span className="text-secondary">Community</span>
                            </h2>
                        </div>
                        <div className="space-y-4 text-lg text-gray-600 leading-relaxed font-medium">
                            <p>
                                Welcome to <span className="text-[#ABB3F1] font-bold">Js Choice Care and Support!</span> We are a team of dedicated professionals who believe that care should be inclusive, respectful, and tailored to the individual.
                            </p>
                            <p className="text-gray-500">
                                We have extensive experience supporting individuals with diverse needs, including:
                            </p>
                            <ul className="list-disc pl-5 space-y-1 text-gray-500">
                                <li>Autism Spectrum Disorders (ASD) & ADHD</li>
                                <li>Pathological Demand Avoidance (PDA)</li>
                                <li>Psychosocial Disabilities (Schizophrenia, PTSD)</li>
                                <li>Physical & Neurological conditions (Stroke, Muscular Dystrophy)</li>
                            </ul>
                            <p className="text-gray-500">
                                Our Difference? We never stop learning. We recognise the beautiful ways different brains work and design support plans that suit your needs, not ours. We give you the tools to navigate the NDIS your way.
                            </p>
                        </div>

                        {/* Feature Cards with Glassmorphism */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6 pt-4">
                            <div className="flex items-center gap-4 p-5 rounded-3xl glass-card">
                                <div className="p-3 rounded-2xl bg-primary/10 text-primary shadow-inner">
                                    <Brain size={24} strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-foreground">Specialised Care</span>
                                    <span className="text-xs text-muted-foreground font-medium">Diverse Conditions</span>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-5 rounded-3xl glass-card">
                                <div className="p-3 rounded-2xl bg-secondary/10 text-secondary shadow-inner">
                                    <MapPin size={24} strokeWidth={1.5} />
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-foreground">Point Cook Base</span>
                                    <span className="text-xs text-muted-foreground font-medium">Melbourne Wide</span>
                                </div>
                            </div>
                        </div>

                        <div className="pt-4">
                            <Button asChild className="h-14 px-10 rounded-full bg-primary hover:brightness-105 text-[#1A202C] font-bold text-sm uppercase tracking-wider gap-3 shadow-xl transition-all border-none">
                                <Link href="/#services" className="flex items-center">
                                    <span>Explore Services</span>
                                    <ChevronRight size={18} strokeWidth={3} className="ml-1 text-[#1A202C]" />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>

                    {/* Image Block (Overlapping Composition) - WIDER TO REMOVE GAP */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative flex items-center justify-end w-full lg:pl-12"
                    >
                        {/* Primary Image - Fill cell better */}
                        <div className="w-[100%] aspect-[4/4] relative z-10 overflow-hidden shadow-2xl border-[12px] border-white transition-transform duration-700 hover:scale-[1.03]"
                            style={{ borderRadius: '30% 70% 40% 60% / 50% 30% 70% 50%' }}>
                            <Image quality={80}
                                src="/images/home/about-2.webp"
                                alt="Care worker"
                                fill
                                sizes="(max-width: 1024px) 100vw, 50vw"
                                className="object-cover"
                            />
                        </div>

{/* Decorative floating badge - Better positioning */}
                        <div className="absolute top-[10%] right-0 -translate-y-1/2 z-30 hidden lg:block">
                            <motion.div
                                animate={{ y: [0, -15, 0] }}
                                transition={{ duration: 4, repeat: Infinity }}
                                className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-primary/20"
                            >
                                <Heart size={40} className="text-secondary" fill="var(--secondary)" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default About;
