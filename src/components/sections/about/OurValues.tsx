"use client";

import { motion } from "framer-motion";
import { Heart, Eye, Award, HandHeart, Globe } from "lucide-react";

const values = [
    {
        icon: Heart,
        title: "Respect & Dignity",
        description: "We honor every individual's autonomy, choices, and inherent worth. Our services are thoughtfully designed around your goals, preferences, and cultural values — never imposed, always collaborative.",
        color: "text-[#ABB3F1]",
        bg: "bg-[#ABB3F1]",
    },
    {
        icon: Eye,
        title: "Honesty & Transparency",
        description: "We maintain open communication, clear processes, and straightforward information. You deserve to fully understand your support options and make informed decisions with confidence.",
        color: "text-[#5A67D8]",
        bg: "bg-[#5A67D8]",
    },
    {
        icon: Award,
        title: "Accountability & Excellence",
        description: "We hold ourselves to the highest standards of care, compliance, and professional service delivery. Your trust drives our relentless commitment to continuous improvement and quality outcomes.",
        color: "text-[#F1ABAB]",
        bg: "bg-[#F1ABAB]",
    },
    {
        icon: HandHeart,
        title: "Compassion & Understanding",
        description: "Our team brings both professional expertise and genuine empathy to every interaction. We recognize that behind every support plan is a unique individual with hopes, challenges, dreams, and unlimited potential.",
        color: "text-[#68D391]",
        bg: "bg-[#68D391]",
    },
    {
        icon: Globe,
        title: "Cultural Responsiveness",
        description: "We celebrate diversity and provide services that respect and authentically reflect the cultural backgrounds, beliefs, traditions, and values of the individuals and families we support.",
        color: "text-[#E8A87C]",
        bg: "bg-[#E8A87C]",
    },
];

const OurValues = () => {
    return (
        <section className="relative py-20 lg:py-32 bg-white overflow-hidden">
            {/* Background Decorators */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[14vw] font-black text-gray-500/[0.02] select-none pointer-events-none uppercase tracking-tighter">
                    Values
                </div>

                {/* Abstract SVG Paths */}
                <svg className="absolute inset-0 w-full h-full opacity-[0.04]" viewBox="0 0 1440 800">
                    <motion.path
                        d="M-100 300 C 200 200, 500 400, 800 300 S 1200 200, 1540 300"
                        fill="none"
                        stroke="var(--primary)"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 6, repeat: Infinity, repeatType: "reverse" }}
                    />
                    <motion.path
                        d="M-100 500 C 300 600, 600 400, 900 500 S 1300 600, 1540 500"
                        fill="none"
                        stroke="var(--secondary)"
                        strokeWidth="1"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 8, repeat: Infinity, repeatType: "reverse", delay: 1 }}
                    />
                </svg>
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
                    <div className="flex items-center justify-center gap-3 text-[var(--secondary)] font-black uppercase text-xs tracking-[0.2em] mb-4">
                        <span className="h-px w-8 bg-[var(--secondary)]" />
                        What We Stand For
                        <span className="h-px w-8 bg-[var(--secondary)]" />
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] leading-[1.1] tracking-tight uppercase">
                        Our Values: The <br className="hidden sm:block" />
                        <span className="text-[#ABB3F1]">Heart</span> of Everything We Do
                    </h2>
                </motion.div>

                {/* Values Grid - Top Row: 3, Bottom Row: 2 centered */}
                <div className="flex flex-col gap-6">
                    {/* Top Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {values.slice(0, 3).map((value, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="group relative bg-white p-8 md:p-10 rounded-[2.5rem] text-center transition-all duration-500 hover:-translate-y-2 border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] overflow-hidden"
                            >
                                {/* Inner border */}
                                <div className="absolute inset-2 border border-gray-100/50 rounded-[2rem] pointer-events-none" />

                                {/* Icon */}
                                <div className="relative w-20 h-20 mx-auto mb-6">
                                    <div className={`absolute inset-0 ${value.bg}/15 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <value.icon size={32} className={value.color} strokeWidth={1.5} />
                                    </div>
                                </div>

                                <h3 className="text-lg font-black text-[#2D3748] mb-4 uppercase tracking-wide">
                                    {value.title}
                                </h3>
                                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>

                    {/* Bottom Row - 2 centered */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto w-full">
                        {values.slice(3).map((value, index) => (
                            <motion.div
                                key={index + 3}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: (index + 3) * 0.1 }}
                                className="group relative bg-white p-8 md:p-10 rounded-[2.5rem] text-center transition-all duration-500 hover:-translate-y-2 border border-gray-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] overflow-hidden"
                            >
                                {/* Inner border */}
                                <div className="absolute inset-2 border border-gray-100/50 rounded-[2rem] pointer-events-none" />

                                {/* Icon */}
                                <div className="relative w-20 h-20 mx-auto mb-6">
                                    <div className={`absolute inset-0 ${value.bg}/15 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                                        <value.icon size={32} className={value.color} strokeWidth={1.5} />
                                    </div>
                                </div>

                                <h3 className="text-lg font-black text-[#2D3748] mb-4 uppercase tracking-wide">
                                    {value.title}
                                </h3>
                                <p className="text-sm text-gray-600 font-medium leading-relaxed">
                                    {value.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurValues;
