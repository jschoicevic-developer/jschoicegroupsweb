"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import {
    LayoutDashboard,
    Users,
    FileText,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    PieChart,
    ClipboardList,
    X,
    Image as ImageIcon
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

const menuItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Leads", href: "/admin/leads", icon: Users },
    { name: "Referrals", href: "/admin/referrals", icon: ClipboardList },
    { name: "Blog Posts", href: "/admin/blog", icon: FileText },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
    { name: "Analytics", href: "/admin/analytics", icon: PieChart },
    { name: "Settings", href: "/admin/settings", icon: Settings },
];

interface AdminSidebarProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AdminSidebar({ isOpen, onClose }: AdminSidebarProps) {
    const pathname = usePathname();
    const [collapsed, setCollapsed] = useState(false);
    const { user, logout, loading } = useAuth();

    // Close sidebar on route change (mobile)
    useEffect(() => {
        onClose();
    }, [pathname]);

    return (
        <>
            {/* Desktop Sidebar - Always visible on lg+ */}
            <aside
                className={cn(
                    "hidden lg:flex h-screen sticky top-0 bg-white border-r border-gray-200/60 transition-all duration-300 z-50 flex-col shadow-[4px_0_24px_rgba(0,0,0,0.02)]",
                    collapsed ? "w-24" : "w-72"
                )}
            >
                <SidebarContent
                    collapsed={collapsed}
                    setCollapsed={setCollapsed}
                    user={user}
                    logout={logout}
                    loading={loading}
                    pathname={pathname}
                    onClose={onClose}
                    isMobile={false}
                />
            </aside>

            {/* Mobile Sidebar - Slide in from left */}
            <AnimatePresence>
                {isOpen && (
                    <motion.aside
                        initial={{ x: "-100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="lg:hidden fixed left-0 top-0 h-screen w-72 bg-white border-r border-gray-200/60 z-50 flex flex-col shadow-2xl"
                    >
                        <SidebarContent
                            collapsed={false}
                            setCollapsed={() => { }}
                            user={user}
                            logout={logout}
                            loading={loading}
                            pathname={pathname}
                            onClose={onClose}
                            isMobile={true}
                        />
                    </motion.aside>
                )}
            </AnimatePresence>
        </>
    );
}

interface SidebarContentProps {
    collapsed: boolean;
    setCollapsed: (value: boolean) => void;
    user: any;
    logout: () => void;
    loading: boolean;
    pathname: string | null;
    onClose: () => void;
    isMobile: boolean;
}

function SidebarContent({
    collapsed,
    setCollapsed,
    user,
    logout,
    loading,
    pathname,
    onClose,
    isMobile
}: SidebarContentProps) {
    return (
        <>
            {/* Logo Section */}
            <div className={cn("h-20 flex items-center transition-all duration-300", collapsed ? "justify-center px-0" : "px-6 justify-between")}>
                {!collapsed && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-3"
                    >
                        <div className="relative w-10 h-10">
                            <Image
                                src="/images/logo.png"
                                alt="JS Choice Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                        <div className="flex flex-col">
                            <span className="font-heading font-bold text-lg text-gray-900 leading-none">JS Choice</span>
                            <span className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">Admin Panel</span>
                        </div>
                    </motion.div>
                )}
                {collapsed && !isMobile && (
                    <div className="relative w-8 h-8">
                        <Image
                            src="/images/logo.png"
                            alt="JS Choice Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                )}

                {/* Close button for mobile */}
                {isMobile ? (
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-900 transition-all"
                    >
                        <X size={20} />
                    </button>
                ) : !collapsed && (
                    <button
                        onClick={() => setCollapsed(true)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-900 transition-all"
                    >
                        <ChevronLeft size={18} />
                    </button>
                )}
            </div>

            {collapsed && !isMobile && (
                <div className="flex justify-center mb-4">
                    <button
                        onClick={() => setCollapsed(false)}
                        className="p-1.5 hover:bg-gray-100 rounded-lg text-gray-400 hover:text-gray-900 transition-all"
                    >
                        <ChevronRight size={18} />
                    </button>
                </div>
            )}

            {/* Navigation Section */}
            <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto custom-scrollbar">
                {menuItems.map((item) => {
                    const normalizedPath = pathname?.endsWith("/") && pathname.length > 1 ? pathname.slice(0, -1) : pathname;
                    const isActive = item.href === "/admin"
                        ? normalizedPath === "/admin"
                        : normalizedPath?.startsWith(item.href);

                    return (
                        <Link
                            key={item.name}
                            href={item.href}
                            onClick={() => isMobile && onClose()}
                            className={cn(
                                "flex items-center gap-4 px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                                isActive
                                    ? "bg-primary text-white shadow-lg shadow-primary/20 font-bold"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 font-medium"
                            )}
                        >
                            {/* Hover Effect Background */}
                            {!isActive && (
                                <div className="absolute inset-0 bg-gray-100 opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
                            )}

                            <item.icon
                                size={22}
                                className={cn(
                                    "shrink-0 transition-transform duration-300",
                                    isActive ? "text-white" : "text-gray-400 group-hover:text-primary group-hover:scale-110"
                                )}
                            />

                            {!collapsed && (
                                <span className={cn("text-sm", isActive ? "tracking-wide" : "")}>{item.name}</span>
                            )}

                            {/* Active Indicator Dot */}
                            {isActive && !collapsed && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute right-3 w-1.5 h-1.5 rounded-full bg-white/50"
                                />
                            )}

                            {/* Hover Tooltip for Collapsed State */}
                            {collapsed && !isMobile && (
                                <div className="absolute left-full ml-4 px-3 py-2 bg-gray-900 text-white text-xs font-bold rounded-lg opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 z-[100] whitespace-nowrap shadow-xl">
                                    {item.name}
                                    {/* Arrow for tooltip */}
                                    <div className="absolute top-1/2 -left-1 w-2 h-2 bg-gray-900 rotate-45 -translate-y-1/2" />
                                </div>
                            )}
                        </Link>
                    );
                })}
            </nav>

            {/* Footer Section */}
            <div className="p-4 border-t border-gray-100 space-y-2 bg-gray-50/50">
                <button
                    onClick={logout}
                    disabled={loading}
                    className={cn(
                        "w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-gray-500 hover:bg-destructive/5 hover:text-destructive transition-all group disabled:opacity-50 disabled:cursor-not-allowed",
                        collapsed && !isMobile ? "justify-center" : ""
                    )}
                >
                    <LogOut size={22} className="group-hover:scale-110 transition-transform" />
                    {(!collapsed || isMobile) && <span className="font-semibold text-sm">Logout</span>}
                </button>

                {(!collapsed || isMobile) && (
                    <div className="mt-2 p-3 rounded-2xl bg-white border border-gray-100 shadow-sm flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary p-[2px]">
                            <div className="h-full w-full rounded-full bg-white flex items-center justify-center">
                                <span className="font-bold text-xs text-primary">
                                    {user?.email?.substring(0, 2).toUpperCase() || 'AD'}
                                </span>
                            </div>
                        </div>
                        <div className="flex flex-col overflow-hidden">
                            <span className="text-sm font-bold text-gray-900 truncate">Administrator</span>
                            <span className="text-[10px] text-gray-500 font-medium truncate">
                                {user?.email || 'admin@jschoice.com.au'}
                            </span>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
}
