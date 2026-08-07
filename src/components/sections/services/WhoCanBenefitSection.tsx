"use client";

import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import IconSlot from "./IconSlot";
import type { IconCardItem, SectionHeadingProps } from "@/types/service-sections";

interface WhoCanBenefitSectionProps {
    heading: SectionHeadingProps;
    items: IconCardItem[];
}

const ICON_BG = ["bg-[#e3e5f9]", "bg-[#fbe6e6]", "bg-[#e3e5f9]", "bg-[#fbe6e6]"];

const WhoCanBenefitSection = ({ heading, items }: WhoCanBenefitSectionProps) => {
    return (
        <section className="py-16 lg:py-24 bg-[#f7fafc] overflow-hidden">
            <div className="container-8xl flex flex-col gap-12 lg:gap-[70px]">
                <SectionHeader {...heading} align="center" />

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-[26px]">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white rounded-2xl shadow-[0px_4px_10px_rgba(129,140,248,0.1)] h-[265px] flex flex-col items-start justify-center text-left px-6 hover:-translate-y-1 transition-transform duration-300"
                        >
                            <div className={`w-[68px] h-[68px] rounded-[34px] ${ICON_BG[index % ICON_BG.length]} flex items-center justify-center shrink-0 mb-3.5`}>
                                <IconSlot icon={item.icon} size={44} alt={item.title} />
                            </div>
                            <div className="flex flex-col gap-1.5 w-full">
                                <h3 className="text-xl font-semibold text-[#2D3748] leading-6 capitalize">
                                    {item.title}
                                </h3>
                                <p className="text-base text-[#7b807f] leading-[25px]">
                                    {item.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default WhoCanBenefitSection;
