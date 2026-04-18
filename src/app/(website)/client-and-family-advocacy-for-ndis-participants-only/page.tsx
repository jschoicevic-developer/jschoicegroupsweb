"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
    Phone,
    ArrowRight,
    Megaphone,
    Scale,
    ShieldCheck,
    Users,
    FileText,
    BrainCircuit,
    Gavel,
    HandHeart,
    Eye
} from "lucide-react";
import ServiceCTA from "@/components/ui/ServiceCTA";
import ServiceFormSection from "@/components/ui/ServiceFormSection";


/**
 * Advocacy Services Data
 * Updated with new content plan
 */
const advocacyServices = [
    {
        title: "Individual Advocacy & Representation",
        description: "Sometimes you need someone in your corner. We assist with specific challenges, including accessing the NDIS and helping you understand eligibility and gather the right evidence.",
        icon: Megaphone
    },
    {
        title: "Support During Meetings",
        description: "NDIS planning meetings and plan reviews can be intimidating. We ensure you never have to walk into these rooms alone. We help clarify exactly what you want to say.",
        icon: Users
    },
    {
        title: "Dispute Resolution",
        description: "Acting as a mediator if you are having issues with a service provider or disagree with a decision. We speak up on your behalf to ensure your needs are understood and met.",
        icon: Gavel
    },
    {
        title: "Guidance & Information",
        description: "Knowledge is power. We cut through the jargon to give you clear, honest advice about your rights and entitlements under the NDIS.",
        icon: FileText
    },
    {
        title: "Systemic Advocacy",
        description: "We see the bigger picture. By identifying recurring issues in services our participants face, we work to address them at a system level, helping to improve the NDIS experience for everyone.",
        icon: Eye
    },
    {
        title: "Capacity Building (Self-Advocacy)",
        description: "Our ultimate goal is to work ourselves out of a job. We mentor and empower you to become your own best advocate, teaching you how to navigate the NDIS portal and build confidence.",
        icon: BrainCircuit
    }
];

const whyAdvocacyImportant = [
    {
        title: "Fairness",
        description: "You receive the support you are entitled to, not just what is 'easiest' for the system.",
        icon: Scale
    },
    {
        title: "Safety",
        description: "Your complaints are taken seriously and resolved quickly.",
        icon: ShieldCheck
    },
    {
        title: "Inclusion",
        description: "Your cultural, linguistic, and neurodivergent needs are respected in every interaction.",
        icon: HandHeart
    }
];

const ClientFamilyAdvocacy = () => {
    return (
        <main className="bg-gray-50/50">
            <PageHeader
                title="Client And Family Advocacy For NDIS Participants Only"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Client And Family Advocacy For NDIS Participants Only" }
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
                                    src="/images/advocacy/advocacy-1.webp"
                                    alt="Client and Family Advocacy"
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
                                    <ShieldCheck className="w-5 h-5" />
                                    Advocacy & Support
                                </span>
                                <h2 className="text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                    Your Voice, <span className="text-primary block mt-2">Your Rights, Your Choice.</span>
                                </h2>
                            </div>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    Navigating the NDIS can be complex, and sometimes, it feels like your voice isn't being heard. At Js Choice – Care and Support, we believe that every participant deserves to have their rights respected and their needs met without compromise.
                                </p>
                                <p>
                                    Our Client and Family Advocacy service is here to stand beside you. We represent your interests, help you understand your rights, and ensure you have the confidence to navigate the NDIS landscape, whether you are applying for access, resolving a dispute, or simply trying to get the most out of your plan.
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

            {/* How We Advocate For You (Services) */}
            <section className="py-20 bg-white relative">
                <div className="absolute top-0 left-0 w-1/3 h-full bg-gray-50 skew-x-12 -z-10" />
                <div className="container-8xl">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-[#2D3748]">
                            How We Advocate <span className="text-secondary">For You</span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            We don't just speak for you; we speak with you. Our goal is to amplify your voice so that your choices are respected.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {advocacyServices.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-gray-50 border border-gray-100 p-8 rounded-3xl hover:shadow-xl hover:-translate-y-1 transition-all group"
                            >
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary shadow-sm mb-6 group-hover:bg-primary group-hover:text-white transition-colors">
                                    <service.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-[#2D3748] mb-3 group-hover:text-primary transition-colors">
                                    {service.title}
                                </h3>
                                <p className="text-gray-600 leading-relaxed">
                                    {service.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Is Advocacy Important? */}
            <section className="py-20 lg:py-28 bg-[#2D3748] text-white overflow-hidden">
                <div className="container-8xl">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-white">
                            Why Is Advocacy <span className="text-primary">Important?</span>
                        </h2>
                        <p className="text-gray-300 text-lg">
                            Having an advocate ensures:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {whyAdvocacyImportant.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all text-center group"
                            >
                                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mx-auto mb-6 group-hover:scale-110 transition-transform">
                                    <item.icon size={32} />
                                </div>
                                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-gray-300 leading-relaxed">
                                    {item.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* When Should You Reach Out? */}
            <section className="py-20 bg-white">
                <div className="container-8xl">
                    <div className="bg-gray-50 rounded-[3rem] p-10 md:p-16 border border-gray-100 shadow-sm flex flex-col lg:flex-row items-center gap-12">
                        <div className="flex-1 space-y-6">
                            <h2 className="text-3xl md:text-4xl font-black text-[#2D3748]">
                                When Should You <span className="text-secondary">Reach Out?</span>
                            </h2>
                            <p className="text-lg text-gray-600 font-medium">
                                You might consider our advocacy support if:
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-3 text-gray-600">
                                    <div className="bg-secondary/10 p-1 rounded-full text-secondary mt-1"><ArrowRight size={16} /></div>
                                    <span>You feel overwhelmed by NDIS paperwork or processes.</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-600">
                                    <div className="bg-secondary/10 p-1 rounded-full text-secondary mt-1"><ArrowRight size={16} /></div>
                                    <span>You feel a service provider isn't listening to you.</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-600">
                                    <div className="bg-secondary/10 p-1 rounded-full text-secondary mt-1"><ArrowRight size={16} /></div>
                                    <span>You are preparing for a major plan review and want support.</span>
                                </li>
                                <li className="flex items-start gap-3 text-gray-600">
                                    <div className="bg-secondary/10 p-1 rounded-full text-secondary mt-1"><ArrowRight size={16} /></div>
                                    <span>You simply want a trusted partner to help you understand your options.</span>
                                </li>
                            </ul>
                        </div>
                        <div className="flex-1 w-full relative h-[400px] rounded-[2.5rem] overflow-hidden">
                            {/* Reusing a relevant image or keeping a placeholder graphic */}
                            <Image quality={80}
                                src="/images/advocacy/advocacy-1.webp"
                                alt="When to reach out"
                                fill
                                className="object-cover"
                            />
                        </div>
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
                        className="bg-[#2D3748] rounded-[3rem] p-10 md:p-16 text-center shadow-2xl overflow-hidden max-w-5xl mx-auto text-white"
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-white">
                            We Are In <span className="text-primary">Your Corner</span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                            You don't have to navigate the complexities of the NDIS alone. Let us help you protect your rights and build a future of independence.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <Button size="lg" className="h-16 px-8 rounded-full bg-white hover:bg-gray-100 text-[#2D3748] text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                <Phone className="mr-2 h-5 w-5" />
                                1300 572 464
                            </Button>
                            <Link href="/referral">
                                <Button size="lg" className="h-16 px-8 rounded-full bg-primary hover:bg-primary/90 text-[#1A202C] text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    Get a Free Referral <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <ServiceCTA />

            <ServiceFormSection
              source="service_page"
              sourcePage="/client-and-family-advocacy-for-ndis-participants-only"
              defaultService="Client & Family Advocacy"
            />

        </main>
    );
};

export default ClientFamilyAdvocacy;
