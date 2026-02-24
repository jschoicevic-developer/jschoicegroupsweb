
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Save, Eye, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import WysiwygEditor from "@/components/admin/RichTextEditor";

type BlogStatus = 'draft' | 'published' | 'scheduled';

export default function NewBlogPostPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        featured_image: "",
        author_name: "JS Choice Team",
        status: "draft" as BlogStatus,
        published_at: "",
        scheduled_for: "",
        tags: "",
        category: "",
    });

    const handleSubmit = async (e: React.FormEvent, statusOverride?: BlogStatus) => {
        e.preventDefault();
        setLoading(true);

        const status = statusOverride || formData.status;

        try {
            const tagsArray = formData.tags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);

            const payload = {
                ...formData,
                status,
                tags: tagsArray,
                published_at: status === 'published' ? new Date().toISOString() : null,
                scheduled_for: status === 'scheduled' ? formData.scheduled_for : null,
            };

            const response = await fetch('/api/blog', {
                method: 'POST',
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
                alert(data.error || 'Failed to create blog post');
            }
        } catch (error) {
            console.error('Error creating blog post:', error);
            alert('Failed to create blog post');
        } finally {
            setLoading(false);
        }
    };

    const generateSlug = (title: string) => {
        return title
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/^-|-$/g, '');
    };

    const handleTitleChange = (title: string) => {
        setFormData({
            ...formData,
            title,
            slug: generateSlug(title),
        });
    };

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
                        New <span className="text-gradient">Blog Post</span>
                    </h1>
                </div>
                <div className="flex items-center gap-3">
                    <Button
                        variant="outline"
                        onClick={(e) => handleSubmit(e, 'draft')}
                        disabled={loading || !formData.title}
                        className="gap-2"
                    >
                        <Save size={18} />
                        Save Draft
                    </Button>

                    {formData.status === 'scheduled' && (
                        <Button
                            onClick={(e) => handleSubmit(e, 'scheduled')}
                            disabled={loading || !formData.title || !formData.scheduled_for}
                            className="gap-2 bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            <Calendar size={18} />
                            Schedule
                        </Button>
                    )}

                    <Button
                        onClick={(e) => handleSubmit(e, 'published')}
                        disabled={loading || !formData.title || !formData.content}
                        className="gap-2 bg-gradient-to-r from-primary to-secondary"
                    >
                        <Eye size={18} />
                        Publish Now
                    </Button>
                </div>
            </div>

            {/* Form */}
            <form className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-12">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="glass-card p-8 rounded-[2rem] space-y-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Title *</label>
                            <Input
                                value={formData.title}
                                onChange={(e) => handleTitleChange(e.target.value)}
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
                                onChange={(content: string) => setFormData({ ...formData, content })}
                            />
                        </div>
                    </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    {/* Publishing Status */}
                    <div className="glass-card p-8 rounded-[2rem] space-y-6">
                        <h2 className="text-xl font-bold text-gray-900">Publishing</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Post Status</label>
                                <select
                                    value={formData.status}
                                    onChange={(e) => setFormData({ ...formData, status: e.target.value as BlogStatus })}
                                    className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                                >
                                    <option value="draft">Draft</option>
                                    <option value="published">Publish Instantly</option>
                                    <option value="scheduled">Schedule Post</option>
                                </select>
                            </div>

                            <AnimatePresence>
                                {formData.status === 'scheduled' && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="space-y-4 pt-2"
                                    >
                                        <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                                            <div className="flex items-center gap-2 text-blue-700 font-bold mb-2">
                                                <Clock size={16} />
                                                <span>Scheduling Details</span>
                                            </div>
                                            <label className="block text-xs font-bold text-blue-600 mb-1">Publish Date & Time</label>
                                            <Input
                                                type="datetime-local"
                                                value={formData.scheduled_for}
                                                onChange={(e) => setFormData({ ...formData, scheduled_for: e.target.value })}
                                                className="h-10 bg-white border-blue-200"
                                            />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>

                    {/* Meta Information */}
                    <div className="glass-card p-8 rounded-[2rem] space-y-6">
                        <h2 className="text-xl font-bold text-gray-900 border-b border-gray-100 pb-4">Details</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Category</label>
                                <Input
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    placeholder="e.g. NDIS"
                                    className="h-12"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Tags</label>
                                <Input
                                    value={formData.tags}
                                    onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                                    placeholder="NDIS, Care, News"
                                    className="h-12"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Featured Image</label>
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <Input
                                            value={formData.featured_image}
                                            onChange={(e) => setFormData({ ...formData, featured_image: e.target.value })}
                                            placeholder="Image URL"
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
                                                            const baseUrl = process.env.NODE_ENV === 'development'
                                                                ? 'http://localhost:3000'
                                                                : (process.env.NEXT_PUBLIC_SITE_URL || 'https://jschoice-website.vercel.app');
                                                            const res = await fetch(`${baseUrl}/api/blog/upload`, {
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
                                            <Image quality={80}
                                                src={formData.featured_image.startsWith('http') || formData.featured_image.startsWith('/') ? formData.featured_image : '/1.png'}
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

                            <div>
                                <label className="block text-sm font-bold text-gray-700 mb-2">Author</label>
                                <Input
                                    value={formData.author_name}
                                    onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
                                    placeholder="Author name"
                                    className="h-12"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}
