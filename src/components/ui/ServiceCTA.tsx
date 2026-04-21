"use client";

import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";

interface ServiceCTAProps {
    heading?: string;
    subheading?: string;
}

const ServiceCTA = ({
    heading = "Ready to Get Started?",
    subheading = "Fill out our quick form below and our team will be in touch within 24 hours.",
}: ServiceCTAProps) => {
    return (
        <section className="py-16 bg-gradient-to-r from-[#F1ABAB] to-[#FFC3C3] relative overflow-hidden">
            <div className="absolute -top-16 -left-16 w-48 h-48 bg-white/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-[#5A67D8]/20 rounded-full blur-3xl animate-pulse delay-75" />

            <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className="text-2xl md:text-4xl font-black text-[#2D3748] mb-4 max-w-3xl mx-auto leading-tight tracking-tight">
                        {heading}
                    </h2>
                    <p className="text-[#2D3748]/80 text-lg font-medium mb-6">
                        {subheading}
                    </p>
                    <ArrowDown className="mx-auto w-8 h-8 text-[#2D3748]/60 animate-bounce" />
                </motion.div>
            </div>
        </section>
    );
};

export default ServiceCTA;
