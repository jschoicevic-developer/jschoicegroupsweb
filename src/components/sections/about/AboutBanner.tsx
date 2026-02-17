"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import Link from "next/link";

const AboutBanner = () => {
    return (
        <section className="relative py-24 lg:py-32 bg-[#2D3748] overflow-hidden">
            {/* Background Image/Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#2D3748]/90 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-overlay"
                    style={{ backgroundImage: "url('/banner-frame-img.webp')" }}
                />
                {/* Decorative Gradient */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ABB3F1]/20 to-transparent z-10" />
            </div>

            {/* Dot Matrix Pattern */}
            <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px] z-10 pointer-events-none" />

            {/* Decorative Elements */}
            <div className="absolute top-10 left-[10%] w-24 h-24 border-2 border-white/10 rounded-full z-10 pointer-events-none" />
            <div className="absolute bottom-10 right-[15%] w-32 h-32 border-4 border-white/5 rounded-3xl rotate-12 z-10 pointer-events-none" />

            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    {/* Breadcrumb */}
                    <nav className="flex items-center justify-center gap-2 text-sm font-medium text-gray-400 mb-8">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <span className="text-[#ABB3F1]">/</span>
                        <span className="text-[#ABB3F1] font-bold">About Us</span>
                    </nav>

                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-6">
                        About Us
                    </h1>

                    <motion.p
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-lg md:text-xl text-white/80 font-medium leading-relaxed mb-10 max-w-3xl mx-auto"
                    >
                        Compassionate NDIS Support Rooted in Lived Experience
                    </motion.p>

                    {/* CTA Buttons */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="flex flex-col sm:flex-row items-center justify-center gap-4"
                    >
                        <Button
                            asChild
                            className="h-14 px-10 rounded-full bg-[#ABB3F1] hover:bg-[#9CA5E5] text-[#1A202C] font-bold text-sm uppercase tracking-widest gap-2 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all"
                        >
                            <Link href="/contact-us">
                                Get Consultations
                                <ArrowRight size={18} />
                            </Link>
                        </Button>

                        <motion.a
                            href="tel:0421622262"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="h-14 px-8 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white flex items-center justify-center gap-3 shadow-lg transition-all"
                        >
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <Phone size={16} />
                            </div>
                            <span className="text-sm font-bold tracking-wider">1300572464</span>
                        </motion.a>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default AboutBanner;
