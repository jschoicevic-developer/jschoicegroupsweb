"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Phone, RotateCcw, Home } from "lucide-react";

export default function WebsiteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    const msg = error?.message ?? "";
    const isChunkError =
      msg.includes("ChunkLoadError") ||
      msg.includes("Loading chunk") ||
      msg.includes("Loading CSS chunk") ||
      msg.includes("Failed to fetch dynamically imported module") ||
      msg.includes("Importing a module script failed");

    if (isChunkError) {
      window.location.reload();
    }
  }, [error]);

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-4 py-16 bg-[#F7FAFC]">
      <div className="max-w-lg w-full bg-white rounded-[2rem] shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] p-8 sm:p-12 text-center">
        <h1 className="text-2xl sm:text-3xl font-black text-[#2D3748] uppercase tracking-tight mb-3">
          Something went wrong
        </h1>
        <p className="text-base text-gray-600 leading-relaxed mb-8">
          We hit a temporary issue loading this page. Please try again — if it
          keeps happening, give us a call.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-[#ABB3F1] hover:bg-[#9CA5E5] text-[#1A202C] font-bold text-sm uppercase tracking-wider transition-colors"
          >
            <RotateCcw size={16} />
            Try again
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 h-12 px-6 rounded-full bg-white border border-gray-200 hover:bg-gray-50 text-[#2D3748] font-bold text-sm uppercase tracking-wider transition-colors"
          >
            <Home size={16} />
            Go home
          </Link>
        </div>

        <a
          href="tel:1300572464"
          className="inline-flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-[#5A67D8] transition-colors"
        >
          <Phone size={14} />
          1300 572 464
        </a>
      </div>
    </section>
  );
}
