"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import type { GmbReview } from "@/data/gmb-reviews";
import { REVIEW_TEXT_TRUNCATE_LENGTH } from "@/lib/gmb-reviews-utils";

const GoogleIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
    <path
      fill="#4285F4"
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
    />
    <path
      fill="#34A853"
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
    />
    <path
      fill="#FBBC05"
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
    />
    <path
      fill="#EA4335"
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
    />
  </svg>
);

interface ReviewsCarouselProps {
  reviews: GmbReview[];
  rating: number;
  totalReviews: number;
  googleMapsUrl: string;
}

const ReviewText = ({ text }: { text: string }) => {
  const [expanded, setExpanded] = useState(false);
  const isLong = text.length > REVIEW_TEXT_TRUNCATE_LENGTH;
  const displayText =
    expanded || !isLong
      ? text
      : `${text.slice(0, REVIEW_TEXT_TRUNCATE_LENGTH).trim()}...`;

  return (
    <div className="mb-6 flex-grow">
      <p className="text-gray-700 font-medium leading-relaxed italic">
        &ldquo;{displayText}&rdquo;
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => setExpanded((prev) => !prev)}
          className="mt-3 text-sm font-black uppercase tracking-wide text-[#5D6AC4] hover:text-[#ABB3F1] transition-colors"
        >
          {expanded ? "Read less" : "Read more"}
        </button>
      )}
    </div>
  );
};

const ReviewsCarousel = ({
  reviews,
  rating,
  totalReviews,
  googleMapsUrl,
}: ReviewsCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const visibleCount = 3;
  const maxIndex = Math.max(0, reviews.length - visibleCount);

  const goNext = () => setActiveIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  const goPrev = () => setActiveIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));

  const visibleReviews =
    reviews.length <= visibleCount
      ? reviews
      : reviews.slice(activeIndex, activeIndex + visibleCount);

  return (
    <section className="relative py-24 bg-[#F8FAFC] overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#ABB3F1]/10 rounded-full blur-[100px]" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#F1ABAB]/10 rounded-full blur-[100px]" />

      <div className="max-w-8xl mx-auto px-4 md:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-center gap-2 text-[#F1ABAB] font-black uppercase text-xs tracking-[0.3em] mb-4">
              <GoogleIcon />
              Google Reviews
            </div>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#2D3748] leading-tight uppercase tracking-tighter mb-4">
              Trusted by <span className="text-[#ABB3F1]">Melbourne Families</span>
            </h2>
            <div className="flex items-center justify-center gap-3 flex-wrap">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className="text-[#ABB3F1] fill-[#ABB3F1]"
                  />
                ))}
              </div>
              <p className="text-sm md:text-base font-bold text-gray-600">
                {rating.toFixed(1)} · {totalReviews} Google reviews
              </p>
            </div>
          </motion.div>
        </div>

        <div className="relative">
          {reviews.length > visibleCount && (
            <>
              <button
                type="button"
                onClick={goPrev}
                aria-label="Previous reviews"
                className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-lg items-center justify-center hover:bg-[#ABB3F1]/20 transition-colors"
              >
                <ChevronLeft size={22} />
              </button>
              <button
                type="button"
                onClick={goNext}
                aria-label="Next reviews"
                className="hidden md:flex absolute -right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white border border-gray-200 shadow-lg items-center justify-center hover:bg-[#ABB3F1]/20 transition-colors"
              >
                <ChevronRight size={22} />
              </button>
            </>
          )}

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            <AnimatePresence mode="popLayout">
              {visibleReviews.map((review) => (
                <motion.article
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.35 }}
                  className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-[0_10px_40px_-15px_rgba(0,0,0,0.08)] h-full flex flex-col"
                >
                  <div className="flex items-center gap-2 mb-4">
                    <GoogleIcon />
                    <div className="flex gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="text-[#ABB3F1] fill-[#ABB3F1]"
                        />
                      ))}
                    </div>
                  </div>
                  <ReviewText text={review.text} />
                  <div className="border-t border-gray-100 pt-4 mt-auto">
                    <p className="font-black text-[#2D3748] text-sm uppercase tracking-wide">
                      {review.author}
                    </p>
                    {review.relativeTime && (
                      <p className="text-xs text-gray-500 font-medium mt-1">
                        {review.relativeTime}
                      </p>
                    )}
                  </div>
                </motion.article>
              ))}
            </AnimatePresence>
          </div>

          {reviews.length > visibleCount && (
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  type="button"
                  aria-label={`Show review set ${index + 1}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex
                      ? "w-8 bg-[#ABB3F1]"
                      : "w-2.5 bg-gray-300"
                  }`}
                />
              ))}
            </div>
          )}
        </div>

        <div className="mt-10 text-center">
          <a
            href={googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#2D3748] hover:text-[#5D6AC4] transition-colors"
          >
            <GoogleIcon />
            View all {totalReviews} reviews on Google
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsCarousel;
