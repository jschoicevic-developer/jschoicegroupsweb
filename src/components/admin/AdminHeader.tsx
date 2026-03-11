"use client";

import {
    Search,
    Bell,
    User,
    Settings,
    Globe,
    LogOut,
    ChevronDown,
    Menu
} from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";
import { createClient } from "@/lib/supabase";
import { useRouter } from "next/navigation";

// Define Notification Type (simplified Lead)
interface LeadNotification {
    id: string;
    first_name: string;
    last_name: string | null;
    created_at: string;
    source: string;
}

interface AdminHeaderProps {
    onMenuClick: () => void;
}

export default function AdminHeader({ onMenuClick }: AdminHeaderProps) {
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false);
    const { user, logout, loading } = useAuth();
    const [notifications, setNotifications] = useState<LeadNotification[]>([]);
    const [unreadCount, setUnreadCount] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const supabase = createClient();

        // 1. Fetch initial recent leads
        const fetchRecentLeads = async () => {
            const { data, error } = await supabase
                .from('leads')
                .select('id, first_name, last_name, created_at, source')
                .order('created_at', { ascending: false })
                .limit(5);

            if (data) {
                setNotifications(data);
                // Assume all pulled are "notifications" for now
                setUnreadCount(data.length);
            }
        };

        fetchRecentLeads();

        // 2. Subscribe to new leads
        const channel = supabase
            .channel('header-notifications')
            .on(
                'postgres_changes',
                { event: 'INSERT', schema: 'public', table: 'leads' },
                (payload) => {
                    const newLead = payload.new as LeadNotification;
                    setNotifications(prev => [newLead, ...prev].slice(0, 5));
                    setUnreadCount(prev => prev + 1);
                    // Optional: Play sound or show toast
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, []);

    const handleNotificationClick = (id: string) => {
        setNotificationsOpen(false);
        router.push(`/admin/leads?id=${id}`); // Or open modal if supported
        // Decrement unread count logic if needed
    };

    const handleMarkAllRead = () => {
        setUnreadCount(0);
    };

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (seconds < 60) return 'Just now';
        const minutes = Math.floor(seconds / 60);
        if (minutes < 60) return `${minutes}m ago`;
        const hours = Math.floor(minutes / 60);
        if (hours < 24) return `${hours}h ago`;
        return `${Math.floor(hours / 24)}d ago`;
    };

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

            {/* Search Bar */}
            <div className="flex-1 max-w-md hidden md:block">
                <div className="relative group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors" />
                    <input
                        type="text"
                        placeholder="Search leads, posts, analytics..."
                        className="w-full h-11 pl-12 pr-4 rounded-xl bg-gray-50 border-gray-100 focus:bg-white focus:ring-4 focus:ring-primary/10 transition-all text-sm font-medium"
                    />
                </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2 md:gap-4">
                {/* External Website Link */}
                <Link
                    href="/"
                    target="_blank" rel="noopener noreferrer"
                    className="p-2.5 text-gray-500 hover:bg-gray-50 hover:text-primary rounded-xl transition-all relative group"
                    title="View Website"
                >
                    <Globe size={20} />
                </Link>

                {/* Notifications */}
                <div className="relative">
                    <button
                        onClick={() => setNotificationsOpen(!notificationsOpen)}
                        className="p-2.5 text-gray-500 hover:bg-gray-50 rounded-xl transition-all relative group"
                    >
                        <Bell size={20} />
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 h-2.5 w-2.5 bg-red-500 rounded-full border-2 border-white ring-2 ring-red-500/20 animate-pulse" />
                        )}
                    </button>

                    <AnimatePresence>
                        {notificationsOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                className="absolute top-full right-0 mt-4 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden"
                            >
                                <div className="p-4 border-b border-gray-50 flex items-center justify-between">
                                    <span className="font-bold text-gray-900">Notifications</span>
                                    <span onClick={handleMarkAllRead} className="text-xs font-bold text-primary hover:underline cursor-pointer">Mark all read</span>
                                </div>
                                <div className="max-h-96 overflow-y-auto">
                                    {notifications.length === 0 ? (
                                        <div className="p-8 text-center text-gray-500 text-sm">
                                            No new notifications
                                        </div>
                                    ) : (
                                        notifications.map((notif) => (
                                            <div
                                                key={notif.id}
                                                onClick={() => handleNotificationClick(notif.id)}
                                                className="p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0 cursor-pointer"
                                            >
                                                <div className="flex gap-3">
                                                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                                                        <User size={18} />
                                                    </div>
                                                    <div className="flex flex-col gap-1">
                                                        <p className="text-sm font-semibold text-gray-900">New Lead Received</p>
                                                        <p className="text-xs text-gray-500 line-clamp-2">
                                                            {notif.first_name} {notif.last_name || ''} from {notif.source.replace('_', ' ')}
                                                        </p>
                                                        <span className="text-[10px] font-medium text-gray-400 mt-1">
                                                            {formatTimeAgo(notif.created_at)}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )}
                                </div>
                                <div className="p-3 bg-gray-50 text-center">
                                    <Link href="/admin/leads" className="text-xs font-bold text-gray-500 hover:text-primary transition-colors">See all leads</Link>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="h-8 w-px bg-gray-100 mx-2" />

                {/* Profile Dropdown */}
                <div className="relative">
                    <button
                        onClick={() => setProfileOpen(!profileOpen)}
                        className="flex items-center gap-3 p-1.5 hover:bg-gray-50 rounded-2xl transition-all group"
                    >
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-primary to-secondary p-0.5 shadow-md group-hover:shadow-lg transition-all">
                            <div className="h-full w-full rounded-[10px] bg-white flex items-center justify-center text-primary font-bold overflow-hidden">
                                <span className="font-heading text-lg">
                                    {user?.email?.substring(0, 2).toUpperCase() || 'AD'}
                                </span>
                            </div>
                        </div>
                        <div className="hidden md:flex flex-col items-start pr-2">
                            <span className="text-sm font-bold text-gray-900 leading-none">Admin</span>
                            <span className="text-[11px] font-semibold text-gray-400 mt-1 uppercase tracking-wider">Super Admin</span>
                        </div>
                        <ChevronDown size={16} className={`text-gray-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
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
                                                <span className="font-heading text-lg">
                                                    {user?.email?.substring(0, 2).toUpperCase() || 'AD'}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col overflow-hidden">
                                            <span className="text-sm font-bold text-gray-900 truncate">Administrator</span>
                                            <span className="text-xs text-gray-500 font-medium truncate">
                                                {user?.email || 'admin@jschoice.com.au'}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Menu Items */}
                                <div className="p-2">
                                    <Link
                                        href="/admin/settings"
                                        className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-50 transition-colors group"
                                        onClick={() => setProfileOpen(false)}
                                    >
                                        <Settings size={18} className="text-gray-400 group-hover:text-primary transition-colors" />
                                        <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">Settings</span>
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
