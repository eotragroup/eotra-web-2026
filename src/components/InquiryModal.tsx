import { useState, FormEvent } from 'react';
import {
  Check,
  CheckCircle2,
  Cloud,
  CircleHelp,
  Code2,
  Database,
  Layers,
  LayoutDashboard,
  Mail,
  Smartphone,
  ShieldCheck,
  ShoppingBag,
  Store,
  X,
  type LucideIcon,
} from 'lucide-react';
import { RollButton } from './RollButton';

// What the customer can ask us for. `match` pre-selects an option from the button they clicked.
const SERVICES: { label: string; match: RegExp; Icon: LucideIcon }[] = [
  { label: 'Retail platform', match: /point of sale|wms|inventory|crm|loyalty|retail platform/i, Icon: Store },
  { label: 'Web app', match: /web app/i, Icon: Code2 },
  { label: 'Mobile app', match: /mobile/i, Icon: Smartphone },
  { label: 'UI / UX design', match: /ui ?\/ ?ux|design/i, Icon: Layers },
  { label: 'E-commerce', match: /e-?commerce/i, Icon: ShoppingBag },
  { label: 'Backend & APIs', match: /backend|api/i, Icon: Database },
  { label: 'Cloud & DevOps', match: /cloud|devops/i, Icon: Cloud },
  { label: 'Internal tools', match: /internal tools|erp/i, Icon: LayoutDashboard },
  { label: 'QA & dedicated team', match: /qa|dedicated/i, Icon: ShieldCheck },
  { label: 'Not sure yet', match: /^$/, Icon: CircleHelp },
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
  /** Light-on-dark colours, for use on the dark glass card */
  dark?: boolean;
}

export function InquiryForm({ subject, onClose, showClose = true, doneLabel = 'Done', dark = false }: InquiryFormProps) {
  const isProject = !NOT_A_PROJECT.test(subject || '');

  const [services, setServices] = useState<string[]>(() => preselect(subject));
  const [budget, setBudget] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [error, setError] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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
    if (isProject && services.length === 0) return setError('Please choose at least one service.');
    if (isProject && !budget) return setError('Please choose a budget range.');
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

  const onFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!isSending) void submit();
  };

  const title = isProject ? 'Tell us about your project' : subject || 'Contact Eotra';

  const t = dark
    ? {
        title: 'text-white',
        body: 'text-white/70',
        label: 'text-white/60',
        muted: 'text-white/40',
        iconOk: 'bg-white/10 text-white',
        err: 'text-red-300',
        mail: 'text-white/65 hover:text-white',
        tileSel: 'bg-white text-gray-900',
        tileIdle: 'bg-white/[0.07] text-white hover:bg-white/[0.14]',
        chipSel: 'bg-gray-900/10 text-gray-900',
        chipIdle: 'bg-white/10 text-white',
        boxSel: 'bg-gray-900 text-white',
        boxIdle: 'bg-white/15 text-transparent',
        field: 'bg-white/[0.08] text-white placeholder:text-white/35 focus:bg-white/[0.14] focus:ring-1 focus:ring-white/30',
        done: 'light' as const,
      }
    : {
        title: 'text-gray-900',
        body: 'text-gray-600',
        label: 'text-gray-500',
        muted: 'text-gray-400',
        iconOk: 'bg-[#0400F5]/10 text-[#0400F5]',
        err: 'text-red-600',
        mail: 'text-gray-600 hover:text-gray-900',
        tileSel: 'bg-gray-900 text-white',
        tileIdle: 'bg-gray-900/[0.05] text-gray-900 hover:bg-gray-900/10',
        chipSel: 'bg-white/15 text-white',
        chipIdle: 'bg-gray-100 text-gray-700',
        boxSel: 'bg-white text-gray-900',
        boxIdle: 'bg-gray-900/10 text-transparent',
        field: 'bg-gray-900/[0.05] text-gray-900 placeholder:text-gray-400 focus:bg-gray-900/[0.08] focus:ring-1 focus:ring-gray-900/25',
        done: 'dark' as const,
      };

  const tile = (selected: boolean) =>
    `text-left rounded-2xl px-4 py-2.5 text-[14px] transition-colors cursor-pointer ${selected ? t.tileSel : t.tileIdle}`;

  const pill = (selected: boolean) =>
    `rounded-full px-4 py-2 text-[13px] transition-colors cursor-pointer ${selected ? t.tileSel : t.tileIdle}`;

  const fieldBase = `w-full text-[14px] focus:outline-none transition-colors ${t.field}`;
  const field = `${fieldBase} rounded-full px-5 py-3`;
  const area = `${fieldBase} rounded-3xl px-5 py-3 resize-none`;
  const sectionLabel = `block text-[12px] font-medium tracking-wide mb-3 ${t.label}`;

  return (
    <>
      {submitted ? (
        <div className="py-4">
          <div className={`w-11 h-11 rounded-full flex items-center justify-center mb-4 ${t.iconOk}`}>
            <CheckCircle2 size={22} />
          </div>
          <h3 id="inquiry-modal-title" className={`text-2xl font-medium tracking-tight mb-2 ${t.title}`}>
            Thank you, {name.trim().split(' ')[0]}.
          </h3>
          <p className={`text-[14px] leading-relaxed mb-6 ${t.body}`}>
            We received your request{isProject && services.length ? ` for ${services.join(', ')}` : ''}. We will reply to {email.trim()} within one business day.
          </p>
          <RollButton label={doneLabel} variant={t.done} size="hero" onClick={onClose} />
        </div>
      ) : (
        <form onSubmit={onFormSubmit} noValidate>
          <div className="flex items-start justify-between gap-4 mb-6">
            <h3 id="inquiry-modal-title" className={`text-2xl font-normal tracking-tight ${t.title}`}>
              {title}
            </h3>
            {showClose && (
              <button
                type="button"
                onClick={onClose}
                className="w-9 h-9 shrink-0 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center text-gray-700 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            )}
          </div>

          <div className="space-y-7">
            {/* 1. Contact details first */}
            <div>
              {isProject && <span className={sectionLabel}>How can we reach you?</span>}
              <div className="space-y-4">
                <div>
                  <label htmlFor="inquiry-name" className={`block text-[13px] font-medium mb-1.5 ${t.label}`}>
                    Your name
                  </label>
                  <input id="inquiry-name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Alex Morgan" autoComplete="name" className={field} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="inquiry-email" className={`block text-[13px] font-medium mb-1.5 ${t.label}`}>
                      Email
                    </label>
                    <input id="inquiry-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="alex@company.com" autoComplete="email" className={field} />
                  </div>
                  <div>
                    <label htmlFor="inquiry-phone" className={`block text-[13px] font-medium mb-1.5 ${t.label}`}>
                      Phone / WhatsApp <span className={`font-normal ${t.muted}`}>(optional)</span>
                    </label>
                    <input id="inquiry-phone" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+90 …" autoComplete="tel" className={field} />
                  </div>
                </div>
              </div>
            </div>

            {/* 2. What they need and the budget */}
            {isProject && (
              <>
                <div>
                  <span className={sectionLabel}>What do you need? <span className={`font-normal ${t.muted}`}>Choose one or more</span></span>
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
                          className={`${tile(on)} flex items-center gap-3`}
                        >
                          <span
                            className={`w-8 h-8 shrink-0 rounded-full flex items-center justify-center transition-colors ${
                              on ? t.chipSel : t.chipIdle
                            }`}
                          >
                            <s.Icon size={16} strokeWidth={1.8} />
                          </span>
                          <span className="flex-1">{s.label}</span>
                          <span
                            aria-hidden="true"
                            className={`w-5 h-5 shrink-0 rounded-full flex items-center justify-center transition-colors ${
                              on ? t.boxSel : t.boxIdle
                            }`}
                          >
                            <Check size={13} strokeWidth={3} />
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <span className={sectionLabel}>What is your budget?</span>
                  <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Budget">
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
                        className={pill(budget === b)}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}

            {/* 3. Optional note, right above Send */}
            <div>
              <label htmlFor="inquiry-notes" className={`block text-[13px] font-medium mb-1.5 ${t.label}`}>
                Anything else? <span className={`font-normal ${t.muted}`}>(optional)</span>
              </label>
              <textarea id="inquiry-notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Tell us a little about your project" className={area} />
            </div>
          </div>

          {error && (
            <p className={`mt-5 text-[13px] ${t.err}`} role="alert">
              {error}
            </p>
          )}

          <div className="mt-7 flex items-center justify-between gap-3">
            <a href="mailto:info@eotra.com" className={`inline-flex items-center gap-1.5 text-[13px] ${t.mail}`}>
              <Mail size={14} />
              <span>info@eotra.com</span>
            </a>
            <RollButton label={isSending ? 'Sending…' : 'Send request'} variant="orange" size="hero" onClick={() => !isSending && void submit()} />
          </div>
          {/* lets the Enter key send the form */}
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
