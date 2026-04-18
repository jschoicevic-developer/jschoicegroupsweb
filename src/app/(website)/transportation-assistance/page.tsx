"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
    Phone,
    ArrowRight,
    Car,
    MapPin,
    Clock,
    ShieldCheck,
    Users,
    Accessibility,
    CalendarCheck,
    HeartHandshake,
    BadgeDollarSign,
    GraduationCap,
    Map,
    CheckCircle2
} from "lucide-react";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const moreThanJustADriver = [
    {
        title: "Assistance at Your Destination",
        description: "We don't just drop you off at the curb. We can assist you into the building, help you check in for appointments, or aid with carrying groceries.",
        icon: MapPin
    },
    {
        title: "Companionship",
        description: "Our team is friendly, patient, and happy to chat (or let you enjoy a quiet ride if you prefer).",
        icon: HeartHandshake
    },
    {
        title: "Safety First",
        description: "All drivers are police checked, hold valid Working with Children Checks, and are trained in First Aid.",
        icon: ShieldCheck
    }
];

const transportServices = [
    {
        title: "Essential Appointments & Errands",
        description: "Never worry about missing a booking again. We provide reliable transport for medical appointments, grocery shopping, and Centrelink meetings.",
        icon: CalendarCheck
    },
    {
        title: "Social & Community Access",
        description: "Stay connected with the people and places you love. Visiting family, attending social groups, or trips to the cinema.",
        icon: Users
    },
    {
        title: "Education & Work",
        description: "We support your routine by getting you to your TAFE, university, or employment commitments on time.",
        icon: GraduationCap
    },
    {
        title: "Travel Training (Capacity Building)",
        description: "Our goal is to build your independence. If you want to learn how to use public transport safely, our support workers can provide Travel Training.",
        icon: Map
    }
];

const whyChooseUs = [
    {
        title: "Wheelchair Accessible Vehicles",
        description: "Our fleet includes vehicles equipped to accommodate wheelchairs and mobility aids safely.",
        icon: Accessibility
    },
    {
        title: "Neuro-Affirming & Anxiety-Friendly",
        description: "We understand that travel can be a source of anxiety. Our drivers are patient, drive smoothly, and can adjust music or temperature to suit your sensory needs.",
        icon: HeartHandshake
    },
    {
        title: "Punctual & Reliable",
        description: "We value your time. When we say we will be there, we are there. No waiting.",
        icon: Clock
    },
    {
        title: "Transparent NDIS Pricing",
        description: "We follow the NDIS Price Guide strictly, so there are no hidden costs or surprises.",
        icon: BadgeDollarSign
    }
];

const faqs = [
    {
        question: "Can I Book A Regular Weekly Trip?",
        answer: "Yes! We can set up a recurring booking for your regular activities (like a weekly therapy session or social group) so you don't have to call us every time."
    },
    {
        question: "Do You Offer After-Hours Transport?",
        answer: "Yes. We understand that life doesn't stop at 5 PM. We are available for evening and weekend transport (subject to prior booking and funding)."
    },
    {
        question: "Will The Driver Wait For Me During My Appointment?",
        answer: "This depends on your funding and preference. In many cases, the support worker can wait for you or accompany you into the appointment. For longer appointments, we can arrange to drop you off and return to pick you up."
    }
];

const TransportationAssistance = () => {
    return (
        <main className="bg-gray-50/50">
            <PageHeader
                title="Transportation Assistance"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Transportation Assistance" }
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
                                    src="/images/transport/transport-1.webp"
                                    alt="Reliable NDIS Transport"
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
                                    <Car className="w-5 h-5" />
                                    Safe & Reliable Travel
                                </span>
                                <h2 className="text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                    Freedom to Move: <span className="text-primary block mt-2">Safe, Reliable NDIS Transport</span>
                                </h2>
                            </div>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    At JS Choice – Care and Support, we believe that mobility is the key to independence. Whether it's attending a medical appointment, visiting friends, or simply doing the weekly shop, you deserve to get there safely, comfortably, and on time.
                                </p>
                                <p>
                                    For many NDIS participants, public transport or rideshare apps can be stressful or inaccessible. Our Transportation Assistance service bridges that gap. We provide a door-to-door service that removes the anxiety of travel, ensuring you can access your community with confidence.
                                </p>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <Link href="/referral">
                                    <Button size="lg" className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-[#1A202C] text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                        Free Referral <ArrowRight className="ml-2 h-5 w-5" />
                                    </Button>
                                </Link>
                                <Button variant="outline" size="lg" className="h-14 px-8 rounded-full border-2 border-[#2D3748] text-[#2D3748] hover:bg-gray-50 text-lg font-bold shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                                    Talk to Us
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* More Than Just a Driver */}
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
                            <h2 className="text-4xl font-black text-[#2D3748]">
                                More Than Just <span className="text-secondary">A Driver</span>
                            </h2>
                            <p className="text-gray-600 text-lg">
                                Unlike a taxi service, our transport is provided by qualified support workers. This means the support doesn't stop when the car parks.
                            </p>

                            <div className="grid gap-8">
                                {moreThanJustADriver.map((item, index) => (
                                    <div key={index} className="flex gap-4">
                                        <div className="mt-1 flex-shrink-0 w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center text-secondary">
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

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-secondary/20 rounded-[2.5rem] blur-xl opacity-70" />
                            <div className="relative w-full h-[500px]">
                                <Image quality={80}
                                    src="/images/transport/transport-2.webp"
                                    alt="Friendly Support Worker Driver"
                                    fill
                                    className="rounded-[2.5rem] shadow-2xl border-8 border-white object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Our Transport Services (Grid) */}
            <section className="py-20 lg:py-28 bg-[#2D3748] text-white overflow-hidden">
                <div className="container-8xl">
                    <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
                        <h2 className="text-3xl md:text-5xl font-black text-white">
                            Our Transport <span className="text-primary">Services</span>
                        </h2>
                        <p className="text-gray-300 text-lg">
                            We offer flexible transport solutions tailored to your unique schedule and mobility needs.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 lg:gap-12">
                        {transportServices.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                className="bg-white/5 border border-white/10 p-8 rounded-3xl hover:bg-white/10 transition-colors group flex flex-col items-start gap-4"
                            >
                                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform flex-shrink-0">
                                    <service.icon size={28} />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-white mb-3">{service.title}</h3>
                                    <p className="text-gray-300 leading-relaxed">{service.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>


            {/* Why Choose Us */}
            <section className="py-20 lg:py-28 relative bg-white">
                <div className="absolute top-0 left-0 w-1/3 h-full bg-gray-50 skew-x-12 -z-10" />
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-10 order-2 lg:order-1"
                        >
                            <h2 className="text-4xl font-black text-[#2D3748]">
                                Why Melbourne Families <span className="text-secondary">Trust Our Transport</span>
                            </h2>
                            <ul className="space-y-6">
                                {whyChooseUs.map((item, index) => (
                                    <li key={index} className="flex gap-4">
                                        <div className="mt-1 flex-shrink-0">
                                            <CheckCircle2 className="w-6 h-6 text-secondary" />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-bold text-[#2D3748] mb-1">{item.title}</h3>
                                            <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
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
                                    src="/images/transport/transport-3.webp"
                                    alt="Safe Transport"
                                    fill
                                    className="rounded-[2.5rem] shadow-2xl border-8 border-white object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-gray-50">
                <div className="container-8xl max-w-4xl mx-auto">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-black text-[#2D3748] mb-4">
                            Frequently Asked <span className="text-primary">Questions</span>
                        </h2>
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
            <section className="py-20 lg:py-32 bg-white relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/5 -z-10" />
                <div className="container-8xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-[#2D3748] rounded-[3rem] p-10 md:p-16 text-center shadow-2xl max-w-5xl mx-auto text-white"
                    >
                        <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight">
                            Ready to <span className="text-primary">Get Moving?</span>
                        </h2>
                        <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Don't let a lack of transport keep you at home. Experience the freedom of reliable, supportive travel with JS Choice.
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
                            <Link href="/referral">
                                <Button variant="outline" size="lg" className="h-16 px-8 rounded-full border-2 border-white text-white hover:bg-white hover:text-[#2D3748] text-lg font-bold shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                                    Free Referral
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default TransportationAssistance;
