"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
    Phone,
    ArrowRight,
    Clock,
    Home,
    Hotel,
    HeartHandshake,
    ShieldCheck,
    Users,
    CalendarClock,
    UserCheck,
    LayoutDashboard,
    Siren,
    ClipboardCheck,
    CheckCircle2
} from "lucide-react";
import ServiceCTA from "@/components/ui/ServiceCTA";
import ServiceFormSection from "@/components/ui/ServiceFormSection";
import StickyMobileCTA from "@/components/landing/StickyMobileCTA";

// Data content extracted from user request
const howItWorks = [
    {
        title: "Contact Us",
        description: "Call our team immediately for urgent respite needs. We are available 24/7 to answer your call and arrange support.",
        icon: Phone
    },
    {
        title: "Quick Assessment",
        description: "We conduct a rapid needs assessment to understand the participant's requirements and match them with the right caregiver or facility.",
        icon: ClipboardCheck
    },
    {
        title: "Immediate Support",
        description: "Our qualified staff steps in to provide professional care, ensuring safety and comfort without delay.",
        icon: Siren
    }
];

const includedServices = [
    {
        title: "In-Home Respite",
        description: "Professional care delivered in your own home, maintaining familiar routines and comfort.",
        icon: Home
    },
    {
        title: "Short-Term Accommodation",
        description: "Safe and comfortable stays in our fully accessible respite facilities with 24/7 support.",
        icon: Hotel
    },
    {
        title: "Overnight Care",
        description: "Dedicated staff available throughout the night to ensure safety and attend to needs.",
        icon: Moon
    },
    {
        title: "Emergency Crisis Care",
        description: "Rapid response teams available for unexpected situations or caregiver unavailability.",
        icon: Siren
    }
];

const whyChooseUs = [
    {
        title: "Rapid Response",
        description: "We understand emergencies can't wait. Our team is ready to deploy support quickly when you need it most."
    },
    {
        title: "Qualified Professionals",
        description: "All our support workers are screened, trained, and experienced in handling complex care needs."
    },
    {
        title: "Flexible Options",
        description: "From a few hours to several weeks, we offer flexible respite packages tailored to your situation."
    },
    {
        title: "Peace of Mind",
        description: "Rest easy knowing your loved one is in safe, compassionate hands while you take care of other matters."
    }
];

import { Moon } from "lucide-react";

const EmergencyRespite = () => {
    return (
        <main className="bg-gray-50/50">
            <PageHeader
                title="Emergency Respite"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Emergency Respite" }
                ]}
            />

            {/* Intro Section */}
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
                                    src="/images/emergency-respite/respite-1.webp"
                                    alt="Emergency Respite Care"
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
                                <span className="text-primary font-black uppercase tracking-widest text-sm flex items-center gap-2">
                                    <Clock className="w-5 h-5" />
                                    24/7 Support Available
                                </span>
                                <h2 className="text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                    Emergency Respite <span className="block text-primary mt-2">Care & Crisis Support</span>
                                </h2>
                            </div>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <h3 className="text-2xl font-bold text-[#2D3748]">Immediate Relief When You Need It Most</h3>
                                <p>
                                    At JS Choice – Care and Support, we understand that life is unpredictable. Caregivers get sick, family emergencies happen, and sometimes you just need urgent support. Our Emergency Respite services are designed to step in quickly, providing a safe, supportive environment for your loved one.
                                </p>
                                <p>
                                    Whether it's in-home support or a stay at our short-term accommodation, our team is ready to respond. We prioritise the safety and well-being of NDIS participants, ensuring continuity of care even in crisis situations.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What is Emergency Respite */}
            <section className="py-20 bg-white relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 -z-10" />
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <h2 className="text-4xl font-black text-[#2D3748]">
                                What is <span className="text-secondary">Emergency Respite?</span>
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Emergency Respite is immediate, short-term care provided when the usual carer is unavailable or unable to provide support due to unforeseen circumstances. It is designed to prevent the breakdown of the primary care relationship and ensure the participant remains safe and supported.
                            </p>
                            <div className="flex gap-4">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full font-bold text-sm">
                                    <Siren size={16} /> Rapid Response
                                </span>
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full font-bold text-sm">
                                    <Clock size={16} /> 24/7 Availability
                                </span>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="relative h-[400px] w-full">
                                <Image quality={80}
                                    src="/images/emergency-respite/respite-2.webp"
                                    alt="Emergency Respite Explained"
                                    fill
                                    className="rounded-3xl shadow-lg border-4 border-white object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section className="py-20 lg:py-28 overflow-hidden">
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="hidden lg:block relative"
                        >
                            <div className="absolute inset-0 bg-primary/20 rounded-[2rem] -rotate-3 z-0" />
                            <div className="relative w-full h-[500px]">
                                <Image quality={80}
                                    src="/images/emergency-respite/respite-3.webp"
                                    alt="How Emergency Respite Works"
                                    fill
                                    className="rounded-[2rem] shadow-2xl z-10 object-cover"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-10"
                        >
                            <h2 className="text-4xl font-black text-[#2D3748]">
                                How Does <span className="text-primary">Emergency Support Work?</span>
                            </h2>
                            <p className="text-lg text-gray-600">
                                We have a streamlined process to ensure support is deployed as quickly as possible.
                            </p>

                            <div className="space-y-8">
                                {howItWorks.map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-xl bg-white border border-gray-100 shadow-md flex items-center justify-center text-primary">
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[#2D3748] mb-2">{item.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Services Included */}
            <section className="py-20 bg-[#2D3748] text-white overflow-hidden">
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-10"
                        >
                            <div>
                                <h2 className="text-4xl lg:text-5xl font-black mb-6 text-white">
                                    Services Included in <span className="text-primary">Respite Care</span>
                                </h2>
                                <p className="text-gray-300 text-lg">
                                    We offer comprehensive respite options to suit different needs and situations:
                                </p>
                            </div>

                            <div className="grid gap-6">
                                {includedServices.map((service, index) => (
                                    <div key={index} className="bg-white/5 border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-colors duration-300">
                                        <div className="flex items-start gap-4">
                                            <div className="mt-1 text-primary">
                                                <service.icon size={24} />
                                            </div>
                                            <div>
                                                <h4 className="text-xl font-bold mb-2 text-white">{service.title}</h4>
                                                <p className="text-gray-300 text-sm leading-relaxed">{service.description}</p>
                                            </div>
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
                            className="relative order-first lg:order-last"
                        >
                            <div className="relative w-full h-[500px]">
                                <Image quality={80}
                                    src="/images/emergency-respite/respite-4.webp"
                                    alt="Services Included"
                                    fill
                                    className="rounded-[2.5rem] shadow-2xl border-8 border-white/10 object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Mid-page CTA */}
            <ServiceCTA
              heading="Need Emergency Respite Support?"
              subheading="Fill out our quick form below and our team will respond within 24 hours."
            />

            {/* Why Choose Us & CTA */}
            <section className="py-20 lg:py-32 relative overflow-hidden bg-white">
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="relative w-full h-[500px]">
                                <Image quality={80}
                                    src="/images/emergency-respite/respite-5.webp"
                                    alt="Why Choose Us"
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
                            className="space-y-8"
                        >
                            <h2 className="text-4xl font-black text-[#2D3748]">
                                Why Choose <span className="text-secondary">Us?</span>
                            </h2>
                            <p className="text-lg text-gray-600">
                                When emergencies happen, you need a team you can trust implicitly. Here is why Melbourne families choose JS Choice:
                            </p>
                            <ul className="space-y-6">
                                {whyChooseUs.map((item, index) => (
                                    <li key={index} className="flex flex-col gap-2">
                                        <div className="flex items-center gap-3">
                                            <CheckCircle2 className="w-6 h-6 text-secondary" />
                                            <span className="text-xl font-bold text-[#2D3748]">{item.title}</span>
                                        </div>
                                        <p className="pl-9 text-gray-600">{item.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* Inline Form Section */}
            <ServiceFormSection
              source="service_page"
              sourcePage="/emergency-respite"
              defaultService="Respite / Short Term Accommodation"
            />

            <StickyMobileCTA />
        </main>
    );
};

export default EmergencyRespite;
