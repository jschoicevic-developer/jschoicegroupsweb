"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight, Ear, HeartHandshake, Sparkles, Megaphone, RefreshCw, ShieldCheck, Check } from "lucide-react";
import Link from "next/link";

const commitments = [
    { icon: Ear, text: "Listening deeply to understand your unique needs, strengths, and goals" },
    { icon: HeartHandshake, text: "Supporting holistically across all areas of your life, wellbeing, and aspirations" },
    { icon: Sparkles, text: "Empowering genuinely through strengths-based, choice-driven, person-centred services" },
    { icon: Megaphone, text: "Advocating tirelessly for your rights, inclusion, opportunities, and full participation" },
    { icon: RefreshCw, text: "Improving continuously through participant feedback, learning, and innovation" },
    { icon: ShieldCheck, text: "Leading ethically with unwavering integrity, transparency, and accountability" },
];

const OurCommitment = () => {
    return (
        <>
            {/* Commitment Section */}
            <section className="relative py-20 lg:py-32 bg-white overflow-hidden">
                {/* Background Decorators */}
                <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                    <div className="absolute top-0 right-0 w-80 h-80 bg-[#ABB3F1]/5 rounded-full blur-[100px]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F1ABAB]/5 rounded-full blur-[100px]" />
                </div>

                <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                    {/* Section Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-center mb-16 max-w-3xl mx-auto"
                    >
                        <div className="flex items-center justify-center gap-3 text-[var(--primary)] font-black uppercase text-xs tracking-[0.2em] mb-4">
                            <span className="h-px w-8 bg-[var(--primary)]" />
                            Our Promise
                            <span className="h-px w-8 bg-[var(--primary)]" />
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] leading-[1.1] tracking-tight uppercase">
                            Our Commitment <span className="text-[#ABB3F1]">to You</span>
                        </h2>
                        <p className="text-lg text-gray-500 font-medium mt-6 leading-relaxed">
                            At JS Choice Group, we&apos;re not satisfied with simply meeting NDIS standards — we strive to exceed them. We&apos;re steadfastly committed to:
                        </p>
                    </motion.div>

                    {/* Commitment Items */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto mb-20">
                        {commitments.map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className="flex items-start gap-4 p-6 rounded-2xl bg-[#F8FAFC] border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group"
                            >
                                <div className="p-3 rounded-xl bg-[#ABB3F1]/10 text-[#ABB3F1] flex-shrink-0 group-hover:scale-110 transition-transform">
                                    <item.icon size={22} strokeWidth={2} />
                                </div>
                                <p className="text-base text-gray-700 font-medium leading-relaxed">
                                    {item.text}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Building Futures Together */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-4xl mx-auto"
                    >
                        <div className="relative bg-gradient-to-br from-[#F8FAFC] to-white p-8 md:p-12 rounded-[2.5rem] border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)]">
                            {/* Inner border */}
                            <div className="absolute inset-3 border border-gray-100/50 rounded-[2rem] pointer-events-none" />

                            <div className="text-center space-y-6">
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ABB3F1]/10 text-[#5A67D8] text-xs font-bold uppercase tracking-widest">
                                    <Check size={14} />
                                    Our Vision
                                </div>

                                <h3 className="text-2xl md:text-3xl font-black text-[#2D3748] uppercase tracking-tight">
                                    Building Futures <span className="text-[#ABB3F1]">Together</span>
                                </h3>

                                <div className="space-y-4 text-base md:text-lg text-gray-600 font-medium leading-relaxed text-left lg:text-justify">
                                    <p>
                                        JS Choice Group exists because we believe in possibility. We believe in the potential within every individual, the strength within every family, and the transformative power of support that genuinely understands your journey.
                                    </p>
                                    <p>
                                        Whether you&apos;re beginning your NDIS experience or seeking a provider who will authentically partner with you, we invite you to discover the JS Choice difference. Here, you&apos;re not just a participant number or a service agreement — you&apos;re a valued individual with unique aspirations, and we&apos;re genuinely honored to support you in achieving them.
                                    </p>
                                    <p className="text-[#5A67D8] font-bold italic text-center">
                                        Welcome to JS Choice Group — where your choice, your voice, and your future matter most.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="relative py-20 lg:py-24 bg-[#ABB3F1] overflow-hidden">
                {/* UI Background Ornaments */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute top-0 right-0 w-[40%] h-full bg-white/5 skew-x-12 translate-x-1/4" />
                    <div className="absolute bottom-0 left-0 w-[30%] h-full bg-black/5 -skew-x-12 -translate-x-1/4" />

                    {/* Dot Matrix */}
                    <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:32px_32px] opacity-30" />

                    {/* Decorations */}
                    <div className="absolute top-10 left-[10%] w-24 h-24 border-2 border-white/10 rounded-full" />
                    <div className="absolute bottom-10 right-[15%] w-32 h-32 border-4 border-black/5 rounded-3xl rotate-12" />
                </div>

                <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-3xl mx-auto"
                    >
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-[1.1] tracking-tight uppercase">
                            Ready to Start a <span className="text-[#2D3748]">Conversation?</span>
                        </h2>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mt-10">
                            {/* Call Button */}
                            <motion.a
                                href="tel:1300572464"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="h-14 px-8 rounded-full bg-[#2D3748] hover:bg-black text-white flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all min-w-[240px]"
                            >
                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                    <Phone size={18} />
                                </div>
                                <span className="text-sm font-black uppercase tracking-widest">Call Us: 1300 572 464</span>
                            </motion.a>

                            {/* Enquire Button */}
                            <Button
                                asChild
                                className="h-14 px-10 rounded-full bg-white text-[#2D3748] hover:bg-gray-100 font-black text-sm uppercase tracking-widest gap-2 shadow-2xl transition-all min-w-[200px]"
                            >
                                <Link href="/referral">
                                    Get a Free Referral
                                    <ArrowRight size={18} />
                                </Link>
                            </Button>
                        </div>
                    </motion.div>
                </div>

                {/* Branding Text */}
                <div className="absolute bottom-6 left-0 w-full text-center pointer-events-none opacity-20">
                    <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">
                        Your Choice • Your Voice • Your Future
                    </span>
                </div>
            </section>
        </>
    );
};

export default OurCommitment;
