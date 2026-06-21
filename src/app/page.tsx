'use client';

import { useCMSData } from '@/hooks/useCMSData';
import HeroSection from '@/components/HeroSection';
import ProcessSection from '@/components/ProcessSection';
import ReviewSlider from '@/components/ReviewSlider';
import PricingSection from '@/components/PricingSection';
import RegistrationForm from '@/components/RegistrationForm';
import ErrorBoundary from '@/components/ErrorBoundary';

export default function Home() {
  const cmsData = useCMSData();

  if (cmsData.error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <h1 className="text-2xl font-bold text-red-600 mb-4">⚠️ Configuration Error</h1>
          <p className="text-slate-600 mb-6">{cmsData.error}</p>
          <p className="text-sm text-slate-500">
            Please check your NEXT_PUBLIC_GOOGLE_SHEET_ID environment variable.
          </p>
        </div>
      </div>
    );
  }

  if (cmsData.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="inline-block">
            <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-4" />
          </div>
          <p className="text-slate-600">Loading your learning platform...</p>
        </div>
      </div>
    );
  }

  return (
    <main className="bg-white overflow-hidden">
      <ErrorBoundary>
        <HeroSection data={cmsData.hero} accentColor={cmsData.settings.accentColor} />
        <ProcessSection steps={cmsData.process} accentColor={cmsData.settings.accentColor} />
        <ReviewSlider reviews={cmsData.reviews} accentColor={cmsData.settings.accentColor} />
        <PricingSection plans={cmsData.pricing} accentColor={cmsData.settings.accentColor} />
        <RegistrationForm accentColor={cmsData.settings.accentColor} email={cmsData.settings.email} />
      </ErrorBoundary>
    </main>
  );
}