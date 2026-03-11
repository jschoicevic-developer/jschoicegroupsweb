"use client";

export const dynamic = 'force-dynamic';

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {
    FileText,
    CheckCircle,
    PenSquare,
    Loader2,
    ArrowRight,
    Calendar,
    Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
};

interface BlogStats {
    total: number;
    published: number;
    drafts: number;
}

interface RecentBlog {
    id: string;
    title: string;
    slug: string;
    status: 'draft' | 'published' | 'scheduled';
    category: string | null;
    created_at: string;
}

export default function BloggerDashboard() {
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState<BlogStats>({ total: 0, published: 0, drafts: 0 });
    const [recentBlogs, setRecentBlogs] = useState<RecentBlog[]>([]);

    const displayName = user?.user_metadata?.name || user?.email || 'Blogger';

    useEffect(() => {
        if (!user?.id) return;

        const fetchData = async () => {
            try {
                const [statsRes, blogsRes] = await Promise.all([
                    fetch(`/api/blogger/me/stats?userId=${user.id}`),
                    fetch(`/api/blog?admin=true&limit=5&author_id=${user.id}`),
                ]);

                const statsData = await statsRes.json();
                const blogsData = await blogsRes.json();

                if (statsData.success) {
                    setStats(statsData.data);
                }

                if (blogsData.success) {
                    setRecentBlogs(blogsData.data || []);
                }
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [user?.id]);

    const statCards = [
        {
            name: "Total Blogs Written",
            value: stats.total.toString(),
            icon: FileText,
            color: "bg-blue-100 text-blue-600",
        },
        {
            name: "Published Blogs",
            value: stats.published.toString(),
            icon: CheckCircle,
            color: "bg-green-100 text-green-600",
        },
        {
            name: "Draft Blogs",
            value: stats.drafts.toString(),
            icon: PenSquare,
            color: "bg-amber-100 text-amber-600",
        },
        {
            name: "Quick Write",
            value: "+",
            icon: PenSquare,
            color: "bg-primary/10 text-primary",
            isAction: true,
            href: "/blogger/blogs/new",
        },
    ];

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published': return 'bg-green-100 text-green-700';
            case 'draft': return 'bg-gray-100 text-gray-700';
            case 'scheduled': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

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
                        Welcome back, <span className="text-primary">{displayName.split(' ')[0]}</span>
                    </h1>
                    <p className="text-gray-500 font-medium mt-1">
                        Here's your blogging activity overview.
                    </p>
                </div>
                <Link href="/blogger/blogs/new">
                    <Button className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        <PenSquare size={18} />
                        Write New Blog
                    </Button>
                </Link>
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
                        className={cn(
                            "bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-lg transition-all duration-300 group",
                            stat.isAction ? "cursor-pointer" : ""
                        )}
                    >
                        {stat.isAction ? (
                            <Link href={stat.href!} className="block h-full">
                                <div className="flex items-start justify-between mb-4">
                                    <div className={cn("p-3 rounded-2xl shadow-md transition-transform group-hover:scale-110", stat.color)}>
                                        <stat.icon size={24} />
                                    </div>
                                </div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.name}</h3>
                                <p className="text-3xl sm:text-4xl font-black text-primary mt-2 tracking-tight">{stat.value}</p>
                                <p className="text-sm font-medium text-primary/70 mt-1">Click to write</p>
                            </Link>
                        ) : (
                            <>
                                <div className="flex items-start justify-between mb-4">
                                    <div className={cn("p-3 rounded-2xl shadow-md transition-transform group-hover:scale-110", stat.color)}>
                                        <stat.icon size={24} />
                                    </div>
                                </div>
                                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">{stat.name}</h3>
                                <p className="text-3xl sm:text-4xl font-black text-gray-900 mt-2 tracking-tight">{stat.value}</p>
                            </>
                        )}
                    </motion.div>
                ))}
            </motion.div>

            {/* Recent Blogs */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <Clock size={22} className="text-primary" />
                        Recent Blogs
                    </h2>
                    <Link href="/blogger/blogs" className="text-sm font-bold text-primary hover:underline flex items-center gap-1">
                        View All <ArrowRight size={14} />
                    </Link>
                </div>

                <div className="bg-white border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
                    {recentBlogs.length === 0 ? (
                        <div className="p-12 text-center">
                            <FileText size={48} className="text-gray-200 mx-auto mb-4" />
                            <h3 className="text-lg font-bold text-gray-900 mb-2">No blogs yet</h3>
                            <p className="text-gray-500 mb-6">Start writing your first blog post!</p>
                            <Link href="/blogger/blogs/new">
                                <Button className="gap-2 bg-gradient-to-r from-primary to-secondary">
                                    <PenSquare size={18} />
                                    Write Your First Blog
                                </Button>
                            </Link>
                        </div>
                    ) : (
                        <div className="divide-y divide-gray-50">
                            {recentBlogs.map((blog) => (
                                <div key={blog.id} className="p-4 sm:p-6 hover:bg-gray-50 transition-colors flex items-center justify-between group">
                                    <div className="flex items-center gap-4 flex-1 min-w-0">
                                        <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300 shrink-0">
                                            <FileText size={20} />
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-gray-900 text-sm sm:text-base truncate">{blog.title}</p>
                                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                                                <span className={cn("text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide", getStatusColor(blog.status))}>
                                                    {blog.status}
                                                </span>
                                                {blog.category && (
                                                    <span className="text-xs text-gray-400">{blog.category}</span>
                                                )}
                                                <span className="text-xs text-gray-400 flex items-center gap-1">
                                                    <Calendar size={10} />
                                                    {new Date(blog.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Link
                                        href={`/blogger/blogs/${blog.id}/edit`}
                                        className="p-2 hover:bg-white rounded-xl shadow-sm opacity-0 group-hover:opacity-100 transition-all border border-gray-100 ml-4 shrink-0"
                                    >
                                        <ArrowRight size={18} className="text-gray-400" />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
                <h2 className="text-xl font-bold text-gray-900">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Link href="/blogger/blogs/new">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-gradient-to-r from-primary to-secondary p-6 rounded-3xl cursor-pointer shadow-lg shadow-primary/20 text-white"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-white/20 flex items-center justify-center">
                                    <PenSquare size={24} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg">Write New Blog</h3>
                                    <p className="text-white/80 text-sm">Start a new article</p>
                                </div>
                                <ArrowRight size={20} className="ml-auto text-white/70" />
                            </div>
                        </motion.div>
                    </Link>

                    <Link href="/blogger/blogs">
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className="bg-white border border-gray-100 p-6 rounded-3xl cursor-pointer shadow-sm hover:shadow-lg transition-all"
                        >
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-gray-100 flex items-center justify-center">
                                    <FileText size={24} className="text-gray-600" />
                                </div>
                                <div>
                                    <h3 className="font-bold text-lg text-gray-900">View All Blogs</h3>
                                    <p className="text-gray-500 text-sm">Manage your posts</p>
                                </div>
                                <ArrowRight size={20} className="ml-auto text-gray-400" />
                            </div>
                        </motion.div>
                    </Link>
                </div>
            </div>
        </div>
    );
}
