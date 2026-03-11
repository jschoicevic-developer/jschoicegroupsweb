"use client";

export const dynamic = 'force-dynamic';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Plus, Search, Edit, Trash2, Eye, Calendar, Tag, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    author_id: string;
    author_name: string;
    status: 'draft' | 'published' | 'scheduled';
    published_at: string | null;
    scheduled_for: string | null;
    tags: string[];
    category: string | null;
    created_at: string;
    updated_at: string;
}

const ITEMS_PER_PAGE = 10;

export default function BloggerBlogsPage() {
    const { user } = useAuth();
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<string>("all");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [postToDelete, setPostToDelete] = useState<BlogPost | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        if (user?.id) {
            fetchPosts();
        }
    }, [statusFilter, user?.id]);

    const fetchPosts = async () => {
        if (!user?.id) return;
        try {
            setLoading(true);
            const params = new URLSearchParams({
                limit: '200',
                admin: 'true',
                author_id: user.id,
            });

            if (statusFilter !== 'all') {
                params.append('status', statusFilter);
            }

            const response = await fetch(`/api/blog?${params}`);
            const data = await response.json();

            if (data.success) {
                const userPosts = data.data || [];
                setPosts(userPosts);
                setTotalPages(Math.ceil(userPosts.length / ITEMS_PER_PAGE));
                setCurrentPage(1);
            }
        } catch (error) {
            console.error('Error fetching blog posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteClick = (post: BlogPost) => {
        setPostToDelete(post);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirm = async () => {
        if (!postToDelete) return;

        try {
            const response = await fetch(`/api/blog/${postToDelete.slug}?author_id=${user?.id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                setPosts(posts.filter(p => p.id !== postToDelete.id));
                setShowDeleteModal(false);
                setPostToDelete(null);
            } else {
                alert('Failed to delete blog post');
            }
        } catch (error) {
            console.error('Error deleting blog post:', error);
            alert('Failed to delete blog post');
        }
    };

    const formatDate = (post: BlogPost) => {
        if (post.status === 'scheduled' && post.scheduled_for) {
            const date = new Date(post.scheduled_for);
            return `Scheduled: ${date.toLocaleDateString('en-GB')}`;
        }
        const date = new Date(post.published_at || post.created_at);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'published': return 'bg-green-100 text-green-700';
            case 'draft': return 'bg-gray-100 text-gray-700';
            case 'scheduled': return 'bg-blue-100 text-blue-700';
            default: return 'bg-gray-100 text-gray-700';
        }
    };

    const filteredPosts = posts.filter(post =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (post.excerpt || "").toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedPosts = filteredPosts.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const totalFilteredPages = Math.ceil(filteredPosts.length / ITEMS_PER_PAGE);

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold text-gray-900 font-heading">
                    My <span className="text-primary">Blogs</span>
                </h1>
                <Link href="/blogger/blogs/new">
                    <Button className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90">
                        <Plus size={20} />
                        New Post
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <div className="glass-card p-6 rounded-[2rem]">
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <Input
                            placeholder="Search blog posts..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 h-12 rounded-xl border-gray-200"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="h-12 px-4 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                        <option value="all">All Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="scheduled">Scheduled</option>
                    </select>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="glass-card p-6 rounded-2xl">
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Total Posts</div>
                    <div className="text-3xl font-black text-gray-900">{posts.length}</div>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Published</div>
                    <div className="text-3xl font-black text-green-600">
                        {posts.filter(p => p.status === 'published').length}
                    </div>
                </div>
                <div className="glass-card p-6 rounded-2xl">
                    <div className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Drafts</div>
                    <div className="text-3xl font-black text-gray-600">
                        {posts.filter(p => p.status === 'draft').length}
                    </div>
                </div>
            </div>

            {/* Blog Posts Table */}
            <div className="glass-card rounded-[2rem] overflow-hidden">
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                ) : filteredPosts.length === 0 ? (
                    <div className="text-center py-20">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">No blog posts found</h3>
                        <p className="text-gray-500 mb-6">Start by writing your first blog post</p>
                        <Link href="/blogger/blogs/new">
                            <Button className="gap-2 bg-gradient-to-r from-primary to-secondary">
                                <Plus size={20} />
                                Create Post
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Desktop Table */}
                        <div className="hidden md:block overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-50 border-b border-gray-100">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Title</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Category</th>
                                        <th className="px-6 py-4 text-left text-xs font-bold text-gray-500 uppercase tracking-wider">Date</th>
                                        <th className="px-6 py-4 text-right text-xs font-bold text-gray-500 uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {paginatedPosts.map((post, index) => (
                                        <motion.tr
                                            key={post.id}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                            className="hover:bg-gray-50 transition-colors"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-900 line-clamp-1">{post.title}</span>
                                                    <span className="text-sm text-gray-500 line-clamp-1">{post.excerpt}</span>
                                                    {post.tags && post.tags.length > 0 && (
                                                        <div className="flex items-center gap-1 mt-1">
                                                            <Tag size={12} className="text-gray-400" />
                                                            <span className="text-xs text-gray-400">
                                                                {post.tags.slice(0, 2).join(', ')}
                                                                {post.tags.length > 2 && ` +${post.tags.length - 2}`}
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={cn("inline-flex px-3 py-1 rounded-full text-xs font-bold uppercase", getStatusColor(post.status))}>
                                                    {post.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="text-sm text-gray-600">{post.category || '-'}</span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2 text-sm text-gray-600">
                                                    <Calendar size={14} className="text-gray-400" />
                                                    <span>{formatDate(post)}</span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center justify-end gap-2">
                                                    {post.status === 'published' && (
                                                        <Link
                                                            href={`/blog/${post.slug}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 hover:bg-blue-50 rounded-lg transition-colors group"
                                                            title="View Post"
                                                        >
                                                            <Eye size={18} className="text-gray-400 group-hover:text-blue-600" />
                                                        </Link>
                                                    )}
                                                    <Link
                                                        href={`/blogger/blogs/${post.id}/edit`}
                                                        className="p-2 hover:bg-primary/5 rounded-lg transition-colors group"
                                                        title="Edit Post"
                                                    >
                                                        <Edit size={18} className="text-gray-400 group-hover:text-primary" />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleDeleteClick(post)}
                                                        className="p-2 hover:bg-red-50 rounded-lg transition-colors group"
                                                        title="Delete Post"
                                                    >
                                                        <Trash2 size={18} className="text-gray-400 group-hover:text-red-600" />
                                                    </button>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Mobile Cards */}
                        <div className="md:hidden divide-y divide-gray-100">
                            {paginatedPosts.map((post, index) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="p-4 space-y-3"
                                >
                                    <div className="flex justify-between items-start gap-4">
                                        <div className="flex-1">
                                            <h3 className="font-bold text-gray-900 leading-tight mb-1">{post.title}</h3>
                                            <p className="text-sm text-gray-500 line-clamp-2">{post.excerpt}</p>
                                        </div>
                                        <span className={cn("shrink-0 inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase", getStatusColor(post.status))}>
                                            {post.status}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={12} />
                                            {formatDate(post)}
                                        </div>
                                        {post.category && (
                                            <span className="bg-gray-100 px-2 py-0.5 rounded text-gray-600">{post.category}</span>
                                        )}
                                    </div>
                                    <div className="flex items-center justify-end gap-3 pt-2">
                                        {post.status === 'published' && (
                                            <Link
                                                href={`/blog/${post.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg"
                                            >
                                                <Eye size={14} /> View
                                            </Link>
                                        )}
                                        <Link
                                            href={`/blogger/blogs/${post.id}/edit`}
                                            className="flex items-center gap-1 text-xs font-bold text-primary bg-primary/5 px-3 py-1.5 rounded-lg"
                                        >
                                            <Edit size={14} /> Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteClick(post)}
                                            className="flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-3 py-1.5 rounded-lg"
                                        >
                                            <Trash2 size={14} /> Delete
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Pagination */}
                        {totalFilteredPages > 1 && (
                            <div className="flex items-center justify-between p-6 border-t border-gray-100">
                                <span className="text-sm text-gray-500">
                                    Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1}–{Math.min(currentPage * ITEMS_PER_PAGE, filteredPosts.length)} of {filteredPosts.length} posts
                                </span>
                                <div className="flex items-center gap-2">
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                        disabled={currentPage === 1}
                                        className="h-9 px-3"
                                    >
                                        <ChevronLeft size={16} />
                                    </Button>
                                    <span className="text-sm font-medium text-gray-700 px-2">
                                        {currentPage} / {totalFilteredPages}
                                    </span>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={() => setCurrentPage(p => Math.min(totalFilteredPages, p + 1))}
                                        disabled={currentPage === totalFilteredPages}
                                        className="h-9 px-3"
                                    >
                                        <ChevronRight size={16} />
                                    </Button>
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Delete Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-white rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
                    >
                        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                                    <Trash2 size={24} className="text-white" />
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-white">Delete Blog Post</h3>
                                    <p className="text-red-100 text-sm">This action cannot be undone</p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6">
                            <p className="text-gray-700 mb-2">Are you sure you want to delete this blog post?</p>
                            {postToDelete && (
                                <div className="bg-gray-50 rounded-lg p-4 mt-4">
                                    <p className="font-bold text-gray-900 mb-1">{postToDelete.title}</p>
                                </div>
                            )}
                        </div>
                        <div className="bg-gray-50 px-6 py-4 flex gap-3 justify-end">
                            <Button
                                onClick={() => { setShowDeleteModal(false); setPostToDelete(null); }}
                                variant="outline"
                                className="px-6"
                            >
                                Cancel
                            </Button>
                            <Button
                                onClick={handleDeleteConfirm}
                                className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-6"
                            >
                                Delete Post
                            </Button>
                        </div>
                    </motion.div>
                </div>
            )}
        </div>
    );
}
