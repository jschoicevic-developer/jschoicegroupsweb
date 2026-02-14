"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Phone, Mail } from "lucide-react";

const CtaStrip = () => {
    return (
        <section className="py-24 bg-gradient-to-r from-[#F1ABAB] to-[#FFC3C3] relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[url('/grid-pattern.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]" />
            <div className="absolute -top-24 -left-24 w-64 h-64 bg-white/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-[#5A67D8]/20 rounded-full blur-3xl animate-pulse delay-75" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] mb-8 max-w-6xl mx-auto leading-tight tracking-tight uppercase">
                        Together, let’s make the NDIS work seamlessly for your future of <span className="text-[#5A67D8]">continued independence</span>
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mt-10">
                        <Button className="bg-[#5A67D8] hover:bg-[#4C51BF] text-white h-14 px-10 rounded-full text-base font-bold shadow-[0_10px_20px_rgba(90,103,216,0.3)] hover:shadow-[0_15px_30px_rgba(90,103,216,0.4)] transition-all duration-300 transform hover:-translate-y-1 min-w-[220px] gap-3">
                            <Phone className="w-5 h-5" />
                            <span>0393 946 305</span>
                        </Button>
                        <Button variant="outline" className="bg-white/80 hover:bg-white text-[#2D3748] border-2 border-white/50 hover:border-white h-14 px-10 rounded-full text-base font-bold shadow-lg hover:shadow-xl backdrop-blur-sm transition-all duration-300 min-w-[220px] gap-3">
                            <Mail className="w-5 h-5 text-[#5A67D8]" />
                            <span>Contact Us</span>
                        </Button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CtaStrip;
