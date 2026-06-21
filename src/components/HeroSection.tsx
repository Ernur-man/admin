'use client';

import { HeroData } from '@/types/cms';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
  data: HeroData;
  accentColor: string;
}

export default function HeroSection({ data, accentColor }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-white via-slate-50 to-white px-4 sm:px-6 lg:px-8">
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, ${accentColor}, transparent 1px)`,
          backgroundSize: '50px 50px',
        }}
      />

      <div className="relative max-w-4xl mx-auto text-center space-y-8">
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-serif font-bold text-slate-900 leading-tight">
          {data.headline}
        </h1>

        <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
          {data.subheadline}
        </p>

        <div className="pt-6">
          <a
            href={data.ctaLink}
            className="inline-flex items-center gap-2 px-8 py-4 text-lg font-medium text-white rounded-lg transition-all duration-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2"
            style={{
              backgroundColor: accentColor,
              borderColor: accentColor,
            }}
          >
            {data.ctaText}
            <ArrowRight size={20} />
          </a>
        </div>

        <div className="pt-12 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-slate-500">
          <div>✓ 10,000+ Active Students</div>
          <div>✓ 50+ Expert Instructors</div>
          <div>✓ 95% Success Rate</div>
        </div>
      </div>
    </section>
  );
}