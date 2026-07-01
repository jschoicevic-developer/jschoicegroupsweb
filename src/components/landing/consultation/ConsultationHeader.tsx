"use client";

import Image from "next/image";
import { Phone } from "lucide-react";

export default function ConsultationHeader() {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Image
              src="/JCGLogo.png"
              alt="JS Choice Group"
              width={140}
              height={48}
              priority
            />
          </div>

          {/* Phone CTA only */}
          <a
            href="tel:1300572464"
            className="flex items-center gap-2 bg-primary text-[#1A202C] px-4 lg:px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-md hover:shadow-lg transition-all duration-300"
          >
            <Phone size={14} />
            <span>1300 572 464</span>
          </a>
        </div>
      </div>
    </header>
  );
}
