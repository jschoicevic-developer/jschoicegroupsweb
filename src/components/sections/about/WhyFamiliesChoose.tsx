"use client";

import { motion } from "framer-motion";
import { Heart, Users, GraduationCap, ShieldCheck, Scale, Megaphone } from "lucide-react";

const reasons = [
    {
        icon: Heart,
        title: "Led by Someone Who Truly Understands",
        description: "Unlike corporate providers, JS Choice Group is guided by a leader who personally experiences the challenges families face. Jan's journey informs every aspect of our service delivery, ensuring authentic, compassionate, and deeply informed support.",
        color: "text-[#ABB3F1]",
        bg: "bg-[#ABB3F1]",
    },
    {
        icon: Users,
        title: "Participant-Centred, Always",
        description: "Your goals drive our services. We don't offer one-size-fits-all solutions — we design personalized support plans that align with your unique aspirations, preferences, circumstances, and cultural context.",
        color: "text-[#5A67D8]",
        bg: "bg-[#5A67D8]",
    },
    {
        icon: GraduationCap,
        title: "Experienced, Qualified Team",
        description: "Our staff members are carefully selected for both their professional qualifications and their genuine commitment to person-centred support. We invest significantly in ongoing training to ensure excellence in every interaction.",
        color: "text-[#F1ABAB]",
        bg: "bg-[#F1ABAB]",
    },
    {
        icon: ShieldCheck,
        title: "Trauma-Informed Care",
        description: "Understanding that many individuals have experienced trauma, we provide support that prioritizes safety, trust, choice, collaboration, and empowerment at every stage of your journey.",
        color: "text-[#68D391]",
        bg: "bg-[#68D391]",
    },
    {
        icon: Scale,
        title: "Ethical & Fully Compliant",
        description: "We expertly navigate NDIS complexities, ensuring full regulatory compliance while maintaining the flexibility to adapt to your evolving needs. Our governance practices prioritize safeguarding and participant protection above all else.",
        color: "text-[#E8A87C]",
        bg: "bg-[#E8A87C]",
    },
    {
        icon: Megaphone,
        title: "Advocacy at Our Core",
        description: "We don't just provide services — we actively advocate for your rights, support your decision-making, and ensure your voice remains central to all planning, service delivery, and review processes.",
        color: "text-pink-400",
        bg: "bg-pink-400",
    },
];

const WhyFamiliesChoose = () => {
    return (
        <section className="relative py-24 lg:py-32 overflow-hidden">
            {/* Background with Parallax */}
            <div className="absolute inset-0 z-0">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-scroll md:bg-fixed"
                    style={{
                        backgroundImage: "url('/banner-frame-img.webp')",
                    }}
                />
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-90 bg-scroll md:bg-fixed"
                    style={{
                        backgroundImage: "url('/images/home/choose-us-bg.webp')",
                    }}
                />
                <div className="absolute inset-0 bg-black/65" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#1A202C]/60 via-transparent to-[#1A202C]/60 z-10" />
            </div>

            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-20">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 max-w-4xl mx-auto"
                >
                    <div className="flex items-center justify-center gap-3 text-[#ABB3F1] font-bold uppercase text-xs tracking-widest mb-4">
                        <span className="h-1.5 w-1.5 rounded-full bg-[#ABB3F1] animate-pulse" />
                        The JS Choice Difference
                    </div>
                    <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-white leading-[1.1] tracking-tight uppercase">
                        Why Families Choose <br className="hidden sm:block" />
                        <span className="text-[#ABB3F1]">JS Choice Group?</span>
                    </h2>
                </motion.div>

                {/* Reason Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.08 }}
                            className="p-6 rounded-[2rem] bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                        >
                            <div className={`h-12 w-12 rounded-xl ${reason.bg}/20 flex items-center justify-center ${reason.color} mb-4 group-hover:scale-110 transition-transform`}>
                                <reason.icon size={24} strokeWidth={2} />
                            </div>
                            <h4 className="text-base font-bold text-white uppercase tracking-wider leading-tight mb-3">
                                {reason.title}
                            </h4>
                            <p className="text-sm text-white/70 font-medium leading-relaxed">
                                {reason.description}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhyFamiliesChoose;
