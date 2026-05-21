"use client";

import { motion } from "framer-motion";
import { PhoneCall, Handshake, Rocket } from "lucide-react";
import Image from "next/image";

const steps = [
    {
        icon: PhoneCall,
        title: "Contact Us",
        description: "Reach out via phone or our online form for a free chat.",
        color: "bg-[#ABB3F1] shadow-[#ABB3F1]/50",
    },
    {
        icon: Handshake,
        title: "Meet & Greet",
        description: "We meet to understand your goals, NDIS plan, and cultural needs.",
        color: "bg-[#F1ABAB] shadow-[#F1ABAB]/50",
    },
    {
        icon: Rocket,
        title: "Start Your Journey",
        description: "We match you with the right support workers and begin your care.",
        color: "bg-[#68D391] shadow-[#68D391]/50",
    }
];

const GettingStarted = () => {
    return (
        <section className="relative py-24 bg-white overflow-hidden">
            {/* Background Decorations */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-64 h-64 bg-[#ABB3F1]/5 rounded-full blur-[80px]" />
                <div className="absolute bottom-[20%] left-[10%] w-64 h-64 bg-[#F1ABAB]/5 rounded-full blur-[80px]" />
                {/* Dotted Pattern */}
                <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
            </div>

            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
                {/* Header */}
                <div className="text-center max-w-3xl mx-auto mb-16 lg:mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="flex items-center justify-center gap-2 text-[#ABB3F1] font-black uppercase text-xs tracking-[0.2em] mb-4">
                            <span className="h-px w-8 bg-[#ABB3F1]" />
                            Simple Process
                            <span className="h-px w-8 bg-[#ABB3F1]" />
                        </div>
                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] leading-tight uppercase tracking-tighter">
                            Getting Started with Our <span className="text-[#F1ABAB]">Melbourne NDIS Services</span>
                        </h2>
                    </motion.div>
                </div>

                {/* Steps Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
                    {/* Connecting Line (Desktop) */}
                    <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-1 bg-gradient-to-r from-[#ABB3F1]/30 via-[#F1ABAB]/30 to-[#68D391]/30 -z-10" />

                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                            className="flex flex-col items-center text-center group"
                        >
                            <div className={`w-28 h-28 rounded-[2rem] ${step.color} flex items-center justify-center mb-6 relative group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-500 shadow-xl`}>
                                <step.icon className="w-12 h-12 text-white drop-shadow-md" strokeWidth={2} />

                                {/* Number Badge */}
                                <div className="absolute -top-3 -right-3 w-10 h-10 bg-white rounded-full flex items-center justify-center font-black text-gray-300 shadow-md border-4 border-white/50">
                                    {index + 1}
                                </div>
                            </div>

                            <h3 className="text-2xl font-black text-[#2D3748] mb-4 uppercase tracking-tight">
                                {step.title}
                            </h3>
                            <p className="text-lg text-gray-600 font-medium leading-relaxed max-w-xs">
                                {step.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default GettingStarted;
