'use client';

import { useState } from 'react';
import { Mail, User, BookOpen } from 'lucide-react';

interface RegistrationProps {
  accentColor: string;
  email: string;
}

export default function RegistrationForm({ accentColor, email }: RegistrationProps) {
  const [formState, setFormState] = useState({ name: '', email: '', level: 'beginner' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormState(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formState),
      });

      if (response.ok) {
        setStatus('success');
        setFormState({ name: '', email: '', level: 'beginner' });
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (err) {
      console.error('Registration error:', err);
      setStatus('error');
    }
  };

  return (
    <section className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-slate-50">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl sm:text-5xl font-serif font-bold text-slate-900 mb-4">
            Start Your Journey Today
          </h2>
          <p className="text-lg text-slate-600">
            Get access to personalized lessons and expert guidance
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 space-y-6"
        >
          <div>
            <label htmlFor="name" className="block text-sm font-semibold text-slate-700 mb-2">
              <User className="inline mr-2" size={16} />
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formState.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition"
              style={{ '--tw-ring-color': accentColor } as any}
              placeholder="Your name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">
              <Mail className="inline mr-2" size={16} />
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formState.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition"
              style={{ '--tw-ring-color': accentColor } as any}
              placeholder="your@email.com"
            />
          </div>

          <div>
            <label htmlFor="level" className="block text-sm font-semibold text-slate-700 mb-2">
              <BookOpen className="inline mr-2" size={16} />
              English Level
            </label>
            <select
              id="level"
              name="level"
              value={formState.level}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition"
              style={{ '--tw-ring-color': accentColor } as any}
            >
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {status === 'success' && (
            <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-700">
              ✓ Welcome to Keenfort! Check your email to get started.
            </div>
          )}

          {status === 'error' && (
            <div className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-700">
              ✗ Something went wrong. Please try again or contact {email}
            </div>
          )}

          <button
            type="submit"
            disabled={status === 'loading'}
            className="w-full py-3 px-6 text-lg font-semibold text-white rounded-lg transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ backgroundColor: accentColor }}
          >
            {status === 'loading' ? 'Creating Account...' : 'Get Started Free'}
          </button>

          <p className="text-center text-sm text-slate-500">
            No credit card required. 7 days of unlimited access.
          </p>
        </form>
      </div>
    </section>
  );
}