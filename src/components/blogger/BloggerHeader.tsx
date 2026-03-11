"use client";

import {
    Globe,
    LogOut,
    ChevronDown,
    Menu,
    UserCircle,
} from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

interface BloggerHeaderProps {
    onMenuClick: () => void;
}

export default function BloggerHeader({ onMenuClick }: BloggerHeaderProps) {
    const [profileOpen, setProfileOpen] = useState(false);
    const { user, logout, loading } = useAuth();

    const displayName = user?.user_metadata?.name || user?.email || 'Blogger';
    const initials = displayName.substring(0, 2).toUpperCase();

    return (
        <header className="h-16 md:h-20 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 md:px-6 lg:px-8 sticky top-0 z-[40] flex items-center justify-between gap-4">
            {/* Mobile Menu Button */}
            <button
                onClick={onMenuClick}
                className="lg:hidden p-2 hover:bg-gray-100 rounded-xl transition-colors"
                aria-label="Open menu"
            >
                <Menu size={24} className="text-gray-700" />
            </button>

            {/* Branding */}
            <div className="flex items-center gap-3">
                <div className="hidden lg:flex flex-col">
                    <span className="font-heading font-bold text-lg text-gray-900 leading-none">Blogger Portal</span>
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest mt-0.5">Content Management</span>
                </div>
                <div className="lg:hidden">
                    <span className="font-heading font-bold text-base text-gray-900">Blogger Portal</span>
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4 ml-auto">
                {/* Website Link */}
                <Link
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 text-gray-500 hover:bg-gray-50 hover:text-primary rounded-xl transition-all"
                    title="View Website"
                >
                    <Globe size={20} />
                </Link>

                <div className="h-8 w-px bg-gray-100 mx-1" />

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="flex items-center gap-3 p-1.5 hover:bg-gray-50 rounded-2xl transition-all group"
                    >
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary to-secondary p-0.5 shadow-md group-hover:shadow-lg transition-all">
                            <div className="h-full w-full rounded-[10px] bg-white flex items-center justify-center text-primary font-bold overflow-hidden">
                                <span className="font-heading text-lg">{initials}</span>
                            </div>
                        </div>
                        <div className="hidden md:flex flex-col items-start pr-2">
                            <span className="text-sm font-bold text-gray-900 leading-none truncate max-w-[120px]">
                                {user?.user_metadata?.name || 'Blogger'}
                            </span>
                            <span className="text-[11px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">Blogger</span>
                        </div>
                        <ChevronDown
                            size={16}
                            className={`text-gray-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`}
                        />
                    </button>

                    <AnimatePresence>
                        {profileOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute top-full right-0 mt-4 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                            >
                                {/* User Info */}
                                <div className="p-4 border-b border-gray-50 bg-gradient-to-br from-primary/5 to-secondary/5">
                                    <div className="flex items-center gap-3">
                                        <div className="h-12 w-12 rounded-xl bg-gradient-to-tr from-primary to-secondary p-0.5">
                                            <div className="h-full w-full rounded-[10px] bg-white flex items-center justify-center text-primary font-bold">
                                                <span className="font-heading text-lg">{initials}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-sm font-bold text-gray-900 truncate">
                                                {user?.user_metadata?.name || 'Blogger'}
                                            </span>
                                            <span className="text-xs text-gray-500 font-medium truncate">
                                                {user?.email || ''}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="p-2">
                                    <Link
                                        href="/blogger/profile"
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors group"
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        <UserCircle size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Profile Settings</span>
                                    </Link>

                                    <button
                                        onClick={() => {
                                            setProfileOpen(false);
                                            logout();
                                        }}
                                        disabled={loading}
                                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 transition-colors group disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <LogOut size={18} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-red-600">Logout</span>
                                    </button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </header>
    );
}
