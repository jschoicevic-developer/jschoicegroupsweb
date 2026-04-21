"use client";

import { motion } from "framer-motion";
import PageHeader from "@/components/ui/PageHeader";
import { Button } from "@/components/ui/button";
import TalkToUsButton from "@/components/ui/TalkToUsButton";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle2, Phone, Mail, ArrowRight } from "lucide-react";

const services = [
    {
        title: "Personal Care & Self-Management",
        description: "Maintaining personal hygiene is fundamental to dignity and well-being. We provide sensitive, respectful assistance with self-care, morning & evening routines, and bathing."
    },
    {
        title: "Domestic Housekeeping",
        description: "A clean and organised home contributes to a comfortable living environment. We assist with general tidying, laundry, ironing, and keeping your living spaces organised."
    },
    {
        title: "Meal Preparation & Nutrition",
        description: "Access to nutritious food is vital for your health. We support you with groceries, cooking, meal prep, and storage to encourage independence and culinary skills."
    },
    {
        title: "Home & Garden Maintenance",
        description: "We help take the physical strain out of maintaining your property. Our services include garden maintenance, basic handyman tasks, and professional cleaning to keep your home safe."
    }
];

const whyChooseUs = [
    {
        title: "Neuro-Affirming Approach:",
        description: "We understand that everyone manages daily tasks differently. We adapt our support to suit your processing style and sensory needs."
    },
    {
        title: "Culturally Inclusive Care:",
        description: "We embrace cultural diversity. Our team respects your traditions, languages, and dietary preferences, ensuring your care feels authentic to you."
    },
    {
        title: "Qualified & Experienced Team:",
        description: "Our support workers are trained, passionate, and dedicated to your safety and security."
    },
    {
        title: "Person-Centred Focus:",
        description: "We don't believe in a 'one size fits all' cover. We build our support around your goals and your schedule."
    }
];

const AssistanceWithDailyLife = () => {
    return (
        <main className="bg-gray-50/50">
            <PageHeader
                title="Assistance With Daily Life"
                breadcrumb={[
                    { label: "Home", href: "/" },
                    { label: "Assistance With Daily Life" }
                ]}
            />

            {/* Introduction Section */}
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
                                    src="/images/daily-life/daily-living-img01.webp"
                                    alt="Daily Living Assistance"
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
                                <h2 className="text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                    Reliable Daily Life Support <span className="text-primary mt-2">at Home in Melbourne</span>
                                </h2>
                            </div>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
                                <p>
                                    At JS Choice – Care and Support, we understand that managing daily tasks can sometimes feel overwhelming. We are here to change that. As a trusted name in the Melbourne disability sector, we provide specialised, culturally safe support designed to simplify your routine and help you feel in control of your environment.
                                </p>
                                <p>
                                    Our goal is not just to complete tasks for you, but to work alongside you. Whether you need support with personal care, household management, or maintaining your property, our approach is tailored to your unique needs, helping you achieve greater autonomy and comfort in your own home.
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-4 pt-2">
                                <Link href="/consultations">
                                    <Button className="h-14 px-10 rounded-full bg-primary hover:bg-primary/90 text-[#1A202C] font-black text-sm uppercase tracking-widest shadow-lg hover:shadow-xl transition-all w-full sm:w-auto">
                                        Consultations
                                    </Button>
                                </Link>
                                <TalkToUsButton />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* What Comprises Section */}
            <section className="py-20 lg:py-28 bg-white relative">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gray-50 skew-x-12 -z-10" />
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8"
                        >
                            <h2 className="text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight">
                                What Does Our Assistance with <span className="text-secondary block mt-2">Daily Life Include?</span>
                            </h2>
                            <p className="text-lg text-gray-600 leading-relaxed">
                                Our support is comprehensive and flexible. We offer a wide range of services aimed at promoting your well-being and fostering a sense of pride in your home and appearance.
                            </p>
                            <div className="pt-4 relative h-[300px]">
                                <Image quality={80}
                                    src="/images/daily-life/daily-living-img02.webp"
                                    alt="Care Services"
                                    fill
                                    className="rounded-3xl shadow-lg border-4 border-white object-cover"
                                />
                            </div>
                        </motion.div>
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="grid gap-6"
                        >
                            {services.map((service, index) => (
                                <div key={index} className="bg-gray-50 hover:bg-white p-6 rounded-2xl border border-gray-100 hover:border-secondary/20 hover:shadow-xl transition-all duration-300 group">
                                    <h3 className="text-xl font-bold text-[#2D3748] mb-3 group-hover:text-secondary transition-colors flex items-center gap-3">
                                        <div className="w-2 h-2 rounded-full bg-secondary" />
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            ))}
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Image Breaker */}
            <section className="py-20">
                <div className="container-8xl">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="rounded-[3rem] overflow-hidden h-[400px] relative shadow-2xl"
                    >
                        <div className="absolute inset-0 bg-black/30 z-10" />
                        <Image quality={80}
                            src="/images/daily-life/daily-living-img03.webp"
                            alt="Lifestyle Support"
                            fill
                            className="object-cover"
                        />
                        <div className="absolute inset-0 z-20 flex items-center justify-center text-center px-4">
                            <h3 className="text-3xl md:text-5xl font-black text-white max-w-4xl leading-tight">
                                Supporting Your Journey Towards Greater Independence
                            </h3>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section className="py-20 lg:py-28 bg-[#2D3748] text-white overflow-hidden">
                <div className="container-8xl">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="absolute -inset-4 bg-primary/20 rounded-[2.5rem] blur-xl" />
                            <div className="relative w-full h-[500px]">
                                <Image quality={80}
                                    src="/images/daily-life/daily-living-img04.webp"
                                    alt="Why Choose Us"
                                    fill
                                    className="relative rounded-[2.5rem] border-8 border-white/10 shadow-2xl z-10 object-cover"
                                />
                            </div>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <span className="text-primary font-bold uppercase tracking-widest text-sm mb-2 block">Our Promise</span>
                            <h2 className="text-4xl lg:text-5xl font-black mb-8 text-white leading-tight">
                                Why choose JS choice for <span className="text-primary">Daily Living support?</span>
                            </h2>
                            <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                                When you invite support workers into your home, you need to feel safe, respected, and understood. Here is why Melbourne participants choose us:
                            </p>

                            <ul className="space-y-6">
                                {whyChooseUs.map((item, index) => (
                                    <li key={index} className="flex items-start gap-4 group">
                                        <div className="mt-1 bg-primary/20 p-2 rounded-full group-hover:bg-primary transition-colors duration-300 shrink-0">
                                            <CheckCircle2 className="w-5 h-5 text-primary group-hover:text-[#2D3748]" />
                                        </div>
                                        <span className="text-lg text-gray-300 group-hover:text-white transition-colors">
                                            <strong className="text-white">{item.title}</strong> {item.description}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 lg:py-32 bg-gray-50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#ABB3F1_0.5px,transparent_0.5px)] [background-size:24px_24px] opacity-20" />

                <div className="container-8xl relative z-10">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="bg-white rounded-[3rem] p-10 md:p-16 text-center shadow-2xl border border-gray-100 max-w-5xl mx-auto"
                    >
                        <h2 className="text-4xl md:text-6xl font-black text-[#2D3748] mb-6">
                            Let’s Get <span className="text-primary">Started!</span>
                        </h2>
                        <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
                            Ready to reclaim your time and enjoy a more organised, supported life at home? Let's embark on this journey toward continued independence together.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                            <Button size="lg" className="h-16 px-8 rounded-full bg-[#2D3748] hover:bg-black text-white text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                <Phone className="mr-2 h-5 w-5" />
                                Call Now
                            </Button>
                            <Link href="/contact-us">
                                <Button size="lg" className="h-16 px-8 rounded-full bg-primary hover:bg-primary/90 text-[#1A202C] text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                                    Get in Touch <ArrowRight className="ml-2 h-5 w-5" />
                                </Button>
                            </Link>
                            <Link href="/consultations">
                                <Button variant="outline" size="lg" className="h-16 px-8 rounded-full border-2 border-[#2D3748] text-[#2D3748] hover:bg-gray-50 text-lg font-bold shadow-sm hover:shadow-md transition-all hover:-translate-y-1">
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

export default AssistanceWithDailyLife;
