"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Image from "next/image";

const PageLoader = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        // Increment progress over 1.5 seconds
        const interval = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setIsLoading(false), 200);
                    return 100;
                }
                return prev + 5;
            });
        }, 60);

        return () => clearInterval(interval);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        y: -20,
                        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
                    }}
                    className="fixed inset-0 z-[10000] bg-white flex items-center justify-center overflow-hidden"
                >
                    {/* Background Decorative Elemets - Theme Aligned */}
                    <div className="absolute top-0 right-0 w-1/2 h-full bg-[#ABB3F1]/5 -skew-x-12 translate-x-1/4 z-0" />
                    <div className="absolute bottom-10 left-10 w-64 h-64 bg-[#F1ABAB]/5 rounded-full blur-3xl z-0" />

                    <div className="relative flex flex-col items-center max-w-xs w-full z-10">
                        {/* Logo Animation */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            className="relative mb-8"
                        >
                            <div className="absolute -inset-4 bg-[#ABB3F1]/10 rounded-full blur-2xl animate-pulse" />
                            <Image quality={80}
                                src="/logo.png"
                                alt="JS Choice Care"
                                width={196}
                                height={112}
                                className="h-24 md:h-28 w-auto object-contain relative z-10"
                                priority
                            />
                        </motion.div>
 

                        {/* Professional Progress Bar */}
                        <div className="w-full h-1 bg-gray-100 rounded-full overflow-hidden relative border border-gray-50 shadow-inner">
                            <motion.div
                                className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#ABB3F1] to-[#F1ABAB]"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "easeInOut" }}
                            />
                        </div>

                        {/* Loading Percentage */}
                        <motion.span
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-[10px] font-bold text-gray-400 mt-3 tracking-tighter"
                        >
                            {progress}% EXPLORING EXCELLENCE
                        </motion.span>
                    </div>

                    {/* Bottom Status Branding */}
                    <div className="absolute bottom-12 left-0 w-full text-center">
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.5 }}
                            className="text-[9px] font-black tracking-[0.5em] text-[#2D3748] uppercase"
                        >
                            Inclusion • Diversity • Choice
                        </motion.p>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default PageLoader;
