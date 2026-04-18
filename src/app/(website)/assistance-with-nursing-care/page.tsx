"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import {
    Phone,
    ArrowRight,
    CheckCircle2,
    Stethoscope,
    ClipboardCheck,
    Activity,
    Heart,
    Pill,
    Users,
    Syringe,
    CalendarCheck
} from "lucide-react";

// Data content extracted from user request
const howItWorks = [
    {
        title: "Assessment and Planning",
        description: "Our professionals conduct an initial assessment in order to understand the participant's unique needs, preferences, and goals. Based on that, we create a personalised care plan to help them efficiently.",
        icon: ClipboardCheck
    },
    {
        title: "Delivery of Care",
        description: "Our trained and skilled nurses visit the participant's home regularly to offer the required services. We make sure that they are getting quality NDIS community nursing care services in Melbourne according to the plan.",
        icon: Users
    },
    {
        title: "Monitoring and Adjustments",
        description: "The best thing about our team is that they continuously monitor the participant's health and make changes in the care plan as needed.",
        icon: Activity
    }
];

const includedServices = [
    {
        title: "Medication Management",
        description: "Our professionals make sure that the participants are taking their medicines correctly and on time.",
        icon: Pill
    },
    {
        title: "Wound Care",
        description: "We also specialise in offering expert care for wounds. This includes infection control, dressing changes, and wound assessment.",
        icon: Syringe
    },
    {
        title: "Health Monitoring",
        description: "Our professionals also monitor the participants' health conditions to ensure that they are not facing any issues.",
        icon: Activity
    },
    {
        title: "Chronic Disease Management",
        description: "Our organisations' expert caregivers and nurses also assist participants in managing chronic conditions such as heart disease, respiratory problems, diabetes, etc.",
        icon: Heart
    },
    {
        title: "Coordination of Care",
        description: "We also work closely with other healthcare professionals to make sure the participants are getting the best care and support.",
        icon: Users
    }
];

const whyChooseUs = [
    {
        title: "Experienced and Qualified Nurses",
        description: "Our team is highly trained and experienced in providing exceptional care."
    },
    {
        title: "Personalised Care Plans",
        description: "We tailor our services not just to meet the unique needs of those who we serve but also to exceed their expectations."
    },
    {
        title: "Expertise",
        description: "Our dedicated team has a deep understanding of NDIS needs. Hence, you can trust us to help you navigate the complex system smartly and maximise your benefits."
    },
    {
        title: "Compassionate Care",
        description: "Our nurses are skilled and compassionate to offer quality NDIS community nursing care services in Melbourne."
    }
];

const AssistanceWithNursingCare = () => {
    return (
        <main className="bg-gray-50/50">
            <PageHeader
                title="Assistance With Nursing Care"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Assistance With Nursing Care" }
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
                            <div className="relative w-full h-[500px]">
                                <Image quality={80}
                                    src="/images/nursing/nursing-care-img01.webp"
                                    alt="Nursing Care"
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
                                    <Stethoscope className="w-5 h-5" />
                                    Community Nursing
                                </span>
                                <h2 className="text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                    Community Nursing Care <span className="block text-primary mt-2">in Melbourne</span>
                                </h2>
                            </div>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <h3 className="text-2xl font-bold text-[#2D3748]">Get the Best Support & Live Independently</h3>
                                <p>
                                    At JS Choice – Care and Support, we understand the vital role that community nursing care plays in improving the quality of life for individuals with special needs. Hence, our dedicated team is highly committed to offering the best nursing care assistance in Melbourne.
                                </p>
                                <p>
                                    Our skilled professionals have vast experience and expertise in the industry. Whether you or your loved one requires the best assistance and community nursing service, we are always ready to provide quality results.
                                </p>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What is Community Nursing Care */}
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
                                What is <span className="text-secondary">Community Nursing Care?</span>
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Community nursing care in Melbourne is a specialised service provided by registered nurses and health care professionals to individuals in their home or community settings. The main focus is on offering comprehensive healthcare services and helping the participants recover quickly from injuries, surgery or health-related problems.
                            </p>
                            <div className="flex gap-4">
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full font-bold text-sm">
                                    <CheckCircle2 size={16} /> Registered Nurses
                                </span>
                                <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 text-secondary rounded-full font-bold text-sm">
                                    <CheckCircle2 size={16} /> Home Visits
                                </span>
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="relative w-full h-[400px]">
                                <Image quality={80}
                                    src="/images/nursing/nursing-care-img02.webp"
                                    alt="What is Community Nursing"
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
                            initial={{ opacity: 0, display: "none" }}
                            whileInView={{ opacity: 1, display: "block" }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="hidden lg:block relative"
                        >
                            <div className="absolute inset-0 bg-primary/20 rounded-[2rem] -rotate-3 z-0" />
                            <div className="relative w-full h-[500px]">
                                <Image quality={80}
                                    src="/images/nursing/nursing-care-img03.webp"
                                    alt="How Nursing Works"
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
                                How Does <span className="text-primary">Community Nursing Work?</span>
                            </h2>
                            <p className="text-lg text-gray-600">
                                Our NDIS community nursing care service in Melbourne is designed to offer flexible and client-centred care.
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
                                    Services Included in <span className="text-primary">Nursing Care</span>
                                </h2>
                                <p className="text-gray-300 text-lg">
                                    At JS Choice – Care and Support, our NDIS community nursing care services in Melbourne include:
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
                                    src="/images/nursing/nursing-care-img04.webp"
                                    alt="Services Included"
                                    fill
                                    className="rounded-[2.5rem] shadow-2xl border-8 border-white/10 object-cover"
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

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
                                    src="/images/nursing/nursing-care-img05.webp"
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
                                Hiring us for nursing care assistance in Melbourne is a smart decision that you can easily make because:
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

                    {/* CTA Layout */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-gray-50 rounded-[3rem] p-10 md:p-16 text-center border border-gray-100 max-w-5xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-5xl font-black text-[#2D3748] mb-6">
                            Reach Out to <span className="text-primary">Us Today!</span>
                        </h2>
                        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Get in touch with us today to learn more about our services and how we can assist you. You can also email us to ask questions and clarify your doubts.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <Button size="lg" className="h-16 px-8 rounded-full bg-[#2D3748] hover:bg-black text-white text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                <Phone className="mr-2 h-5 w-5" />
                                Call: 1300 572 464
                            </Button>
                            <Link href="/referral">
                                <Button size="lg" className="h-16 px-8 rounded-full bg-primary hover:bg-primary/90 text-[#1A202C] text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    Get a Free Referral <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/referral">
                                <Button variant="outline" size="lg" className="h-16 px-8 rounded-full border-2 border-[#2D3748] text-[#2D3748] hover:bg-white text-lg font-bold shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
                                    Get a Free Referral
                                </Button>
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
};

export default AssistanceWithNursingCare;
