import { goToBlog, goToFaq } from '../lib/nav';
import React, { useState } from 'react';
import { ArrowRight, Check, Globe } from 'lucide-react';
import { PRODUCTS } from '../data/products';

interface FooterProps {
  onNavigateHome?: (sectionId?: string) => void;
  onOpenInquiry?: (subject?: string) => void;
  onNavigateToProduct?: (productId: string) => void;
  onNavigateToTeam?: () => void;
  onOpenInfoModal?: (mode: 'suite' | 'architecture' | 'contact') => void;
}

export function Footer({
  onNavigateHome,
  onOpenInquiry,
  onNavigateToProduct,
  onNavigateToTeam,
  onOpenInfoModal,
}: FooterProps) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const [isSending, setIsSending] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid work email.');
      return;
    }
    setError('');
    setIsSending(true);

    try {
      await fetch('https://formsubmit.co/ajax/info@eotra.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          source: 'Footer Dispatch Newsletter',
          _subject: `New Eotra Dispatch Subscriber: ${email.trim()}`,
          _template: 'table',
        }),
      });
    } catch (err) {
      console.warn('Newsletter submission fallback:', err);
    } finally {
      setIsSending(false);
      setSubscribed(true);
      setEmail('');
      setTimeout(() => {
        setSubscribed(false);
      }, 6000);
    }
  };

  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      {/* Newsletter & Sign-up Banner (full-width brand color) */}
      <div className="w-full bg-[#0400F5]">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <div className="py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:items-center">
          <div className="lg:col-span-6">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-white/70 mb-2 block">
              Stay Informed
            </span>
            <h3 className="text-[24px] sm:text-[30px] font-medium tracking-[-0.02em] text-white leading-[1.15]">
              Subscribe to the Eotra Dispatch.
            </h3>
          </div>

          <div className="lg:col-span-6">
            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="flex flex-col sm:flex-row gap-2.5">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (error) setError('');
                  }}
                  placeholder="Enter your work email"
                  aria-label="Work email address"
                  className="flex-1 rounded-full px-5 py-3 text-[14px] text-gray-900 bg-gray-100 placeholder:text-gray-400 focus:bg-gray-200/70 focus:outline-none transition-colors"
                />
                <button
                  type="submit"
                  className="rounded-full px-6 py-3 bg-gray-900 hover:bg-[#0400F5] text-white text-[13px] font-medium tracking-wide transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                >
                  {subscribed ? (
                    <>
                      <Check size={16} />
                      <span>Subscribed</span>
                    </>
                  ) : (
                    <>
                      <span>Sign up</span>
                      <ArrowRight size={14} />
                    </>
                  )}
                </button>
              </div>

              {error && (
                <p className="text-[12px] text-red-200 font-medium">{error}</p>
              )}
              {subscribed && (
                <p className="text-[12px] text-emerald-200 font-medium">
                  Thank you for subscribing. We will keep you updated.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
      </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      {/* Multi-Column Links & Information Section */}
      <div className="py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand & Mission column */}
          <div className="col-span-2 lg:col-span-2 pr-0 lg:pr-8">
            <button
              type="button"
              onClick={() => onNavigateHome?.()}
              className="overflow-hidden inline-flex items-center -ml-3 -mr-6 mb-4 cursor-pointer"
              aria-label="Back to home"
            >
              <img
                src="/assets/aistudio/Eotra_aef517cd.svg"
                alt="Eotra"
                className="h-[28px] w-auto max-w-none"
              />
            </button>
            <p className="text-[13px] font-medium text-gray-900 mb-1">
              Enterprise Operations &amp; Transaction
            </p>
            <div className="mb-5" />

            <div className="space-y-1.5 text-[13px] text-gray-600">
              <p>
                <span className="font-medium text-gray-900">Headquarters:</span>{' '}
                Istanbul, Türkiye
              </p>
              <p>
                <span className="font-medium text-gray-900">Direct Contact:</span>{' '}
                <a
                  href="mailto:info@eotra.com"
                  className="text-gray-900 font-medium hover:text-[#0400F5] transition-colors"
                >
                  info@eotra.com
                </a>
              </p>
            </div>
          </div>

          {/* Column: Platform & Suites */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-gray-900 mb-4">
              Platform &amp; Core
            </h4>
            <ul className="space-y-2.5 text-[13px] text-gray-600">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal?.('suite')}
                  className="hover:text-[#0400F5] transition-colors text-left"
                >
                  Enterprise Retail OS
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal?.('architecture')}
                  className="hover:text-[#0400F5] transition-colors text-left"
                >
                  Omnichannel POS Core
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal?.('architecture')}
                  className="hover:text-[#0400F5] transition-colors text-left"
                >
                  Multi-Branch Inventory &amp; WMS
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal?.('suite')}
                  className="hover:text-[#0400F5] transition-colors text-left"
                >
                  Global ERP &amp; Settlement
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateToProduct?.('eotra-menu')}
                  className="hover:text-[#0400F5] transition-colors text-left"
                >
                  Eotra Menu Suite
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Client Work & Case Studies */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-gray-900 mb-4">
              Client Platforms
            </h4>
            <ul className="space-y-2.5 text-[13px] text-gray-600">
              {PRODUCTS.map((prod) => (
                <li key={prod.id}>
                  <button
                    type="button"
                    onClick={() => onNavigateToProduct?.(prod.id)}
                    className="hover:text-[#0400F5] transition-colors text-left truncate max-w-full block"
                  >
                    {prod.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Column: Company & Governance */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-gray-900 mb-4">
              Company
            </h4>
            <ul className="space-y-2.5 text-[13px] text-gray-600">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateToTeam?.()}
                  className="hover:text-[#0400F5] transition-colors text-left"
                >
                  Meet the Team
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToFaq()}
                  className="hover:text-[#0400F5] transition-colors text-left"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToBlog()}
                  className="hover:text-[#0400F5] transition-colors text-left"
                >
                  Blog
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInquiry?.('Careers at Eotra')}
                  className="hover:text-[#0400F5] transition-colors text-left"
                >
                  Careers
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInquiry?.('General Partnership Inquiry')}
                  className="hover:text-[#0400F5] transition-colors text-left"
                >
                  Partnership Inquiries
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInquiry?.('Book an Enterprise Demo')}
                  className="hover:text-[#0400F5] transition-colors text-left font-medium text-gray-900"
                >
                  Request a Demo
                </button>
              </li>
              <li>
                <a
                  href="mailto:info@eotra.com"
                  className="hover:text-[#0400F5] transition-colors text-left"
                >
                  Contact Support
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright Row */}
      <div className="py-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-gray-500">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <span>&copy; {new Date().getFullYear()} Eotra Inc. All rights reserved.</span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span>Istanbul, Türkiye &amp; Global Operations</span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={() => onOpenInquiry?.('Privacy Policy Inquiry')}
            className="hover:text-gray-900 transition-colors"
          >
            Privacy Policy
          </button>
          <button
            type="button"
            onClick={() => onOpenInquiry?.('Terms of Service Inquiry')}
            className="hover:text-gray-900 transition-colors"
          >
            Terms of Service
          </button>
          <button
            type="button"
            onClick={() => onOpenInquiry?.('Security & Compliance')}
            className="hover:text-gray-900 transition-colors"
          >
            Security
          </button>
        </div>
      </div>
    </div>
  </footer>
);
}
