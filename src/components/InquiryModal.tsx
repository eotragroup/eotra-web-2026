import { useEffect, useState, FormEvent } from 'react';
import { CheckCircle2, Mail, X } from 'lucide-react';
import { RollButton } from './RollButton';

interface InquiryModalProps {
  open: boolean;
  subject: string;
  onClose: () => void;
}

interface InquiryFormProps {
  subject: string;
  /** Called by the close button and the Done button */
  onClose: () => void;
  /** Modal shows a close (X) button; the page does not */
  showClose?: boolean;
  doneLabel?: string;
}

// What the customer can ask us for. `match` pre-selects an option from the button they clicked.
const SERVICES: { label: string; match: RegExp }[] = [
  { label: 'Retail platform (POS, WMS, ERP, CRM)', match: /point of sale|wms|inventory|crm|loyalty|retail platform/i },
  { label: 'Web app', match: /web app/i },
  { label: 'Mobile app', match: /mobile/i },
  { label: 'UI / UX design', match: /ui ?\/ ?ux|design/i },
  { label: 'E-commerce', match: /e-?commerce/i },
  { label: 'Backend & APIs', match: /backend|api/i },
  { label: 'Cloud & DevOps', match: /cloud|devops/i },
  { label: 'Internal tools', match: /internal tools|erp/i },
  { label: 'QA & dedicated team', match: /qa|dedicated/i },
  { label: 'Not sure yet', match: /^$/ },
];

const BUDGETS = ['Under $5,000', '$5,000 – $15,000', '$15,000 – $50,000', '$50,000+', 'Not sure yet'];

// Subjects that are not project requests: they get the short contact form only
const NOT_A_PROJECT = /careers|privacy|terms|security|question for|partnership|blog:/i;

function preselect(subject: string): string[] {
  if (!subject || NOT_A_PROJECT.test(subject)) return [];
  // check the specific service labels first; fall back to the retail platform for generic demo requests
  const specific = SERVICES.slice(1, 9).find((s) => s.match.test(subject));
  if (specific) return [specific.label];
  if (SERVICES[0].match.test(subject)) return [SERVICES[0].label];
  return [];
}

type Step = 'services' | 'budget' | 'details';

export function InquiryForm({ subject, onClose, showClose = true, doneLabel = 'Done' }: InquiryFormProps) {
  const isProject = !NOT_A_PROJECT.test(subject || '');
  const steps: Step[] = isProject ? ['services', 'budget', 'details'] : ['details'];

  const [stepIndex, setStepIndex] = useState(0);
  const [services, setServices] = useState<string[]>(() => preselect(subject));
  const [budget, setBudget] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const step = steps[stepIndex];
  const isLast = stepIndex === steps.length - 1;

  const close = () => onClose();

  const toggleService = (label: string) => {
    setError('');
    setServices((cur) => {
      if (label === 'Not sure yet') return cur.includes(label) ? [] : [label];
      const without = cur.filter((l) => l !== 'Not sure yet');
      return without.includes(label) ? without.filter((l) => l !== label) : [...without, label];
    });
  };

  const submit = async () => {
    if (!name.trim()) return setError('Please enter your name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setError('Please enter a valid email address.');
    setError('');
    setIsSending(true);
    const chosen = services.length ? services.join(', ') : 'Not specified';
    try {
      const res = await fetch('https://formsubmit.co/ajax/info@eotra.com', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim() || 'Not provided',
          services: chosen,
          budget: budget || 'Not asked',
          notes: notes.trim() || 'No additional notes provided',
          inquirySubject: subject || 'Eotra inquiry',
          _subject: `New Eotra inquiry: ${chosen}${budget ? ` · ${budget}` : ''} from ${name.trim()}`,
          _template: 'table',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.success === 'false' || data?.success === false) throw new Error('send failed');
      setSubmitted(true);
    } catch {
      setError('Sorry, we could not send your request. Please try again or email us at info@eotra.com.');
    } finally {
      setIsSending(false);
    }
  };

  const next = () => {
    if (step === 'services' && services.length === 0) return setError('Please choose at least one option.');
    if (step === 'budget' && !budget) return setError('Please choose a budget range.');
    setError('');
    if (isLast) void submit();
    else setStepIndex((i) => i + 1);
  };

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    next();
  };

  const title =
    step === 'services' ? 'What do you need?' : step === 'budget' ? 'What is your budget?' : isProject ? 'How can we reach you?' : subject || 'Contact Eotra';

  const tile = (selected: boolean) =>
    `text-left rounded-xl border px-4 py-3 text-[14px] font-medium transition-colors cursor-pointer ${
      selected ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-900 hover:border-gray-900'
    }`;

  const field = 'w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-[14px] text-gray-900 focus:outline-none focus:border-gray-900';

  return (
    <>
        {submitted ? (
          <div className="py-4">
            <div className="w-11 h-11 rounded-full bg-[#0400F5]/10 text-[#0400F5] flex items-center justify-center mb-4">
              <CheckCircle2 size={22} />
            </div>
            <h3 id="inquiry-modal-title" className="text-2xl font-medium tracking-tight text-gray-900 mb-2">
              Thank you, {name.trim().split(' ')[0]}.
            </h3>
            <p className="text-[14px] text-gray-600 leading-relaxed mb-6">
              We received your request{services.length ? ` for ${services.join(', ')}` : ''}. We will reply to {email.trim()} within one business day.
            </p>
            <RollButton label={doneLabel} variant="dark" size="hero" onClick={close} />
          </div>
        ) : (
          <form onSubmit={onFormSubmit} noValidate>
            <div className="flex items-start justify-between gap-4 mb-5">
              <div className="flex-1">
                {steps.length > 1 && (
                  <div className="flex items-center gap-1.5 mb-4" aria-label={`Step ${stepIndex + 1} of ${steps.length}`}>
                    {steps.map((s, i) => (
                      <span
                        key={s}
                        className={`h-1 flex-1 rounded-full transition-colors duration-300 ${i <= stepIndex ? 'bg-gray-900' : 'bg-gray-200'}`}
                      />
                    ))}
                  </div>
                )}
                {steps.length > 1 && (
                  <p className="text-[12px] font-medium text-gray-500 mb-1">
                    Step {stepIndex + 1} of {steps.length}
                  </p>
                )}
                <h3 id="inquiry-modal-title" className="text-2xl font-medium tracking-tight text-gray-900">
                  {title}
                </h3>
              </div>
              {showClose && (
                <button
                  type="button"
                  onClick={close}
                  className="w-9 h-9 shrink-0 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
                  aria-label="Close modal"
                >
                  <X size={16} />
                </button>
              )}
            </div>

            <div key={step} className="step-in">
              {step === 'services' && (
                <div>
                  <p className="text-[13px] text-gray-500 mb-3">Choose one or more.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="group" aria-label="Services">
                    {SERVICES.map((s) => {
                      const on = services.includes(s.label);
                      return (
                        <button
                          key={s.label}
                          type="button"
                          role="checkbox"
                          aria-checked={on}
                          onClick={() => toggleService(s.label)}
                          className={tile(on)}
                        >
                          {s.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 'budget' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5" role="radiogroup" aria-label="Budget">
                  {BUDGETS.map((b) => (
                    <button
                      key={b}
                      type="button"
                      role="radio"
                      aria-checked={budget === b}
                      onClick={() => {
                        setBudget(b);
                        setError('');
                      }}
                      className={tile(budget === b)}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              )}

              {step === 'details' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="inquiry-name" className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Your name
                    </label>
                    <input id="inquiry-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Morgan" autoComplete="name" className={field} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="inquiry-email" className="block text-[13px] font-medium text-gray-700 mb-1.5">
                        Email
                      </label>
                      <input id="inquiry-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex@company.com" autoComplete="email" className={field} />
                    </div>
                    <div>
                      <label htmlFor="inquiry-phone" className="block text-[13px] font-medium text-gray-700 mb-1.5">
                        Phone / WhatsApp <span className="text-gray-400 font-normal">(optional)</span>
                      </label>
                      <input id="inquiry-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+90 …" autoComplete="tel" className={field} />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="inquiry-notes" className="block text-[13px] font-medium text-gray-700 mb-1.5">
                      Anything else? <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <textarea id="inquiry-notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Tell us a little about your project" className={`${field} resize-none`} />
                  </div>
                </div>
              )}
            </div>

            {error && (
              <p className="mt-4 text-[13px] text-red-600" role="alert">
                {error}
              </p>
            )}

            <div className="mt-6 flex items-center justify-between gap-3">
              {stepIndex > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    setError('');
                    setStepIndex((i) => i - 1);
                  }}
                  className="px-1 py-2.5 text-[13px] font-medium text-gray-600 hover:text-gray-900 cursor-pointer"
                >
                  Back
                </button>
              ) : (
                <a href="mailto:info@eotra.com" className="inline-flex items-center gap-1.5 text-[13px] text-gray-600 hover:text-gray-900">
                  <Mail size={14} />
                  <span>info@eotra.com</span>
                </a>
              )}
              <RollButton
                label={isLast ? (isSending ? 'Sending…' : 'Send request') : 'Next'}
                variant="orange"
                size="hero"
                onClick={next}
              />
            </div>
            {/* lets the Enter key move to the next step */}
            <button type="submit" className="hidden" aria-hidden="true" tabIndex={-1} />
          </form>
        )}
    </>
  );
}

export function InquiryModal({ open, subject, onClose }: InquiryModalProps) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inquiry-modal-title"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        className="bg-white rounded-2xl w-full max-w-xl p-6 sm:p-8 shadow-2xl max-h-[92vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <InquiryForm subject={subject} onClose={onClose} />
      </div>
    </div>
  );
}
