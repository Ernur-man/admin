'use client';

import { Review } from '@/types/cms';
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

interface ReviewsProps {
  reviews: Review[];
  accentColor: string;
}

export default function ReviewSlider({ reviews, accentColor }: ReviewsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prev = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  if (reviews.length === 0) return null;

  const visibleCount = typeof window !== 'undefined' && window.innerWidth >= 1024 ? 3 : 1;
  const visibleReviews = Array.from({ length: visibleCount }, (_, i) => 
    reviews[(currentIndex + i) % reviews.length]
  );

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-4">
            Student Success Stories
          </h2>
          <p className="text-lg text-slate-600">
            See what our learners are achieving
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {visibleReviews.map((review, idx) => (
            <div
              key={idx}
              className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: review.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    fill={accentColor}
                    color={accentColor}
                  />
                ))}
              </div>

              <p className="text-slate-700 mb-6 leading-relaxed italic">
                "{review.text}"
              </p>

              <div>
                <p className="font-semibold text-slate-900">{review.name}</p>
                <p className="text-sm text-slate-500">{review.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="flex items-center justify-center gap-4">
          <button
            onClick={prev}
            className="p-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors"
            aria-label="Previous review"
          >
            <ChevronLeft size={20} className="text-slate-600" />
          </button>

          <div className="flex gap-2">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-2 h-2 rounded-full transition-all ${
                  idx === currentIndex % reviews.length
                    ? 'bg-slate-900 w-8'
                    : 'bg-slate-300'
                }`}
                aria-label={`Go to review ${idx + 1}`}
              />
            ))}
          </div>

          <button
            onClick={next}
            className="p-2 rounded-lg border border-slate-300 hover:bg-slate-100 transition-colors"
            aria-label="Next review"
          >
            <ChevronRight size={20} className="text-slate-600" />
          </button>
        </div>
      </div>
    </section>
  );
}