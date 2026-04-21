'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface TocHeading {
    id: string;
    text: string;
    level: number;
}

export default function TableOfContents({ headings }: { headings: TocHeading[] }) {
    const [open, setOpen] = useState(true);

    if (!headings.length) return null;

    return (
        <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between px-6 py-4 bg-gradient-to-r from-[#1A202C] to-primary text-white hover:opacity-95 transition-opacity"
                aria-expanded={open}
            >
                <span className="text-sm font-black uppercase tracking-widest">Table of Contents</span>
                <ChevronDown
                    size={18}
                    className={`transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
                />
            </button>

            {open && (
                <nav className="p-5">
                    <ol className="space-y-2">
                        {headings.map((h, i) => (
                            <li
                                key={h.id}
                                style={{ paddingLeft: `${(h.level - 2) * 14}px` }}
                            >
                                <a
                                    href={`#${h.id}`}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        const el = document.getElementById(h.id);
                                        if (el) {
                                            const offset = 112;
                                            const top = el.getBoundingClientRect().top + window.scrollY - offset;
                                            window.scrollTo({ top, behavior: 'smooth' });
                                        }
                                    }}
                                    className="flex items-start gap-3 group"
                                >
                                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-black flex items-center justify-center mt-0.5">
                                        {i + 1}
                                    </span>
                                    <span className="text-sm text-gray-700 font-medium leading-snug group-hover:text-primary transition-colors">
                                        {h.text}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ol>
                </nav>
            )}
        </div>
    );
}
