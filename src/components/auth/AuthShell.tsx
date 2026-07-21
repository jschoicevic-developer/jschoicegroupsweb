"use client";

import { motion } from "framer-motion";
import { ArrowLeft, AlertCircle, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import logoImage from "../../../public/images/logo.png";

interface AuthShellProps {
    title: string;
    subtitle: string;
    backHref: string;
    backLabel?: string;
    error?: string;
    success?: string;
    children: React.ReactNode;
}

export default function AuthShell({
    title,
    subtitle,
    backHref,
    backLabel = "Back to login",
    error,
    success,
    children,
}: AuthShellProps) {
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-[#E8E4F3] via-[#F0EDF7] to-[#E5DFF5] p-4 overflow-hidden relative">
            <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute top-6 left-6 z-20"
            >
                <Link
                    href={backHref}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-white/40 backdrop-blur-md border border-white/50 text-gray-600 hover:text-gray-900 hover:bg-white/60 transition-all shadow-sm hover:shadow-md group"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform duration-300" />
                    <span className="text-sm font-medium">{backLabel}</span>
                </Link>
            </motion.div>

            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-40 -right-40 w-96 h-96 bg-purple-300 rounded-full blur-3xl opacity-20"
                />
                <motion.div
                    animate={{ scale: [1.2, 1, 1.2], rotate: [90, 0, 90] }}
                    transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-40 -left-40 w-96 h-96 bg-indigo-300 rounded-full blur-3xl opacity-20"
                />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-lg mx-auto relative z-10"
            >
                <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden p-8 sm:p-12">
                    <div className="flex items-center gap-3 mb-10">
                        <div className="w-12 h-12 relative flex-shrink-0">
                            <Image
                                quality={80}
                                src={logoImage}
                                alt="JS Choice Logo"
                                className="object-contain"
                                fill
                                sizes="48px"
                            />
                        </div>
                        <span className="text-2xl font-bold text-gray-800 tracking-tight">JS Choice Group</span>
                    </div>

                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-800 mb-2">{title}</h1>
                        <p className="text-gray-400">{subtitle}</p>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 p-4 mb-6 bg-red-50 border border-red-200 rounded-xl text-red-700"
                        >
                            <AlertCircle className="h-5 w-5 flex-shrink-0" />
                            <p className="text-sm font-medium">{error}</p>
                        </motion.div>
                    )}

                    {success && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="flex items-center gap-3 p-4 mb-6 bg-green-50 border border-green-200 rounded-xl text-green-700"
                        >
                            <CheckCircle2 className="h-5 w-5 flex-shrink-0" />
                            <p className="text-sm font-medium">{success}</p>
                        </motion.div>
                    )}

                    {children}
                </div>
            </motion.div>
        </div>
    );
}
