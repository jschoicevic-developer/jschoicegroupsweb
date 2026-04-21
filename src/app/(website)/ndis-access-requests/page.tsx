"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import TalkToUsButton from "@/components/ui/TalkToUsButton";
import Link from "next/link";
import Image from "next/image";
import {
    Phone,
    ArrowRight,
    CheckCircle2,
    Users,
    FileText,
    HelpCircle,
    Calendar,
    Search,
    Map
} from "lucide-react";
import ServiceCTA from "@/components/ui/ServiceCTA";
import ServiceFormSection from "@/components/ui/ServiceFormSection";


/**
 * Access Request Data
 */
const accessSteps = [
    {
        title: "Step 1: The Conversation",
        description: "Call us on 1300 572 464. We will discuss your situation and explain the process in plain English.",
        icon: Phone
    },
    {
        title: "Step 2: Gathering Evidence",
        description: "This is the most important part. The NDIS needs proof of how your disability affects your functional capacity (what you can and can't do). We can guide you on what medical reports you need from your GP or specialists & help you articulate your daily challenges so they are clearly understood by the NDIS planners.",
        icon: Search
    },
    {
        title: "Step 3: Completing the Forms",
        description: "We can assist you in obtaining the NDIS Access Request Form and ensure every section is filled out correctly.",
        icon: FileText
    },
    {
        title: "Step 4: Submission & Follow Up",
        description: "Once the application is ready, you can submit it to enquiries@ndis.gov.au. If you are approved, we are then ready to step in as your Support Coordinator or Service Provider to help you bring your plan to life.",
        icon: CheckCircle2
    }
];

const eligibilityCriteria = [
    {
        title: "Age Requirements",
        description: "You must be aged between 7 and 65 years old at the time of your application. (Note: Children under 7 may receive support through the Early Childhood Early Intervention approach).",
        icon: Calendar
    },
    {
        title: "Residency Requirements",
        description: "You must live in Australia and be an Australian citizen, OR A Permanent Resident, OR A holder of a Protected Special Category Visa.",
        icon: Map
    },
    {
        title: "Disability Requirements",
        description: "You must have a disability that is permanent (likely to be with you for life) AND is significant (affects your ability to perform daily tasks like communication, mobility, or self-care).",
        icon: Users
    }
];

const whyAskForHelp = [
    {
        title: "Reduce Stress",
        description: "We handle the confusing terminology so you don't have to."
    },
    {
        title: "Save Time",
        description: "We know exactly what the NDIS is looking for."
    },
    {
        title: "Local Support",
        description: "If you can't find a Local Area Coordinator (LAC), our team in Point Cook can point you in the right direction."
    }
];

const NdisAccessRequests = () => {
    return (
        <main className="bg-gray-50/50">
            <PageHeader
                title="NDIS Access Requests"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "NDIS Access Requests" }
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
                                    src="/images/access-requests/access-1.webp"
                                    alt="NDIS Access Requests"
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
                                    <FileText className="w-5 h-5" />
                                    Application Support
                                </span>
                                <h2 className="text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                    Your Gateway to <span className="text-primary block mt-2">NDIS Support</span>
                                </h2>
                            </div>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    Applying for the National Disability Insurance Scheme (NDIS) is the first step toward getting the support you need, but the application process can be confusing and paperwork-heavy.
                                </p>
                                <p>
                                    At Js Choice – Care and Support, we believe that complexity shouldn't stop you from accessing help. As experienced Melbourne NDIS providers, we offer guidance to help eligible individuals navigate the Access Request process. We help you understand the requirements, gather the right evidence, and submit a strong application.
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

            {/* Am I Eligible for the NDIS? */}
            <section className="py-20 bg-white relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 -z-10" />
                <div className="container-8xl">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-[#2D3748]">
                            Am I Eligible for <span className="text-secondary">the NDIS?</span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Before requesting access, you need to meet three main criteria. We can help you determine if you fit these requirements:
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {eligibilityCriteria.map((criteria, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-gray-50 border border-gray-100 p-8 rounded-3xl hover:shadow-lg transition-all group flex flex-col gap-4"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:bg-secondary group-hover:text-white transition-colors flex-shrink-0">
                                    <criteria.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-[#2D3748]">{criteria.title}</h3>
                                <p className="text-gray-600 leading-relaxed text-sm">{criteria.description}</p>
                            </motion.div>
                        ))}
                    </div>
                    <div className="mt-8 p-4 bg-primary/10 rounded-xl max-w-2xl mx-auto flex items-start gap-3">
                        <HelpCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                        <p className="text-gray-700 text-sm italic">
                            * Requires you to have support from other people or special equipment to live your life.
                        </p>
                    </div>
                </div>
            </section>

            {/* How We Help You Apply (Steps) */}
            <section className="py-20 lg:py-28 bg-[#2D3748] text-white overflow-hidden">
                <div className="container-8xl">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-white">
                            How We Help <span className="text-primary">You Apply</span>
                        </h2>
                        <p className="text-gray-300 text-lg">
                            Many NDIS applications are delayed or rejected simply because they don't have the right supporting documents. We help you get it right the first time:
                        </p>
                    </div>

                    <div className="grid gap-8 max-w-4xl mx-auto">
                        {accessSteps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-all flex flex-col md:flex-row gap-6 items-start"
                            >
                                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 font-bold text-xl">
                                    {index + 1}
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">
                                        {step.description}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Ask for Help? */}
            <section className="py-20 bg-white relative">
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-10">
                            <h2 className="text-3xl md:text-5xl font-black text-[#2D3748]">
                                Why Ask <span className="text-secondary">for Help?</span>
                            </h2>
                            <p className="text-lg text-gray-600">
                                You don't have to do this alone.
                            </p>
                            <div className="grid gap-6">
                                {whyAskForHelp.map((item, index) => (
                                    <div key={index} className="flex gap-4 group">
                                        <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-secondary translate-y-2 group-hover:bg-primary transition-colors" />
                                        <div>
                                            <h3 className="text-xl font-bold text-[#2D3748] mb-1 group-hover:text-secondary transition-colors">{item.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative h-[400px] w-full rounded-[2.5rem] overflow-hidden">
                            <Image quality={80}
                                src="/images/access-requests/access-1.webp"
                                alt="Why Ask For Help"
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
                            Ready to Start <span className="text-primary">Your NDIS Journey?</span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                            If you think you are eligible but don't know where to start, get in touch with our friendly team today.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <Button asChild size="lg" className="h-16 px-8 rounded-full bg-white hover:bg-gray-100 text-[#2D3748] text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                <a href="tel:1300572464">
                                    <Phone className="mr-2 h-5 w-5" />
                                    Call Now
                                </a>
                            </Button>
                            <Link href="/referral">
                                <Button size="lg" className="h-16 px-8 rounded-full bg-primary hover:bg-primary/90 text-[#1A202C] text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    Get a Free Referral <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/referral">
                                <Button variant="outline" size="lg" className="h-16 px-8 rounded-full border-2 border-white/20 text-primary hover:bg-white/10 text-lg font-bold transition-all hover:-translate-y-1">
                                    Enquire About NDIS Access
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <ServiceCTA />

            <ServiceFormSection
                source="service_page"
                sourcePage="/ndis-access-requests"
                defaultService="NDIS Access Request Help"
            />

        </main>
    );
};

export default NdisAccessRequests;
