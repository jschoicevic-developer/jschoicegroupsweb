'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FaqItem {
    question: string;
    answer: string;
}

interface BlogFaqAccordionProps {
    items: FaqItem[];
}

export default function BlogFaqAccordion({ items }: BlogFaqAccordionProps) {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

    return (
        <section className="mt-12">
            <h2 className="text-2xl font-black text-[#2D3748] tracking-tight mb-6">
                Frequently asked questions
            </h2>
            <div className="flex flex-col divide-y divide-gray-200 border border-gray-200 rounded-xl overflow-hidden">
                {items.map((faq, i) => {
                    const isOpen = openIndex === i;
                    return (
                        <div key={i}>
                            <button
                                onClick={() => toggle(i)}
                                className={`w-full flex items-center justify-between gap-4 px-6 py-5 text-left transition-colors ${isOpen ? 'bg-primary' : 'bg-white'}`}
                                aria-expanded={isOpen}
                            >
                                <span className={`text-sm font-semibold leading-snug ${isOpen ? 'text-[#1A202C]' : 'text-gray-800'}`}>
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    size={18}
                                    className={`shrink-0 transition-transform duration-200 ${isOpen ? 'rotate-180 text-[#1A202C]' : 'text-gray-400'}`}
                                />
                            </button>
                            {isOpen && (
                                <div className="px-6 py-5 bg-white">
                                    <p className="text-sm text-gray-600 leading-relaxed border-l-2 border-primary pl-4">
                                        {faq.answer}
                                    </p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
