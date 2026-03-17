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
        <main className="flex flex-col min-h-screen w-full overflow-x-hidden bg-gray-50">
            {/* Hero Section with Featured Image */}
            <div className="relative h-[400px] md:h-[500px] w-full overflow-hidden bg-gradient-to-br from-primary/10 to-secondary/10">
                <div className="absolute inset-0">
                    {isValidImageUrl(post.featured_image) && (
                        <Image quality={80}
                            src={post.featured_image!}
                            alt={post.title}
                            fill
                            className="object-cover"
                            priority
                            unoptimized={post.featured_image?.startsWith('data:')}
                        />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent" />
                </div>

                {/* Breadcrumb */}
                <div className="absolute top-8 left-0 right-0 z-10">
                    <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8">
                        <nav className="flex items-center gap-2 text-sm text-white/90 font-medium">
                            <Link href="/" className="hover:text-white transition-colors">Home</Link>
                            <ChevronRight size={14} />
                            <Link href="/blog" className="hover:text-white transition-colors">Blog</Link>
                            <ChevronRight size={14} />
                            <span className="text-white/70">Article</span>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-5xl mx-auto px-4 md:px-6 lg:px-8 -mt-32 relative z-10 pb-20">
                <article className="bg-white rounded-[2rem] shadow-2xl overflow-hidden">
                    {/* Article Header */}
                    <div className="p-8 md:p-12 lg:p-16 border-b border-gray-100">
                        {/* Meta Information */}
                        <div className="flex flex-wrap items-center gap-4 mb-6 text-sm font-semibold text-gray-500 uppercase tracking-wider">
                            <div className="flex items-center gap-2">
                                <Calendar size={16} className="text-primary" />
                                {formatDate(post.published_at || post.created_at)}
                            </div>
                            <div className="flex items-center gap-2">
                                <User size={16} className="text-primary" />
                                {post.author_name}
                            </div>
                            <Link href="#" className="text-secondary hover:underline">
                                Leave a comment
                            </Link>
                        </div>

                        {/* Title */}
                        <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-[#2D3748] leading-tight mb-6">
                            {post.title}
                        </h1>

                        {/* Tags */}
                        <div className="flex flex-wrap items-center gap-2">
                            {post.tags.map((tag, index) => (
                                <Link
                                    key={index}
                                    href={`/blog?tag=${encodeURIComponent(tag)}`}
                                    className="inline-flex items-center gap-1.5 px-4 py-2 bg-primary/5 text-primary rounded-full text-sm font-bold hover:bg-primary hover:text-white transition-colors"
                                >
                                    <Tag size={14} />
                                    {tag}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Description Section */}
                    {post.description && (
                        <div className="px-8 md:px-12 lg:px-16 pt-10 pb-2">
                            <div className="bg-primary/5 border-l-4 border-primary rounded-r-2xl p-6">
                                <h2 className="text-sm font-black text-primary uppercase tracking-widest mb-3">Overview</h2>
                                <p className="text-gray-700 text-lg leading-relaxed">{post.description}</p>
                            </div>
                        </div>
                    )}

                    {/* Table of Contents */}
                    {post.table_of_contents && (
                        <div className="px-8 md:px-12 lg:px-16 pt-8 pb-2">
                            <div className="bg-gray-50 border border-gray-200 rounded-2xl p-6">
                                <h2 className="text-sm font-black text-gray-700 uppercase tracking-widest mb-4">Table of Contents</h2>
                                <ol className="space-y-2">
                                    {post.table_of_contents.split('\n').filter(line => line.trim()).map((item, index) => (
                                        <li key={index} className="flex items-start gap-3 text-gray-700">
                                            <span className="flex-shrink-0 w-6 h-6 bg-primary/10 text-primary rounded-full text-xs font-black flex items-center justify-center mt-0.5">
                                                {index + 1}
                                            </span>
                                            <span className="font-medium leading-relaxed">{item.replace(/^\d+[\.\)]\s*/, '')}</span>
                                        </li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    )}

                    {/* Article Content */}
                    <div className="p-8 md:p-12 lg:p-16">
                        <div
                            className="prose prose-lg max-w-none
                                prose-headings:font-black prose-headings:text-[#2D3748] prose-headings:tracking-tight
                                prose-h2:text-3xl prose-h2:mt-12 prose-h2:mb-6
                                prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-4
                                prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                                prose-a:text-primary prose-a:font-semibold prose-a:no-underline hover:prose-a:underline
                                prose-ul:my-6 prose-ul:list-disc prose-ul:pl-6
                                prose-li:text-gray-700 prose-li:mb-2
                                prose-strong:text-gray-900 prose-strong:font-bold"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />
                    </div>

                    {/* Article Footer */}
                    <div className="p-8 md:p-12 lg:p-16 bg-gray-50 border-t border-gray-100">
                        <div className="flex items-center justify-between">
                            <Link
                                href="/blog"
                                className="inline-flex items-center gap-2 text-primary font-bold hover:gap-4 transition-all"
                            >
                                <ChevronLeft size={20} />
                                Back to Blog
                            </Link>
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 font-medium">Share:</span>
                                {/* Add social share buttons here */}
                            </div>
                        </div>
                    </div>
                </article>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div className="mt-16">
                        <h2 className="text-3xl font-black text-[#2D3748] mb-8">Related Posts</h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedPosts.map((relatedPost) => (
                                <Link
                                    key={relatedPost.id}
                                    href={`/blog/${relatedPost.slug}`}
                                    className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                                >
                                    <div className="relative h-48 overflow-hidden">
                                        {isValidImageUrl(relatedPost.featured_image) && (
                                            <Image quality={80}
                                                src={relatedPost.featured_image!}
                                                alt={relatedPost.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        )}
                                    </div>
                                    <div className="p-6">
                                        <h3 className="font-bold text-gray-900 group-hover:text-primary transition-colors line-clamp-2 mb-2">
                                            {relatedPost.title}
                                        </h3>
                                        <p className="text-sm text-gray-500">{formatDate(relatedPost.published_at || relatedPost.created_at)}</p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
