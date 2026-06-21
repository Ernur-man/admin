'use client';

import { PricingPlan } from '@/types/cms';
import { Check } from 'lucide-react';

interface PricingProps {
  plans: PricingPlan[];
  accentColor: string;
}

export default function PricingSection({ plans, accentColor }: PricingProps) {
  return (
    <section id="pricing" className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-lg text-slate-600">
            Choose the plan that fits your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan, index) => {
            const isPopular = plan.popular === 'true' || plan.popular === 'TRUE' || plan.popular === '1';
            return (
              <div
                key={index}
                className={`relative rounded-2xl transition-all duration-300 overflow-hidden ${
                  isPopular
                    ? 'ring-2 transform md:scale-105'
                    : 'border border-slate-200'
                } hover:shadow-xl`}
                style={{
                  ringColor: isPopular ? accentColor : undefined,
                }}
              >
                <div
                  className={`p-8 ${
                    isPopular ? 'bg-gradient-to-br from-slate-900 to-slate-800 text-white' : 'bg-white'
                  }`}
                >
                  {isPopular && (
                    <div
                      className="absolute top-0 right-0 px-4 py-1 text-sm font-semibold rounded-bl-lg"
                      style={{ backgroundColor: accentColor }}
                    >
                      Popular
                    </div>
                  )}

                  <h3 className={`text-2xl font-bold mb-2 ${
                    isPopular ? 'text-white' : 'text-slate-900'
                  }`}>
                    {plan.plan}
                  </h3>

                  <div className="mb-6">
                    <span className={`text-5xl font-bold ${
                      isPopular ? 'text-white' : 'text-slate-900'
                    }`}>
                      {plan.currency}{plan.price}
                    </span>
                    <span className={isPopular ? 'text-slate-300' : 'text-slate-600'}>
                      {' '}/{plan.duration}
                    </span>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.split(';').map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <Check
                          size={20}
                          className="flex-shrink-0 mt-0.5"
                          color={accentColor}
                        />
                        <span className={isPopular ? 'text-slate-200' : 'text-slate-600'}>
                          {feature.trim()}
                        </span>
                      </div>
                    ))}
                  </div>

                  <button
                    className={`w-full py-3 px-6 rounded-lg font-semibold transition-all duration-300 hover:scale-105 ${
                      isPopular
                        ? 'text-slate-900 hover:opacity-90'
                        : 'border-2 hover:opacity-90'
                    }`}
                    style={{
                      backgroundColor: isPopular ? accentColor : 'transparent',
                      borderColor: accentColor,
                      color: isPopular ? '#000' : accentColor,
                    }}
                  >
                    {plan.cta}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-16 pt-8 border-t border-slate-200">
          <p className="text-slate-600">
            All plans include access to our learning community and 24/7 support
          </p>
        </div>
      </div>
    </section>
  );
}