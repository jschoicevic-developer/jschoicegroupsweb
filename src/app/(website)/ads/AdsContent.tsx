"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
    Phone, ChevronRight, ChevronDown, Brain, Globe,
    ShieldCheck, Sparkles, Clock, Users, MapPin, Star, CheckCircle,
    AlertCircle, Heart, Stethoscope, Home, Car, UserCheck,
    MessageCircleQuestion, PhoneCall, Handshake, Rocket, ArrowRight, Send,
    Award, BadgeCheck, Shield, Search, Calculator
} from "lucide-react";

/* ──────────────────────── CTA BUTTON (reused everywhere) ──────────────────────── */
const QuoteCTA = ({ label = "Get Consultations", variant = "primary" }: { label?: string; variant?: "primary" | "secondary" | "dark" | "white" }) => {
    const base = "inline-flex h-12 px-8 rounded-full font-bold text-sm uppercase tracking-wider shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 items-center gap-2";
    const styles = {
        primary: `${base} bg-[#ABB3F1] hover:bg-[#9CA5E5] text-[#1A202C]`,
        secondary: `${base} bg-[#F1ABAB] hover:bg-[#E89A9A] text-[#1A202C]`,
        dark: `${base} bg-[#2D3748] hover:bg-black text-white`,
        white: `${base} bg-white hover:bg-gray-100 text-[#2D3748]`,
    };
    return (
        <a href="#quote" className={styles[variant]}>
            {label}
            <ChevronRight size={16} strokeWidth={3} />
        </a>
    );
};

/* ──────────────────────── SECTION 1: HERO ──────────────────────── */
const HeroSection = () => (
    <section id="hero" className="relative w-full min-h-[90vh] overflow-hidden bg-[#2D3748] flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
            <Image quality={80} src="/images/home/hero1.webp" alt="NDIS Care Melbourne" fill className="object-cover" priority />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A202C]/90 via-[#1A202C]/70 to-[#1A202C]/30 z-10" />
            <div className="absolute inset-0 bg-[#2D3748]/20 mix-blend-multiply z-10" />
        </div>

        <div className="relative z-20 max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                {/* Left: Content */}
                <div>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mb-6">
                        <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/10 text-white/90 text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#ABB3F1] animate-pulse" />
                            NDIS Registered Provider
                        </span>
                    </motion.div>

                    <motion.h1
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                        className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight mb-6"
                    >
                        Empowering Lives Through{" "}
                        <span className="text-[#ABB3F1]">Inclusive Care</span> in Melbourne
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
                        className="text-lg text-white/80 leading-relaxed max-w-xl font-medium mb-8"
                    >
                        Personalised, neuro-affirming NDIS support tailored to your unique needs. From daily living to community participation — we&apos;re with you every step.
                    </motion.p>

                    {/* Bullet Points */}
                    <motion.ul initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="space-y-3 mb-8">
                        {[
                            "Neuro-affirming & culturally inclusive care",
                            "Experienced support workers across Melbourne",
                            "24/7 care services available",
                            "Free consultation — no obligations",
                        ].map((item) => (
                            <li key={item} className="flex items-center gap-3 text-white/90">
                                <CheckCircle size={18} className="text-[#68D391] shrink-0" />
                                <span className="font-medium">{item}</span>
                            </li>
                        ))}
                    </motion.ul>

                    {/* CTAs */}
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} className="flex flex-col sm:flex-row items-start gap-4">
                        <QuoteCTA label="Get Consultations" />
                        <a href="tel:1300572464" className="h-14 px-8 rounded-full border border-white/30 hover:bg-white/10 flex items-center gap-3 text-white transition-all hover:scale-105">
                            <Phone size={18} />
                            <span className="font-semibold tracking-wide">1300 572 464</span>
                        </a>
                    </motion.div>
                </div>

                {/* Right: Trust Metrics */}
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="hidden lg:grid grid-cols-2 gap-4">
                    {[
                        { value: "500+", label: "Participants Supported", icon: Users },
                        { value: "5+", label: "Years Experience", icon: Award },
                        { value: "98%", label: "Satisfaction Rate", icon: Star },
                        { value: "24/7", label: "Care Available", icon: Clock },
                    ].map((stat) => (
                        <div key={stat.label} className="p-6 rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 text-center group hover:bg-white/10 transition-all">
                            <stat.icon size={28} className="text-[#ABB3F1] mx-auto mb-3" />
                            <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-white/70 font-medium">{stat.label}</div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    </section>
);

/* ──────────────────────── SECTION 2: TRUST BADGES ──────────────────────── */
const TrustBadges = () => (
    <section className="relative py-8 bg-[#E8EAFF] border-y border-[#ABB3F1]/20">
        <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                    { icon: BadgeCheck, text: "NDIS Registered", sub: "ABN: 54 644 196 270" },
                    { icon: Shield, text: "Quality & Safeguards", sub: "Fully Compliant" },
                    { icon: Star, text: "Google 5-Star Rated", sub: "Verified Reviews" },
                    { icon: ShieldCheck, text: "100% Satisfaction", sub: "Guaranteed" },
                ].map((badge) => (
                    <motion.div
                        key={badge.text}
                        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        className="flex flex-col items-center gap-2 p-4 group"
                    >
                        <badge.icon size={32} className="text-[#ABB3F1] group-hover:scale-110 transition-transform" />
                        <span className="font-black text-[#2D3748] text-sm uppercase tracking-wide">{badge.text}</span>
                        <span className="text-xs text-gray-500 font-medium">{badge.sub}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    </section>
);

/* ──────────────────────── SECTION 3: SERVICES ──────────────────────── */
const services = [
    { icon: Home, title: "Assistance With Daily Life", desc: "Build independence at home with personalised support for household tasks, personal care, and daily routines." },
    { icon: Brain, title: "Psychosocial Recovery Coaching", desc: "Specialised coaches help manage mental health challenges, build resilience, and design a life of hope and autonomy." },
    { icon: Stethoscope, title: "Community Nursing Care", desc: "Professional clinical care in your home — medication, wound care, and health monitoring by qualified nurses." },
    { icon: Heart, title: "Emergency Respite", desc: "Safe, comfortable short-term accommodation when you need it most. We're here for you around the clock." },
    { icon: Users, title: "Group / Centre Activities", desc: "Engaging group sessions to improve well-being, foster friendships, and build new skills in a supportive space." },
    { icon: Car, title: "Transportation Assistance", desc: "Reliable transport support for medical appointments, shopping, social visits, and community access." },
    { icon: Globe, title: "Community Participation", desc: "Access community resources, attend events, and develop social connections to reduce isolation and build confidence." },
    { icon: UserCheck, title: "Support Coordination", desc: "Expert coordinators to connect you with trusted providers and help you navigate the NDIS landscape." },
];

const ServicesSection = () => (
    <section id="services" className="relative py-24 overflow-hidden bg-white">
        {/* Background decorators */}
        <div className="absolute top-20 right-[-10%] w-[40%] h-[60%] bg-[radial-gradient(#ABB3F1_2px,transparent_2px)] [background-size:24px_24px] opacity-10 pointer-events-none" />
        <div className="absolute bottom-20 left-[-5%] w-[30%] h-[40%] bg-[radial-gradient(#F1ABAB_2px,transparent_2px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <div className="flex items-center justify-center gap-2 text-[#ABB3F1] font-black uppercase text-xs tracking-[0.2em] mb-4">
                        <span className="h-px w-8 bg-[#ABB3F1]" />
                        Our NDIS Services
                        <span className="h-px w-8 bg-[#ABB3F1]" />
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] leading-tight uppercase tracking-tighter mb-4">
                        Comprehensive NDIS Support <span className="text-[#ABB3F1]">Services</span>
                    </h2>
                    <p className="text-lg text-gray-600 font-medium leading-relaxed">
                        Tailored supports designed around your unique needs and goals across Melbourne.
                    </p>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map((service, index) => (
                    <motion.div
                        key={service.title}
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ delay: index * 0.08 }}
                        className="group relative flex flex-col items-center bg-white p-8 rounded-[2.5rem] text-center transition-all duration-500 hover:-translate-y-2 border border-gray-100 shadow-[0_15px_50px_-15px_rgba(0,0,0,0.08)] overflow-hidden"
                    >
                        <div className="w-16 h-16 rounded-2xl bg-[#ABB3F1]/10 flex items-center justify-center text-[#ABB3F1] mb-5 group-hover:scale-110 group-hover:bg-[#ABB3F1]/20 transition-all">
                            <service.icon size={28} strokeWidth={2} />
                        </div>
                        <h3 className="text-base font-black text-[#2D3748] mb-3 uppercase tracking-tight leading-tight min-h-[48px] flex items-center">
                            {service.title}
                        </h3>
                        <p className="text-sm text-gray-600 font-medium leading-relaxed line-clamp-3">{service.desc}</p>
                    </motion.div>
                ))}
            </div>

            {/* CTA after services */}
            <div className="mt-14 text-center">
                <QuoteCTA label="Get Support Today" variant="dark" />
            </div>
        </div>
    </section>
);

/* ──────────────────────── SECTION 4: WHY CHOOSE US ──────────────────────── */
const WhyChooseSection = () => (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden min-h-[80vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90" style={{ backgroundImage: "url('/images/home/choose-us-bg.webp')", backgroundAttachment: "fixed" }} />
            <div className="absolute inset-0 bg-black/65" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#1A202C]/80 via-[#1A202C]/40 to-transparent z-10" />
        </div>

        <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-20 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                {/* Left: Content */}
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-8">
                    <div className="space-y-6">
                        <div className="flex items-center gap-3 text-[#ABB3F1] font-bold uppercase text-xs tracking-widest">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#ABB3F1] animate-pulse" />
                            Why Choose JS Choice
                        </div>
                        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight uppercase">
                            Because We Never Stop <span className="text-[#ABB3F1]">Learning</span>
                        </h2>
                        <p className="text-lg text-white/90 font-medium leading-relaxed max-w-xl">
                            As a neuro-affirming NDIS provider, we recognise all the various ways our brains work. We embrace all diversity within our community and design plans that best suit your needs.
                        </p>
                        <p className="text-lg text-white/75 font-medium leading-relaxed max-w-xl">
                            We don&apos;t decide for you — we give you the tools needed to navigate the NDIS landscape. Our trained support workers coordinate with you and your family to ensure seamless service delivery.
                        </p>
                    </div>
                    <div className="pt-2">
                        <QuoteCTA label="Start Your Journey" />
                    </div>
                </motion.div>

                {/* Right: Feature Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    {[
                        { icon: Brain, title: "Neuro-Affirming", desc: "We embrace neurodivergence (ASD, ADHD, PDA) and adapt our support styles to suit you.", color: "text-[#ABB3F1]", bg: "bg-[#ABB3F1]" },
                        { icon: Globe, title: "Culturally Inclusive", desc: "We respect your background, traditions, and language — care that feels like home.", color: "text-pink-400", bg: "bg-pink-500" },
                        { icon: Sparkles, title: "Capacity Building", desc: "We coordinate with you to build your skills and independence for the future.", color: "text-blue-400", bg: "bg-blue-500" },
                        { icon: ShieldCheck, title: "Compliance & Trust", desc: "Fully NDIS registered and compliant. Your safety and quality of care are never compromised.", color: "text-green-400", bg: "bg-green-500" },
                    ].map((f, idx) => (
                        <motion.div
                            key={f.title}
                            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            transition={{ delay: 0.2 + idx * 0.1 }}
                            className="p-6 rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all group"
                        >
                            <div className={`h-12 w-12 rounded-xl ${f.bg}/20 flex items-center justify-center ${f.color} mb-4 group-hover:scale-110 transition-transform`}>
                                <f.icon size={24} strokeWidth={2.5} />
                            </div>
                            <h4 className="text-base font-bold text-white uppercase tracking-wider leading-tight mb-2">{f.title}</h4>
                            <p className="text-sm text-white/70 font-medium leading-relaxed">{f.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    </section>
);

/* ──────────────────────── SECTION 5: PROBLEM → SOLUTION ──────────────────────── */
const ProblemSolution = () => (
    <section className="relative py-24 bg-white overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] leading-tight uppercase tracking-tighter mb-4">
                        Navigating the NDIS <span className="text-[#F1ABAB]">Shouldn&apos;t Be Hard</span>
                    </h2>
                    <p className="text-lg text-gray-600 font-medium leading-relaxed">
                        We understand the challenges. That&apos;s why we make it simple.
                    </p>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                {/* Problem Column */}
                <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-50 border border-red-100 text-red-600 text-xs font-bold uppercase tracking-widest">
                        Common Challenges
                    </div>
                    {[
                        "Struggling to find a reliable, culturally sensitive NDIS provider",
                        "Feeling overwhelmed by NDIS paperwork and plan management",
                        "Support workers who don't understand neurodiversity",
                        "Inconsistent care that doesn't match your goals",
                    ].map((problem) => (
                        <div key={problem} className="flex items-start gap-4 p-5 rounded-2xl bg-red-50/50 border border-red-100/50">
                            <AlertCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
                            <span className="text-gray-700 font-medium">{problem}</span>
                        </div>
                    ))}
                </motion.div>

                {/* Solution Column */}
                <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-50 border border-green-100 text-green-600 text-xs font-bold uppercase tracking-widest">
                        Our Solution
                    </div>
                    {[
                        "Culturally diverse team that respects your background and traditions",
                        "Dedicated support coordinators to handle all NDIS complexities",
                        "Neuro-affirming approach — we adapt to how your brain works",
                        "Person-centred care plans designed around YOUR goals",
                    ].map((solution) => (
                        <div key={solution} className="flex items-start gap-4 p-5 rounded-2xl bg-green-50/50 border border-green-100/50">
                            <CheckCircle size={20} className="text-[#68D391] shrink-0 mt-0.5" />
                            <span className="text-gray-700 font-medium">{solution}</span>
                        </div>
                    ))}
                </motion.div>
            </div>

            <div className="mt-14 text-center">
                <QuoteCTA label="Let Us Help You" variant="primary" />
            </div>
        </div>
    </section>
);

/* ──────────────────────── SECTION 6: HOW IT WORKS (3 Steps) ──────────────────────── */
const HowItWorks = () => (
    <section id="how-it-works" className="relative py-24 bg-[#F8FAFC] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-40 pointer-events-none" />
        <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-[#ABB3F1]/5 rounded-full blur-[80px]" />
        <div className="absolute bottom-[20%] left-[10%] w-64 h-64 bg-[#F1ABAB]/5 rounded-full blur-[80px]" />

        <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <div className="flex items-center justify-center gap-2 text-[#ABB3F1] font-black uppercase text-xs tracking-[0.2em] mb-4">
                        <span className="h-px w-8 bg-[#ABB3F1]" />
                        Simple Process
                        <span className="h-px w-8 bg-[#ABB3F1]" />
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] leading-tight uppercase tracking-tighter">
                        Getting Started is <span className="text-[#F1ABAB]">Easy</span>
                    </h2>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-gradient-to-r from-[#ABB3F1]/30 via-[#F1ABAB]/30 to-[#68D391]/30 -z-10" />
                {[
                    { icon: PhoneCall, title: "Contact Us", desc: "Reach out via phone or our online form for a free, no-obligation consultation.", color: "bg-[#ABB3F1] shadow-[#ABB3F1]/50" },
                    { icon: Handshake, title: "Meet & Greet", desc: "We meet to understand your goals, NDIS plan, and cultural needs in detail.", color: "bg-[#F1ABAB] shadow-[#F1ABAB]/50" },
                    { icon: Rocket, title: "Start Your Journey", desc: "We match you with the right support workers and begin your personalised care.", color: "bg-[#68D391] shadow-[#68D391]/50" },
                ].map((step, index) => (
                    <motion.div
                        key={step.title}
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ delay: index * 0.2 }}
                        className="flex flex-col items-center text-center group"
                    >
                        <div className={`w-28 h-28 rounded-[2rem] ${step.color} flex items-center justify-center mb-6 relative group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 shadow-xl`}>
                            <step.icon className="w-12 h-12 text-white drop-shadow-md" strokeWidth={2} />
                            <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center font-black text-gray-300 shadow-md border-4 border-white/50">
                                {index + 1}
                            </div>
                        </div>
                        <h3 className="text-2xl font-black text-[#2D3748] mb-4 uppercase tracking-tight">{step.title}</h3>
                        <p className="text-lg text-gray-600 font-medium leading-relaxed max-w-xs">{step.desc}</p>
                    </motion.div>
                ))}
            </div>

            <div className="mt-14 text-center">
                <QuoteCTA label="Get Started Now" variant="primary" />
            </div>
        </div>
    </section>
);

/* ──────────────────────── SECTION 7: AREAS SERVED ──────────────────────── */
const areas = [
    { name: "Point Cook", slug: "/ndis-providers-point-cook" },
    { name: "Tarneit", slug: "/ndis-providers-tarneit" },
    { name: "Shepparton", slug: "/ndis-providers-shepparton" },
    { name: "Werribee", slug: "/ndis-providers-werribee" },
    { name: "Hoppers Crossing", slug: "/ndis-providers-hoppers-crossing" },
    { name: "Truganina", slug: "/ndis-providers-truganina" },
    { name: "Craigieburn", slug: "/ndis-providers-craigieburn" },
    { name: "Williams Landing", slug: "/ndis-providers-williams-landing" },
    { name: "Laverton", slug: "/ndis-providers-laverton" },
    { name: "Altona", slug: "/ndis-providers-altona" },
    { name: "Altona North", slug: "/ndis-providers-altona-north" },
    { name: "Altona Meadows", slug: "/ndis-providers-altona-meadows" },
    { name: "South Morang", slug: "/ndis-providers-south-morang" },
    { name: "Footscray", slug: "/ndis-providers-footscray" },
    { name: "Lara", slug: "/ndis-providers-lara" },
    { name: "Epping", slug: "/ndis-providers-epping" },
    { name: "Geelong", slug: "/ndis-accommodation-geelong" },
];

const AreasSection = () => (
    <section id="areas" className="relative py-24 bg-white overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#ABB3F1]/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#F1ABAB]/5 rounded-full blur-[120px]" />

        <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] leading-[1.1] tracking-tighter mb-6">
                        Areas We <span className="text-[#F1ABAB]">Serve</span>
                    </h2>
                    <p className="text-lg text-gray-600 font-medium leading-relaxed">
                        Based in Point Cook, we proudly support participants across Melbourne&apos;s Western and Northern suburbs.
                    </p>
                </motion.div>
            </div>

            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="flex flex-wrap justify-center gap-4 md:gap-6">
                {areas.map((area) => (
                    <Link
                        key={area.name}
                        href={area.slug}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative overflow-hidden p-6 rounded-2xl bg-white border border-primary/90 hover:border-primary shadow-sm hover:shadow-xl transition-all duration-300 flex items-center justify-center text-center w-[calc(50%-8px)] md:w-[calc(25%-18px)]"
                    >
                        <div className="absolute inset-0 bg-[#ABB3F1]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative z-10 flex items-center justify-center gap-2">
                            <MapPin className="w-5 h-5 text-primary group-hover:text-[#5A67D8] transition-colors" />
                            <span className="text-base md:text-lg font-bold text-[#2D3748] group-hover:text-[#5A67D8] transition-colors">
                                {area.name}
                            </span>
                        </div>
                    </Link>
                ))}
            </motion.div>

            <p className="text-center text-sm font-bold text-gray-400 mt-10">
                Can&apos;t find your area? Contact us — we may be able to help.
            </p>

            <div className="mt-10 text-center">
                <QuoteCTA label="Check Availability" variant="secondary" />
            </div>
        </div>
    </section>
);

/* ──────────────────────── SECTION 8: TESTIMONIALS ──────────────────────── */
const testimonials = [
    { name: "Sarah M.", service: "Daily Living Support", text: "JS Choice has been a game-changer for our family. The support workers genuinely understand my son's needs and treat him with so much respect. We finally feel supported.", rating: 5 },
    { name: "Ahmed K.", service: "Psychosocial Coaching", text: "The team at JS Choice helped me regain my confidence after years of struggling. Their neuro-affirming approach made me feel truly understood for the first time.", rating: 5 },
    { name: "Priya D.", service: "Community Participation", text: "As a migrant family, we were worried about finding culturally sensitive care. JS Choice exceeded all our expectations. They feel like family.", rating: 5 },
];

const TestimonialsSection = () => (
    <section id="testimonials" className="relative py-24 bg-[#F8FAFC] overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#ABB3F1]/5 rounded-full blur-[100px]" />

        <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <div className="flex items-center justify-center gap-2 text-[#F1ABAB] font-black uppercase text-xs tracking-[0.3em] mb-4">
                        <Star size={18} />
                        What Our Participants Say
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] leading-tight uppercase tracking-tighter">
                        Real Stories, Real <span className="text-[#ABB3F1]">Impact</span>
                    </h2>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((t, idx) => (
                    <motion.div
                        key={t.name}
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ delay: idx * 0.15 }}
                        className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] hover:-translate-y-2 transition-all duration-500"
                    >
                        {/* Stars */}
                        <div className="flex gap-1 mb-5">
                            {Array.from({ length: t.rating }).map((_, i) => (
                                <Star key={i} size={18} className="text-[#ABB3F1] fill-[#ABB3F1]" />
                            ))}
                        </div>
                        <p className="text-gray-700 font-medium leading-relaxed mb-6 italic">&ldquo;{t.text}&rdquo;</p>
                        <div className="border-t border-gray-100 pt-5">
                            <p className="font-black text-[#2D3748] uppercase tracking-wide text-sm">{t.name}</p>
                            <p className="text-xs text-gray-500 font-medium">{t.service}</p>
                        </div>
                    </motion.div>
                ))}
            </div>

            <div className="mt-14 text-center">
                <QuoteCTA label="Join Our Community" variant="dark" />
            </div>
        </div>
    </section>
);

/* ──────────────────────── SECTION 9: FREE NDIS TOOLS ──────────────────────── */
const ndisTools = [
    {
        title: "NDIS Price Guide",
        description: "Search and compare NDIS support item prices across all Australian regions. Get detailed pricing information and claim requirements.",
        icon: Search,
        href: "/tools/ndis-price-guide",
        color: "bg-[#ABB3F1]",
        features: ["Search by name or code", "Regional price comparison", "Detailed claim rules"],
    },
    {
        title: "Budget Calculator",
        description: "Estimate your annual NDIS support costs. Add items, set frequency, and get a detailed budget breakdown you can download or print.",
        icon: Calculator,
        href: "/tools/ndis-budget-calculator",
        color: "bg-[#F1ABAB]",
        features: ["Calculate annual costs", "Add multiple support items", "Download summary"],
    },
    {
        title: "Service Matcher",
        description: "Answer a few quick questions and we'll match you with the right JS Choice services for your needs. Get personalised recommendations.",
        icon: Users,
        href: "/tools/service-matcher",
        color: "bg-[#ABB3F1]",
        features: ["Quick questionnaire", "Personalised matching", "Free consultation"],
    },
];

const ToolsSection = () => (
    <section id="tools" className="relative py-24 bg-[#F8FAFC] overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-[#ABB3F1]/5 -skew-x-12 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F1ABAB]/5 rounded-full blur-[80px] pointer-events-none" />

        <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                    <div className="flex items-center justify-center gap-2 text-[#F1ABAB] font-black uppercase text-xs tracking-[0.3em] mb-4">
                        <Calculator size={18} />
                        Free NDIS Tools
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] leading-tight uppercase tracking-tighter mb-4">
                        Plan Your NDIS <span className="text-[#ABB3F1]">Budget</span>
                    </h2>
                    <p className="text-lg text-gray-600 font-medium leading-relaxed">
                        Use our free tools to explore prices, estimate costs, and find the right services — before you even pick up the phone.
                    </p>
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {ndisTools.map((tool, index) => (
                    <motion.div
                        key={tool.title}
                        initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Link href={tool.href} className="group h-full block">
                            <div className="h-full bg-white rounded-[2rem] border border-gray-100 p-8 md:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 flex flex-col">
                                <div className={`w-16 h-16 ${tool.color} rounded-2xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 transition-transform duration-300`}>
                                    <tool.icon className="w-8 h-8 text-[#1A202C]" />
                                </div>
                                <h3 className="text-xl font-black text-[#2D3748] mb-3 group-hover:text-[#ABB3F1] transition-colors uppercase tracking-tight">
                                    {tool.title}
                                </h3>
                                <p className="text-base text-gray-600 mb-6 leading-relaxed font-medium">{tool.description}</p>
                                <ul className="space-y-3 mb-8 flex-grow">
                                    {tool.features.map((feature) => (
                                        <li key={feature} className="flex items-center text-sm font-medium text-gray-700">
                                            <div className="w-2 h-2 bg-[#F1ABAB] rounded-full mr-3 shrink-0" />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <div className="mt-auto">
                                    <span className="inline-flex items-center gap-2 text-[#ABB3F1] font-bold uppercase tracking-wider text-sm group-hover:gap-4 transition-all duration-300">
                                        Try It Free <ArrowRight className="w-4 h-4" />
                                    </span>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                ))}
            </div>

            <div className="mt-14 text-center">
                <QuoteCTA label="Need Help? Get Consultations" variant="dark" />
            </div>
        </div>
    </section>
);

/* ──────────────────────── SECTION 10: FAQ ACCORDION ──────────────────────── */
const faqs = [
    { q: "What is the NDIS and am I eligible?", a: "The National Disability Insurance Scheme (NDIS) provides funding for Australians under 65 with a permanent and significant disability. If you have an NDIS plan, we can support you immediately. If you're unsure about eligibility, our team can guide you through the access request process." },
    { q: "How do I get started with JS Choice?", a: "Simply fill out the form below or call us. We'll arrange a free consultation to understand your goals, review your NDIS plan, and match you with the right support workers. There are no obligations — just a friendly chat." },
    { q: "What areas do you cover?", a: "We're based in Point Cook and serve Melbourne's Western and Northern suburbs including Werribee, Tarneit, Hoppers Crossing, Truganina, Craigieburn, Footscray, Altona, Laverton, Epping, South Morang, Geelong, Lara, and Shepparton." },
    { q: "Are your support workers qualified?", a: "Absolutely. All our support workers undergo thorough background checks, hold valid NDIS Worker Screening, and receive ongoing training in neuro-affirming and culturally sensitive care practices." },
    { q: "Can I choose my own support worker?", a: "Yes! We believe in participant choice and control. We'll match you based on your preferences, cultural background, language needs, and personality — and you can always request a change." },
    { q: "Do you offer 24/7 services?", a: "Yes, our care services are available 24/7 including weekends and public holidays. Our office hours are 8am–6pm for administrative queries, but support is always available when you need it." },
];

const FaqSection = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section id="faq" className="relative py-24 bg-white overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ABB3F1]/5 rounded-full blur-[100px]" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F1ABAB]/5 rounded-full blur-[120px]" />
            <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_2px,transparent_2px)] [background-size:40px_40px] [mask-image:radial-gradient(circle_at_80%_20%,white,transparent_60%)] opacity-60 pointer-events-none" />

            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
                        <div className="flex items-center justify-center gap-2 text-[#F1ABAB] font-black uppercase text-xs tracking-[0.3em] mb-4">
                            <MessageCircleQuestion size={18} />
                            Help Centre
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] leading-tight uppercase tracking-tighter">
                            Frequently Asked <span className="text-[#ABB3F1]">Questions</span>
                        </h2>
                        <div className="w-16 h-1 bg-[#ABB3F1] mx-auto rounded-full mt-4" />
                    </motion.div>
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                            transition={{ delay: index * 0.08 }}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className={`w-full text-left p-6 md:p-8 rounded-[2.5rem] transition-all duration-500 flex items-center justify-between gap-6 border-2 ${activeIndex === index
                                    ? "bg-[#ABB3F1]/5 border-[#ABB3F1] shadow-xl"
                                    : "bg-gray-50/50 border-gray-100 hover:border-[#ABB3F1]/30 shadow-sm hover:shadow-md"
                                    }`}
                            >
                                <span className={`text-lg md:text-xl font-black leading-tight transition-colors duration-300 ${activeIndex === index ? "text-[#2D3748]" : "text-[#2D3748]/70"}`}>
                                    {faq.q}
                                </span>
                                <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${activeIndex === index
                                    ? "bg-[#ABB3F1] text-white rotate-180 shadow-lg shadow-[#ABB3F1]/30"
                                    : "bg-white text-[#ABB3F1] border border-gray-200"
                                    }`}>
                                    <ChevronDown size={24} strokeWidth={3} />
                                </div>
                            </button>
                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-8 md:p-10 pt-4 text-gray-600 text-lg leading-relaxed font-medium">
                                            <div className="h-px w-full bg-[#ABB3F1]/20 mb-6" />
                                            {faq.a}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-14 text-center">
                    <QuoteCTA label="Still Have Questions? Contact Us" variant="primary" />
                </div>
            </div>
        </section>
    );
};

/* ──────────────────────── SECTION 10: CONTACT / QUOTE FORM ──────────────────────── */
const QuoteForm = () => {
    const [formData, setFormData] = useState({ name: "", phone: "", email: "", location: "", message: "" });
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess(false);

        try {
            const nameParts = formData.name.trim().split(" ");
            const firstName = nameParts[0];
            const lastName = nameParts.slice(1).join(" ") || "";

            const response = await fetch("/api/leads/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    first_name: firstName,
                    last_name: lastName,
                    email: formData.email,
                    phone: formData.phone,
                    location: formData.location,
                    message: formData.message,
                    source: "ads_landing_page",
                    source_page: "/ads",
                }),
            });

            const data = await response.json();
            if (data.success) {
                setSuccess(true);
                setFormData({ name: "", phone: "", email: "", location: "", message: "" });
                setTimeout(() => setSuccess(false), 5000);
            } else {
                setError(data.error || "Failed to submit. Please try again.");
            }
        } catch {
            setError("An error occurred. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <section id="quote" className="relative py-24 bg-gradient-to-br from-[#ABB3F1] via-[#B8BFFF] to-[#F1ABAB] overflow-hidden">
            {/* Decorators */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-[40%] h-full bg-white/5 skew-x-12 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[30%] h-full bg-black/5 -skew-x-12 -translate-x-1/4" />
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
            </div>

            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Info */}
                    <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight uppercase mb-6">
                            Ready to Start Your <span className="text-[#2D3748]">NDIS Journey?</span>
                        </h2>
                        <p className="text-lg text-white/90 font-medium leading-relaxed mb-8 max-w-lg">
                            Fill in the form for a free, no-obligation consultation. Our team will get back to you within 24 hours.
                        </p>

                        <div className="space-y-5">
                            {[
                                { icon: Phone, label: "Call Us", value: "1300 572 464", href: "tel:1300572464" },
                                { icon: MapPin, label: "Location", value: "Suite 106, Level 1, 2 Main St, Point Cook VIC 3030" },
                                { icon: Clock, label: "Hours", value: "Office 8am–6pm | Care 24/7" },
                            ].map((info) => (
                                <div key={info.label} className="flex items-center gap-4 text-white/90">
                                    <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
                                        <info.icon size={18} />
                                    </div>
                                    <div>
                                        <span className="text-xs font-bold uppercase tracking-wider text-white/60">{info.label}</span>
                                        {info.href ? (
                                            <a href={info.href} className="block font-bold hover:text-white transition-colors">{info.value}</a>
                                        ) : (
                                            <p className="font-bold text-sm">{info.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right: Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                        className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-white/50"
                    >
                        <h3 className="text-2xl md:text-3xl font-black text-[#2D3748] mb-2 uppercase tracking-tight">
                            Get Your Free <span className="text-[#F1ABAB]">Consultations</span>
                        </h3>
                        <p className="text-gray-500 font-medium mb-8">No obligations. We&apos;ll respond within 24 hours.</p>

                        {success && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-green-50 border border-green-200 rounded-2xl flex items-start gap-3">
                                <CheckCircle className="text-green-600 shrink-0 mt-0.5" size={20} />
                                <div>
                                    <p className="font-bold text-green-900">Thank you for reaching out!</p>
                                    <p className="text-sm text-green-700">We&apos;ll get back to you within 24 hours.</p>
                                </div>
                            </motion.div>
                        )}

                        {error && (
                            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3">
                                <AlertCircle className="text-red-600 shrink-0 mt-0.5" size={20} />
                                <p className="text-sm text-red-700">{error}</p>
                            </motion.div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <Input name="name" value={formData.name} onChange={handleChange} placeholder="Full Name *" required className="h-14 px-6 rounded-2xl bg-gray-50 border-gray-200 focus:border-[#ABB3F1] transition-all text-base" />
                                <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number *" type="tel" required className="h-14 px-6 rounded-2xl bg-gray-50 border-gray-200 focus:border-[#ABB3F1] transition-all text-base" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email Address *" type="email" required className="h-14 px-6 rounded-2xl bg-gray-50 border-gray-200 focus:border-[#ABB3F1] transition-all text-base" />
                                <Input name="location" value={formData.location} onChange={handleChange} placeholder="Your Suburb" className="h-14 px-6 rounded-2xl bg-gray-50 border-gray-200 focus:border-[#ABB3F1] transition-all text-base" />
                            </div>
                            <Textarea name="message" value={formData.message} onChange={handleChange} placeholder="Tell us about your needs... *" required className="min-h-[140px] p-6 rounded-2xl bg-gray-50 border-gray-200 focus:border-[#ABB3F1] transition-all text-base resize-none" />
                            <Button
                                type="submit"
                                disabled={loading}
                                className="h-14 w-full rounded-full bg-[#ABB3F1] hover:bg-[#9CA5E5] text-[#1A202C] font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center gap-2">
                                        <span className="animate-spin rounded-full h-5 w-5 border-2 border-[#1A202C] border-t-transparent" />
                                        Sending...
                                    </span>
                                ) : (
                                    <span className="flex items-center gap-2">
                                        Submit Your Request
                                        <Send size={18} />
                                    </span>
                                )}
                            </Button>
                        </form>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

/* ──────────────────────── SECTION 11: FINAL CTA BANNER ──────────────────────── */
const FinalCTA = () => (
    <section className="relative py-20 bg-[#2D3748] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(rgba(171,179,241,0.1)_1px,transparent_1px)] [background-size:32px_32px] opacity-50 pointer-events-none" />
        <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto">
                <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-8 leading-[1.1] tracking-tight uppercase">
                    Together, let&apos;s make the NDIS work <span className="text-[#ABB3F1]">seamlessly</span> for you.
                </h2>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a href="tel:1300572464" className="h-14 px-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center gap-3 shadow-xl transition-all min-w-[240px] border border-white/20">
                        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                            <Phone size={18} />
                        </div>
                        <span className="text-sm font-black uppercase tracking-widest">Call: 1300 572 464</span>
                    </a>
                    <QuoteCTA label="Get Consultations" variant="primary" />
                </div>
            </motion.div>
        </div>
    </section>
);

/* ──────────────────────── MAIN ADS CONTENT ──────────────────────── */
const AdsContent = () => (
    <main>
        <HeroSection />
        <TrustBadges />
        <ServicesSection />
        <WhyChooseSection />
        <ToolsSection />
        <ProblemSolution />
        <HowItWorks />
        <AreasSection />
        <TestimonialsSection />
        <FaqSection />
        <QuoteForm />
        <FinalCTA />
    </main>
);

export default AdsContent;
