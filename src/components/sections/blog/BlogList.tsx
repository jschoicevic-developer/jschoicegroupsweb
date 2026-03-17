"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { User, Calendar, Tag, ChevronRight, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    featured_image: string | null;
    author_name: string | null;
    status: 'draft' | 'published' | 'scheduled';
    published_at: string | null;
    tags: string[];
    category: string | null;
    created_at: string;
}

const BlogList = () => {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        fetchPosts();
    }, [currentPage, searchQuery]);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: '10',
                status: 'published',
            });

            if (searchQuery) {
                params.append('search', searchQuery);
            }

            const response = await fetch(`/api/blog?${params}`);
            const data = await response.json();

            if (data.success) {
                setPosts(data.data);
                setTotalPages(data.pagination.totalPages);
            }
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchPosts();
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Group posts by month for archives
    const getArchives = () => {
        const archives = new Map<string, number>();
        posts.forEach(post => {
            const date = new Date(post.published_at || post.created_at);
            const monthYear = date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
            archives.set(monthYear, (archives.get(monthYear) || 0) + 1);
        });
        return Array.from(archives.entries()).slice(0, 6);
    };

    // Get unique categories
    const getCategories = () => {
        const categories = new Map<string, number>();
        posts.forEach(post => {
            if (post.category) {
                categories.set(post.category, (categories.get(post.category) || 0) + 1);
            }
        });
        return Array.from(categories.entries());
    };

    if (loading && posts.length === 0) {
        return (
            <section className="py-20 bg-gray-50 min-h-screen">
                <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8">
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-20 bg-gray-50 min-h-screen">
            <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8">
                <div className="flex flex-col gap-8 lg:grid lg:grid-cols-[1fr_350px] lg:gap-16">

                    {/* Mobile Widgets - Show at top on small screens */}
                    <div className="lg:hidden space-y-4">
                        {/* Search Section */}
                        <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-gray-100">
                            <h3 className="text-lg font-black text-[#2D3748] uppercase tracking-tight mb-4">Search</h3>
                            <form onSubmit={handleSearch} className="relative">
                                <Input
                                    placeholder="Search articles..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-12 pl-4 pr-10 rounded-xl bg-gray-50 border-gray-200"
                                />
                                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <Search className="text-gray-400 hover:text-primary transition-colors" size={18} />
                                </button>
                            </form>
                        </div>

                        {/* Mobile Categories - Shown only if there are categories */}
                        {getCategories().length > 0 && (
                            <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-gray-100">
                                <h3 className="text-lg font-black text-[#2D3748] uppercase tracking-tight mb-4">Categories</h3>
                                <div className="flex flex-wrap gap-2">
                                    {getCategories().map(([category, count]) => (
                                        <Link
                                            key={category}
                                            href={`/blog?category=${encodeURIComponent(category)}`}
                                            className="px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-gray-600 hover:bg-primary hover:text-white transition-all flex items-center gap-2"
                                        >
                                            {category} <span className="text-[10px] opacity-50">({count})</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Mobile Archives - Shown only if there are archives */}
                        {getArchives().length > 0 && (
                            <div className="bg-white p-6 rounded-[2rem] shadow-lg border border-gray-100">
                                <h3 className="text-lg font-black text-[#2D3748] uppercase tracking-tight mb-4">Archives</h3>
                                <div className="flex flex-wrap gap-2">
                                    {getArchives().map(([date, count]) => (
                                        <Link
                                            key={date}
                                            href={`/blog?archive=${encodeURIComponent(date)}`}
                                            className="px-4 py-2 bg-gray-50 rounded-xl text-xs font-bold text-gray-500 hover:text-primary transition-all"
                                        >
                                            {date} <span className="text-[10px] opacity-50">({count})</span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Main Content: Blog Posts */}
                    <div className="lg:order-1 flex flex-col gap-12">
                        {posts.length === 0 ? (
                            <div className="text-center py-20">
                                <h3 className="text-2xl font-bold text-gray-900 mb-4">No blog posts found</h3>
                                <p className="text-gray-600">Check back soon for new content!</p>
                            </div>
                        ) : (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {posts.map((post, index) => (
                                        <motion.article
                                            key={post.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                            className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-200 flex flex-col group hover:shadow-xl hover:border-primary/50 transition-all duration-300"
                                        >
                                            {/* Featured Image */}
                                            {post.featured_image && (
                                                <div className="relative aspect-[4/3] md:aspect-video w-full overflow-hidden bg-gray-50 border-b border-gray-100">
                                                    <Link href={`/blog/${post.slug}`}>
                                                        <div className="absolute inset-0 bg-black/5 group-hover:bg-black/0 transition-colors z-10" />
                                                        <Image quality={80}
                                                            src={(post.featured_image?.startsWith('http') || post.featured_image?.startsWith('/')) ? post.featured_image : '/1.png'}
                                                            alt={post.title}
                                                            fill
                                                            className="object-contain p-2 transform group-hover:scale-105 transition-transform duration-700"
                                                            unoptimized={post.featured_image?.startsWith('data:') || false}
                                                        />
                                                    </Link>
                                                </div>
                                            )}

                                            {/* Content */}
                                            <div className="p-6 md:p-8 flex flex-col gap-5 flex-grow">
                                                {/* Meta Data */}
                                                <div className="flex flex-wrap items-center justify-between text-[11px] font-bold text-gray-500 uppercase tracking-widest">
                                                    <div className="flex items-center gap-1.5 bg-gray-50 px-3 py-1.5 rounded-md border border-gray-100">
                                                        <Calendar size={14} className="text-[#F2C94C]" />
                                                        {formatDate(post.published_at || post.created_at)}
                                                    </div>
                                                    {post.category && (
                                                        <div className="bg-[#1F2937] text-white px-3 py-1.5 rounded-md text-[10px]">
                                                            {post.category}
                                                        </div>
                                                    )}
                                                </div>

                                                <Link href={`/blog/${post.slug}`} className="group-hover:text-primary transition-colors">
                                                    <h2 className="text-xl md:text-2xl font-black text-[#1F2937] leading-tight line-clamp-2">
                                                        {post.title}
                                                    </h2>
                                                </Link>

                                                <div className="flex gap-2 flex-wrap -mt-2">
                                                    {post.tags.slice(0, 3).map((tag, i) => (
                                                        <span key={i} className="text-[10px] font-bold px-3 py-1 bg-gray-50 text-gray-500 rounded-full border border-gray-200">
                                                            #{tag}
                                                        </span>
                                                    ))}
                                                </div>

                                                {/* Removed Excerpt for cleaner card look but kept if needed */}

                                                <div className="mt-auto pt-6 flex items-center justify-between border-t border-gray-100">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-8 h-8 rounded-full bg-[#1F2937] text-white flex items-center justify-center font-bold text-xs">
                                                            {(post.author_name || 'J')[0].toUpperCase()}
                                                        </div>
                                                        <span className="text-xs font-bold text-gray-500 capitalize">{post.author_name || 'JS Choice'}</span>
                                                    </div>
                                                    <Link
                                                        href={`/blog/${post.slug}`}
                                                        className="inline-flex items-center gap-2 text-[#1F2937] border border-gray-200 px-4 py-2 rounded-md font-bold text-[10px] tracking-wider uppercase hover:border-[#1F2937] hover:bg-gray-50 transition-all duration-300"
                                                    >
                                                        Read More <ChevronRight size={14} strokeWidth={2} />
                                                    </Link>
                                                </div>
                                            </div>
                                        </motion.article>
                                    ))}
                                </div>

                                {/* Pagination */}
                                {totalPages > 1 && (
                                    <div className="flex items-center justify-center gap-2 mt-8">
                                        {currentPage > 1 && (
                                            <Button
                                                variant="outline"
                                                onClick={() => setCurrentPage(currentPage - 1)}
                                                className="h-12 px-6 rounded-full border-2 border-gray-200 text-gray-500 font-bold hover:border-primary hover:text-primary gap-2"
                                            >
                                                Previous
                                            </Button>
                                        )}

                                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                            const page = i + 1;
                                            return (
                                                <Button
                                                    key={page}
                                                    variant="outline"
                                                    onClick={() => setCurrentPage(page)}
                                                    className={`h-12 w-12 rounded-full border-2 font-bold p-0 ${currentPage === page
                                                        ? 'border-primary bg-primary text-white'
                                                        : 'border-gray-200 text-gray-500 hover:border-primary hover:text-primary'
                                                        }`}
                                                >
                                                    {page}
                                                </Button>
                                            );
                                        })}

                                        {currentPage < totalPages && (
                                            <Button
                                                variant="outline"
                                                onClick={() => setCurrentPage(currentPage + 1)}
                                                className="h-12 px-6 rounded-full border-2 border-gray-200 text-gray-500 font-bold hover:border-primary hover:text-primary gap-2"
                                            >
                                                Next <ChevronRight size={16} />
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Sidebar */}
                    <aside className="lg:order-2 space-y-10 h-fit lg:sticky lg:top-28">
                        {/* Desktop Search Widget - Hidden on mobile as it's at the top */}
                        <div className="hidden lg:block bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-black text-[#2D3748] uppercase tracking-tight mb-6">Search</h3>
                            <form onSubmit={handleSearch} className="relative">
                                <Input
                                    placeholder="Type and hit enter..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="h-12 pl-4 pr-10 rounded-xl bg-gray-50 border-gray-200"
                                />
                                <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2">
                                    <Search className="text-gray-400 hover:text-primary transition-colors" size={18} />
                                </button>
                            </form>
                        </div>

                        {/* Recent Posts Widget - Visible on desktop, typically pushed to bottom on mobile anyway */}
                        <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-black text-[#2D3748] uppercase tracking-tight mb-6">Recent Posts</h3>
                            <ul className="space-y-4">
                                {posts.slice(0, 5).map(post => (
                                    <li key={post.id} className="group">
                                        <Link href={`/blog/${post.slug}`} className="flex flex-col gap-1">
                                            <span className="font-bold text-gray-700 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                                                {post.title}
                                            </span>
                                            <span className="text-xs text-gray-400 font-medium">
                                                {formatDate(post.published_at || post.created_at)}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Categories Widget - Desktop only (redundant for mobile sidebar now) */}
                        <div className="hidden lg:block bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-black text-[#2D3748] uppercase tracking-tight mb-6">Categories</h3>
                            <ul className="space-y-2">
                                {getCategories().map(([category, count]) => (
                                    <li key={category}>
                                        <Link
                                            href={`/blog?category=${encodeURIComponent(category)}`}
                                            className="flex items-center justify-between text-gray-600 font-medium hover:text-primary transition-colors p-2 hover:bg-gray-50 rounded-lg"
                                        >
                                            <span>{category}</span>
                                            <span className="text-xs bg-gray-100 px-2 py-1 rounded-md text-gray-500 font-bold">{count}</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Archives Widget - Desktop only */}
                        <div className="hidden lg:block bg-white p-8 rounded-3xl shadow-lg border border-gray-100">
                            <h3 className="text-xl font-black text-[#2D3748] uppercase tracking-tight mb-6">Archives</h3>
                            <ul className="space-y-2 text-sm font-medium text-gray-500">
                                {getArchives().map(([date, count]) => (
                                    <li key={date}>
                                        <Link
                                            href={`/blog?archive=${encodeURIComponent(date)}`}
                                            className="hover:text-primary hover:underline transition-colors block py-1 flex items-center justify-between"
                                        >
                                            <span>{date}</span>
                                            <span className="text-xs text-gray-400">({count})</span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
};

export default BlogList;
