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
    Stethoscope,
    Activity,
    Users,
    HeartPulse,
    ClipboardCheck,
    Target,
    Utensils,
    Brain,
    Dna,
    HelpingHand
} from "lucide-react";

const whatDoesAHADo = [
    {
        title: "Physiotherapy Support",
        description: "Help you perform prescribed exercises correctly to build strength and mobility.",
        icon: Activity
    },
    {
        title: "OT Support",
        description: "Assist with daily living skills, fine motor tasks, or using assistive technology in your home.",
        icon: HelpingHand
    },
    {
        title: "Speech Therapy Support",
        description: "Practice communication strategies and speech exercises in a relaxed environment.",
        icon: MessageCircle
    },
    {
        title: "Dietetics & Healthy Habits",
        description: "Assist with meal planning, shopping, and cooking based on a Dietitian's advice (acting as a \"Habit Coach\" for healthy living).",
        icon: Utensils
    }
];

const conditions = [
    { title: "Neurodevelopmental Conditions", items: ["Autism Spectrum Disorder (ASD)", "ADHD", "Down Syndrome"], icon: Dna },
    { title: "Neurological Conditions", items: ["Motor Neurone Disease (MND)", "Parkinson's Disease", "Multiple Sclerosis (MS)", "and Alzheimer's"], icon: Brain },
    { title: "Physical Disabilities", items: ["Cerebral Palsy", "Spinal Cord Injuries (SCI)", "and Stroke recovery"], icon: HeartPulse },
    { title: "Acquired Brain Injury (ABI)", items: ["Supporting cognitive and physical rehabilitation."], icon: Activity }
];

const benefits = [
    {
        title: "Cost-Effective",
        description: "AHA rates are significantly lower than fully qualified therapists. This means you can afford more hours of support.",
        icon: Target
    },
    {
        title: "Consistency",
        description: "Instead of seeing a therapist once a month, you can see an AHA weekly to keep your momentum going.",
        icon: Activity
    },
    {
        title: "Real World Practice",
        description: "Therapy happens in a clinic; life happens at home. Our AHAs help you apply clinical strategies to real world situations (like shopping or cooking).",
        icon: Users
    },
    {
        title: "Holistic Feedback",
        description: "Our AHAs spend more time with you. They can provide detailed feedback to your supervising therapist about what is working and what isn't, allowing for better adjustments to your plan.",
        icon: ClipboardCheck
    }
];

const whyChooseUs = [
    {
        description: "We Work with Your Team: We collaborate directly with your existing Occupational Therapists, Speech Pathologists, Physiotherapists, and Psychologists. We follow their lead to ensure everyone is pulling in the same direction."
    },
    {
        description: "Skill Builders, Not Just Carers: Our focus is on Capacity Building. We identify the obstacles preventing you from reaching your daily objectives, whether that's money management or mobility, and break them down into manageable steps."
    },
    {
        description: "Cultural & Personal Match: We know that therapy requires trust. We strive to match you with an AHA who understands your cultural background and communication style."
    }
];

import { MessageCircle } from "lucide-react";

const AlliedHealthAssistance = () => {
    return (
        <main className="bg-gray-50/50">
            <PageHeader
                title="Allied Health Services"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Allied Health Services" }
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
                            <div className="absolute inset-0 bg-secondary/20 translate-x-4 translate-y-4 rounded-[2.5rem] -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-500" />
                            <div className="relative w-full h-[500px]">
                                <Image quality={80}
                                    src="/images/allied-health/img32.webp"
                                    alt="Allied Health Services"
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
                                    <Stethoscope className="w-5 h-5" />
                                    Therapy Support
                                </span>
                                <h2 className="text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                    Extending Your Therapy, <span className="text-secondary block mt-2">Maximizing Your Budget</span>
                                </h2>
                            </div>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    Therapy is most effective when it is consistent. However, seeing a qualified Occupational Therapist (OT), Physiotherapist, or Speech Pathologist every week can quickly use up your NDIS funding.
                                </p>
                                <p>
                                    At Js Choice – Care and Support, our Allied Health Assistants (AHAs) offer a smart solution. They are qualified support professionals who work under the supervision of your treating therapist to help you practice your exercises and therapy goals in between your major appointments.
                                </p>
                                <p>
                                    By using an AHA, you can increase the frequency of your support sessions for a fraction of the cost, ensuring you reach your goals faster.
                                </p>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <TalkToUsButton />
                                <Link href="/consultations">
                                    <Button size="lg" className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-[#1A202C] text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                        Consultations <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What Does an AHA Do? */}
            <section className="py-20 bg-white relative">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-gray-50 -skew-x-12 -z-10" />
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-10"
                        >
                            <h2 className="text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                What Does an <span className="text-primary">Allied Health Assistant Do?</span>
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Think of an AHA as the bridge between your clinical appointments and your daily life. They don't write the therapy plan; they help you live it. Working with your primary therapist, our AHAs can:
                            </p>

                            <div className="grid gap-6">
                                {whatDoesAHADo.map((item, index) => (
                                    <div key={index} className="flex gap-4 group">
                                        <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary group-hover:scale-110 transition-transform">
                                            <item.icon size={24} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[#2D3748] mb-1 group-hover:text-secondary transition-colors">{item.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
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
                            className="relative hidden lg:block"
                        >
                            <div className="absolute -inset-4 bg-primary/20 rounded-[2.5rem] blur-xl opacity-70" />
                            <div className="relative w-full h-[600px]">
                                <Image quality={80}
                                    src="/images/allied-health/img33.webp"
                                    alt="AHA Services"
                                    fill
                                    className="rounded-[2.5rem] shadow-2xl border-8 border-white object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Conditions We Support */}
            <section className="py-20 bg-gray-50">
                <div className="container-8xl">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-[#2D3748]">
                            Conditions <span className="text-secondary">We Support</span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Our team has extensive experience working with a diverse range of participants. We don't just "treat" a condition; we support the person. We are experienced in supporting:
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {conditions.map((item, index) => (
                            <div key={index} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm text-center">
                                <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center text-secondary mx-auto mb-4">
                                    <item.icon size={28} />
                                </div>
                                <h3 className="text-xl font-bold text-[#2D3748] mb-4">{item.title}</h3>
                                <ul className="space-y-2">
                                    {item.items.map((subItem, idx) => (
                                        <li key={idx} className="text-gray-600 text-sm">{subItem}</li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits of Hiring an AHA */}
            <section className="py-20 lg:py-28 overflow-hidden bg-[#2D3748] text-white">
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-2 lg:order-1 relative"
                        >
                            <div className="relative w-full h-[500px]">
                                <Image quality={80}
                                    src="/images/allied-health/img35.webp"
                                    alt="Benefits of Hiring AHA"
                                    fill
                                    className="rounded-[2.5rem] shadow-2xl border-8 border-white/10 object-cover"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="order-1 lg:order-2 space-y-10"
                        >
                            <div>
                                <h2 className="text-4xl font-black mb-6 text-white">
                                    The Benefits of <span className="text-primary">Hiring an AHA</span>
                                </h2>
                                <p className="text-gray-300 text-lg mb-8">
                                    Why add an Allied Health Assistant to your NDIS team?
                                </p>
                            </div>

                            <div className="grid gap-6">
                                {benefits.map((benefit, index) => (
                                    <div key={index} className="bg-white/5 border border-white/10 p-6 rounded-2xl flex gap-4 hover:bg-white/10 transition-colors group">
                                        <div className="mt-1 flex-shrink-0">
                                            <benefit.icon className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-lg mb-2 text-white">{benefit.title}</h3>
                                            <p className="text-gray-400 text-sm leading-relaxed">{benefit.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-white">
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="space-y-10">
                            <h2 className="text-3xl md:text-5xl font-black text-[#2D3748]">
                                Why Choose JS Choice for <span className="text-secondary">Allied Health Support?</span>
                            </h2>
                            <p className="text-gray-600 text-lg">
                                We take a collaborative and neuro-affirming approach to therapy support.
                            </p>
                            <div className="space-y-6">
                                {whyChooseUs.map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="mt-1 flex-shrink-0 w-2 h-2 rounded-full bg-secondary translate-y-2" />
                                        <p className="text-gray-700 leading-relaxed text-lg">
                                            <span className="font-bold text-[#2D3748]">{item.description.split(':')[0]}:</span>
                                            {item.description.split(':')[1]}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative h-[400px] w-full rounded-[2.5rem] overflow-hidden shadow-xl bg-gray-100 flex items-center justify-center">
                            {/* Placeholder for an image or just a graphic element if no image specifically for this section */}
                            <div className="text-center p-8">
                                <Image quality={80}
                                    src="/images/allied-health/img32.webp" // Reusing the hero image or another relevant one if available, as a placeholder
                                    alt="Why Choose Us"
                                    fill
                                    className="object-cover opacity-80"
                                />
                            </div>
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
                            Ready to Boost <span className="text-primary">Your Therapy Outcomes?</span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Don't let your therapy goals stall between appointments. Engage an Allied Health Assistant to keep you moving forward.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <Button size="lg" className="h-16 px-8 rounded-full bg-white hover:bg-gray-100 text-[#2D3748] text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                <Phone className="mr-2 h-5 w-5" />
                                Call Now
                            </Button>
                            <Link href="/contact-us">
                                <Button size="lg" className="h-16 px-8 rounded-full bg-primary hover:bg-primary/90 text-[#1A202C] text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/consultations">
                                <Button variant="outline" size="lg" className="h-16 px-8 rounded-full border-2 border-white/20 text-primary hover:bg-white/10 text-lg font-bold transition-all hover:-translate-y-1">
                                    Consultations
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            <ServiceCTA />

            <ServiceFormSection
                source="service_page"
                sourcePage="/allied-health-services"
                defaultService="Allied Health Services"
            />

        </main>
    );
};

export default AlliedHealthAssistance;
