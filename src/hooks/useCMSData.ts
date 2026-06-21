'use client';

import { useState, useEffect } from 'react';
import { CMSData, HeroData, ProcessStep, Review, PricingPlan, Settings } from '@/types/cms';

const GOOGLE_SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID || '';
const SHEET_CSV_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/export?format=csv&gid=`;

interface SheetTabs {
  settings: number;
  hero: number;
  process: number;
  reviews: number;
  pricing: number;
}

const SHEET_IDS: SheetTabs = {
  settings: 0,
  hero: 1,
  process: 2,
  reviews: 3,
  pricing: 4,
};

function parseCSV(csvText: string): Record<string, string>[] {
  const lines = csvText.trim().split('\n');
  if (lines.length < 2) return [];

  const headers = lines[0].split('\t').map(h => h.trim());
  const rows: Record<string, string>[] = [];

  for (let i = 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;
    
    const obj: Record<string, string> = {};
    const currentLine = lines[i].split('\t').map(cell => cell.trim());

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j] || '';
    }
    rows.push(obj);
  }

  return rows;
}

export function useCMSData() {
  const [data, setData] = useState<CMSData>({
    hero: { headline: '', subheadline: '', ctaText: '', ctaLink: '' },
    process: [],
    reviews: [],
    pricing: [],
    settings: { companyName: '', tagline: '', email: '', phone: '', accentColor: '#1e3a8a' },
    loading: true,
    error: null,
  });

  useEffect(() => {
    const fetchCMSData = async () => {
      try {
        if (!GOOGLE_SHEET_ID) {
          throw new Error(
            'Google Sheet ID not configured. Please set NEXT_PUBLIC_GOOGLE_SHEET_ID environment variable.'
          );
        }

        const [settingsCSV, heroCSV, processCSV, reviewsCSV, pricingCSV] = await Promise.all([
          fetch(`${SHEET_CSV_URL}${SHEET_IDS.settings}`).then(r => {
            if (!r.ok) throw new Error(`Failed to fetch settings sheet: ${r.status}`);
            return r.text();
          }),
          fetch(`${SHEET_CSV_URL}${SHEET_IDS.hero}`).then(r => {
            if (!r.ok) throw new Error(`Failed to fetch hero sheet: ${r.status}`);
            return r.text();
          }),
          fetch(`${SHEET_CSV_URL}${SHEET_IDS.process}`).then(r => {
            if (!r.ok) throw new Error(`Failed to fetch process sheet: ${r.status}`);
            return r.text();
          }),
          fetch(`${SHEET_CSV_URL}${SHEET_IDS.reviews}`).then(r => {
            if (!r.ok) throw new Error(`Failed to fetch reviews sheet: ${r.status}`);
            return r.text();
          }),
          fetch(`${SHEET_CSV_URL}${SHEET_IDS.pricing}`).then(r => {
            if (!r.ok) throw new Error(`Failed to fetch pricing sheet: ${r.status}`);
            return r.text();
          }),
        ]);

        const settings = parseCSV(settingsCSV)[0] || {};
        const heroRow = parseCSV(heroCSV)[0] || {};
        const processRows = parseCSV(processCSV);
        const reviewRows = parseCSV(reviewsCSV);
        const pricingRows = parseCSV(pricingCSV);

        const heroData: HeroData = {
          headline: heroRow.headline || 'Master English Like Never Before',
          subheadline:
            heroRow.subheadline ||
            'Learn from expert instructors with personalized lessons tailored to your goals',
          ctaText: heroRow.cta_text || 'Start Learning Today',
          ctaLink: heroRow.cta_link || '#pricing',
        };

        const processData: ProcessStep[] = processRows
          .filter(row => row.step && row.title)
          .map(row => ({
            step: row.step,
            title: row.title,
            description: row.description || '',
            icon: row.icon || '🎯',
          }));

        const reviewsData: Review[] = reviewRows
          .filter(row => row.name && row.text)
          .map(row => ({
            name: row.name,
            title: row.title || 'Student',
            text: row.text,
            rating: parseInt(row.rating || '5', 10),
          }));

        const pricingData: PricingPlan[] = pricingRows
          .filter(row => row.plan && row.price)
          .map(row => ({
            plan: row.plan,
            price: row.price,
            currency: row.currency || '$',
            duration: row.duration || 'per month',
            features: row.features || '',
            cta: row.cta || 'Enroll Now',
            popular: row.popular || 'false',
          }));

        const settingsData: Settings = {
          companyName: settings.company_name || 'Keenfort',
          tagline: settings.tagline || 'Master English with Purpose',
          email: settings.email || 'hello@keenfort.com',
          phone: settings.phone || '+1-800-KEENFORT',
          accentColor: settings.accent_color || '#1e3a8a',
        };

        setData({
          hero: heroData,
          process: processData,
          reviews: reviewsData,
          pricing: pricingData,
          settings: settingsData,
          loading: false,
          error: null,
        });
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to load CMS data';
        console.error('CMS Data Error:', errorMessage);
        setData(prev => ({
          ...prev,
          loading: false,
          error: errorMessage,
        }));
      }
    };

    fetchCMSData();
  }, []);

  return data;
}