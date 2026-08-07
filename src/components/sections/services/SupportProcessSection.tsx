"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import IconSlot from "./IconSlot";
import type { ProcessCtaProps, ProcessStepItem, SectionHeadingProps } from "@/types/service-sections";

interface SupportProcessSectionProps {
    heading: SectionHeadingProps;
    steps: ProcessStepItem[];
    cta?: ProcessCtaProps;
}

const STEP_THEMES = [
    { circle: "bg-[#e0e7ff]", badge: "bg-[#a5b4fc]", bar: "bg-[#a5b4fc]" },
    { circle: "bg-[#fef2f2]", badge: "bg-[#fca5a5]", bar: "bg-[#fca5a5]" },
    { circle: "bg-[#e0e7ff]", badge: "bg-[#a5b4fc]", bar: "bg-[#a5b4fc]" },
    { circle: "bg-[#fef2f2]", badge: "bg-[#fca5a5]", bar: "bg-[#fca5a5]" },
    { circle: "bg-[#e0e7ff]", badge: "bg-[#a5b4fc]", bar: "bg-[#a5b4fc]" },
];

const ProcessWave = () => (
    <svg
        className="hidden lg:block absolute top-[40px] left-[8%] right-[8%] h-6 z-0 pointer-events-none"
        viewBox="0 0 1200 24"
        fill="none"
        preserveAspectRatio="none"
        aria-hidden
    >
        <path
            d="M0 12 C100 2, 140 22, 240 12 S380 2, 480 12 S620 22, 720 12 S860 2, 960 12 S1100 22, 1200 12"
            stroke="#a5b4fc"
            strokeWidth="2"
            strokeDasharray="6 8"
            strokeLinecap="round"
            opacity="0.45"
        />
    </svg>
);

const SupportProcessSection = ({ heading, steps, cta }: SupportProcessSectionProps) => {
    return (
        <section className="relative py-16 lg:py-24 bg-[#f7fafc] overflow-x-clip">
            <div className="container-8xl flex flex-col gap-12 lg:gap-[88px]">
                <SectionHeader {...heading} align="center" />

                <div className="relative">
                    <ProcessWave />

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-[33px] items-stretch">
                        {steps.map((step, index) => {
                            const theme = STEP_THEMES[index % STEP_THEMES.length];

                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 24 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.15 }}
                                    className="flex flex-col items-center h-full"
                                >
                                    {/*
                                      Icon + badge in normal flow (badge overlaps via -mt).
                                      Avoid absolute positioning that gets clipped by overflow/transform.
                                    */}
                                    <div className="relative z-10 flex flex-col items-center mb-4">
                                        <div
                                            className={`relative z-0 w-16 h-16 rounded-full ${theme.circle} flex items-center justify-center`}
                                        >
                                            <IconSlot icon={step.icon} size={32} alt="" />
                                        </div>
                                        <div
                                            className={`relative z-10 -mt-5 w-10 h-10 rounded-full ${theme.badge} border-4 border-white flex items-center justify-center text-sm font-bold leading-5 text-white shrink-0`}
                                        >
                                            {String(index + 1).padStart(2, "0")}
                                        </div>
                                    </div>

                                    <div className="bg-white rounded-3xl shadow-[0px_10px_25px_-5px_rgba(0,0,0,0.05),0px_8px_10px_-6px_rgba(0,0,0,0.05)] px-6 pt-8 pb-8 w-full flex flex-col items-start text-left gap-3 flex-1 min-h-[200px]">
                                        <span className={`h-1 w-8 rounded-full ${theme.bar}`} />
                                        <h3 className="text-lg font-bold text-[#2D3748] uppercase tracking-wide leading-snug capitalize">
                                            {step.title}
                                        </h3>
                                        <p className="text-sm md:text-base text-gray-500 leading-relaxed flex-1">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                {/* Footer CTA — Figma 16:504 */}
                {cta ? (
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-white rounded-[32px] shadow-[0px_0px_3px_rgba(165,180,252,0.22)] p-6 md:p-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6"
                    >
                        <div className="flex gap-4 md:gap-6 items-center min-w-0">
                            <div className="bg-[#e0e7ff] rounded-full size-14 shrink-0 flex items-center justify-center">
                                <IconSlot icon={cta.icon} size={28} alt="" />
                            </div>
                            <div className="flex flex-col gap-1 min-w-0">
                                <h4 className="text-xl font-semibold text-[#2d3648] capitalize leading-7">
                                    {cta.title}
                                </h4>
                                <p className="text-base text-[#7b807f] leading-[25px] max-w-[404px]">
                                    {cta.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 shrink-0">
                            <Link
                                href={cta.primaryHref}
                                className="bg-[#2d3648] text-white rounded-2xl px-8 py-4 flex items-center justify-center gap-3 text-lg font-semibold hover:opacity-90 transition-opacity"
                            >
                                <IconSlot icon={cta.primaryIcon} size={20} alt="" />
                                {cta.primaryLabel}
                            </Link>
                            <Link
                                href={cta.secondaryHref}
                                className="bg-[#a5b4fc] text-[#2d3648] rounded-2xl px-8 py-4 flex items-center justify-center gap-3 text-lg font-bold hover:opacity-90 transition-opacity"
                            >
                                {cta.secondaryLabel}
                                <IconSlot icon={cta.secondaryIcon} size={20} alt="" />
                            </Link>
                        </div>
                    </motion.div>
                ) : null}
            </div>
        </section>
    );
};

export default SupportProcessSection;
