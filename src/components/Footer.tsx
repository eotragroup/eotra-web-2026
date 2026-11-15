import { goToBlog, goToConnect, goToCareers, goToFaq, goToLegal } from '../lib/nav';
import React, { useState } from 'react';
import { ArrowRight, Check, Facebook, Globe, Instagram, Linkedin } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { useI18n } from '../i18n';

const SOCIALS = [
  { name: 'Instagram', href: 'https://www.instagram.com/eotraofficial', Icon: Instagram },
  { name: 'LinkedIn', href: 'https://www.linkedin.com/company/eotraofficial', Icon: Linkedin },
  { name: 'Facebook', href: 'https://www.facebook.com/eotraofficial', Icon: Facebook },
];

interface FooterProps {
  onNavigateHome?: (sectionId?: string) => void;
  onOpenInquiry?: (subject?: string) => void;
  onNavigateToProduct?: (productId: string) => void;
  onNavigateToTeam?: () => void;
  onOpenInfoModal?: (mode: 'suite' | 'architecture' | 'contact') => void;
  dark?: boolean;
}

export function Footer({
  onNavigateHome,
  onOpenInquiry,
  onNavigateToProduct,
  onNavigateToTeam,
  onOpenInfoModal,
  dark = false,
}: FooterProps) {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [error, setError] = useState('');

  const [isSending, setIsSending] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError(t('Please enter a valid work email.'));
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
    <footer data-nav-theme={dark ? 'dark' : undefined} className={`w-full ${dark ? 'bg-[#05060f]' : 'border-t border-gray-200 bg-white'}`}>
      {/* Newsletter & Sign-up Banner (full-width brand color) */}
      <div className={`w-full ${dark ? 'bg-white/[0.04]' : 'bg-[#0400F5]'}`}>
      <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
      <div className="py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start lg:items-center">
          <div className="lg:col-span-6">
            <span className="text-[12px] font-semibold uppercase tracking-wider text-white/70 mb-2 block">
              {t('Stay Informed')}
            </span>
            <h3 className="text-[24px] sm:text-[30px] font-medium tracking-[-0.02em] text-white leading-[1.15]">
              {t('Subscribe to the Eotra Dispatch.')}
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
                  placeholder={t('Enter your work email')}
                  aria-label={t('Work email address')}
                  className={`flex-1 rounded-full px-5 py-3 text-[14px] focus:outline-none transition-colors ${dark ? 'text-white bg-white/[0.08] placeholder:text-white/35 focus:bg-white/[0.14]' : 'text-gray-900 bg-gray-100 placeholder:text-gray-400 focus:bg-gray-200/70'}`}
                />
                <button
                  type="submit"
                  className={`rounded-full px-6 py-3 text-[13px] ${dark ? 'bg-white text-gray-900 hover:bg-[#0400F5] hover:text-white' : 'bg-gray-900 hover:bg-[#0400F5] text-white'} font-medium tracking-wide transition-colors duration-200 flex items-center justify-center gap-2 cursor-pointer shrink-0`}
                >
                  {subscribed ? (
                    <>
                      <Check size={16} />
                      <span>{t('Subscribed')}</span>
                    </>
                  ) : (
                    <>
                      <span>{t('Sign up')}</span>
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
                  {t('Thank you for subscribing. We will keep you updated.')}
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
      </div>
      </div>

      <div className={`max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 ${dark ? 'footer-dark' : ''}`}>
      {/* Multi-Column Links & Information Section */}
      <div className="py-12 sm:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 sm:gap-10">
          {/* Brand & Mission column */}
          <div className="col-span-2 lg:col-span-2 pr-0 lg:pr-8">
            <button
              type="button"
              onClick={() => onNavigateHome?.()}
              style={{ marginLeft: -12, marginRight: -24 }}
              className="overflow-hidden inline-flex items-center mb-4 cursor-pointer"
              aria-label={t('Back to home')}
            >
              <img
                src="/assets/aistudio/Eotra_aef517cd.svg"
                alt="Eotra"
                className="h-[28px] w-auto max-w-none"
              />
            </button>
            <p className="text-[13px] font-medium text-gray-900 mb-1">
              {t('Enterprise Operations & Transaction')}
            </p>
            <div className="mb-5" />

            <div className="space-y-1.5 text-[13px] text-gray-600">
              <p>
                <span className="font-medium text-gray-900">{t('Headquarters:')}</span>{' '}
                {t('Istanbul, Türkiye')}
              </p>
              <p>
                <span className="font-medium text-gray-900">{t('Direct Contact:')}</span>{' '}
                <a
                  href="mailto:info@eotra.com"
                  className="text-gray-900 font-medium hover:text-[#0400F5] transition-colors"
                >
                  info@eotra.com
                </a>
              </p>
            </div>

            {/* Social media */}
            <div className="mt-6 flex items-center gap-2.5">
              {SOCIALS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Eotra on ${name}`}
                  className="w-10 h-10 rounded-full bg-gray-100 text-gray-900 hover:bg-gray-900 hover:text-white transition-colors flex items-center justify-center"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Column: Platform & Suites */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-gray-900 mb-4">
              {t('Platform & Core')}
            </h4>
            <ul className="space-y-2.5 text-[13px] text-gray-600">
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal?.('suite')}
                  className="hover:text-[#0400F5] transition-colors text-left"
                >
                  {t('Enterprise Retail OS')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal?.('architecture')}
                  className="hover:text-[#0400F5] transition-colors text-left"
                >
                  {t('Omnichannel POS Core')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal?.('architecture')}
                  className="hover:text-[#0400F5] transition-colors text-left"
                >
                  {t('Multi-Branch Inventory & WMS')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInfoModal?.('suite')}
                  className="hover:text-[#0400F5] transition-colors text-left"
                >
                  {t('Global ERP & Settlement')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateToProduct?.('eotra-menu')}
                  className="hover:text-[#0400F5] transition-colors text-left"
                >
                  {t('Eotra Menu Suite')}
                </button>
              </li>
            </ul>
          </div>

          {/* Column: Client Work & Case Studies */}
          <div>
            <h4 className="text-[12px] font-semibold uppercase tracking-wider text-gray-900 mb-4">
              {t('References')}
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
              {t('Company')}
            </h4>
            <ul className="space-y-2.5 text-[13px] text-gray-600">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigateToTeam?.()}
                  className="hover:text-[#0400F5] transition-colors text-left"
                >
                  {t('Meet the Team')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToFaq()}
                  className="hover:text-[#0400F5] transition-colors text-left"
                >
                  {t('FAQ')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToBlog()}
                  className="hover:text-[#0400F5] transition-colors text-left"
                >
                  {t('Blog')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToCareers()}
                  className="hover:text-[#0400F5] transition-colors text-left"
                >
                  {t('Careers')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => onOpenInquiry?.('General Partnership Inquiry')}
                  className="hover:text-[#0400F5] transition-colors text-left"
                >
                  {t('Partnership Inquiries')}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => goToConnect('Book an Enterprise Demo')}
                  className="hover:text-[#0400F5] transition-colors text-left font-medium text-gray-900"
                >
                  {t('Request a Demo')}
                </button>
              </li>
              <li>
                <a
                  href="mailto:info@eotra.com"
                  className="hover:text-[#0400F5] transition-colors text-left"
                >
                  {t('Contact Support')}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Legal / Copyright Row */}
      <div className="py-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-gray-500">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-1">
          <span>&copy; {new Date().getFullYear()} {t('Eotra Inc. All rights reserved.')}</span>
          <span className="hidden sm:inline text-gray-300">|</span>
          <span>{t('Istanbul, Türkiye & Global Operations')}</span>
        </div>

        <div className="flex flex-wrap items-center gap-6">
          <button
            type="button"
            onClick={() => goToLegal('privacy')}
            className="hover:text-gray-900 transition-colors"
          >
            {t('Privacy Policy')}
          </button>
          <button
            type="button"
            onClick={() => goToLegal('terms')}
            className="hover:text-gray-900 transition-colors"
          >
            {t('Terms of Service')}
          </button>
          <button
            type="button"
            onClick={() => goToLegal('security')}
            className="hover:text-gray-900 transition-colors"
          >
            {t('Security')}
          </button>
        </div>
      </div>
    </div>
  </footer>
);
}
