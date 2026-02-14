
"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Save, Eye, Calendar, Loader2 } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import WysiwygEditor from "@/components/admin/RichTextEditor";

interface EditBlogPageProps {
    params: Promise<{ slug: string }>;
}

export default function EditBlogPostPage({ params }: EditBlogPageProps) {
    const { slug: initialSlug } = use(params);
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        featured_image: "",
        author_name: "JS Choice Team",
        status: "draft" as 'draft' | 'published' | 'scheduled',
        published_at: "",
        scheduled_for: "",
        tags: "",
        category: "",
    });

    useEffect(() => {
        fetchPost();
    }, [initialSlug]);

    const fetchPost = async () => {
        try {
            const response = await fetch(`/api/blog/${initialSlug}?admin=true`);
            const data = await response.json();

            if (data.success && data.data) {
                const post = data.data;
                setFormData({
                    id: post.id,
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt || "",
                    content: post.content || "",
                    featured_image: post.featured_image || "",
                    author_name: post.author_name || "JS Choice Team",
                    status: post.status,
                    published_at: post.published_at || "",
                    scheduled_for: post.scheduled_for || "",
                    tags: post.tags?.join(", ") || "",
                    category: post.category || "",
                });
            } else {
                alert("Post not found");
                router.push("/admin/blog");
            }
        } catch (error) {
            console.error("Error fetching post:", error);
            alert("Failed to load post");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent, statusOverride?: 'draft' | 'published' | 'scheduled') => {
        e.preventDefault();
        setSaving(true);

        try {
            const tagsArray = formData.tags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);

            const status = statusOverride || formData.status;

            const payload = {
                ...formData,
                status,
                tags: tagsArray,
                published_at: status === 'published' ? (formData.published_at || new Date().toISOString()) : formData.published_at || null,
                scheduled_for: status === 'scheduled' ? formData.scheduled_for : null,
            };

            const response = await fetch(`/api/blog/${initialSlug}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (data.success) {
                router.push('/admin/blog');
                router.refresh();
            } else {
                alert(data.error || 'Failed to update blog post');
            }
        } catch (error) {
            console.error('Error updating blog post:', error);
            alert('Failed to update blog post');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/admin/blog">
                        <Button variant="outline" size="icon" className="rounded-xl">
                            <ArrowLeft size={20} />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 font-heading">
                        Edit <span className="text-gradient">Blog Post</span>
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={(e) => handleSubmit(e, 'draft')}
                        disabled={saving}
                        className="gap-2"
                    >
                        <Save size={18} />
                        Save Draft
                    </Button>
                    {formData.status === 'scheduled' || formData.scheduled_for ? (
                        <Button
                            onClick={(e) => handleSubmit(e, 'scheduled')}
                            disabled={saving || !formData.scheduled_for}
                            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            <Calendar size={18} />
                            Update Schedule
                        </Button>
                    ) : null}
                    <Button
                        onClick={(e) => handleSubmit(e, 'published')}
                        disabled={saving || !formData.title || !formData.content}
                        className="gap-2 bg-gradient-to-r from-primary to-secondary"
                    >
                        <Eye size={18} />
                        {formData.status === 'published' ? 'Update Post' : 'Publish Now'}
                    </Button>
                </div>
            </div>

            {/* Form */}
            <form className="space-y-6 pb-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="glass-card p-8 rounded-[2rem] space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Title *</label>
                                <Input
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    placeholder="Enter blog post title..."
                                    className="h-14 text-lg font-semibold"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Slug *</label>
                                <Input
                                    value={formData.slug}
                                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                                    placeholder="blog-post-url-slug"
                                    className="h-12 font-mono text-sm"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Excerpt *</label>
                                <Textarea
                                    value={formData.excerpt}
                                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                    placeholder="Brief description..."
                                    rows={3}
                                    className="resize-none"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Content *</label>
                                <WysiwygEditor
                                    value={formData.content}
                                    onChange={(content) => setFormData({ ...formData, content })}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        <div className="glass-card p-8 rounded-[2rem] space-y-6">
                            <h2 className="text-xl font-bold text-gray-900">Publishing</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Status</label>
                                    <select
                                        value={formData.status}
                                        onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                                        className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium"
                                    >
                                        <option value="draft">Draft</option>
                                        <option value="published">Published</option>
                                        <option value="scheduled">Scheduled</option>
                                    </select>
                                </div>

                                {formData.status === 'scheduled' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        className="space-y-2"
                                    >
                                        <label className="block text-sm font-bold text-gray-700">Schedule Date & Time</label>
                                        <Input
                                            type="datetime-local"
                                            value={formData.scheduled_for}
                                            onChange={(e) => setFormData({ ...formData, scheduled_for: e.target.value })}
                                            className="h-12"
                                        />
                                    </motion.div>
                                )}
                            </div>
                        </div>

                        <div className="glass-card p-8 rounded-[2rem] space-y-6">
                            <h2 className="text-xl font-bold text-gray-900">Meta Details</h2>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                    <Input
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        placeholder="Category"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Tags</label>
                                    <Input
                                        value={formData.tags}
                                        onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                        placeholder="Tag1, Tag2 (comma separated)"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-gray-700 mb-2">Featured Image</label>
                                    <div className="space-y-4">
                                        <div className="flex gap-2">
                                            <Input
                                                value={formData.featured_image}
                                                onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                                                placeholder="https://..."
                                                className="h-12"
                                            />
                                            <Button
                                                type="button"
                                                variant="outline"
                                                onClick={() => {
                                                    const input = document.createElement('input');
                                                    input.type = 'file';
                                                    input.accept = 'image/*';
                                                    input.onchange = async () => {
                                                        const file = input.files?.[0];
                                                        if (file) {
                                                            const formDataUpload = new FormData();
                                                            formDataUpload.append('file', file);
                                                            try {
                                                                const res = await fetch('/api/blog/upload', {
                                                                    method: 'POST',
                                                                    body: formDataUpload,
                                                                });
                                                                const data = await res.json();
                                                                if (data.location) {
                                                                    setFormData(prev => ({ ...prev, featured_image: data.location }));
                                                                }
                                                            } catch (err) {
                                                                alert('Upload failed');
                                                            }
                                                        }
                                                    };
                                                    input.click();
                                                }}
                                                className="h-12 px-4 whitespace-nowrap"
                                            >
                                                Upload
                                            </Button>
                                        </div>
                                        {formData.featured_image && (
                                            <div className="relative aspect-video rounded-xl overflow-hidden border border-gray-100 shadow-inner group">
                                                <Image
                                                    src={(formData.featured_image.startsWith('http') || formData.featured_image.startsWith('/')) ? formData.featured_image : '/1.png'}
                                                    alt="Preview"
                                                    fill
                                                    className="object-cover"
                                                    unoptimized={formData.featured_image.startsWith('data:')}
                                                />
                                                <button
                                                    onClick={() => setFormData({ ...formData, featured_image: '' })}
                                                    className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    ×
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
