"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "./SectionHeader";
import IconSlot from "./IconSlot";
import type { IconCardItem, SectionHeadingProps } from "@/types/service-sections";

interface ServiceBenefitsSectionProps {
    heading: SectionHeadingProps;
    backgroundImage?: string;
    items: IconCardItem[];
}

const ServiceBenefitsSection = ({ heading, backgroundImage, items }: ServiceBenefitsSectionProps) => {
    return (
        <section className="relative py-16 lg:py-24 overflow-hidden">
            {backgroundImage ? (
                <div className="absolute inset-0">
                    <Image src={backgroundImage} alt="" fill className="object-cover" quality={80} />
                    <div className="absolute inset-0 bg-[#363b6d]/[0.93]" />
                </div>
            ) : (
                <div className="absolute inset-0 bg-[#363b6d]" />
            )}

            <div className="container-8xl relative z-10 flex flex-col items-center gap-12 lg:gap-[76px]">
                <SectionHeader {...heading} className="mx-auto" />

                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 xl:gap-[26px] w-full">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="bg-white/10 rounded-2xl shadow-[0px_4px_20px_rgba(129,140,248,0.1)] h-[241px] flex flex-col items-start justify-center text-left px-6"
                        >
                            <div className="w-[70px] h-[70px] rounded-full bg-[#e3e5f9] flex items-center justify-center shrink-0 mb-3.5">
                                <IconSlot icon={item.icon} size={45} alt={item.title} />
                            </div>
                            <div className="flex flex-col gap-1.5 w-full">
                                <h3 className="text-xl font-semibold text-white leading-6 capitalize">
                                    {item.title}
                                </h3>
                                <p className="text-base text-white/90 leading-[25px]">
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

export default ServiceBenefitsSection;
