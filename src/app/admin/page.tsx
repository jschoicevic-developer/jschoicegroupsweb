"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
    Users,
    FileText,
    ArrowUpRight,
    Clock,
    UserPlus,
    BarChart3,
    ArrowRight,
    ClipboardList,
    Loader2,
    Image as ImageIcon
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    AreaChart,
    Area,
    XAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from "recharts";
import { createClient } from "@/lib/supabase";

// Mock Data for Charts (Keep as placeholder for visits)
const engagementData = [
    { name: 'Mon', visits: 40, leads: 24 },
    { name: 'Tue', visits: 30, leads: 13 },
    { name: 'Wed', visits: 20, leads: 98 },
    { name: 'Thu', visits: 27, leads: 39 },
    { name: 'Fri', visits: 18, leads: 48 },
    { name: 'Sat', visits: 23, leads: 38 },
    { name: 'Sun', visits: 34, leads: 43 },
];

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
};

export default function AdminDashboard() {
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        leads: { total: 0, new: 0 },
        referrals: { total: 0, new: 0 },
        blogs: { total: 0, published: 0 },
        gallery: { total: 0 }
    });
    const [recentActivities, setRecentActivities] = useState<any[]>([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            const supabase = createClient();

            try {
                // 1. Leads Stats (source != referral)
                const { count: totalLeads } = await supabase.from('leads').select('*', { count: 'exact', head: true }).neq('source', 'referral');
                const { count: newLeads } = await supabase.from('leads').select('*', { count: 'exact', head: true }).neq('source', 'referral').eq('status', 'new');

                // 2. Referrals Stats (source == referral)
                const { count: totalReferrals } = await supabase.from('leads').select('*', { count: 'exact', head: true }).eq('source', 'referral');
                const { count: newReferrals } = await supabase.from('leads').select('*', { count: 'exact', head: true }).eq('source', 'referral').eq('status', 'new');

                // 3. Blog Stats
                const { count: totalBlogs } = await supabase.from('blog_posts').select('*', { count: 'exact', head: true });
                const { count: publishedBlogs } = await supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('status', 'published');

                // 4. Gallery Stats
                const { count: totalGalleryItems } = await supabase.from('gallery_items').select('*', { count: 'exact', head: true });

                setStats({
                    leads: { total: totalLeads || 0, new: newLeads || 0 },
                    referrals: { total: totalReferrals || 0, new: newReferrals || 0 },
                    blogs: { total: totalBlogs || 0, published: publishedBlogs || 0 },
                    gallery: { total: totalGalleryItems || 0 }
                });

                // 4. Recent Activities
                const { data: recentLeads } = await supabase
                    .from('leads')
                    .select('*')
                    .order('created_at', { ascending: false })
                    .limit(5);

                setRecentActivities(recentLeads || []);
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
    }, []);

    const statCards = [
        {
            name: "Total Leads",
            value: stats.leads.total.toString(),
            subValue: `${stats.leads.new} New`,
            icon: Users,
            color: "bg-blue-100 text-blue-600",
            iconColor: "text-blue-600"
        },
        {
            name: "Total Referrals",
            value: stats.referrals.total.toString(),
            subValue: `${stats.referrals.new} New`,
            icon: ClipboardList,
            color: "bg-purple-100 text-purple-600",
            iconColor: "text-purple-600"
        },
        {
            name: "Blog Posts",
            value: stats.blogs.total.toString(),
            subValue: `${stats.blogs.published} Published`,
            icon: FileText,
            color: "bg-green-100 text-green-600",
            iconColor: "text-green-600"
        },
        {
            name: "Gallery Items",
            value: stats.gallery.total.toString(),
            subValue: "Active Collections",
            icon: ImageIcon,
            color: "bg-orange-100 text-orange-600",
            iconColor: "text-orange-600"
        },
    ];

    if (loading) {
        return (
            <div className="flex h-[80vh] items-center justify-center">
                <Loader2 className="h-10 w-10 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6 sm:space-y-8 pb-8">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-heading">
                        Dashboard <span className="text-primary">Overview</span>
                    </h1>
                    <p className="text-gray-500 font-medium mt-1">
                        Welcome back! Here's what's happening today.
                    </p>
                </div>
            </div>

            {/* Stats Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6"
            >
                {statCards.map((stat) => (
                    <motion.div
                        key={stat.name}
                        variants={itemVariants}
                        className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group"
                    >
                        <div className="flex items-start justify-between mb-4">
                            <div className={cn("p-3 rounded-2xl shadow-md transition-transform group-hover:scale-110", stat.color)}>
                                <stat.icon size={24} className={stat.iconColor} />
                            </div>
                        </div>
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.name}</h3>
                        <p className="text-3xl sm:text-4xl font-black text-gray-900 mt-2 tracking-tight">{stat.value}</p>
                        <p className="text-sm font-medium text-gray-400 mt-1">{stat.subValue}</p>
                    </motion.div>
                ))}
            </motion.div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 sm:gap-8">
                {/* Recent Activities */}
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                            <Clock size={22} className="text-primary" />
                            Recent Activities
                        </h2>
                    </div>

                    <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
                        {recentActivities.length === 0 ? (
                            <div className="p-8 text-center text-gray-500">No recent activity</div>
                        ) : (
                            recentActivities.map((lead) => (
                                <div key={lead.id} className="p-4 sm:p-6 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-2xl bg-gray-100 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
                                            {lead.source === 'referral' ? <ClipboardList size={22} /> : <UserPlus size={22} />}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900 text-sm sm:text-base">
                                                New {lead.source === 'referral' ? 'Referral' : 'Lead'}: {lead.first_name} {lead.last_name}
                                            </p>
                                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                <span className="text-[10px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wide">
                                                    {lead.source.replace('_', ' ')}
                                                </span>
                                                <span className="text-xs text-gray-400 font-medium">
                                                    {new Date(lead.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <button className="p-2 hover:bg-white rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-all border border-gray-100">
                                        <ArrowRight size={18} className="text-gray-400" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                {/* VISITOR STATISTICS CHART (Placeholder) */}
                <div className="space-y-6">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <BarChart3 size={22} className="text-secondary" />
                        Engagement Overview
                    </h2>
                    <div className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm h-[400px] flex flex-col relative overflow-hidden">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <p className="text-sm text-gray-500 font-bold uppercase">Weekly Traffic</p>
                                <p className="text-2xl font-black text-gray-900">Waitlist</p>
                            </div>
                            <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold flex items-center gap-1">
                                <ArrowUpRight size={12} />
                                Live
                            </div>
                        </div>

                        <div className="flex-1 w-full min-h-0">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={engagementData}>
                                    <defs>
                                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#ABB3F1" stopOpacity={0.8} />
                                            <stop offset="95%" stopColor="#ABB3F1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fill: '#9CA3AF', fontSize: 12 }}
                                        dy={10}
                                    />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                        itemStyle={{ color: '#1F2937', fontWeight: 'bold' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="visits"
                                        stroke="#ABB3F1"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorVisits)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>

                        <button className="mt-4 w-full py-3 rounded-xl bg-gray-50 text-gray-600 font-bold hover:bg-primary hover:text-white transition-all text-sm">
                            View Detailed Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
