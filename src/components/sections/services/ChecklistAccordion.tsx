"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import IconSlot from "./IconSlot";
import type { ChecklistItem } from "@/types/service-sections";
import { cn } from "@/lib/utils";

interface ChecklistAccordionProps {
    items: ChecklistItem[];
    defaultOpenIndex?: number;
    className?: string;
}

const ChecklistAccordion = ({
    items,
    defaultOpenIndex = 0,
    className,
}: ChecklistAccordionProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(defaultOpenIndex);

    return (
        <div className={cn("flex flex-col gap-3", className)}>
            {items.map((item, index) => {
                const isOpen = openIndex === index;

                return (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.05 }}
                        className="border border-[#dee1ff] rounded-[10px] bg-white overflow-hidden"
                    >
                        <button
                            type="button"
                            onClick={() => setOpenIndex(isOpen ? null : index)}
                            className={cn(
                                "w-full flex items-center gap-3 pl-[20px] pr-[15px] text-left",
                                isOpen ? "pt-5 pb-0" : "py-5"
                            )}
                            aria-expanded={isOpen}
                        >
                            <IconSlot icon={item.icon} size={24} alt="" />
                            <span className="text-xl font-semibold text-[#2d3648] leading-6 capitalize">
                                {item.title}
                            </span>
                        </button>
                        <AnimatePresence initial={false}>
                            {isOpen && item.description ? (
                                <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: "auto", opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="overflow-hidden"
                                >
                                    <p className="ml-[59px] mr-[15px] mt-2.5 mb-5 text-base text-[#7b807f] leading-[25px] max-w-[472px]">
                                        {item.description}
                                    </p>
                                </motion.div>
                            ) : null}
                        </AnimatePresence>
                    </motion.div>
                );
            })}
        </div>
    );
};

export default ChecklistAccordion;
