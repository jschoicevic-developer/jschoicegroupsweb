'use client';

import { useState, useEffect } from 'react';
import { ChevronDown, BookOpen } from 'lucide-react';

interface TocItem {
    id: string;
    text: string;
    level: 2 | 3;
}

function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim();
}

export default function BlogTableOfContents({
    articleSelector = '.blog-article-body',
}: {
    articleSelector?: string;
}) {
    const [open, setOpen] = useState(false);
    const [activeId, setActiveId] = useState<string>('');
    const [tocItems, setTocItems] = useState<TocItem[]>([]);

    // Extract headings from article body and assign IDs
    useEffect(() => {
        const container = document.querySelector(articleSelector);
        if (!container) return;

        const headings = Array.from(container.querySelectorAll('h2, h3'));
        const seen = new Map<string, number>();

        const items: TocItem[] = headings.map((heading) => {
            const text = heading.textContent?.trim() || '';
            const base = slugify(text) || 'section';
            const count = seen.get(base) ?? 0;
            seen.set(base, count + 1);
            const id = count === 0 ? base : `${base}-${count}`;

            heading.id = id;

            return {
                id,
                text,
                level: heading.tagName === 'H2' ? 2 : 3,
            };
        });

        setTocItems(items);
    }, [articleSelector]);

    // Highlight active heading on scroll
    useEffect(() => {
        if (!tocItems.length) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) setActiveId(entry.target.id);
                });
            },
            { rootMargin: '-80px 0px -60% 0px', threshold: 0 }
        );

        tocItems.forEach(({ id }) => {
            const el = document.getElementById(id);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, [tocItems]);

    const scrollTo = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
        e.preventDefault();
        const target = document.getElementById(id);
        if (target) {
            // Use native scrollIntoView, which works flawlessly and respects custom scroll margins
            target.style.scrollMarginTop = '200px'; 
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setOpen(false);
            // Update URL to correctly link
            window.history.pushState(null, '', `#${id}`);
        }
    };

    if (!tocItems.length) return null;

    return (
        <div className="border border-primary rounded-xl overflow-hidden bg-white">
            <button
                onClick={() => setOpen((o) => !o)}
                className="w-full flex items-center justify-between gap-3 px-5 py-4 text-left bg-primary"
                aria-expanded={open}
            >
                <div className="flex items-center gap-2">
                    <BookOpen size={16} className="text-[#1A202C]" />
                    <span className="text-sm font-bold text-[#1A202C] uppercase tracking-wide">
                        In this article
                    </span>
                </div>
                <ChevronDown
                    size={16}
                    className={`text-[#1A202C] transition-transform duration-200 ${open ? 'rotate-180' : ''}`}
                />
            </button>

            <div className={`border-t border-gray-200 ${open ? 'block' : 'hidden'}`}>
                <ol className="px-5 py-4 space-y-1">
                    {tocItems.map((item) => (
                        <li key={item.id} className={item.level === 3 ? 'ml-4' : ''}>
                            <a
                                href={`#${item.id}`}
                                onClick={(e) => scrollTo(e, item.id)}
                                className={`flex items-start gap-2 py-1 text-sm leading-snug transition-colors ${
                                    activeId === item.id
                                        ? 'text-primary font-semibold'
                                        : 'text-gray-600 hover:text-primary'
                                }`}
                            >
                                <span
                                    className={`mt-1.5 shrink-0 rounded-full transition-colors ${
                                        activeId === item.id ? 'bg-primary' : 'bg-gray-300'
                                    }`}
                                    style={{ width: 6, height: 6 }}
                                />
                                {item.text}
                            </a>
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    );
}
