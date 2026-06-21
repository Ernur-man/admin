'use client';

import { ProcessStep } from '@/types/cms';

interface ProcessProps {
  steps: ProcessStep[];
  accentColor: string;
}

export default function ProcessSection({ steps, accentColor }: ProcessProps) {
  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-4">
            How We Teach
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            A proven methodology designed for real-world fluency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative p-8 bg-slate-50 rounded-xl hover:shadow-lg transition-all duration-300"
            >
              <div
                className="absolute -top-4 -left-4 w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg"
                style={{ backgroundColor: accentColor }}
              >
                {step.step}
              </div>

              <div className="text-5xl mb-6 mt-4">{step.icon}</div>

              <h3 className="text-xl font-semibold text-slate-900 mb-3">
                {step.title}
              </h3>

              <p className="text-slate-600 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}