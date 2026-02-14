"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface PageHeaderProps {
    title: string;
    breadcrumb: { label: string; href?: string }[];
}

const PageHeader = ({ title, breadcrumb }: PageHeaderProps) => {
    return (
        <section className="relative py-20 lg:py-28 bg-[#2D3748] overflow-hidden">
            {/* Background Image/Overlay */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-[#2D3748]/90 z-10" />
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-overlay"
                    style={{ backgroundImage: "url('/banner-frame-img.webp')" }}
                />
                {/* Decorative Gradient */}
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#ABB3F1]/20 to-transparent z-10" />
            </div>

            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-20 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white uppercase tracking-tight mb-6">
                        {title}
                    </h1>

                    <nav className="flex items-center justify-center gap-2 text-sm md:text-base font-medium text-gray-300">
                        {breadcrumb.map((item, index) => (
                            <div key={index} className="flex items-center gap-2">
                                {index > 0 && <ChevronRight size={14} className="text-[#ABB3F1]" />}
                                {item.href ? (
                                    <Link
                                        href={item.href}
                                        className="hover:text-white hover:underline transition-colors"
                                    >
                                        {item.label}
                                    </Link>
                                ) : (
                                    <span className="text-[#ABB3F1] font-bold">
                                        {item.label}
                                    </span>
                                )}
                            </div>
                        ))}
                    </nav>
                </motion.div>
            </div>
        </section>
    );
};

export default PageHeader;
