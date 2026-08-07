"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import SectionHeader from "./SectionHeader";
import type { FaqItem, SectionHeadingProps } from "@/types/service-sections";

interface ServiceFaqSectionProps {
    heading: SectionHeadingProps;
    items: FaqItem[];
    footerText?: string;
}

const ServiceFaqSection = ({ heading, items, footerText }: ServiceFaqSectionProps) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    return (
        <section className="relative py-16 lg:py-24 bg-white overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[100px] z-0" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-[120px] z-0" />

            <div className="container-8xl relative z-10 flex flex-col items-center gap-12 lg:gap-16">
                <div className="flex flex-col items-center gap-4 w-full">
                    <div className="flex items-center justify-center gap-2 text-secondary font-black uppercase text-xs tracking-[0.3em]">
                        <MessageCircleQuestion size={18} />
                        Q &amp; A Session
                    </div>
                    <SectionHeader {...heading} align="center" />
                </div>

                <div className="max-w-4xl mx-auto space-y-4">
                    {items.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <button
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                className={`w-full text-left p-6 md:p-8 rounded-[2rem] transition-all duration-500 flex items-center justify-between gap-6 border-2 ${activeIndex === index
                                    ? "bg-primary/5 border-primary shadow-xl"
                                    : "bg-gray-50/50 border-gray-100 hover:border-primary/30 shadow-sm hover:shadow-md"
                                    }`}
                                aria-expanded={activeIndex === index}
                            >
                                <span
                                    className={`text-base md:text-lg font-black leading-tight transition-colors duration-300 ${activeIndex === index ? "text-[#2D3748]" : "text-[#2D3748]/70"
                                        }`}
                                >
                                    {faq.question}
                                </span>
                                <div
                                    className={`shrink-0 w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${activeIndex === index
                                        ? "bg-primary text-white rotate-180 shadow-lg shadow-primary/30"
                                        : "bg-white text-primary border border-gray-200"
                                        }`}
                                >
                                    <ChevronDown size={22} strokeWidth={3} />
                                </div>
                            </button>

                            <AnimatePresence>
                                {activeIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="overflow-hidden"
                                    >
                                        <div className="p-6 md:p-8 pt-2 text-gray-600 leading-relaxed">
                                            <div className="h-px w-full bg-primary/20 mb-4" />
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                {footerText ? (
                    <div className="mt-16 text-center">
                        <p className="text-sm font-bold text-gray-400">{footerText}</p>
                    </div>
                ) : null}
            </div>
        </section>
    );
};

export default ServiceFaqSection;
