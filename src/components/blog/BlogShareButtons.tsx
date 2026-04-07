'use client';

import { useState } from 'react';
import { Linkedin, Facebook, Link2, Check } from 'lucide-react';

export default function BlogShareButtons() {
    const [copied, setCopied] = useState(false);

    const share = (platform: 'linkedin' | 'facebook') => {
        const url = encodeURIComponent(window.location.href);
        const title = encodeURIComponent(document.title);
        const urls = {
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}`,
        };
        window.open(urls[platform], '_blank', 'width=600,height=400');
    };

    const copyLink = async () => {
        try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback for older browsers
        }
    };

    return (
        <div className="bg-white border border-gray-200 rounded-xl p-5">
            <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">
                Share this post
            </p>
            <div className="flex flex-col gap-2.5">
                <button
                    onClick={() => share('linkedin')}
                    className="flex justify-center items-center gap-2 w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:border-[#0A66C2] hover:text-[#0A66C2] hover:bg-[#0A66C2]/5 transition-colors"
                    title="Share on LinkedIn"
                >
                    <Linkedin size={16} />
                    <span>Share on LinkedIn</span>
                </button>
                <button
                    onClick={() => share('facebook')}
                    className="flex justify-center items-center gap-2 w-full px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-gray-600 hover:border-[#1877F2] hover:text-[#1877F2] hover:bg-[#1877F2]/5 transition-colors"
                    title="Share on Facebook"
                >
                    <Facebook size={16} />
                    <span>Share on Facebook</span>
                </button>
                <button
                    onClick={copyLink}
                    className={`flex justify-center items-center gap-2 w-full px-4 py-2.5 rounded-lg border text-sm font-semibold transition-colors ${
                        copied
                            ? 'border-green-400 text-green-600 bg-green-50'
                            : 'border-gray-200 text-gray-600 hover:border-[#7b2d8e] hover:text-[#7b2d8e] hover:bg-[#7b2d8e]/5'
                    }`}
                    title="Copy link"
                >
                    {copied ? <Check size={16} /> : <Link2 size={16} />}
                    <span>{copied ? 'Link Copied!' : 'Copy Link'}</span>
                </button>
            </div>
        </div>
    );
}
