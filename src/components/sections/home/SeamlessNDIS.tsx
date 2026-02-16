"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const SeamlessNDIS = () => {
    return (
        <section className="relative py-20 lg:py-24 bg-[#ABB3F1] overflow-hidden">
            {/* UI Background Ornaments & Accents */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-0 right-0 w-[40%] h-full bg-white/5 skew-x-12 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[30%] h-full bg-black/5 -skew-x-12 -translate-x-1/4" />

                {/* Visual Noise: Subtle Dot Matrix */}
                <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.2)_1px,transparent_1px)] [background-size:32px_32px] opacity-30" />

                {/* Expert UI Decorations */}
                <div className="absolute top-10 left-[10%] w-24 h-24 border-2 border-white/10 rounded-full" />
                <div className="absolute bottom-10 right-[15%] w-32 h-32 border-4 border-black/5 rounded-3xl rotate-12" />
            </div>

            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white mb-12 leading-[1.1] tracking-tight uppercase">
                        Together, let’s make the NDIS work <span className="text-[#2D3748]">seamlessly</span> for your future of continued independence.
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
                        {/* Call Button */}
                        <motion.a
                            href="tel:130057246423"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="h-14 px-8 rounded-full bg-[#2D3748] hover:bg-black text-white flex items-center justify-center gap-3 shadow-xl hover:shadow-2xl transition-all min-w-[240px]"
                        >
                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                                <Phone size={18} />
                            </div>
                            <span className="text-sm font-black uppercase tracking-widest">Call Us: 130057246423</span>
                        </motion.a>

                        {/* Enquire Button */}
                        <Button
                            asChild
                            className="h-14 px-10 rounded-full bg-white text-[#2D3748] hover:bg-gray-100 font-black text-sm uppercase tracking-widest gap-2 shadow-2xl transition-all min-w-[200px]"
                        >
                            <Link href="/contact-us">
                                Get Consultations
                                <ArrowRight size={18} />
                            </Link>
                        </Button>
                    </div>
                </motion.div>
            </div>

            {/* Fine Branding Text */}
            <div className="absolute bottom-6 left-0 w-full text-center pointer-events-none opacity-20">
                <span className="text-[10px] font-black text-white uppercase tracking-[0.5em]">
                    Expert Care • Seamless Support • Independence
                </span>
            </div>
        </section>
    );
};

export default SeamlessNDIS;
