"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, MessageCircleQuestion } from "lucide-react";
import { HOME_FAQS, type HomeFaq } from "@/data/home-faqs";

function renderAnswer(faq: HomeFaq): ReactNode {
    const link = faq.links?.[0];
    if (!link) return faq.answer;

    const index = faq.answer.indexOf(link.text);
    if (index === -1) return faq.answer;

    return (
        <>
            {faq.answer.slice(0, index)}
            <Link
                href={link.href}
                className="font-bold text-[#5A67D8] underline decoration-[#5A67D8]/40 underline-offset-4 hover:text-[#2D3748]"
            >
                {link.text}
            </Link>
            {faq.answer.slice(index + link.text.length)}
        </>
    );
}

const Faq = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="relative py-16 sm:py-20 lg:py-16 bg-white overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#ABB3F1]/5 rounded-full blur-[100px] z-0" />
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#F1ABAB]/5 rounded-full blur-[120px] z-0" />

            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(#e2e8f0_2px,transparent_2px)] [background-size:40px_40px] [mask-image:radial-gradient(circle_at_80%_20%,white,transparent_60%)] opacity-60 z-0 pointer-events-none" />
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_2px,transparent_2px)] [background-size:40px_40px] [mask-image:radial-gradient(circle_at_20%_80%,white,transparent_60%)] opacity-60 z-0 pointer-events-none" />

            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-0 pointer-events-none" />

            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-10 lg:mb-8">
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

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 lg:gap-3 items-start">
                    {HOME_FAQS.map((faq, index) => (
                        <motion.div
                            key={faq.question}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.45, delay: Math.min(index, 6) * 0.05 }}
                            className="min-w-0"
                        >
                            <button
                                type="button"
                                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                                aria-expanded={activeIndex === index}
                                className={`w-full text-left p-4 sm:p-5 lg:px-4 lg:py-3 rounded-2xl lg:rounded-xl transition-all duration-500 flex items-center justify-between gap-3 sm:gap-4 border-2 ${activeIndex === index
                                    ? "bg-[#ABB3F1]/5 border-[#ABB3F1] shadow-xl"
                                    : "bg-gray-50/50 border-gray-100 hover:border-[#ABB3F1]/30 shadow-sm hover:shadow-md"
                                    }`}
                            >
                                <span className={`min-w-0 text-base sm:text-lg lg:text-[15px] lg:font-bold font-black leading-snug transition-colors duration-300 ${activeIndex === index ? "text-[#2D3748]" : "text-[#2D3748]/70"
                                    }`}>
                                    {faq.question}
                                </span>
                                <div className={`shrink-0 w-9 h-9 sm:w-10 sm:h-10 lg:w-8 lg:h-8 rounded-xl flex items-center justify-center transition-all duration-500 ${activeIndex === index
                                    ? "bg-[#ABB3F1] text-white rotate-180 shadow-lg shadow-[#ABB3F1]/30"
                                    : "bg-white text-[#ABB3F1] border border-gray-200"
                                    }`}>
                                    <ChevronDown className="w-5 h-5 lg:w-4 lg:h-4" strokeWidth={3} />
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
                                        <div className="px-4 sm:px-5 lg:px-4 pb-4 sm:pb-5 lg:pb-3 pt-2 text-gray-600 text-base sm:text-lg lg:text-sm leading-relaxed font-medium">
                                            <div className="h-px w-full bg-[#ABB3F1]/20 mb-3" />
                                            {renderAnswer(faq)}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-10 sm:mt-12 lg:mt-8 text-center">
                    <p className="text-sm font-bold text-gray-400">
                        Still have questions? Reach out to our expert coordinators anytime.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Faq;
