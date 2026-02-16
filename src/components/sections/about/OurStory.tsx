"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Heart, Sparkles } from "lucide-react";

const OurStory = () => {
    return (
        <section className="relative py-20 lg:py-32 bg-white overflow-hidden">
            {/* Background Decorators */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <motion.div
                    animate={{ y: [0, -30, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[8%] right-[5%] text-[var(--primary)] opacity-[0.06]"
                >
                    <Heart size={140} strokeWidth={0.3} fill="currentColor" />
                </motion.div>

                <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 8, repeat: Infinity }}
                    className="absolute bottom-[10%] left-[3%] text-[var(--secondary)] opacity-[0.06]"
                >
                    <Sparkles size={100} strokeWidth={0.5} />
                </motion.div>

                {/* Large Background Watermark */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[16vw] font-black text-gray-500/[0.02] select-none pointer-events-none uppercase tracking-tighter">
                    Story
                </div>
            </div>

            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16"
                >
                    <div className="flex items-center justify-center gap-3 text-[var(--secondary)] font-black uppercase text-xs tracking-[0.2em] mb-4">
                        <span className="h-px w-8 bg-[var(--secondary)]" />
                        Who We Are
                        <span className="h-px w-8 bg-[var(--secondary)]" />
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] leading-[1.1] tracking-tight uppercase">
                        Our <span className="text-[#ABB3F1]">Story</span>
                    </h2>
                </motion.div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
                    {/* Text Column (Left - 7 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7 flex flex-col space-y-6"
                    >
                        <div className="space-y-6 text-lg text-gray-600 font-medium leading-relaxed text-justify">
                            <p>
                                <span className="font-bold text-[#5A67D8]">JS Choice Group</span> was founded on a profound belief: that exceptional disability support begins with genuine understanding. We&apos;re not just another NDIS provider — we&apos;re a family-led organization built by someone who has walked the same path as the families we serve.
                            </p>
                            <p>
                                Based in Point Cook, Melbourne, <span className="font-bold text-[#2D3748]">JS Choice Group</span> has earned recognition as a trusted registered NDIS provider known for our ethical, culturally responsive, and participant-centred approach. We don&apos;t simply deliver services — we walk alongside individuals and families, advocating for their rights and celebrating their unique strengths every step of the way.
                            </p>
                        </div>
                    </motion.div>

                    {/* Image Column (Right - 5 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-5 relative"
                    >
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-10 border-white z-10 w-full aspect-[4/3]">
                            <Image
                                src="/images/about/about-img.webp"
                                alt="Our Story - JS Choice Group"
                                fill
                                className="object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Decorative Elements */}
                        <div className="absolute top-10 -right-10 w-32 h-32 bg-[#F1ABAB]/20 rounded-full blur-2xl -z-10" />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#ABB3F1]/20 rounded-full blur-2xl -z-10" />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default OurStory;
