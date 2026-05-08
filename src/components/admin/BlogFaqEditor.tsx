'use client';

import { ChevronDown, ChevronUp, Plus, Trash2, HelpCircle } from 'lucide-react';

export interface FaqItem {
    question: string;
    answer: string;
}

interface BlogFaqEditorProps {
    value: FaqItem[];
    onChange: (faqs: FaqItem[]) => void;
}

export default function BlogFaqEditor({ value, onChange }: BlogFaqEditorProps) {
    const list = Array.isArray(value) ? value : [];

    const addFaq = () => onChange([...list, { question: '', answer: '' }]);
    const removeFaq = (i: number) => onChange(list.filter((_, idx) => idx !== i));
    const updateFaq = (i: number, field: keyof FaqItem, val: string) => {
        onChange(list.map((f, idx) => (idx === i ? { ...f, [field]: val } : f)));
    };
    const moveFaq = (i: number, dir: -1 | 1) => {
        const j = i + dir;
        if (j < 0 || j >= list.length) return;
        const next = [...list];
        [next[i], next[j]] = [next[j], next[i]];
        onChange(next);
    };

    return (
        <div className="space-y-3">
            {list.length === 0 && (
                <div className="flex items-center gap-3 px-4 py-5 bg-gray-50 border border-dashed border-gray-200 rounded-2xl text-sm text-gray-500">
                    <HelpCircle size={16} className="text-gray-400 shrink-0" />
                    <span>No FAQs yet. Add common questions readers might have — they appear at the end of the blog post.</span>
                </div>
            )}

            {list.map((faq, i) => (
                <div
                    key={i}
                    className="bg-white border border-gray-200 rounded-2xl p-4 space-y-3 hover:border-gray-300 transition-colors"
                >
                    <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                            FAQ #{i + 1}
                        </span>
                        <div className="flex items-center gap-1">
                            <button
                                type="button"
                                onClick={() => moveFaq(i, -1)}
                                disabled={i === 0}
                                title="Move up"
                                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                            >
                                <ChevronUp size={14} />
                            </button>
                            <button
                                type="button"
                                onClick={() => moveFaq(i, 1)}
                                disabled={i === list.length - 1}
                                title="Move down"
                                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
                            >
                                <ChevronDown size={14} />
                            </button>
                            <button
                                type="button"
                                onClick={() => removeFaq(i)}
                                title="Remove FAQ"
                                className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                            >
                                <Trash2 size={14} />
                            </button>
                        </div>
                    </div>

                    <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateFaq(i, 'question', e.target.value)}
                        placeholder="Question"
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
                    />

                    <textarea
                        value={faq.answer}
                        onChange={(e) => updateFaq(i, 'answer', e.target.value)}
                        placeholder="Answer"
                        rows={3}
                        className="w-full px-3 py-2.5 border border-gray-200 rounded-xl text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary resize-none"
                    />
                </div>
            ))}

            <button
                type="button"
                onClick={addFaq}
                className="w-full py-3 border-2 border-dashed border-gray-200 rounded-2xl text-sm font-bold text-gray-500 hover:border-primary hover:text-primary hover:bg-primary/5 transition-colors flex items-center justify-center gap-2"
            >
                <Plus size={16} />
                Add FAQ
            </button>
        </div>
    );
}
