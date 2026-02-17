"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Award, BookOpen, Heart, Shield, Sparkles } from "lucide-react";

const subsections = [
    {
        icon: Award,
        title: "Professional Excellence Grounded in Personal Understanding",
        color: "text-[#5A67D8]",
        bgColor: "bg-[#ABB3F1]/10",
        paragraphs: [
            "Leading a dedicated team of experienced and qualified professionals, Jan oversees strategic direction, governance compliance, workforce leadership, and service quality across JS Choice Group. She expertly navigates the intricate NDIS landscape, ensuring robust safeguarding practices, transparent operational systems, and consistently high standards of care that exceed regulatory requirements.",
            "Jan's leadership philosophy is firmly anchored in core values: respect, honesty, accountability, and continuous improvement. She firmly believes that quality disability services require more than procedural compliance — they demand genuine human connection, cultural sensitivity, and strengths-based support that recognizes the inherent dignity and unlimited potential in every individual.",
            "Currently pursuing postgraduate studies in Strategic Management, Jan continuously enhances her expertise in leadership, human resource management, and organizational development. This commitment to ongoing professional growth ensures JS Choice Group remains at the forefront of best practices in disability support services.",
        ],
    },
    {
        icon: Shield,
        title: "Advocacy Powered by Lived Experience",
        color: "text-[#E87D7D]",
        bgColor: "bg-[#F1ABAB]/10",
        paragraphs: [
            "What truly distinguishes Jan's approach is her authentic understanding of the challenges faced by the families we support. As a devoted mother of young adult children with special needs, she dedicates not only her professional expertise but also her personal time to supporting their growth, independence, and journey toward fulfilling careers. This lived experience profoundly shapes every decision, policy, and interaction at JS Choice Group.",
            "Jan's professional background extends beyond disability services. She brings valuable experience from the women's rights sector, where she provided critical support to women affected by domestic and family violence. As a survivor of domestic violence herself, Jan possesses a deep understanding of trauma, resilience, and the transformative journey toward empowerment. This background strengthens her trauma-informed leadership approach and reinforces her commitment to protecting and uplifting vulnerable individuals.",
            "These personal experiences have cultivated a leadership style characterized by profound empathy, patience, and fierce advocacy — qualities that permeate the entire JS Choice Group culture and guide our team's approach to every participant relationship.",
        ],
    },
    {
        icon: Heart,
        title: "Finding Balance and Renewal",
        color: "text-[#68D391]",
        bgColor: "bg-green-50",
        paragraphs: [
            "When Jan steps away from her professional responsibilities, she finds peace and renewal in gardening, cooking, reading, and listening to music. These cherished moments of reflection sustain her passion and fuel her dedication to the families and individuals who trust JS Choice Group with their support needs.",
            "Her greatest joy, however, remains supporting her own children's growth and independence — providing consistent encouragement, advocacy, and practical guidance as they pursue meaningful lives and fulfilling careers. This personal commitment beautifully mirrors the support JS Choice Group extends to every participant and family we serve.",
        ],
    },
];

const FounderProfile = () => {
    return (
        <section className="relative py-20 lg:py-32 bg-[#F8FAFC] overflow-hidden">
            {/* Background Decorators */}
            <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#ABB3F1]/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#F1ABAB]/5 rounded-full blur-[100px]" />

                {/* Dot Pattern */}
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(#ABB3F1_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(circle_at_100%_0%,white,transparent_40%)] opacity-15" />
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
                    <div className="flex items-center justify-center gap-3 text-[var(--primary)] font-black uppercase text-xs tracking-[0.2em] mb-4">
                        <span className="h-px w-8 bg-[var(--primary)]" />
                        Leadership
                        <span className="h-px w-8 bg-[var(--primary)]" />
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] leading-[1.1] tracking-tight uppercase">
                        Meet <span className="text-[#ABB3F1]">Jan Fardowsi</span>
                    </h2>
                    <p className="text-lg md:text-xl text-gray-500 font-medium mt-4">
                        Our Founder & Director
                    </p>
                </motion.div>

                {/* Main Intro Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start mb-20 lg:mb-28">
                    {/* Image Column (Left - 5 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-5 relative order-1"
                    >
                        <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-10 border-white z-10 w-full aspect-3/4">
                            <Image
                                src="/JanImage.jpeg"
                                alt="Jan Fardowsi - Founder & Director"
                                fill
                                className="object-cover transform hover:scale-105 transition-transform duration-700"
                            />
                        </div>

                        {/* Floating Badge */}
                        <motion.div
                            animate={{ y: [0, -12, 0] }}
                            transition={{ duration: 4, repeat: Infinity }}
                            className="absolute -bottom-6 -right-6 w-28 h-28 bg-white rounded-full flex items-center justify-center shadow-2xl border-4 border-[#ABB3F1]/20 z-20 hidden lg:flex"
                        >
                            <div className="text-center">
                                <Sparkles size={24} className="text-[#ABB3F1] mx-auto mb-1" />
                                <span className="text-[10px] font-black text-[#2D3748] uppercase tracking-wider">Founder</span>
                            </div>
                        </motion.div>

                        {/* Decorative Elements */}
                        <div className="absolute -top-10 -left-10 w-40 h-40 bg-[#ABB3F1]/15 rounded-full blur-2xl -z-10" />
                        <div className="absolute bottom-10 -right-10 w-32 h-32 bg-[#F1ABAB]/15 rounded-full blur-2xl -z-10" />
                    </motion.div>

                    {/* Text Column (Right - 7 cols) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="lg:col-span-7 flex flex-col space-y-6 order-2"
                    >
                        <div>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#ABB3F1]/10 text-[#5A67D8] text-xs font-bold uppercase tracking-widest mb-4">
                                <BookOpen size={14} />
                                A Leader Shaped by Purpose and Resilience
                            </div>
                        </div>

                        <div className="space-y-5 text-base md:text-lg text-gray-600 font-medium leading-relaxed text-left lg:text-justify">
                            <p>
                                <span className="font-bold text-[#2D3748]">Jan Fardowsi</span>, Founder and Director of JS Choice Group, brings an extraordinary combination of professional expertise and profound personal insight to disability support services. Her journey into this sector wasn&apos;t merely a career decision — it was a calling born from her own experiences as a devoted mother of children with special needs.
                            </p>
                            <p>
                                Having navigated the complexities and challenges of the NDIS system firsthand, Jan established JS Choice Group with a crystal-clear vision: to create a provider that genuinely listens, authentically supports, and consistently empowers. Her leadership is defined by compassion, unwavering advocacy, and an absolute commitment to ensuring every participant feels heard, valued, and equipped to achieve their aspirations.
                            </p>
                        </div>
                    </motion.div>
                </div>

                {/* Subsections */}
                <div className="space-y-16 lg:space-y-20">
                    {subsections.map((sub, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="relative"
                        >
                            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.06)] border border-gray-100/80">
                                {/* Inner decorative border */}
                                <div className="absolute inset-3 border border-gray-100/50 rounded-[1.5rem] pointer-events-none" />

                                {/* Header */}
                                <div className="flex items-start gap-5 mb-8">
                                    <div className={`p-4 rounded-2xl ${sub.bgColor} flex-shrink-0`}>
                                        <sub.icon size={28} className={sub.color} strokeWidth={2} />
                                    </div>
                                    <h3 className="text-xl md:text-2xl font-black text-[#2D3748] leading-tight uppercase tracking-tight">
                                        {sub.title}
                                    </h3>
                                </div>

                                {/* Content */}
                                <div className="space-y-4 text-base md:text-lg text-gray-600 font-medium leading-relaxed text-left lg:text-justify pl-0 md:pl-[4.5rem]">
                                    {sub.paragraphs.map((para, pIdx) => (
                                        <p key={pIdx}>{para}</p>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FounderProfile;
