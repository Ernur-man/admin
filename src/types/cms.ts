export interface HeroData {
  headline: string;
  subheadline: string;
  ctaText: string;
  ctaLink: string;
}

export interface ProcessStep {
  step: string;
  title: string;
  description: string;
  icon: string;
}

export interface Review {
  name: string;
  title: string;
  text: string;
  rating: number;
}

export interface PricingPlan {
  plan: string;
  price: string;
  currency: string;
  duration: string;
  features: string;
  cta: string;
  popular: string;
}

export interface Settings {
  companyName: string;
  tagline: string;
  email: string;
  phone: string;
  accentColor: string;
}

export interface CMSData {
  hero: HeroData;
  process: ProcessStep[];
  reviews: Review[];
  pricing: PricingPlan[];
  settings: Settings;
  loading: boolean;
  error: string | null;
}