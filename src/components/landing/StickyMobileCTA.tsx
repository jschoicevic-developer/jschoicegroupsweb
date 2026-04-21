"use client";

import { useState, useEffect, useCallback } from "react";
import { Phone } from "lucide-react";

export default function StickyMobileCTA() {
  const [formInView, setFormInView] = useState(false);

  const setupObserver = useCallback(() => {
    const formEl = document.getElementById("lead-form");
    if (!formEl) return null;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setFormInView(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px" }
    );

    observer.observe(formEl);
    return observer;
  }, []);

  useEffect(() => {
    // Try immediately
    let observer = setupObserver();
    if (observer) return () => observer?.disconnect();

    // Form might not be in DOM yet (Suspense). Poll until it appears.
    const interval = setInterval(() => {
      observer = setupObserver();
      if (observer) clearInterval(interval);
    }, 200);

    return () => {
      clearInterval(interval);
      observer?.disconnect();
    };
  }, [setupObserver]);

  const handleScrollToForm = () => {
    const formEl = document.getElementById("lead-form");
    if (formEl) {
      formEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden p-3 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)]">
      {formInView ? (
        <a
          href="tel:1300572464"
          className="w-full h-14 bg-[#1A202C] text-white rounded-full font-black uppercase tracking-wider text-sm shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Phone className="w-5 h-5" />
          Call 1300 572 464
        </a>
      ) : (
        <button
          onClick={handleScrollToForm}
          className="w-full h-14 bg-primary text-[#1A202C] rounded-full font-black uppercase tracking-wider text-sm shadow-lg hover:brightness-110 transition-all duration-300 relative overflow-hidden"
        >
          <span
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle, #000 1px, transparent 1px)",
              backgroundSize: "12px 12px",
            }}
          />
          <span className="relative z-10">Request a Free Referral</span>
        </button>
      )}
    </div>
  );
}
