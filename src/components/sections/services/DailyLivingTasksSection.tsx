"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import SectionHeader from "./SectionHeader";
import ChecklistAccordion from "./ChecklistAccordion";
import type { ChecklistItem, SectionHeadingProps } from "@/types/service-sections";

interface DailyLivingTasksSectionProps {
    heading: SectionHeadingProps;
    imageSrc: string;
    imageAlt: string;
    tasks: ChecklistItem[];
    defaultOpenIndex?: number;
}

const DailyLivingTasksSection = ({
    heading,
    imageSrc,
    imageAlt,
    tasks,
    defaultOpenIndex = 0,
}: DailyLivingTasksSectionProps) => {
    return (
        <section className="py-16 lg:py-[65px] bg-white overflow-hidden">
            <div className="container-8xl max-w-[1331px] flex flex-col gap-10 lg:gap-[54px]">
                <SectionHeader {...heading} align="left" />

                <div
                    className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1.176fr)_minmax(0,1fr)] 2xl:grid-cols-[655px_557px] lg:items-center"
                    style={{ columnGap: "50px" }}
                >
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.7 }}
                        className="relative w-full h-[410px] rounded-2xl overflow-hidden mt-4 lg:mt-6"
                    >
                        <Image
                            src={imageSrc}
                            alt={imageAlt}
                            fill
                            className="object-cover object-top"
                            quality={80}
                        />
                    </motion.div>

                    <ChecklistAccordion
                        items={tasks}
                        defaultOpenIndex={defaultOpenIndex}
                        className="w-full min-w-0"
                    />
                </div>
            </div>
        </section>
    );
};

export default DailyLivingTasksSection;
