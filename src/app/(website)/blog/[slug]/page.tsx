import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Tag, ChevronLeft, ChevronRight, Clock, FileDown, ExternalLink } from 'lucide-react';
import type { Metadata } from 'next';

import BlogTableOfContents from '@/components/blog/BlogTableOfContents';
import BlogFaqAccordion from '@/components/blog/BlogFaqAccordion';
import BlogShareButtons from '@/components/blog/BlogShareButtons';
import BlogNewsletterCta from '@/components/blog/BlogNewsletterCta';

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
    params: Promise<{ slug: string }>;
    searchParams: Promise<{ preview?: string }>;
}

async function getBlogPost(slug: string, isPreview = false): Promise<BlogPost | null> {
    try {
        const baseUrl =
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:3000'
                : process.env.NEXT_PUBLIC_SITE_URL || 'https://jschoice-website.vercel.app';

        const url = new URL(`${baseUrl}/api/blog/${slug}`);
        if (isPreview) url.searchParams.append('admin', 'true');

        const response = await fetch(url.toString(), { cache: 'no-store' });
        if (!response.ok) return null;
        const data = await response.json();
        return data.success ? data.data : null;
    } catch {
        return null;
    }
}

async function getRelatedPosts(currentSlug: string): Promise<BlogPost[]> {
    try {
        const baseUrl =
            process.env.NODE_ENV === 'development'
                ? 'http://localhost:3000'
                : process.env.NEXT_PUBLIC_SITE_URL || 'https://jschoice-website.vercel.app';

        const response = await fetch(`${baseUrl}/api/blog?limit=4&status=published`, { cache: 'no-store' });
        if (!response.ok) return [];
        const data = await response.json();
        if (data.success) {
            return data.data.filter((p: BlogPost) => p.slug !== currentSlug).slice(0, 3);
        }
        return [];
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPost(slug);
    if (!post) return { title: 'Blog Post Not Found' };

    const canonicalUrl = `https://jschoicegroup.com.au/blog/${slug}`;
    const ogImage = post.featured_image && !post.featured_image.startsWith('data:') && post.featured_image.trim()
        ? [{ url: post.featured_image, alt: post.title }]
        : [{ url: 'https://jschoicegroup.com.au/JCGLogo.png', alt: 'JS Choice Group' }];

    return {
        title: `${post.title} | JS Choice Group`,
        description: post.excerpt,
        alternates: {
            canonical: canonicalUrl,
        },
        openGraph: {
            title: post.title,
            description: post.excerpt,
            url: canonicalUrl,
            type: 'article',
            publishedTime: post.published_at || post.created_at,
            authors: [post.author_name],
            siteName: 'JS Choice Group',
            images: ogImage,
        },
        twitter: {
            card: 'summary_large_image',
            title: post.title,
            description: post.excerpt,
            images: ogImage.map(img => img.url),
        },
    };
}

const isValidImageUrl = (url: string | null): boolean => {
    if (!url || url.trim() === '') return false;
    if (url.startsWith('/')) return true;
    try {
        const u = new URL(url);
        return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
        return false;
    }
};

const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

const calcReadTime = (html: string) => {
    const words = html.replace(/<[^>]+>/g, '').split(/\s+/).filter(Boolean).length;
    return Math.max(1, Math.round(words / 200));
};

const authorInitials = (name: string) =>
    name
        .split(' ')
        .map((n) => n[0])
        .slice(0, 2)
        .join('')
        .toUpperCase();

// Static FAQ placeholder — replace with dynamic data when available
const PLACEHOLDER_FAQS = [
    {
        question: 'What is Specialist Disability Accommodation (SDA)?',
        answer:
            'SDA is a type of NDIS funding for people with extreme functional impairment or very high support needs. It covers the cost of purpose-built or modified housing that enables participants to live more independently.',
    },
    {
        question: 'Am I eligible for SDA funding through the NDIS?',
        answer:
            'To be eligible for SDA, you must be an NDIS participant with extreme functional impairment or very high support needs, and the NDIA must determine that SDA funding is reasonable and necessary for you.',
    },
    {
        question: 'How long does the SDA application process take?',
        answer:
            'The process varies, but typically takes 3–6 months from gathering supporting evidence to receiving an SDA decision in your NDIS plan. JS Choice can help guide you through each step.',
    },
    {
        question: 'What support does JS Choice Group offer?',
        answer:
            'JS Choice Group provides a range of NDIS support services including SDA housing, daily life assistance, community participation, support coordination, allied health referrals, and more across Victoria.',
    },
];

export default async function BlogPostPage({ params, searchParams }: BlogPostPageProps) {
    const { slug } = await params;
    const { preview } = await searchParams;
    const isPreview = preview === 'true';

    const post = await getBlogPost(slug, isPreview);
    if (!post) notFound();

    const relatedPosts = await getRelatedPosts(slug);
    const readTime = calcReadTime(post.content);

    return (
            <main className="flex flex-col min-h-screen w-full bg-gray-50">

                {/* ── HERO — keep exactly as-is ─────────────────────────────────── */}
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

                        {/* Meta */}
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
                            <div className="flex items-center gap-2 text-white/75 text-sm font-medium">
                                <span className="w-7 h-7 rounded-full bg-primary/30 flex items-center justify-center">
                                    <Clock size={14} className="text-primary" />
                                </span>
                                {readTime} min read
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
                {/* ── END HERO ──────────────────────────────────────────────────── */}

                {/* ── CONTENT — two-column: article + sticky sidebar ────────────── */}
                <div className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 py-10 pb-24">
                    <div className="flex flex-col lg:flex-row gap-8">

                        {/* ══════════════════════════════════════════════════════════
                        LEFT COLUMN — Article
                    ══════════════════════════════════════════════════════════ */}
                        <article className="flex-1 min-w-0">

                            {/* ── 1. Featured Image ──────────────────────────────── */}
                            {isValidImageUrl(post.featured_image) && (
                                <div className="mb-6">
                                    <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden shadow-md">
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
                                    <p className="text-xs text-center text-gray-400 italic mt-2">
                                        {post.title}
                                    </p>
                                </div>
                            )}

                            {/* ── 2. Overview ────────────────────────────────────── */}
                            {post.description && (
                                <div className="mb-6 bg-[#185FA5]/5 border-l-4 border-[#185FA5] rounded-r-xl p-5">
                                    <p className="text-xs font-black text-[#185FA5] uppercase tracking-widest mb-1.5">Overview</p>
                                    <p className="text-gray-700 text-base leading-relaxed">{post.description}</p>
                                </div>
                            )}

                            {/* ── 3. Table of Contents ───────────────────────────── */}
                            <div className="mb-8">
                                <BlogTableOfContents />
                            </div>

                            {/* ── 4. Article Body ────────────────────────────────── */}
                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
                                <div className="p-6 md:p-10">
                                    <div
                                        className="blog-article-body blog-content prose prose-lg max-w-none
                                        prose-headings:font-black prose-headings:text-[#2D3748] prose-headings:tracking-tight prose-headings:font-dosis
                                        prose-h1:text-4xl prose-h1:mt-0 prose-h1:mb-8
                                        prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-5 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200 prose-h2:scroll-mt-48
                                        prose-h3:text-xl prose-h3:mt-7 prose-h3:mb-3 prose-h3:scroll-mt-48
                                        prose-h4:text-lg prose-h4:mt-5 prose-h4:mb-2
                                        prose-p:text-gray-700 prose-p:leading-[1.75] prose-p:mb-5 prose-p:text-[16px]
                                        prose-a:text-[#185FA5] prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                                        prose-ul:my-5 prose-ul:list-disc prose-ul:pl-6
                                        prose-ol:my-5 prose-ol:list-decimal prose-ol:pl-6
                                        prose-li:text-gray-700 prose-li:mb-2 prose-li:leading-relaxed
                                        prose-strong:text-gray-900 prose-strong:font-bold
                                        prose-em:text-gray-700
                                        prose-blockquote:border-l-4 prose-blockquote:border-[#185FA5] prose-blockquote:bg-[#185FA5]/5 prose-blockquote:rounded-r-xl prose-blockquote:py-1 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:text-gray-700
                                        prose-code:bg-gray-100 prose-code:text-[#185FA5] prose-code:rounded prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:font-mono prose-code:before:content-none prose-code:after:content-none
                                        prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:rounded-xl prose-pre:p-6 prose-pre:overflow-x-auto
                                        prose-img:rounded-xl prose-img:shadow-md prose-img:my-6
                                        prose-table:border-collapse prose-table:w-full
                                        prose-th:bg-gray-100 prose-th:text-gray-700 prose-th:font-bold prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:border prose-th:border-gray-200
                                        prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-gray-200 prose-td:text-gray-700
                                        prose-hr:border-gray-200 prose-hr:my-8"
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                    />
                                </div>

                                {/* Back to blog */}
                                <div className="px-6 md:px-10 py-6 bg-gray-50 border-t border-gray-100 rounded-b-xl">
                                    <Link
                                        href="/blog"
                                        className="inline-flex items-center gap-2 text-[#185FA5] font-bold hover:gap-3 transition-all text-sm"
                                    >
                                        <ChevronLeft size={18} />
                                        Back to Blog
                                    </Link>
                                </div>
                            </div>

                            {/* ── 5. FAQ Section ─────────────────────────────────── */}
                            <div className="mt-10">
                                <BlogFaqAccordion items={PLACEHOLDER_FAQS} />
                            </div>

                            {/* ── 6. Related Blog Posts ──────────────────────────── */}
                            {relatedPosts.length > 0 && (
                                <section className="mt-12">
                                    <h2 className="text-2xl font-black text-[#2D3748] tracking-tight mb-6">
                                        You may also like
                                    </h2>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                                        {relatedPosts.map((rp) => (
                                            <Link
                                                key={rp.id}
                                                href={`/blog/${rp.slug}`}
                                                className="group flex flex-col bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:border-[#185FA5]/30 transition-all duration-200"
                                            >
                                                {/* Thumbnail */}
                                                <div className="relative w-full aspect-[16/9] bg-gray-100">
                                                    {isValidImageUrl(rp.featured_image) ? (
                                                        <Image
                                                            src={rp.featured_image!}
                                                            alt={rp.title}
                                                            fill
                                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                                            unoptimized={rp.featured_image?.startsWith('data:')}
                                                        />
                                                    ) : (
                                                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#185FA5]/10 to-[#185FA5]/5">
                                                            <span className="text-4xl font-black text-[#185FA5]/20">JS</span>
                                                        </div>
                                                    )}
                                                </div>

                                                {/* Card body */}
                                                <div className="flex flex-col flex-1 p-4">
                                                    {rp.category && (
                                                        <span className="inline-block mb-2 px-2.5 py-0.5 rounded-full bg-[#185FA5]/10 text-[#185FA5] text-[10px] font-bold uppercase tracking-widest w-fit">
                                                            {rp.category}
                                                        </span>
                                                    )}
                                                    <p className="text-sm font-bold text-gray-800 group-hover:text-[#185FA5] transition-colors line-clamp-2 leading-snug mb-3">
                                                        {rp.title}
                                                    </p>
                                                    <div className="mt-auto flex items-center gap-3 text-xs text-gray-400">
                                                        <span>{formatDate(rp.published_at || rp.created_at)}</span>
                                                        <span>·</span>
                                                        <span>{calcReadTime(rp.content)} min read</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </section>
                            )}
                        </article>

                        {/* ══════════════════════════════════════════════════════════
                        RIGHT COLUMN — Sticky Sidebar
                    ══════════════════════════════════════════════════════════ */}
                        <aside className="w-full lg:w-[280px] shrink-0 flex flex-col gap-5 lg:sticky lg:top-24 self-start">

                            {/* ── 1. Primary CTA Card ────────────────────────────── */}
                            <div className="bg-primary rounded-xl p-5 text-[#1A202C]">
                                <h3 className="text-base font-black leading-snug mb-2">
                                    Ready to apply for SDA funding?
                                </h3>
                                <p className="text-xs text-[#1A202C]/80 leading-relaxed mb-4">
                                    Our NDIS specialists can help you understand eligibility, prepare your application, and find the right housing solution.
                                </p>
                                <Link
                                    href="/referral"
                                    className="flex items-center justify-center gap-2 w-full bg-white text-[#1A202C] font-bold text-sm rounded-lg px-4 py-2.5 hover:bg-gray-50 transition-colors mb-2"
                                >
                                    Book a free consultation
                                    <ExternalLink size={13} />
                                </Link>
                                <a
                                    href="/resources"
                                    className="flex items-center justify-center gap-2 w-full border border-[#1A202C]/30 text-[#1A202C] font-semibold text-sm rounded-lg px-4 py-2.5 hover:bg-[#1A202C]/10 transition-colors"
                                >
                                    <FileDown size={13} />
                                    Download our SDA guide (PDF)
                                </a>
                            </div>

                            {/* ── 3. Share Buttons ───────────────────────────────── */}
                            <BlogShareButtons />



                            {/* ── 5. Topic Tags ──────────────────────────────────── */}
                            {post.tags.length > 0 && (
                                <div className="bg-white border border-gray-200 rounded-xl p-5">
                                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">
                                        Topics
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag, i) => (
                                            <Link
                                                key={i}
                                                href={`/blog?tag=${encodeURIComponent(tag)}`}
                                                className="px-3 py-1 rounded-full border border-gray-200 text-xs font-semibold text-gray-600 hover:border-[#185FA5] hover:text-[#185FA5] hover:bg-[#185FA5]/5 transition-colors"
                                            >
                                                {tag}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* ── View All Posts ─────────────────────────────────── */}
                            <Link
                                href="/blog"
                                className="w-full text-center text-xs font-bold text-[#185FA5] border border-[#185FA5]/30 hover:bg-[#185FA5] hover:text-white rounded-xl py-3 transition-colors"
                            >
                                View all articles →
                            </Link>
                        </aside>
                        {/* ── END RIGHT ─────────────────────────────────────────── */}

                    </div>
                </div>
                {/* ── END CONTENT ───────────────────────────────────────────────── */}

            </main>
        );
    }
