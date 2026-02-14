"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const WhoWeAre = () => {
    return (
        <section className="py-20 lg:py-32 bg-white overflow-hidden">
            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-justify">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">

                    {/* Text Column (Left - 7 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7 flex flex-col space-y-8"
                    >
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] leading-[1.1] tracking-tight uppercase">
                            Who We <span className="text-[#ABB3F1]">Are</span>
                        </h2>

                        <div className="space-y-6 text-lg text-gray-600 font-medium leading-relaxed">
                            <p>
                                Welcome to <span className="font-bold text-[#5A67D8]">Js Choice Care and Support!</span> Your trusted registered NDIS provider. We are so thrilled that you have taken your precious time to know us.
                            </p>
                            <p>
                                We have extensive experience working with individuals across various conditions, including Autism Spectrum Disorders, Attention deficit hyperactivity disorder (ADHD), Down Syndrome, Schizophrenia, Post-traumatic stress disorder (PTSD), Pathological Demand Avoidance (PDA), Stroke, Muscular dystrophy etc.
                            </p>
                            <p>
                                We are based in Point Cook, Melbourne. Over the past years we have been working with participants all over Melbourne. We aim to connect with our wider NDIS community with our neuro-affirming approach and be one of the best care and support provider for our NDIS participants. Let’s collaborate to empower yourselves and your family, ensuring every step is taken with care, expertise, and heartfelt dedication.
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
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-[10px] border-white z-10 w-full aspect-[4/3]">
                            <Image
                                src="/images/about/about-img.webp"
                                alt="Who We Are - Js Choice"
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

export default WhoWeAre;
