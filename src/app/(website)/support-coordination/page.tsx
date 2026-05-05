"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import TalkToUsButton from "@/components/ui/TalkToUsButton";
import Link from "next/link";
import Image from "next/image";
import ServiceCTA from "@/components/ui/ServiceCTA";
import ServiceFormSection from "@/components/ui/ServiceFormSection";
import {
    Phone,
    ArrowRight,
    Users,
    ClipboardCheck,
    Lightbulb,
    GraduationCap,
    HeartHandshake,
    ShieldCheck,
    CheckCircle2,
    MapPin,
    Search,
    UserCheck,
    Clock,
    FileSearch,
    Map,
    HelpCircle,
    BrainCircuit,
    Globe,
    Scale,
    AlertTriangle
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const supportRoles = [
    {
        title: "Understand Your Plan",
        description: "NDIS plans can be full of jargon. We sit down with you to explain exactly what funding you have, how you can spend it, and what rules apply.",
        icon: FileSearch
    },
    {
        title: "Build Your \"Dream Team\"",
        description: "Finding the right service providers can be hard. We use our extensive local network to connect you with trusted, high quality professionals.",
        details: [
            "Allied Health (OT, Speech, Physio)",
            "Mental Health Support",
            "Daily Support Workers",
            "Behaviour Support Practitioners"
        ],
        icon: Users
    },
    {
        title: "Coordinate & Manage",
        description: "We negotiate service agreements on your behalf, ensuring you get value for money. If a provider isn't working out, we help you find a new one.",
        icon: Scale
    },
    {
        title: "Prepare for Reviews",
        description: "When it's time for your plan review, we help you gather the necessary reports and evidence to ensure you continue to get the funding you need.",
        icon: ClipboardCheck
    }
];

const whyChooseUs = [
    {
        title: "Neuro-Affirming & Patient",
        description: "We understand that administrative tasks can be draining for neurodivergent participants. We break things down into manageable steps and communicate in the way that works best for you.",
        icon: BrainCircuit
    },
    {
        title: "Culturally Connected",
        description: "We have a deep understanding of Melbourne's diverse communities. We can help you find culturally safe providers who speak your language and respect your traditions.",
        icon: Globe
    },
    {
        title: "Independent & Unbiased",
        description: "We work for you. We connect you with the providers that best suit your goals, whether they are part of JS Choice or external agencies.",
        icon: Scale
    },
    {
        title: "Crisis Resolution",
        description: "When things go wrong (e.g. a provider cancels or a crisis occurs), we are in your corner to solve the problem quickly.",
        icon: AlertTriangle
    }
];

const faqs = [
    {
        question: "What Is The Difference Between A Support Coordinator And A Plan Manager?",
        answer: "Plan Managers are like your accountant; they pay the bills and manage the financial banking of your plan. Support Coordinators are like your project manager; they help you find the service providers (like OTs or support workers) and organise your care."
    },
    {
        question: "Can I Choose My Own Providers?",
        answer: "Absolutely. It is your choice. We provide recommendations based on our experience and your needs, but the final decision is always yours."
    },
    {
        question: "Do You Support Participants With Complex Needs?",
        answer: "Yes. Our team is experienced in supporting participants with complex physical and psychosocial needs. We can help coordinate Specialist Support Coordination (Level 3) if required."
    }
];

const SupportCoordination = () => {
    return (
        <main className="bg-gray-50/50">
            <PageHeader
                title="Support Coordination"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Support Coordination" }
                ]}
            />

            {/* Hero Section */}
            <section className="py-10 lg:py-14 overflow-hidden">
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
                                    src="/images/support-coordination/support-1.webp"
                                    alt="NDIS Plan Into Action"
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
                                    <Map className="w-5 h-5" />
                                    Guidance & Mentorship
                                </span>
                                <h2 className="text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                    Turning Your NDIS Plan <span className="text-primary block mt-2">into Action</span>
                                </h2>
                            </div>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    Receiving your NDIS plan is an exciting milestone, but understanding how to use it can be overwhelming. That is where JS Choice - Care and Support comes in.
                                </p>
                                <p>
                                    Think of your NDIS plan as the roadmap and your Support Coordinator as the experienced guide. We help you navigate the system, understand your budget, and connect you with the very best providers in Melbourne. Our goal is simple: to help you build the capacity to manage your own supports, giving you full control over your life and your future.
                                </p>
                            </div>
                            <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                <TalkToUsButton />
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

            {/* What Does a Support Coordinator Do? */}
            <section className="py-10 bg-white relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 -z-10" />
                <div className="container-8xl">
                    <div className="text-center max-w-3xl mx-auto mb-8 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-[#2D3748]">
                            What Does a <span className="text-secondary">Support Coordinator Do?</span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Our Support Coordination service is about capacity building. We don't just do things for you; we work with you to help you understand the NDIS more.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {supportRoles.map((role, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-gray-50 border border-gray-100 p-8 rounded-3xl hover:shadow-lg transition-all group flex flex-col gap-4"
                            >
                                <div className="flex items-center gap-4 mb-2">
                                    <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors flex-shrink-0">
                                        <role.icon size={24} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-[#2D3748]">{role.title}</h3>
                                </div>
                                <p className="text-gray-600 leading-relaxed">{role.description}</p>
                                {role.details && (
                                    <div className="mt-2 bg-white p-4 rounded-xl border border-gray-100">
                                        <p className="text-sm font-bold text-secondary mb-2 uppercase tracking-wide">We help you access:</p>
                                        <ul className="space-y-2">
                                            {role.details.map((detail, idx) => (
                                                <li key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                                                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                                                    {detail}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose JS Choice */}
            <section className="py-10 lg:py-14 relative bg-[#2D3748] text-white overflow-hidden">
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-10 order-2 lg:order-1"
                        >
                            <div>
                                <h2 className="text-4xl font-black text-white mb-6">
                                    Why Choose JS Choice <span className="text-primary">Support Coordinators?</span>
                                </h2>
                                <p className="text-gray-300 text-lg">
                                    Support Coordination is a partnership. You need someone who "gets" you.
                                </p>
                            </div>

                            <div className="grid gap-6">
                                {whyChooseUs.map((item, index) => (
                                    <div key={index} className="flex gap-4 group">
                                        <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors">{item.title}</h3>
                                            <p className="text-gray-400 leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-1 lg:order-2 relative"
                        >
                            <div className="relative w-full h-[500px]">
                                <Image quality={80}
                                    src="/images/support-coordination/support-2.webp"
                                    alt="Why Choose JS Choice"
                                    fill
                                    className="rounded-[2.5rem] shadow-2xl border-8 border-white/10 object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-10 bg-gray-50">
                <div className="container-8xl max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-[#2D3748] mb-4">
                            Frequently Asked <span className="text-primary">Questions</span>
                        </h2>
                        <p className="text-gray-500 text-sm">
                            Note: JS Choice can help you understand both, but this page focuses on Coordination.
                        </p>
                    </div>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-2xl border border-gray-100 shadow-sm px-6">
                                <AccordionTrigger className="text-lg font-bold text-[#2D3748] hover:text-primary py-6 text-left">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 pb-6 text-base leading-relaxed">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-10 lg:py-14 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 -z-10" />
                <div className="container-8xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#2D3748] rounded-[3rem] p-10 md:p-16 text-center shadow-2xl max-w-5xl mx-auto text-white"
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-white">
                            Ready to Take Control of <span className="text-primary">Your NDIS Plan?</span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Don't let your funding sit unused. Let's build a support network that helps you thrive.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <Button asChild size="lg" className="h-16 px-8 rounded-full bg-white hover:bg-gray-100 text-[#2D3748] text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                <a href="tel:1300572464">
                                    <Phone className="mr-2 h-5 w-5" />
                                    Call Now
                                </a>
                            </Button>
                            <Link href="/contact-us">
                                <Button size="lg" className="h-16 px-8 rounded-full bg-primary hover:bg-primary/90 text-[#1A202C] text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/referral">
                                <Button variant="outline" size="lg" className="h-16 px-8 rounded-full border-2 border-white text-primary hover:bg-white hover:text-[#2D3748] text-lg font-bold shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                                    Consultations
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

        </main>
    );
};

export default SupportCoordination;
