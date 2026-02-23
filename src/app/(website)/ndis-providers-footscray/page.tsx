"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Phone,
    ArrowRight,
    MapPin,
    CheckCircle2,
    Mail,
    UserCheck,
    Heart,
    ShieldCheck,
    ThumbsUp,
    Users
} from "lucide-react";
import SeamlessNDIS from "@/components/sections/home/SeamlessNDIS";

/**
 * Page Config
 */
const services = [
    {
        title: "Assistance with Daily Life",
        description: "We help with everyday tasks, including personal care, housekeeping, and meal preparation, to promote independence and improve the quality of life for participants."
    },
    {
        title: "Group/Centre Activities",
        description: "Our engaging group and centre activities encourage socialisation, skill development, and fun by providing a safe space for participants to connect and grow in a supportive environment."
    },
    {
        title: "Emergency Respite",
        description: "We offer emergency respite services, providing families and carers with a temporary break while ensuring the participant continues to receive high-quality care in a safe and comfortable setting."
    },
    {
        title: "Assistance with Nursing Care",
        description: "Our nursing care services include medication management, health monitoring, and personal care for participants with complex medical needs, ensuring they receive expert support in managing their health conditions."
    },
    {
        title: "Access to Community Activities",
        description: "We help participants engage in community events and social activities, promoting inclusion, personal growth, and the development of new skills, while fostering connections with others in the community."
    },
    {
        title: "Transportation Assistance",
        description: "Our transportation services help participants travel to appointments, social activities, or other essential outings, ensuring they have safe and reliable access to the outside world."
    },
    {
        title: "Allied Health Services",
        description: "NDIS providers in Footscray offer access to allied health professionals such as physiotherapists and occupational therapists, helping participants improve their health, mobility, and communication skills in a supportive environment."
    },
    {
        title: "Psychosocial Recovery Coaching",
        description: "Our psychosocial recovery coaching helps individuals manage mental health challenges, build coping skills, and achieve personal goals, empowering them to improve their overall well-being and live independently."
    },
];

const whyChooseUsPoints = [
    "Person-centred plans",
    "Compassionate support workers with extensive experience",
    "A wide range of disability services",
    "Focus on inclusivity and autonomy",
    "Clear and transparent communication",
    "CALD approach to care"
];

const faqs = [
    {
        question: "Is there a waiting list for services?",
        answer: "We offer flexible services without long waiting lists, ensuring timely support."
    },
    {
        question: "Can I choose my support workers?",
        answer: "Yes, you can select the support workers that best match your preferences. However, it is subject to availability."
    },
    {
        question: "Are your services covered by the NDIS?",
        answer: "Yes, our services are NDIS-compliant and covered under the NDIS framework."
    },
    {
        question: "What happens if I need support in an emergency?",
        answer: "We offer emergency respite services to meet your immediate needs in case the primary carer is unavailable."
    },
    {
        question: "Can I use your transport services for appointments and social events?",
        answer: "Yes, our transportation services are available for appointments and social activities."
    },
    {
        question: "Do you provide services for individuals with complex health conditions?",
        answer: "Yes, we offer nursing care and other specialised services for individuals with complex health needs."
    },
    {
        question: "How do you ensure the quality of your support services?",
        answer: "NDIS providers regularly review our services, provide ongoing staff training, and ensure participant satisfaction."
    },
    {
        question: "What if my support needs change over time?",
        answer: "We offer flexible care plans that can be adjusted as your needs evolve."
    },
    {
        question: "How do I make a complaint if I’m not satisfied with the service?",
        answer: "Contact us at 1300 572 464 directly, and we will work to resolve your concerns promptly."
    },
    {
        question: "Are your services available outside of standard business hours?",
        answer: "Yes, we offer flexible services, including support outside regular hours."
    },
    {
        question: "Do you offer services for people with mental health conditions?",
        answer: "Yes, we provide psychosocial recovery coaching and other services to support mental health."
    },
    {
        question: "How can I track the progress of my care plan?",
        answer: "We provide regular updates and check-ins to ensure your care plan is progressing."
    },
    {
        question: "Are your support workers trained in disability care?",
        answer: "Yes, all our support workers are highly trained and experienced in providing care for people with special needs."
    },
    {
        question: "Can I change my care plan if I’m not satisfied with it?",
        answer: "Yes, your care plan can be tailored to better suit your needs."
    },
    {
        question: "How can I get started with Js Choice – Care and Support?",
        answer: "Contact us for a consultation to discuss your needs and create an individualised care plan."
    },
];

const NdisProvidersFootscray = () => {
    return (
        <main className="bg-gray-50/50">
            <PageHeader
                title="NDIS Providers Footscray"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "NDIS Providers Footscray" }
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
                                <Image
                                    src="/images/footscray/ndis-provider-footscray-1.webp"
                                    alt="NDIS Providers Footscray"
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
                                    <MapPin className="w-5 h-5" />
                                    Footscray
                                </span>
                                <h1 className="text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                    Experienced NDIS Providers in Footscray <span className="text-primary block mt-2">Offering Personalised Services</span>
                                </h1>
                            </div>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    At Js Choice – Care and Support, we offer personalised care that is designed to empower individuals to live their best lives. Our NDIS providers in Footscray focus on offering tailored support by working with participants to develop a plan that suits their lifestyle, goals, and preferences.
                                </p>
                                <p>
                                    Our dedicated team of support workers ensures that each participant receives respectful care that promotes independence and inclusivity. Whether it’s assistance with daily life, nursing care, or allied health assistance, we are committed to improving the lives of our participants. Our aim is to create a safe, supportive, and non-judgemental environment for all participants, fostering personal growth and autonomy at every stage of life.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA 1 */}
            <section className="py-20 bg-[#2D3748] text-white overflow-hidden relative">
                <div className="absolute top-0 left-0 w-1/3 h-full bg-primary/5 -skew-x-12 pointer-events-none" />
                <div className="container-8xl relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-white">
                            Reach Out Today <span className="text-primary">to Discuss Your Needs</span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-10 leading-relaxed">
                            Js Choice – Care and Support is here to help you live your best life and achieve your goals with the support you deserve.
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
                                <Button variant="outline" size="lg" className="h-16 px-8 rounded-full border-2 border-primary/20 text-primary hover:bg-white/10 text-lg font-bold transition-all hover:-translate-y-1">
                                    Consultations
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 bg-white relative">
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="relative h-[500px] w-full">
                                <Image
                                    src="/images/footscray/ndis-provider-footscray-2.webp"
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
                            className="space-y-10"
                        >
                            <h2 className="text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                Why Choose Our NDIS <span className="text-secondary">Providers in Footscray?</span>
                            </h2>
                            <p className="text-gray-600 text-lg">
                                We are known for providing:
                            </p>
                            <ul className="space-y-4">
                                {whyChooseUsPoints.map((point, index) => (
                                    <li key={index} className="flex items-start gap-3 bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-secondary/30 transition-all">
                                        <div className="mt-1 flex-shrink-0 text-secondary">
                                            <CheckCircle2 size={20} />
                                        </div>
                                        <span className="text-gray-700 font-medium text-lg">{point}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What's Covered Section */}
            <section className="py-20 bg-gray-50 relative">
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
                        <div className="lg:order-2 space-y-10">
                            <h2 className="text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                What’s Covered Under <span className="text-primary">Our NDIS Services?</span>
                            </h2>
                            <p className="text-gray-600 text-lg">
                                At Js Choice – Care and Support, we deliver a wide range of NDIS supports that cater to the diverse requirements of our participants. These include:
                            </p>
                            <div className="space-y-6">
                                {services.map((service, index) => (
                                    <div key={index} className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-all group">
                                        <h3 className="text-xl font-bold text-[#2D3748] mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                                        <p className="text-gray-600 leading-relaxed text-sm">
                                            {service.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="lg:order-1 relative sticky top-24">
                            <div className="relative h-[600px] w-full">
                                <Image
                                    src="/images/footscray/ndis-provider-footscray-3.webp"
                                    alt="NDIS Services"
                                    fill
                                    className="rounded-[2.5rem] shadow-2xl object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="py-20 lg:py-32 bg-[#2D3748] text-white overflow-hidden relative">
                <div className="container-8xl relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight text-white">
                            Don’t Wait! Take Control <span className="text-primary">of Your NDIS Journey Today</span>
                        </h2>
                        <div className="text-xl text-gray-300 mb-10 space-y-4 max-w-3xl mx-auto leading-relaxed">
                            <p>
                                We’re ready to help you unlock your potential with tailored care that fits your unique needs. Whether it’s personal assistance, nursing support, or community access, we’re here to make your goals a reality.
                            </p>
                            <p>
                                <span className="font-bold text-white">Js Choice – Care and Support</span> is here to kick-start your journey towards more choices and greater autonomy.
                            </p>
                        </div>
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
                                <Button variant="outline" size="lg" className="h-16 px-8 rounded-full border-2 border-primary/20 text-primary hover:bg-white/10 text-lg font-bold transition-all hover:-translate-y-1">
                                    Consultations
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
                <div className="container-8xl max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-[#2D3748]">
                            Frequently Asked Questions <span className="text-secondary">on NDIS Providers in Footscray</span>
                        </h2>
                    </div>
                    <Accordion type="single" collapsible className="w-full space-y-4">
                        {faqs.map((faq, index) => (
                            <AccordionItem key={index} value={`item-${index}`} className="border border-gray-200 rounded-xl px-4 bg-gray-50 overflow-hidden">
                                <AccordionTrigger className="text-left text-lg font-bold text-[#2D3748] hover:text-secondary hover:no-underline py-4">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-gray-600 text-base leading-relaxed pb-4">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </section>

            <SeamlessNDIS />
        </main>
    );
};

export default NdisProvidersFootscray;
