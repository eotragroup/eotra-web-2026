import { useState, FormEvent } from 'react';
import { ArrowRight, CheckCircle2, ExternalLink, Mail, X } from 'lucide-react';
import {
  CASE_STUDIES,
  CaseStudyData,
  EOTRA_MENU_PRODUCT,
  JAMJOOM_PRODUCT,
  PRODUCTS,
} from '../data/products';

export type { CaseStudyData };
export { CASE_STUDIES, EOTRA_MENU_PRODUCT, JAMJOOM_PRODUCT, PRODUCTS };

interface InquiryModalProps {
  open: boolean;
  subject: string;
  onClose: () => void;
}

export function InquiryModal({ open, subject, onClose }: InquiryModalProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [edition, setEdition] = useState('Eotra Professional Edition');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!open) return null;

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name.');
      return;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email.trim())) {
      setError('Please enter a valid work email address.');
      return;
    }
    setError('');
    setSubmitted(true);
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setName('');
    setEmail('');
    setNotes('');
    setError('');
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
      onClick={handleResetAndClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-lg p-6 sm:p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-[12px] font-medium text-gray-500 mb-1">
              Eotra Inc. · hello@eotra.com
            </p>
            <h3
              id="inquiry-modal-title"
              className="text-2xl font-medium tracking-tight text-gray-900"
            >
              {subject || 'Book an Eotra Demo'}
            </h3>
          </div>
          <button
            type="button"
            onClick={handleResetAndClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X size={16} />
          </button>
        </div>

        {submitted ? (
          <div className="py-6">
            <div className="w-11 h-11 rounded-full bg-[#0400F5]/10 text-[#0400F5] flex items-center justify-center mb-4">
              <CheckCircle2 size={22} />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">
              Request received
            </h4>
            <p className="text-[14px] text-gray-600 leading-relaxed mb-6">
              Thank you, {name}. Our Eotra enterprise team will review your{' '}
              {edition} inquiry and follow up at {email} or via{' '}
              <a
                href="mailto:hello@eotra.com"
                className="underline text-gray-900"
              >
                hello@eotra.com
              </a>
              .
            </p>
            <button
              type="button"
              onClick={handleResetAndClose}
              className="bg-gray-900 hover:bg-gray-800 text-white text-[13px] font-medium rounded-full px-6 py-2.5 transition-colors cursor-pointer"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="inquiry-name"
                className="block text-[13px] font-medium text-gray-700 mb-1.5"
              >
                Your name
              </label>
              <input
                id="inquiry-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Alex Morgan"
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-[14px] text-gray-900 focus:outline-none focus:border-gray-900"
              />
            </div>

            <div>
              <label
                htmlFor="inquiry-email"
                className="block text-[13px] font-medium text-gray-700 mb-1.5"
              >
                Work email
              </label>
              <input
                id="inquiry-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@company.com"
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-[14px] text-gray-900 focus:outline-none focus:border-gray-900"
              />
            </div>

            <div>
              <label
                htmlFor="inquiry-edition"
                className="block text-[13px] font-medium text-gray-700 mb-1.5"
              >
                Platform edition
              </label>
              <select
                id="inquiry-edition"
                value={edition}
                onChange={(e) => setEdition(e.target.value)}
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-[14px] text-gray-900 bg-white focus:outline-none focus:border-gray-900"
              >
                <option>Eotra Standard Edition (Single-brand)</option>
                <option>Eotra Professional Edition (Multi-location)</option>
                <option>Eotra Enterprise Edition (Global networks)</option>
                <option>Custom Migration &amp; Implementation</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="inquiry-notes"
                className="block text-[13px] font-medium text-gray-700 mb-1.5"
              >
                Operations overview
              </label>
              <textarea
                id="inquiry-notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Store count, warehouses, current POS/ERP stack..."
                className="w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-[14px] text-gray-900 focus:outline-none focus:border-gray-900 resize-none"
              />
            </div>

            {error && (
              <p className="text-[13px] text-red-600" role="alert">
                {error}
              </p>
            )}

            <div className="pt-2 flex items-center justify-between gap-3">
              <a
                href="mailto:hello@eotra.com"
                className="inline-flex items-center gap-1.5 text-[13px] text-gray-600 hover:text-gray-900"
              >
                <Mail size={14} />
                <span>hello@eotra.com</span>
              </a>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handleResetAndClose}
                  className="px-4 py-2.5 text-[13px] font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-[#0400F5] hover:bg-[#0300cc] text-white text-[13px] font-medium rounded-full pl-5 pr-2 py-2 inline-flex items-center gap-3 transition-colors cursor-pointer"
                >
                  <span>Send request</span>
                  <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5 text-[#0400F5]" />
                  </span>
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

interface CaseStudyModalProps {
  project: CaseStudyData | null;
  onClose: () => void;
  onStartSimilar: (title: string) => void;
}

export function CaseStudyModal({
  project,
  onClose,
  onStartSimilar,
}: CaseStudyModalProps) {
  if (!project) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="case-study-title"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative aspect-[16/9] bg-gray-900">
          {project.videoUrl ? (
            <video
              src={project.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#F8F8FA] flex items-center justify-center p-12 border-b border-gray-200">
              {project.logoUrl && (
                <img
                  src={project.logoUrl}
                  alt={project.title}
                  className="max-h-24 sm:max-h-28 w-auto object-contain"
                />
              )}
            </div>
          )}
          <button
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 hover:bg-white border border-gray-200 flex items-center justify-center text-gray-900 transition-colors cursor-pointer"
            aria-label="Close case study"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-[13px] text-gray-500 mb-2">
            <span>{project.client}</span>
            <span aria-hidden="true">·</span>
            <span>{project.year}</span>
            <span aria-hidden="true">·</span>
            <span>{project.deliverables.join(' / ')}</span>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
            <h3
              id="case-study-title"
              className="text-2xl sm:text-3xl font-medium tracking-tight text-gray-900"
            >
              {project.title}
            </h3>
            {project.logoUrl && (
              <img
                src={project.logoUrl}
                alt={`${project.title} logo`}
                className="h-8 sm:h-9 w-auto object-contain"
              />
            )}
          </div>
          <p className="text-[15px] leading-relaxed text-gray-600 mb-5">
            {project.summary}
          </p>

          <div className="rounded-xl bg-gray-50 border border-gray-200 p-4 mb-6">
            <p className="text-[14px] text-gray-900 font-medium leading-relaxed">
              &ldquo;{project.quote}&rdquo;
            </p>
            <p className="text-[12px] text-gray-500 mt-1.5">
              {project.quoteAuthor}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 py-4 border-y border-gray-200 mb-6">
            {project.metrics.map((m) => (
              <div key={m.label}>
                <div className="text-[18px] sm:text-[22px] font-semibold text-gray-900 tabular-nums">
                  {m.value}
                </div>
                <div className="text-[12px] text-gray-500 mt-0.5">
                  {m.label}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4">
            <button
              type="button"
              onClick={onClose}
              className="text-[13px] font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              Back to projects
            </button>
            <div className="flex items-center gap-3">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="border border-gray-300 hover:border-gray-900 text-gray-900 text-[13px] font-medium rounded-full px-4 py-2 inline-flex items-center gap-2 transition-colors"
                >
                  <span>Visit live site</span>
                  <ExternalLink size={14} />
                </a>
              )}
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onStartSimilar(`Demo Inquiry (${project.title})`);
                }}
                className="bg-[#0400F5] hover:bg-[#0300cc] text-white text-[13px] font-medium rounded-full pl-5 pr-2 py-2 inline-flex items-center gap-3 transition-colors cursor-pointer"
              >
                <span>Book a demo</span>
                <span className="w-7 h-7 rounded-full bg-white flex items-center justify-center">
                  <ArrowRight className="w-3.5 h-3.5 text-[#0400F5]" />
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

interface InfoModalProps {
  mode: 'company' | 'solutions' | 'suite' | null;
  onClose: () => void;
  onStartProject: () => void;
}

export function InfoModal({ mode, onClose, onStartProject }: InfoModalProps) {
  if (!mode) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl w-full max-w-xl p-6 sm:p-8 shadow-2xl max-h-[88vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-[12px] font-medium text-gray-500 mb-1">
              Eotra · Enterprise Operations &amp; Transaction
            </p>
            <h3 className="text-2xl font-medium tracking-tight text-gray-900">
              {mode === 'company' && 'About Eotra'}
              {mode === 'solutions' && 'Platform Capabilities & Editions'}
              {mode === 'suite' && 'The Eotra Advantage'}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {mode === 'company' && (
          <div className="space-y-5 text-[14px] text-gray-600 leading-relaxed">
            <p>
              Eotra is an enterprise retail technology company powering modern
              retail from source to sale. We replace five disconnected software
              systems with a single unified platform linking POS, WMS, ERP, and
              CRM.
            </p>
            <div className="divide-y divide-gray-200 border-y border-gray-200">
              <div className="py-3.5">
                <div className="font-semibold text-gray-900 mb-0.5">
                  Rapid Implementation (Weeks, not months)
                </div>
                <div>
                  Migrate existing retail systems in record time with minimal
                  operational downtime and dedicated customer success support.
                </div>
              </div>
              <div className="py-3.5">
                <div className="font-semibold text-gray-900 mb-0.5">
                  Bank-Grade Security &amp; Compliance
                </div>
                <div>
                  Scalable multi-region infrastructure trusted by global retail
                  operators and expanding multi-location chains.
                </div>
              </div>
              <div className="py-3.5">
                <div className="font-semibold text-gray-900 mb-0.5">
                  Founding Engineering Team
                </div>
                <div>
                  Led by Co-Founders &amp; Developers Saed I. S. Ayyad, Wail Al
                  Wesabi, Mansor Aljabali, and Ahmed Masallate.
                </div>
              </div>
            </div>
          </div>
        )}

        {mode === 'solutions' && (
          <div className="divide-y divide-gray-200 border-y border-gray-200">
            {[
              {
                name: 'Point of Sale & Order Management',
                detail:
                  'Offline-first omni-channel transactions and unified fulfillment across every store and region.',
              },
              {
                name: 'Inventory & Global WMS',
                detail:
                  'Real-time global stock management across warehouses, stores, and international distribution hubs.',
              },
              {
                name: 'CRM, Loyalty & Predictive Analytics',
                detail:
                  'Customer retention workflows paired with data-driven insights and enterprise reporting.',
              },
              {
                name: 'Standard · Professional · Enterprise Editions',
                detail:
                  'Tailored infrastructure scaling from single-brand boutiques to 50+ store chains and global networks.',
              },
            ].map((item) => (
              <div key={item.name} className="py-4">
                <h4 className="text-[15px] font-semibold text-gray-900 mb-1">
                  {item.name}
                </h4>
                <p className="text-[13px] text-gray-600 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            ))}
          </div>
        )}

        {mode === 'suite' && (
          <div className="space-y-4 text-[14px] text-gray-600 leading-relaxed">
            <p>
              How Eotra replaces five different software systems: one cohesive
              architecture connecting Point of Sale, Warehouse Management,
              Enterprise Resource Planning, Customer Relationship Management, and
              API integrations.
            </p>
            <p>
              Whether launching a single-brand flagship or expanding overseas
              across 50+ locations, our rapid onboarding team deploys faster than
              legacy ERP vendors.
            </p>
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          <a
            href="https://eotra.com"
            target="_blank"
            rel="noreferrer"
            className="text-[13px] font-medium text-gray-500 hover:text-gray-900"
          >
            eotra.com
          </a>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[13px] font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onClose();
                onStartProject();
              }}
              className="bg-gray-900 hover:bg-gray-800 text-white text-[13px] font-medium rounded-full px-5 py-2.5 transition-colors cursor-pointer"
            >
              Book a demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
