"use client";

import { useState, useEffect } from "react";
import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";

/**
 * Global sticky CTA bar for mobile.
 *
 * Behaviour:
 * - Hidden until user scrolls past 400px (let the hero breathe)
 * - If #lead-form exists on the page → scrolls to it
 * - If #lead-form is already in view → shows phone CTA instead
 * - If no #lead-form on the page → links to /referral
 * - Hidden on /referral page itself (form IS the page)
 * - Hidden on /admin pages
 * - Also shows on desktop as a subtle bottom bar (lg:flex)
 */
export default function GlobalStickyCTA() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [formInView, setFormInView] = useState(false);
  const [hasForm, setHasForm] = useState(false);

  // Hide on referral page, admin pages, thank-you pages, landing page (has its own)
  const hiddenPaths = ["/referral", "/admin", "/thank-you", "/ndis-support-melbourne"];
  const shouldHide = hiddenPaths.some((p) => pathname.startsWith(p));

  useEffect(() => {
    if (shouldHide) return;

    // Scroll listener: show after 400px
    const handleScroll = () => {
      setVisible(window.scrollY > 400);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    // Check if #lead-form exists and observe it
    const checkForm = () => {
      const formEl = document.getElementById("lead-form");
      if (formEl) {
        setHasForm(true);
        const observer = new IntersectionObserver(
          ([entry]) => setFormInView(entry.isIntersecting),
          { threshold: 0.1 }
        );
        observer.observe(formEl);
        return observer;
      }
      return null;
    };

    // Try immediately, then poll (Suspense may delay form render)
    let observer = checkForm();
    let interval: ReturnType<typeof setInterval> | null = null;
    if (!observer) {
      interval = setInterval(() => {
        observer = checkForm();
        if (observer && interval) clearInterval(interval);
      }, 500);
    }

    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer?.disconnect();
      if (interval) clearInterval(interval);
    };
  }, [pathname, shouldHide]);

  if (shouldHide || !visible) return null;

  const handleClick = () => {
    if (hasForm) {
      document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/referral";
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-3 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] transition-transform duration-300">
      <div className="max-w-7xl mx-auto flex items-center gap-3">
        {/* Primary CTA */}
        {hasForm && formInView ? (
          <a
            href="tel:1300572464"
            className="flex-1 h-14 bg-[#1A202C] text-white rounded-full font-black uppercase tracking-wider text-sm shadow-lg transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Phone className="w-5 h-5" />
            Call 1300 572 464
          </a>
        ) : (
          <button
            onClick={handleClick}
            className="flex-1 h-14 bg-primary text-[#1A202C] rounded-full font-black uppercase tracking-wider text-sm shadow-lg hover:brightness-110 transition-all duration-300 relative overflow-hidden"
          >
            <span
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
                backgroundSize: "12px 12px",
              }}
            />
            <span className="relative z-10">Request a Free Referral</span>
          </button>
        )}

        {/* Phone button (visible when primary is referral, hidden when primary is phone) */}
        {!(hasForm && formInView) && (
          <a
            href="tel:1300572464"
            className="hidden sm:flex h-14 w-14 shrink-0 bg-[#1A202C] text-white rounded-full items-center justify-center shadow-lg"
            aria-label="Call 1300 572 464"
          >
            <Phone className="w-5 h-5" />
          </a>
        )}
      </div>
    </div>
  );
}
