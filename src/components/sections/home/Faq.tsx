"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";

const faqs = [
    {
        question: "Can Your Support Coordinators Connect Me With NDIS Providers?",
        answer: "Yes. Based on your specific requirements, our support coordinators will connect you with trusted NDIS providers. Additionally, we focus on capacity building to help you develop the skills needed to manage service providers independently in the future."
    },
    {
        question: "How Can You Help Me Access The Community?",
        answer: "We support community access through our Social & Community Participation and Transportation Assistance services. Our team helps you access community resources, attend events, and build social connections to combat isolation, while our support workers assist with travel to ensure you reach your destination safely."
    },
    {
        question: "Are The NDIS Accommodations That You Provide Well-maintained?",
        answer: "Absolutely. For our Emergency Respite and short-term accommodation services, we provide safe, clean, and comfortable living spaces. We ensure our facilities meet high standards so you can relax and feel at home during your stay."
    },
    {
        question: "Do You Use Restrictive Practices During Psychosocial Recovery Coaching?",
        answer: "No. As a neuro-affirming provider, we treat everyone with kindness and respect your autonomy. We do not decide for you; instead, we provide the tools and coaching you need to navigate challenges and achieve your own definition of independence."
    }
];

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className="relative py-24 bg-white overflow-hidden">
            {/* UI Background Ornaments & Accents */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ABB3F1]/5 rounded-full blur-[100px] z-0" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F1ABAB]/5 rounded-full blur-[120px] z-0" />

            {/* Radial Dot Pattern (Expert Style: Pulsing Focus) */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(#e2e8f0_2px,transparent_2px)] [background-size:40px_40px] [mask-image:radial-gradient(circle_at_80%_20%,white,transparent_60%)] opacity-60 z-0 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_2px,transparent_2px)] [background-size:40px_40px] [mask-image:radial-gradient(circle_at_20%_80%,white,transparent_60%)] opacity-60 z-0 pointer-events-none" />

            {/* Pattern Overlay: Subtle Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 pointer-events-none" />

            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">

                {/* Section Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="space-y-4"
                    >
                        <div className="flex items-center justify-center gap-2 text-[#F1ABAB] font-black uppercase text-xs tracking-[0.3em]">
                            <MessageCircleQuestion size={18} />
                            Help Centre
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] leading-tight uppercase tracking-tighter">
                            Frequently Asked <span className="text-[#ABB3F1]">Questions</span>
                        </h2>
                        <div className="w-16 h-1 bg-[#ABB3F1] mx-auto rounded-full" />
                    </motion.div>
                </div>

                {/* FAQ Accordion */}
                <div className="max-w-4xl mx-auto space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group"
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className={`w-full text-left p-6 md:p-8 rounded-[2.5rem] transition-all duration-500 flex items-center justify-between gap-6 border-2 ${activeIndex === index
                                    ? "bg-[#ABB3F1]/5 border-[#ABB3F1] shadow-xl"
                                    : "bg-gray-50/50 border-gray-100 hover:border-[#ABB3F1]/30 shadow-sm hover:shadow-md"
                                    }`}
                            >
                                <span className={`text-lg md:text-xl font-black leading-tight transition-colors duration-300 ${activeIndex === index ? "text-[#2D3748]" : "text-[#2D3748]/70"
                                    }`}>
                                    {faq.question}
                                </span>
                                <div className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${activeIndex === index
                                    ? "bg-[#ABB3F1] text-white rotate-180 shadow-lg shadow-[#ABB3F1]/30"
                                    : "bg-white text-[#ABB3F1] border border-gray-200"
                                    }`}>
                                    <ChevronDown size={24} strokeWidth={3} />
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-8 md:p-10 pt-4 text-gray-600 text-lg leading-relaxed font-medium">
                                            <div className="h-px w-full bg-[#ABB3F1]/20 mb-6" />
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {/* Decorative Elements */}
                <div className="mt-20 text-center">
                    <p className="text-sm font-bold text-gray-400">
                        Still have questions? Reach out to our expert coordinators anytime.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Faq;
