"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
    Phone,
    ArrowRight,
    Home,
    Clock,
    CalendarClock,
    UserCheck,
    Heart,
    ShieldCheck,
    CheckCircle2,
    Armchair,
    Utensils,
    Palette,
    Users
} from "lucide-react";

/**
 * Accommodation Pathways Data
 */
const accommodationPathways = [
    {
        title: "Supported Independent Living (SIL)",
        subtitle: "Your Home, Your Rules, Our Support",
        description: "SIL is best for participants who have higher support needs and require 24/7 assistance but want to live independently.",
        features: [
            "Shared Living: Live with other like-minded participants. We carefully match housemates based on age, interests, and lifestyle to ensure a harmonious home.",
            "Solo Living: Support provided in your own private residence.",
            "The Support: Our team assists with daily tasks like cooking, cleaning, personal care and medication, while empowering you to build skills and make your own decisions."
        ],
        icon: Home,
        image: "/images/accommodation/sil.webp"
    },
    {
        title: "Medium-Term Accommodation (MTA)",
        subtitle: "The Bridge to Your Forever Home",
        description: "MTA is a transitional solution for participants who are waiting for their permanent housing to be ready. It's perfect if:",
        features: [
            "You are ready to leave the hospital (discharge) but your home isn't ready.",
            "You are waiting for home modifications to be completed.",
            "You have a confirmed SIL vacancy that isn't available yet.",
            "Our Promise: A fully furnished, safe, and supported environment that keeps you stable while you wait for your long-term solution."
        ],
        icon: CalendarClock,
        image: "/images/accommodation/mta.webp"
    },
    {
        title: "Short-Term Accommodation (STA)",
        subtitle: "A Refreshing Break for You and Your Carer",
        description: "Often called \"Respite,\" STA is a funded break from your usual routine. It's a chance to recharge, try new things, and meet new people.",
        features: [
            "All-Inclusive: Includes accommodation, 24/7 support, meals, and activities.",
            "Developmental: We treat STA as a chance to build capacity; learning to stay away from home, cook a meal, or navigate a new area."
        ],
        icon: Clock,
        // Reusing the hero image or another relevant one if available, 
        // falling back to hero image for STA as typically specific STA images might not be distinct in previous set
        image: "/images/accommodation/img46.webp"
    }
];

const whyChooseUs = [
    {
        title: "Neuro-Affirming Homes",
        description: "We design our living spaces to be sensory-friendly and calming. We respect your need for personal space and routine.",
        icon: Palette
    },
    {
        title: "Culturally Safe",
        description: "Your home should reflect who you are. We respect your cultural traditions, dietary requirements, and religious practices within the home.",
        icon: ShieldCheck
    },
    {
        title: "Careful Matching",
        description: "We don't just fill vacancies. We take the time to ensure housemates are compatible so that your house feels like a home, not a facility.",
        icon: Users
    },
    {
        title: "Quality Properties",
        description: "Our homes in suburbs like Point Cook, Tarneit, and South Morang are modern, accessible, and well maintained.",
        icon: Armchair
    }
];

const NdisAccommodation = () => {
    return (
        <main className="bg-gray-50/50">
            <PageHeader
                title="NDIS Accommodation"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "NDIS Accommodation" }
                ]}
            />

            {/* Hero Section */}
            <section className="py-20 lg:py-28 overflow-hidden">
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-2 lg:order-1 relative group"
                        >
                            <div className="absolute inset-0 bg-primary/20 translate-x-4 translate-y-4 rounded-[2.5rem] -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
                            <div className="relative h-[500px] w-full">
                                <Image quality={80}
                                    src="/images/accommodation/img46.webp"
                                    alt="NDIS Accommodation"
                                    fill
                                    className="rounded-[2.5rem] shadow-2xl object-cover"
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-1 lg:order-2 space-y-8"
                        >
                            <div className="space-y-4">
                                <span className="text-secondary font-black uppercase tracking-widest text-sm flex items-center gap-2">
                                    <Home className="w-5 h-5" />
                                    A Place to Call Home
                                </span>
                                <h2 className="text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                    More Than a Roof Overhead: <span className="text-primary block mt-2">A Place to Call Home</span>
                                </h2>
                            </div>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    Your home should be your sanctuary, a place where you feel safe, supported, and free to be yourself. But sometimes, your current living situation just doesn't match your support needs.
                                </p>
                                <p>
                                    At Js Choice – Care and Support, we offer high quality NDIS accommodation options across Melbourne designed to support your independence. Whether you are looking for a permanent home (SIL), a transitional solution (MTA), or a short break (STA), we provide welcoming, culturally safe environments where you can live life on your terms.
                                </p>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <Button size="lg" className="h-14 px-8 rounded-full bg-[#2D3748] hover:bg-black text-white text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    <Phone className="mr-2 h-5 w-5" />
                                    Talk to Us
                                </Button>
                                <Link href="/referral">
                                    <Button size="lg" className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-[#1A202C] text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                        Free Referral <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Accommodation Pathways Summary */}
            <section className="py-20 bg-white relative">
                <div className="container-8xl">
                    <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-[#2D3748]">
                            Our Accommodation <span className="text-secondary">Pathways</span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            We understand that everyone's housing journey is different. We offer three distinct pathways to suit your stage of life.
                        </p>
                    </div>

                    <div className="space-y-24">
                        {accommodationPathways.map((type, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.8 }}
                                className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
                            >
                                <div className={`relative ${index % 2 === 1 ? 'lg:order-1' : ''}`}>
                                    <div className="absolute inset-0 bg-secondary/5 rounded-[2.5rem] translate-x-4 translate-y-4 -z-10" />
                                    <div className="relative h-[450px] w-full">
                                        <Image quality={80}
                                            src={type.image}
                                            alt={type.title}
                                            fill
                                            className="rounded-[2.5rem] shadow-xl border-4 border-white object-cover"
                                        />
                                    </div>
                                </div>

                                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary-dark">
                                            <type.icon size={24} />
                                        </div>
                                        <h3 className="text-2xl font-black text-[#2D3748]">{type.title}</h3>
                                    </div>
                                    <h4 className="text-xl font-bold text-secondary mb-6">{type.subtitle}</h4>
                                    <p className="text-lg text-gray-600 leading-relaxed mb-6">
                                        {type.description}
                                    </p>
                                    <ul className="space-y-4">
                                        {type.features.map((feature, idx) => (
                                            <li key={idx} className="flex gap-3 text-gray-600">
                                                <div className="mt-1 flex-shrink-0">
                                                    <CheckCircle2 className="w-5 h-5 text-primary" />
                                                </div>
                                                <span className="leading-relaxed">{feature}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose JS Choice Accommodation? */}
            <section className="py-20 lg:py-28 bg-[#2D3748] text-white">
                <div className="container-8xl">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-white">
                            Why Choose <span className="text-primary">JS Choice Accommodation?</span>
                        </h2>
                        <p className="text-gray-300 text-lg">
                            We believe housing is about people, not just property. Here is why Melbourne participants choose to live with us:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {whyChooseUs.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all group"
                            >
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-secondary mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-gray-300 leading-relaxed text-sm">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
                <div className="container-8xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white rounded-[3rem] p-10 md:p-16 text-center shadow-2xl border border-gray-100 max-w-5xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-5xl font-black text-[#2D3748] mb-6 leading-tight">
                            Let's Find <span className="text-secondary">Your Place</span>
                        </h2>
                        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Finding the right home is a big decision. Let us help you navigate the options and find a space where you can truly thrive.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <a href="tel:1300572464">
                                <Button size="lg" className="h-16 px-8 rounded-full bg-[#2D3748] hover:bg-black text-white text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    <Phone className="mr-2 h-5 w-5" />
                                    1300 572 464
                                </Button>
                            </a>
                            <Link href="/referral">
                                <Button size="lg" className="h-16 px-8 rounded-full bg-primary hover:bg-primary/90 text-[#1A202C] text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    Get a Free Referral <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default NdisAccommodation;
