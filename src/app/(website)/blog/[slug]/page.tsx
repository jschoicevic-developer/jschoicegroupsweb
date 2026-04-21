import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, User, Tag, ChevronLeft, ChevronRight, Phone, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import TableOfContents from '@/components/blog/TableOfContents';
import BlogContent from '@/components/blog/BlogContent';

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

/* ── Inject IDs into h2/h3/h4 headings and collect them for ToC ── */
function processContent(html: string): {
    html: string;
    headings: { id: string; text: string; level: number }[];
} {
    const headings: { id: string; text: string; level: number }[] = [];
    const slugCount: Record<string, number> = {};

    const processed = html.replace(
        /<(h[2-4])([^>]*)>([\s\S]*?)<\/\1>/gi,
        (_, tag: string, attrs: string, inner: string) => {
            // Skip if the author already put an id on this heading
            if (/\bid\s*=/.test(attrs)) {
                const existingId = attrs.match(/id\s*=\s*["']([^"']+)["']/)?.[1];
                if (existingId) {
                    const text = inner.replace(/<[^>]+>/g, '').trim();
                    headings.push({ id: existingId, text, level: parseInt(tag[1]) });
                }
                return `<${tag}${attrs}>${inner}</${tag}>`;
            }

            const text = inner.replace(/<[^>]+>/g, '').trim();
            if (!text) return `<${tag}${attrs}>${inner}</${tag}>`;

            const base =
                text
                    .toLowerCase()
                    .replace(/[^\w\s-]/g, '')
                    .replace(/\s+/g, '-')
                    .replace(/-+/g, '-')
                    .replace(/^-+|-+$/g, '')
                    .slice(0, 60) || `section-${headings.length + 1}`;

            const n = (slugCount[base] = (slugCount[base] || 0) + 1);
            const id = n === 1 ? base : `${base}-${n}`;

            headings.push({ id, text, level: parseInt(tag[1]) });
            return `<${tag}${attrs} id="${id}">${inner}</${tag}>`;
        }
    );

    return { html: processed, headings };
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

        const response = await fetch(`${baseUrl}/api/blog?limit=4&status=published`, {
            cache: 'no-store',
        });
        if (!response.ok) return [];

        const data = await response.json();
        return data.success
            ? data.data.filter((p: BlogPost) => p.slug !== currentSlug).slice(0, 3)
            : [];
    } catch {
        return [];
    }
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
    const { slug } = await params;
    const post = await getBlogPost(slug);
    if (!post) return { title: 'Blog Post Not Found' };
    return {
        title: `${post.title} | JS Choice Group`,
        description: post.excerpt,
    };
}

const isValidImageUrl = (url: string | null): boolean => {
    if (!url || !url.trim()) return false;
    if (url.startsWith('/')) return true;
    try {
        const u = new URL(url);
        return u.protocol === 'http:' || u.protocol === 'https:';
    } catch {
        return false;
    }
};

export default async function BlogPostPage({ params, searchParams }: BlogPostPageProps) {
    const { slug } = await params;
    const { preview } = await searchParams;
    const isPreview = preview === 'true';

    const post = await getBlogPost(slug, isPreview);
    if (!post) notFound();

    const relatedPosts = await getRelatedPosts(slug);

    const { html: processedContent, headings } = processContent(post.content);

    const formatDate = (d: string) =>
        new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

    return (
        <main className="flex flex-col min-h-screen w-full bg-gray-50">

            {/* ── HERO ──────────────────────────────────────────────────────── */}
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

            {/* ── TWO-COLUMN CONTENT ────────────────────────────────────────── */}
            <div className="max-w-7xl mx-auto w-full px-4 md:px-6 lg:px-8 py-10 pb-24">
                <div className="flex flex-col lg:flex-row gap-8 items-start">

                    {/* ── LEFT: article column ──────────────────────────────── */}
                    <div className="flex-1 min-w-0 space-y-6">

                        {/* 1. Overview */}
                        {post.description && (
                            <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                                <div className="px-6 py-3 bg-primary/10 border-b border-primary/20">
                                    <p className="text-xs font-black text-primary uppercase tracking-widest">Overview</p>
                                </div>
                                <div className="px-6 py-5 border-l-4 border-primary">
                                    <p className="text-gray-700 text-base md:text-lg leading-relaxed">
                                        {post.description}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* 2. Table of Contents (expandable, linked) */}
                        <TableOfContents headings={headings} />

                        {/* 3. Featured image + caption */}
                        {isValidImageUrl(post.featured_image) && (
                            <figure className="bg-white rounded-2xl shadow-md overflow-hidden m-0">
                                <div className="relative w-full aspect-[16/9]">
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
                                <figcaption className="px-6 py-3 text-sm text-gray-500 text-center italic bg-gray-50 border-t border-gray-100">
                                    {post.title}
                                </figcaption>
                            </figure>
                        )}

                        {/* 4. Article body */}
                        <div className="bg-white rounded-2xl shadow-md p-8 md:p-12">
                            <BlogContent
                                html={processedContent}
                                className="blog-content prose prose-lg max-w-none
                                    [&_h2]:scroll-mt-28 [&_h3]:scroll-mt-28 [&_h4]:scroll-mt-28
                                    prose-headings:font-black prose-headings:text-[#2D3748] prose-headings:tracking-tight
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
                                    prose-img:rounded-2xl prose-img:shadow-lg prose-img:my-8 prose-img:mx-auto
                                    prose-table:border-collapse prose-table:w-full
                                    prose-th:bg-gray-100 prose-th:text-gray-700 prose-th:font-bold prose-th:px-4 prose-th:py-3 prose-th:text-left prose-th:border prose-th:border-gray-200
                                    prose-td:px-4 prose-td:py-3 prose-td:border prose-td:border-gray-200 prose-td:text-gray-700
                                    prose-hr:border-gray-200 prose-hr:my-10
                                    prose-video:rounded-2xl prose-video:w-full prose-video:shadow-lg prose-video:my-8"
                            />
                        </div>

                        {/* Back to blog */}
                        <div className="pt-2 pb-6">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all duration-200"
                            >
                                <ChevronLeft size={20} />
                                Back to Blog
                            </Link>
                        </div>
                    </div>
                    {/* ── END LEFT ──────────────────────────────────────────── */}

                    {/* ── RIGHT: sticky sidebar ─────────────────────────────── */}
                    <aside className="w-full lg:w-[300px] xl:w-[320px] shrink-0 flex flex-col gap-6 lg:sticky lg:top-28 lg:self-start">

                        {/* CTA Card */}
                        <div className="bg-gradient-to-br from-[#1A202C] to-[#2D3748] rounded-2xl shadow-xl overflow-hidden">
                            <div className="p-6">
                                <span className="inline-block mb-3 px-3 py-1 rounded-full bg-primary/30 border border-primary/40 text-primary text-[10px] font-black uppercase tracking-widest">
                                    NDIS Support
                                </span>
                                <h3 className="text-lg font-black text-white leading-snug mb-3">
                                    Need Help Navigating the NDIS?
                                </h3>
                                <p className="text-white/65 text-sm font-medium leading-relaxed mb-6">
                                    Our experienced team is ready to help you access the right supports and live independently.
                                </p>
                                <div className="space-y-3">
                                    <a
                                        href="tel:1300572464"
                                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-primary rounded-xl text-[#1A202C] font-black text-sm hover:brightness-110 transition-all"
                                    >
                                        <Phone size={15} />
                                        1300 572 464
                                    </a>
                                    <Link
                                        href="/contact-us"
                                        className="flex items-center justify-center gap-2 w-full px-4 py-3 border border-white/20 rounded-xl text-white font-bold text-sm hover:bg-white/10 transition-all"
                                    >
                                        Get in Touch
                                        <ArrowRight size={14} />
                                    </Link>
                                    <Link
                                        href="/consultations"
                                        className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white/75 font-semibold text-sm hover:bg-white/10 transition-all"
                                    >
                                        Book a Consultation
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* More Articles */}
                        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
                            <div className="bg-gradient-to-r from-[#1A202C] to-primary px-6 py-4">
                                <h3 className="text-sm font-black text-white uppercase tracking-widest">
                                    More Articles
                                </h3>
                            </div>
                            <div className="p-5 flex flex-col gap-4">
                                {relatedPosts.length > 0 ? (
                                    relatedPosts.map((rp) => (
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
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-400 italic">No other articles yet.</p>
                                )}
                                <Link
                                    href="/blog"
                                    className="mt-1 w-full text-center text-xs font-bold text-primary border border-primary/30 hover:bg-primary hover:text-white rounded-xl py-2.5 transition-colors"
                                >
                                    View All Blogs →
                                </Link>
                            </div>
                        </div>

                    </aside>
                    {/* ── END RIGHT ─────────────────────────────────────────── */}

                </div>
            </div>
            {/* ── END CONTENT ───────────────────────────────────────────────── */}

        </main>
    );
}
