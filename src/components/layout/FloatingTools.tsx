'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wrench, Calculator, Search, Sparkles, X, ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const TOOLS = [
    {
        name: 'NDIS Price Guide',
        href: '/tools/ndis-price-guide',
        icon: Search,
        description: 'Check item prices',
    },
    {
        name: 'Budget Calculator',
        href: '/tools/ndis-budget-calculator',
        icon: Calculator,
        description: 'Plan your budget',
    },
    {
        name: 'Service Matcher',
        href: '/tools/service-matcher',
        icon: Sparkles,
        description: 'Find services',
    }
];

export default function FloatingTools() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Trigger Button - Fixed to right side vertical center */}
            <AnimatePresence>
                {!isOpen && (
                    <motion.button
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 100, opacity: 0, transition: { duration: 0.3 } }}
                        whileHover={{ x: -2 }}
                        onClick={() => setIsOpen(true)}
                        className="fixed right-0 top-1/2 -translate-y-1/2 z-[90] flex items-center gap-2.5 bg-white/90 backdrop-blur-md py-4 pl-4 pr-3 rounded-l-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border-y border-l border-white/50 transition-all duration-300 group hover:bg-white hover:shadow-lg hover:shadow-purple-500/10"
                    >
                        {/* Arrow Icon - Leftmost */}
                        <ChevronLeft className="w-4 h-4 text-gray-400 group-hover:text-purple-500 animate-pulse" />

                        {/* Icon + Text - Right side */}
                        <div className="flex flex-col items-center gap-1.5">
                            <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white p-2 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300">
                                <Wrench className="w-4 h-4" />
                            </div>
                            <span className="text-[9px] font-extrabold uppercase tracking-widest text-gray-500 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-500 group-hover:to-pink-500 transition-all writing-mode-vertical orientation-upright">
                                TOOLS
                            </span>
                        </div>
                    </motion.button>
                )}
            </AnimatePresence>

            {/* Backdrop - Transparent (No Blur) */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-transparent z-[95]"
                        />

                        {/* Sliding Panel - Premium Glassmorphism */}
                        <motion.div
                            initial={{ x: '110%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '110%' }}
                            transition={{ type: 'spring', stiffness: 100, damping: 20, mass: 1 }}
                            className="fixed right-0 top-32 bottom-48 w-80 z-[100] rounded-l-[32px] flex flex-col shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)]"
                        >
                            {/* Glass Container Layer */}
                            <div className="absolute inset-0 bg-white/70 backdrop-blur-2xl border-l border-y border-white/60 rounded-l-[32px]" />

                            {/* Theme Aesthetics - Soft Light Color Blobs */}
                            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-purple-100/30 to-pink-100/30 rounded-l-[32px] pointer-events-none" />
                            <div className="absolute top-[-50px] right-[-50px] w-40 h-40 bg-purple-200/40 blur-[60px] rounded-full pointer-events-none" />
                            <div className="absolute bottom-[-50px] left-[-50px] w-40 h-40 bg-pink-200/40 blur-[60px] rounded-full pointer-events-none" />

                            {/* Close Button - SAFE ZONE (Top Right) */}
                            <div className="relative z-20 flex justify-end p-5">
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 bg-white/50 hover:bg-white rounded-full text-gray-400 hover:text-gray-800 transition-all shadow-sm border border-white/40 hover:scale-105"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Tools List */}
                            <div className="relative z-10 flex-1 flex flex-col justify-center px-6 pb-8 space-y-4">
                                {TOOLS.map((tool) => {
                                    const Icon = tool.icon;
                                    return (
                                        <Link
                                            key={tool.name}
                                            href={tool.href}
                                            onClick={() => setIsOpen(false)}
                                            className="group relative block"
                                        >
                                            {/* Hover Border Gradient (Absolute) */}
                                            <div className="absolute -inset-[2px] rounded-2xl bg-gradient-to-r from-purple-300 via-pink-300 to-purple-300 opacity-0 group-hover:opacity-100 blur-[2px] transition-opacity duration-300" />

                                            {/* Card Content - Glassy Inner */}
                                            <div className="relative bg-white/60 group-hover:bg-white/90 backdrop-blur-md rounded-xl p-4 flex items-center gap-4 transition-all duration-300 border border-white/60 group-hover:border-transparent shadow-sm group-hover:shadow-md">

                                                {/* Icon Container */}
                                                <div className="p-2.5 rounded-lg bg-white shadow-sm ring-1 ring-gray-100 group-hover:ring-purple-200 transition-all duration-300 group-hover:scale-105">
                                                    <Icon className="w-5 h-5 text-gray-600 group-hover:text-purple-600 transition-colors" />
                                                </div>

                                                {/* Text Info */}
                                                <div className="flex-1">
                                                    <h3 className="font-bold text-gray-700 text-[15px] group-hover:text-gray-900 leading-tight">
                                                        {tool.name}
                                                    </h3>
                                                    <p className="text-[11px] text-gray-400 font-medium tracking-wide mt-0.5 uppercase group-hover:text-purple-400 transition-colors">
                                                        {tool.description}
                                                    </p>
                                                </div>

                                                {/* Arrow */}
                                                <div className="text-gray-300 group-hover:text-pink-400 transition-all transform group-hover:translate-x-1 duration-300">
                                                    <ChevronLeft className="w-4 h-4 rotate-180" />
                                                </div>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}
