'use client';

import { useState } from 'react';
import { Mail, ArrowRight, Check } from 'lucide-react';

export default function BlogNewsletterCta() {
    const [email, setEmail] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;
        setLoading(true);
        // Simulate submission — wire up to your email provider
        await new Promise((r) => setTimeout(r, 800));
        setSubmitted(true);
        setLoading(false);
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
            <div className="flex items-center gap-2 mb-1">
                <Mail size={16} className="text-[#185FA5]" />
                <p className="text-sm font-bold text-gray-800">Get SDA news in your inbox</p>
            </div>
            <p className="text-xs text-gray-500 mb-4 leading-relaxed">
                Stay up to date with the latest NDIS & SDA updates, guides, and funding news.
            </p>

            {submitted ? (
                <div className="flex items-center gap-2 text-green-600 text-sm font-semibold bg-green-50 rounded-lg px-4 py-3">
                    <Check size={16} />
                    You're subscribed!
                </div>
            ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-2">
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="your@email.com"
                        required
                        className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#185FA5]/30 focus:border-[#185FA5] transition"
                    />
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-2 bg-[#185FA5] hover:bg-[#145089] text-white text-sm font-semibold rounded-lg px-4 py-2.5 transition-colors disabled:opacity-60"
                    >
                        {loading ? 'Subscribing…' : (
                            <>Subscribe free <ArrowRight size={14} /></>
                        )}
                    </button>
                </form>
            )}
        </div>
    );
}
