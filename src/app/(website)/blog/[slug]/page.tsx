import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Metadata } from 'next';

interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    description: string | null;
    table_of_contents: string | null;
    content: string;
    featured_image: string | null;
    author_name: string;
    status: 'draft' | 'published' | 'scheduled';
    published_at: string | null;
    tags: string[];
    category: string | null;
    created_at: string;
}

interface BlogPostPageProps {
    params: Promise<{
        slug: string;
    }>;
    searchParams: Promise<{
        preview?: string;
    }>;
}

async function getBlogPost(slug: string, isPreview: boolean = false): Promise<BlogPost | null> {
    try {
        const baseUrl = process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : (process.env.NEXT_PUBLIC_SITE_URL || 'https://jschoice-website.vercel.app');

        const url = new URL(`${baseUrl}/api/blog/${slug}`);
        if (isPreview) {
            url.searchParams.append('admin', 'true');
        }

        const response = await fetch(url.toString(), {
            cache: 'no-store',
        });

        if (!response.ok) {
            return null;
        }

        const data = await response.json();
        return data.success ? data.data : null;
    } catch (error) {
        console.error('Error fetching blog post:', error);
        return null;
    }
}

async function getRelatedPosts(currentSlug: string): Promise<BlogPost[]> {
    try {
        const baseUrl = process.env.NODE_ENV === 'development'
            ? 'http://localhost:3000'
            : (process.env.NEXT_PUBLIC_SITE_URL || 'https://jschoice-website.vercel.app');

        const response = await fetch(`${baseUrl}/api/blog?limit=4&status=published`, {
            cache: 'no-store',
        });

        if (!response.ok) {
            return [];
        }

        const data = await response.json();
        if (data.success) {
            // Filter out current post and return only 3
            return data.data.filter((p: BlogPost) => p.slug !== currentSlug).slice(0, 3);
        }
        return [];
    } catch (error) {
        console.error('Error fetching related posts:', error);
        return [];
    }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const resolvedParams = await params;
    const post = await getBlogPost(resolvedParams.slug);

    if (!post) {
        return {
            title: 'Blog Post Not Found',
        };
    }

    return {
        title: `${post.title} | JS Choice Group`,
        description: post.excerpt,
    };
}

export default async function BlogPostPage({ params, searchParams }: BlogPostPageProps) {
    const resolvedParams = await params;
    const resolvedSearchParams = await searchParams;
    const isPreview = resolvedSearchParams.preview === 'true';

    const post = await getBlogPost(resolvedParams.slug, isPreview);

    if (!post) {
        notFound();
    }

    const relatedPosts = await getRelatedPosts(resolvedParams.slug);

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });
    };

    // Helper function to validate image URL
    const isValidImageUrl = (url: string | null): boolean => {
        if (!url || url.trim() === '') return false;

        // Check if it's a relative path starting with /
        if (url.startsWith('/')) return true;

        // Check if it's an absolute URL
        try {
            const urlObj = new URL(url);
            return urlObj.protocol === 'http:' || urlObj.protocol === 'https:';
        } catch {
            return false;
        }
    };

    return (
        <main className="flex flex-col min-h-screen w-full bg-gray-50">

            {/* ── HERO — theme colour background, no image ─────────────────── */}
            <div className="w-full bg-gradient-to-br from-[#1A202C] via-[#2D3748] to-primary py-14 md:py-20">
                <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">

                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-sm text-white/60 font-medium mb-8">
                        <Link href="/" className="hover:text-white transition-colors">Home</Link>
                        <ChevronRight size={13} />
                        <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                        <ChevronRight size={13} />
                        <span className="text-white/40 line-clamp-1">{post.title}</span>
                    </nav>

                    {/* Category badge */}
                    {post.category && (
                        <span className="inline-block mb-5 px-4 py-1.5 rounded-full bg-primary/30 border border-primary/50 text-primary text-xs font-bold uppercase tracking-widest">
                            {post.category}
                        </span>
                    )}

                    {/* Title */}
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white leading-tight mb-8 max-w-4xl">
                        {post.title}
                    </h1>

                    {/* Author · Date · Tags */}
                    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
                        <div className="flex items-center gap-2 text-white/75 text-sm font-medium">
                            <span className="w-7 h-7 rounded-full bg-primary/30 flex items-center justify-center">
                                <User size={14} className="text-primary" />
                            </span>
                            {post.author_name}
                        </div>
                        <div className="flex items-center gap-2 text-white/75 text-sm font-medium">
                            <span className="w-7 h-7 rounded-full bg-primary/30 flex items-center justify-center">
                                <Calendar size={14} className="text-primary" />
                            </span>
                            {formatDate(post.published_at || post.created_at)}
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                            {post.tags.slice(0, 4).map((tag, i) => (
                                <Link
                                    key={i}
                                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                                    className="inline-flex items-center gap-1 px-3 py-1 bg-white/10 hover:bg-primary/50 border border-white/20 text-white rounded-full text-xs font-semibold transition-colors"
                                >
                                    <Tag size={10} />
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            {/* ── END HERO ─────────────────────────────────────────────────── */}

            {/* ── CONTENT — two-column: article + sticky sidebar ───────────── */}
            <div className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 py-12 pb-24">
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* ── LEFT: Article ────────────────────────────────────── */}
                    <article className="flex-1 min-w-0 bg-white rounded-[2rem] shadow-xl overflow-hidden">

                        {/* Featured image in body */}
                        {isValidImageUrl(post.featured_image) && (
                            <div className="relative w-full aspect-[16/9] overflow-hidden">
                                <Image
                                    quality={85}
                                    src={post.featured_image!}
                                    alt={post.title}
                                    fill
                                    className="object-cover object-center"
                                    priority
                                    unoptimized={post.featured_image?.startsWith('data:')}
                                />
                            </div>
                        )}

                        {/* Overview */}
                        {post.description && (
                            <div className="px-8 md:px-12 pt-10 pb-2">
                                <div className="bg-primary/5 border-l-4 border-primary rounded-r-2xl p-6">
                                    <p className="text-xs font-black text-primary uppercase tracking-widest mb-2">Overview</p>
                                    <p className="text-gray-700 text-lg leading-relaxed">{post.description}</p>
                                </div>
                            </div>
                        )}

                        {/* Body */}
                        <div className="p-8 md:p-12">
                            <div
                                className="blog-content prose prose-lg max-w-none
                                    prose-headings:font-black prose-headings:text-[#2D3748] prose-headings:tracking-tight prose-headings:font-dosis
                                    prose-h1:text-4xl prose-h1:mt-0 prose-h1:mb-8
                                    prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200
                                    prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                                    prose-h4:text-xl prose-h4:mt-6 prose-h4:mb-3
                                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6 prose-p:text-base
                                    prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                                    prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                                    prose-ol:my-6 prose-ol:list-decimal prose-ol:pl-6
                                    prose-li:text-gray-700 prose-li:mb-2 prose-li:leading-relaxed
                                    prose-strong:text-gray-900 prose-strong:font-bold
                                    prose-em:text-gray-700
                                    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:bg-primary/5 prose-blockquote:rounded-r-2xl prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-gray-700
                                    prose-code:bg-gray-100 prose-code:text-primary prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                                    prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-2xl prose-pre:p-6 prose-pre:overflow-x-auto
                                    prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8
                                    prose-table:border-collapse prose-table:w-full
                                    prose-th:bg-gray-100 prose-th:text-gray-700 prose-th:font-bold prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:border prose-th:border-gray-200
                                    prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-gray-200 prose-td:text-gray-700
                                    prose-hr:border-gray-200 prose-hr:my-10"
                                dangerouslySetInnerHTML={{ __html: post.content }}
                            />
                        </div>

                        {/* Footer */}
                        <div className="px-8 md:px-12 py-8 bg-gray-50 border-t border-gray-100">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
                            >
                                <ChevronLeft size={20} />
                                Back to Blog
                            </Link>
                        </div>
                    </article>

                    {/* ── RIGHT: Sticky sidebar ────────────────────────────── */}
                    <aside className="w-full lg:w-[300px] shrink-0 flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">

                        {/* Card 1 — Table of Contents */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-[#1A202C] to-primary px-6 py-4">
                                <h3 className="text-sm font-black text-white uppercase tracking-widest">
                                    Table of Contents
                                </h3>
                            </div>
                            <div className="p-5">
                                {post.table_of_contents ? (
                                    <ol className="space-y-3">
                                        {post.table_of_contents.split('\n').filter(l => l.trim()).map((item, i) => (
                                            <li key={i} className="flex items-start gap-3">
                                                <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-black flex items-center justify-center mt-0.5">
                                                    {i + 1}
                                                </span>
                                                <span className="text-sm text-gray-700 font-medium leading-snug">
                                                    {item.replace(/^\d+[\.\)]\s*/, '')}
                                                </span>
                                            </li>
                                        ))}
                                    </ol>
                                ) : (
                                    <p className="text-sm text-gray-400 italic">No table of contents available.</p>
                                )}
                            </div>
                        </div>

                        {/* Card 2 — More Articles */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-[#1A202C] to-primary px-6 py-4">
                                <h3 className="text-sm font-black text-white uppercase tracking-widest">
                                    More Articles
                                </h3>
                            </div>
                            <div className="p-5 flex flex-col gap-4">
                                {relatedPosts.length > 0 ? relatedPosts.map((rp) => (
                                    <Link
                                        key={rp.id}
                                        href={`/blog/${rp.slug}`}
                                        className="group flex items-start gap-3"
                                    >
                                        {isValidImageUrl(rp.featured_image) && (
                                            <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0">
                                                <Image
                                                    src={rp.featured_image!}
                                                    alt={rp.title}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                    unoptimized={rp.featured_image?.startsWith('data:')}
                                                />
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-bold text-gray-800 group-hover:text-primary transition-colors line-clamp-2 leading-snug">
                                                {rp.title}
                                            </p>
                                            <p className="text-xs text-gray-400 mt-1">
                                                {formatDate(rp.published_at || rp.created_at)}
                                            </p>
                                        </div>
                                    </Link>
                                )) : (
                                    <p className="text-sm text-gray-400 italic">No other articles yet.</p>
                                )}
                                <Link
                                    href="/blog"
                                    className="mt-2 w-full text-center text-xs font-bold text-primary border border-primary/30 hover:bg-primary hover:text-white rounded-xl py-2.5 transition-colors"
                                >
                                    View All Blogs →
                                </Link>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>
            {/* ── END CONTENT ──────────────────────────────────────────────── */}

        </main>
    );
}
