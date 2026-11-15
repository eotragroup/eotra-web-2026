import { useEffect, useRef, useState, FormEvent } from 'react';
import {
  Check,
  CheckCircle2,
  ChevronDown,
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
  { label: 'Retail platform (POS, WMS, ERP, CRM)', match: /point of sale|wms|inventory|crm|loyalty|retail platform/i, Icon: Store },
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
}

// Drop-down select for the services. Several can be chosen; the list opens in the page flow so it never gets clipped.
function ServiceSelect({ selected, onToggle }: { selected: string[]; onToggle: (label: string) => void }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const chosen = SERVICES.filter((s) => selected.includes(s.label));
  const only = chosen.length === 1 ? chosen[0] : null;

  return (
    <div ref={ref}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`w-full flex items-center justify-between gap-3 rounded-xl border px-3.5 py-3 text-left text-[14px] transition-colors cursor-pointer ${
          open ? 'border-gray-900' : 'border-gray-200 hover:border-gray-900'
        }`}
      >
        <span className="flex items-center gap-2.5 min-w-0">
          {only && (
            <span className="w-7 h-7 shrink-0 rounded-lg bg-gray-100 text-gray-700 flex items-center justify-center">
              <only.Icon size={15} strokeWidth={1.8} />
            </span>
          )}
          <span className={`truncate ${chosen.length ? 'text-gray-900 font-medium' : 'text-gray-400'}`}>
            {chosen.length === 0 ? 'Select a service' : chosen.map((c) => c.label).join(', ')}
          </span>
        </span>
        <ChevronDown size={16} className={`shrink-0 text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>

      {open && (
        <div
          role="listbox"
          aria-multiselectable="true"
          aria-label="Services"
          data-lenis-prevent
          className="mt-2 rounded-xl border border-gray-200 bg-white p-1.5 max-h-72 overflow-y-auto shadow-[0_12px_30px_rgba(0,0,0,0.08)]"
        >
          {SERVICES.map((s) => {
            const on = selected.includes(s.label);
            return (
              <button
                key={s.label}
                type="button"
                role="option"
                aria-selected={on}
                onClick={() => onToggle(s.label)}
                className={`w-full flex items-center gap-3 rounded-lg px-2.5 py-2 text-left text-[14px] transition-colors cursor-pointer ${
                  on ? 'bg-gray-100 text-gray-900 font-medium' : 'text-gray-800 hover:bg-gray-50'
                }`}
              >
                <span className="w-8 h-8 shrink-0 rounded-lg bg-white border border-gray-200 text-gray-700 flex items-center justify-center">
                  <s.Icon size={16} strokeWidth={1.8} />
                </span>
                <span className="flex-1">{s.label}</span>
                {on && <Check size={16} className="shrink-0 text-gray-900" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function InquiryForm({ subject, onClose, showClose = true, doneLabel = 'Done' }: InquiryFormProps) {
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

  const pill = (selected: boolean) =>
    `rounded-full border px-4 py-2 text-[13px] font-medium transition-colors cursor-pointer ${
      selected ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-900 hover:border-gray-900'
    }`;

  const field = 'w-full rounded-xl border border-gray-200 px-3.5 py-2.5 text-[14px] text-gray-900 focus:outline-none focus:border-gray-900';
  const sectionLabel = 'block text-[13px] font-semibold text-gray-900 mb-3';

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
            We received your request{isProject && services.length ? ` for ${services.join(', ')}` : ''}. We will reply to {email.trim()} within one business day.
          </p>
          <RollButton label={doneLabel} variant="dark" size="hero" onClick={onClose} />
        </div>
      ) : (
        <form onSubmit={onFormSubmit} noValidate>
          <div className="flex items-start justify-between gap-4 mb-6">
            <h3 id="inquiry-modal-title" className="text-2xl font-medium tracking-tight text-gray-900">
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
              </div>
            </div>

            {/* 2. What they need and the budget */}
            {isProject && (
              <>
                <div>
                  <span className={sectionLabel}>What do you need? <span className="text-gray-400 font-normal">Choose one or more</span></span>
                  <ServiceSelect selected={services} onToggle={toggleService} />
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
              <label htmlFor="inquiry-notes" className="block text-[13px] font-medium text-gray-700 mb-1.5">
                Anything else? <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <textarea id="inquiry-notes" rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Tell us a little about your project" className={`${field} resize-none`} />
            </div>
          </div>

          {error && (
            <p className="mt-5 text-[13px] text-red-600" role="alert">
              {error}
            </p>
          )}

          <div className="mt-7 flex items-center justify-between gap-3">
            <a href="mailto:info@eotra.com" className="inline-flex items-center gap-1.5 text-[13px] text-gray-600 hover:text-gray-900">
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
