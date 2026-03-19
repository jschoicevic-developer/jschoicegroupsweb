"use client";

import Image from "next/image";
import { Phone } from "lucide-react";

export default function LandingHeader() {
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

          {/* Right side: trust badge, phone, CTA */}
          <div className="flex items-center gap-3 lg:gap-4">
            {/* Registered NDIS Provider badge */}
            <span className="hidden sm:flex items-center gap-1.5 bg-accent text-sm font-semibold px-3 py-1.5 rounded-full text-gray-700">
              Registered NDIS Provider
            </span>

            {/* Phone */}
            <a
              href="tel:1300572464"
              className="hidden md:flex items-center gap-2 text-sm font-semibold text-gray-700 hover:text-primary transition-colors"
            >
              <Phone size={16} />
              1300 572 464
            </a>

            {/* CTA Button */}
            <button
              onClick={() =>
                document
                  .getElementById("lead-form")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="relative overflow-hidden bg-primary text-[#1A202C] px-4 lg:px-6 py-2.5 rounded-full font-black text-xs uppercase tracking-wider hover:brightness-110 shadow-md hover:shadow-lg transition-all duration-300"
            >
              <span className="absolute inset-0 opacity-15 bg-[radial-gradient(#000_0.5px,transparent_0.5px)] bg-[length:4px_4px] pointer-events-none" />
              Request a Free Referral
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
