"use client";

export const dynamic = 'force-dynamic';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Save, Eye } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import WysiwygEditor from "@/components/admin/RichTextEditor";
import { useAuth } from "@/hooks/useAuth";

type BlogStatus = 'draft' | 'published';

export default function NewBloggerPostPage() {
    const router = useRouter();
    const { user } = useAuth();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: "",
        slug: "",
        excerpt: "",
        content: "",
        featured_image: "",
        category: "",
        tags: "",
        status: "draft" as BlogStatus,
    });

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

    const handleSubmit = async (e: React.FormEvent, statusOverride?: BlogStatus) => {
        e.preventDefault();
        if (!user) return;
        setLoading(true);

        const status = statusOverride || formData.status;

        try {
            const tagsArray = formData.tags
                .split(',')
                .map(tag => tag.trim())
                .filter(tag => tag.length > 0);

            const payload = {
                title: formData.title,
                slug: formData.slug,
                excerpt: formData.excerpt,
                content: formData.content,
                featured_image: formData.featured_image,
                category: formData.category,
                tags: tagsArray,
                status,
                author_id: user.id,
                author_name: user.user_metadata?.name || user.email || 'Blogger',
                published_at: status === 'published' ? new Date().toISOString() : null,
            };

            const response = await fetch('/api/blog', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (data.success) {
                router.push('/blogger/blogs');
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

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/blogger/blogs">
                        <Button variant="outline" size="icon" className="rounded-xl">
                            <ArrowLeft size={20} />
                        </Button>
                    </Link>
                    <h1 className="text-3xl font-bold text-gray-900 font-heading">
                        Write <span className="text-primary">New Blog</span>
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
                    <Button
                        onClick={(e) => handleSubmit(e, 'published')}
                        disabled={loading || !formData.title || !formData.content}
                        className="gap-2 bg-gradient-to-r from-primary to-secondary hover:opacity-90"
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
                            <label className="block text-sm font-bold text-gray-700 mb-2">Excerpt</label>
                            <Textarea
                                value={formData.excerpt}
                                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                                placeholder="Brief description of your post..."
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
                    {/* Status */}
                    <div className="glass-card p-8 rounded-[2rem] space-y-6">
                        <h2 className="text-xl font-bold text-gray-900">Publishing</h2>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Post Status</label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value as BlogStatus })}
                                className="w-full h-12 px-4 rounded-xl border border-gray-200 bg-white text-gray-700 font-medium focus:outline-none focus:ring-2 focus:ring-primary"
                            >
                                <option value="draft">Save as Draft</option>
                                <option value="published">Publish Instantly</option>
                            </select>
                        </div>

                        {/* Author info (read-only) */}
                        <div className="p-4 bg-primary/5 rounded-2xl border border-primary/10">
                            <p className="text-xs font-bold text-primary uppercase tracking-wider mb-1">Author</p>
                            <p className="text-sm font-bold text-gray-900">
                                {user?.user_metadata?.name || user?.email}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">{user?.email}</p>
                        </div>
                    </div>

                    {/* Details */}
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
                                    placeholder="NDIS, Care, News (comma-separated)"
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
                                                            const res = await fetch('/api/blog/upload', {
                                                                method: 'POST',
                                                                body: formDataUpload,
                                                            });
                                                            const data = await res.json();
                                                            if (data.location) {
                                                                setFormData(prev => ({ ...prev, featured_image: data.location }));
                                                            }
                                                        } catch {
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
                                                quality={80}
                                                src={formData.featured_image.startsWith('http') || formData.featured_image.startsWith('/') ? formData.featured_image : '/1.png'}
                                                alt="Preview"
                                                fill
                                                className="object-cover"
                                                unoptimized={formData.featured_image.startsWith('data:')}
                                            />
                                            <button
                                                type="button"
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
            </form>
        </div>
    );
}
