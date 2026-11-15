import { useEffect, useRef, useState, type FormEvent, type ReactNode } from 'react';
import { ArrowRight, Bot, Check, CheckCircle2, Mail, MessageCircle, MessageSquare, Send, X } from 'lucide-react';
import { useI18n } from '../i18n';
import { CONTACT_EMAIL, PHONE_DISPLAY, WHATSAPP_NUMBER } from '../data/contact';
import { goToConnect } from '../lib/nav';
import { suggestEmail } from '../lib/emailTypos';

type Tab = 'chat' | 'whatsapp' | 'email';
interface Lead {
  name: string;
  email: string;
  phone: string;
  service: string;
  summary: string;
}

interface Msg {
  role: 'user' | 'assistant';
  content: string;
  /** Set when the assistant understood the need and it is time to continue on the Connect page */
  handoff?: { service: string; summary: string } | null;
}

const MAX_USER_MESSAGES = 12;

function WhatsAppIcon({ size = 18 }: { size?: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.9 11.9 0 0 0 12.04 0C5.5 0 .2 5.3.2 11.84c0 2.08.54 4.1 1.58 5.9L0 24l6.4-1.68a11.8 11.8 0 0 0 5.64 1.44h.01c6.54 0 11.84-5.3 11.84-11.84 0-3.16-1.23-6.13-3.37-8.44ZM12.05 21.76h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.8 1 1.02-3.7-.24-.38a9.86 9.86 0 0 1-1.5-5.25c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.98 2.9a9.8 9.8 0 0 1 2.9 6.99c0 5.45-4.44 9.9-9.85 9.9Zm5.43-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.22 3.08.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35Z" />
    </svg>
  );
}

/** Floating contact button: opens a small panel with an AI chat, WhatsApp and an email form. */
export function ContactWidget() {
  const { t, lang } = useI18n();
  const hasWhatsApp = WHATSAPP_NUMBER.trim() !== '';
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>('chat');

  // chat
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [draft, setDraft] = useState('');
  const [busy, setBusy] = useState(false);
  const [chatError, setChatError] = useState('');
  const [leadStatus, setLeadStatus] = useState<'idle' | 'sent' | 'failed'>('idle');
  const leadSentRef = useRef(false);
  const [pendingLead, setPendingLead] = useState<{ lead: Lead; convo: Msg[]; suggestion: string } | null>(null);
  const [failedLead, setFailedLead] = useState<{ lead: Lead; convo: Msg[] } | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // email
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [mailError, setMailError] = useState('');
  const [mailHint, setMailHint] = useState<string | null>(null);
  const [mailOk, setMailOk] = useState('');

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight, behavior: 'smooth' });
  }, [msgs, busy, tab]);

  const userCount = msgs.filter((m) => m.role === 'user').length;

  // The assistant collected the visitor's details: send them to the team (with the whole conversation)
  const sendLead = async (lead: Lead, convo: Msg[]) => {
    if (leadSentRef.current) return;
    leadSentRef.current = true;
    setPendingLead(null);
    setFailedLead(null);
    setLeadStatus('idle');
    const transcript = convo.map((m) => `${m.role === 'user' ? 'Visitor' : 'Assistant'}: ${m.content}`).join('\n');
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: lead.name,
          email: lead.email,
          phone: lead.phone || 'Not provided',
          services: lead.service,
          summary: lead.summary || 'Not provided',
          conversation: transcript.slice(0, 3500),
          language: lang,
          inquirySubject: `Website chat lead: ${lead.service}`,
          _subject: `New chat lead: ${lead.name} (${lead.service})`,
          _template: 'table',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.success === 'false' || data?.success === false) throw new Error('send failed');
      setLeadStatus('sent');
    } catch {
      leadSentRef.current = false;
      setFailedLead({ lead, convo });
      setLeadStatus('failed');
    }
  };

  // Before sending, double-check an email that looks like a typo of a popular provider ("gamil.com")
  const handleLead = (lead: Lead, convo: Msg[]) => {
    const suggestion = suggestEmail(lead.email);
    if (suggestion) setPendingLead({ lead, convo, suggestion });
    else void sendLead(lead, convo);
  };

  const send = async (text: string) => {
    const content = text.trim().slice(0, 500);
    if (!content || busy) return;
    if (userCount >= MAX_USER_MESSAGES) {
      setChatError(t('This chat is getting long. Please continue on WhatsApp or by email.'));
      return;
    }
    const next: Msg[] = [...msgs, { role: 'user', content }];
    setMsgs(next);
    setDraft('');
    setChatError('');
    setBusy(true);
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next.slice(-10), lang }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data?.reply) throw new Error('chat failed');
      const full: Msg[] = [...next, { role: 'assistant', content: String(data.reply), handoff: data.handoff ?? null }];
      setMsgs(full);
      if (data.lead) handleLead(data.lead, full);
    } catch {
      setChatError(t('Sorry, the assistant is not available right now. Please use email or WhatsApp.'));
    } finally {
      setBusy(false);
    }
  };

  const submitEmail = async (e: FormEvent) => {
    e.preventDefault();
    if (sending) return;
    if (!name.trim()) return setMailError(t('Please enter your name.'));
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) return setMailError(t('Please enter a valid email address.'));
    const typo = suggestEmail(email);
    if (typo && mailOk !== email.trim()) {
      setMailError('');
      return setMailHint(typo);
    }
    if (!message.trim()) return setMailError(t('Please write a short message.'));
    setMailError('');
    setSending(true);
    try {
      const res = await fetch(`https://formsubmit.co/ajax/${CONTACT_EMAIL}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          inquirySubject: 'Message from the website contact button',
          _subject: `New message from ${name.trim()} (website contact button)`,
          _template: 'table',
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data?.success === 'false' || data?.success === false) throw new Error('send failed');
      setSent(true);
    } catch {
      setMailError(t('Sorry, we could not send your request. Please try again or email us at info@eotra.com.'));
    } finally {
      setSending(false);
    }
  };

  const waText = encodeURIComponent(lang === 'ar' ? 'مرحبًا إوترا، أود الاستفسار عن خدماتكم.' : 'Hello Eotra, I would like to ask about your services.');
  const suggestions = [t('I run a retail business'), t('I need a website or app'), t('I want a quote')];

  const tabs: { id: Tab; label: string; icon: ReactNode }[] = [
    { id: 'chat', label: t('AI assistant'), icon: <Bot size={14} /> },
    ...(hasWhatsApp ? [{ id: 'whatsapp' as Tab, label: 'WhatsApp', icon: <WhatsAppIcon size={14} /> }] : []),
    { id: 'email', label: t('Email'), icon: <Mail size={14} /> },
  ];

  const field =
    'w-full rounded-full bg-gray-900/[0.06] px-4 py-2.5 text-[14px] text-gray-900 placeholder:text-gray-400 focus:bg-gray-900/10 focus:outline-none transition-colors';

  return (
    // Always at the bottom-right corner, also on the Arabic site (the layout inside the panel still follows the language)
    <aside aria-label={t('Quick contact')} dir="ltr" style={{ right: 'var(--cw-right)' }} className="cw-anchor fixed bottom-5 sm:bottom-6 z-40 pointer-events-none">
      {/* Always mounted so it can open and close smoothly (grows from the button) */}
      {(
        <div
          role="dialog"
          aria-label={t('Contact Eotra')}
          aria-hidden={!open}
          inert={!open}
          dir={lang === 'ar' ? 'rtl' : 'ltr'}
          style={{ right: 0, left: 'auto' }}
          className={`absolute bottom-[calc(100%+0.75rem)] w-[calc(100vw-2.5rem)] sm:w-[380px] max-h-[min(640px,calc(100dvh-7.5rem))] flex flex-col rounded-[28px] bg-white/95 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.18)] overflow-hidden origin-bottom-right transition-[opacity,transform,visibility] duration-300 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            open ? 'opacity-100 translate-y-0 scale-100 visible pointer-events-auto' : 'opacity-0 translate-y-4 scale-90 invisible pointer-events-none'
          }`}
        >
          {/* Header */}
          <div className="px-5 pt-5 pb-3">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-[17px] font-medium text-gray-900 tracking-[-0.01em]">{t('How can we help?')}</p>
                <p className="mt-0.5 text-[13px] text-gray-500">{t('Ask our assistant, message us on WhatsApp, or send an email.')}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('Close')}
                className="w-8 h-8 shrink-0 rounded-full bg-gray-900/[0.06] hover:bg-gray-900/10 flex items-center justify-center text-gray-700 cursor-pointer transition-colors"
              >
                <X size={15} />
              </button>
            </div>
            <div className="mt-4 flex gap-1.5" role="tablist">
              {tabs.map((x) => (
                <button
                  key={x.id}
                  type="button"
                  role="tab"
                  aria-selected={tab === x.id}
                  onClick={() => setTab(x.id)}
                  className={`flex-1 min-w-0 inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-full px-2 py-2 text-[12.5px] font-medium transition-colors cursor-pointer ${
                    tab === x.id ? 'bg-gray-900 text-white' : 'bg-gray-900/[0.06] text-gray-900 hover:bg-gray-900/10'
                  }`}
                >
                  {x.icon}
                  {x.label}
                </button>
              ))}
            </div>
          </div>

          {/* Chat */}
          {tab === 'chat' && (
            <div className="flex flex-col min-h-0 flex-1 px-5 pb-5">
              <div ref={listRef} data-lenis-prevent className="flex-1 min-h-[220px] max-h-[340px] overflow-y-auto space-y-2.5 pe-1 py-1">
                <div className="max-w-[88%] rounded-2xl rounded-ss-md bg-gray-900/[0.06] px-3.5 py-2.5 text-[14px] text-gray-900 leading-relaxed">
                  {t('Hi! I am the Eotra assistant. Tell me about your business and what you need, and I will point you to the right solution.')}
                </div>
                {msgs.map((m, i) => (
                  <div
                    key={i}
                    className={`cw-msg max-w-[88%] rounded-2xl px-3.5 py-2.5 text-[14px] leading-relaxed whitespace-pre-wrap ${
                      m.role === 'user' ? 'ms-auto rounded-se-md bg-[#0400F5] text-white' : 'rounded-ss-md bg-gray-900/[0.06] text-gray-900'
                    }`}
                  >
                    {m.content}
                    {m.handoff && (
                      <button
                        type="button"
                        onClick={() => {
                          setOpen(false);
                          goToConnect(`Chat: ${m.handoff!.service}`, m.handoff!.summary ? `From the website chat: ${m.handoff!.summary}` : undefined);
                        }}
                        className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#0400F5] hover:bg-[#0300cc] text-white px-4 py-2.5 text-[13.5px] font-medium transition-colors cursor-pointer"
                      >
                        {t('Continue to the quote form')}
                        <ArrowRight size={15} />
                      </button>
                    )}
                  </div>
                ))}
                {busy && (
                  <div className="max-w-[88%] rounded-2xl rounded-ss-md bg-gray-900/[0.06] px-3.5 py-3 inline-flex gap-1" aria-label={t('Typing')}>
                    {[0, 1, 2].map((d) => (
                      <span key={d} className="w-1.5 h-1.5 rounded-full bg-gray-400 animate-pulse" style={{ animationDelay: `${d * 150}ms` }} />
                    ))}
                  </div>
                )}
                {msgs.length === 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {suggestions.map((s) => (
                      <button
                        key={s}
                        type="button"
                        onClick={() => void send(s)}
                        className="rounded-full bg-white border border-gray-200 px-3 py-1.5 text-[12.5px] text-gray-800 hover:bg-gray-50 cursor-pointer transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              {leadStatus === 'sent' && (
                <p className="mt-2 inline-flex items-center gap-1.5 text-[12.5px] text-emerald-700">
                  <CheckCircle2 size={14} /> {t('Your details were sent to the Eotra team.')}
                </p>
              )}
              {pendingLead && (
                <div className="mt-2 rounded-2xl bg-amber-50 px-3.5 py-2.5 text-[13px] text-gray-800" role="status">
                  {t('Is your email')} <span dir="ltr" className="font-medium">{pendingLead.suggestion}</span>?
                  <div className="mt-2 flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => void sendLead({ ...pendingLead.lead, email: pendingLead.suggestion }, pendingLead.convo)}
                      className="rounded-full bg-[#0400F5] text-white px-3.5 py-1.5 text-[12.5px] font-medium cursor-pointer"
                    >
                      {t('Yes, use it')}
                    </button>
                    <button
                      type="button"
                      onClick={() => void sendLead(pendingLead.lead, pendingLead.convo)}
                      className="rounded-full bg-white border border-gray-200 px-3.5 py-1.5 text-[12.5px] cursor-pointer"
                    >
                      {t('No, keep mine')}
                    </button>
                  </div>
                </div>
              )}
              {leadStatus === 'failed' && failedLead && (
                <div className="mt-2 text-[12.5px] text-red-600" role="alert">
                  {t('We could not send your details.')}{' '}
                  <button type="button" className="underline font-medium cursor-pointer" onClick={() => void sendLead(failedLead.lead, failedLead.convo)}>
                    {t('Try again')}
                  </button>
                  {' · '}
                  <a
                    className="underline font-medium"
                    href={`mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(`Chat lead: ${failedLead.lead.service}`)}&body=${encodeURIComponent(
                      `Name: ${failedLead.lead.name}\nEmail: ${failedLead.lead.email}\nPhone: ${failedLead.lead.phone || '-'}\nService: ${failedLead.lead.service}\nSummary: ${failedLead.lead.summary}`,
                    )}`}
                  >
                    {t('Send by email')}
                  </a>
                </div>
              )}
              {chatError && <p className="mt-2 text-[12.5px] text-red-600" role="alert">{chatError}</p>}
              <form
                className="mt-3 flex items-center gap-2"
                onSubmit={(e) => {
                  e.preventDefault();
                  void send(draft);
                }}
              >
                <input
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  maxLength={500}
                  placeholder={t('Type your question…')}
                  aria-label={t('Type your question…')}
                  className={field}
                />
                <button
                  type="submit"
                  disabled={busy || !draft.trim()}
                  aria-label={t('Send')}
                  className="w-10 h-10 shrink-0 rounded-full bg-[#0400F5] hover:bg-[#0300cc] disabled:opacity-40 text-white flex items-center justify-center cursor-pointer transition-colors"
                >
                  <Send size={16} className="rtl:-scale-x-100" />
                </button>
              </form>
            </div>
          )}

          {/* WhatsApp */}
          {tab === 'whatsapp' && hasWhatsApp && (
            <div className="px-5 pb-5">
              <div className="rounded-3xl bg-gray-50 p-5">
                <span className="w-11 h-11 rounded-full bg-[#25D366] text-white flex items-center justify-center">
                  <WhatsAppIcon size={22} />
                </span>
                <p className="mt-4 text-[15px] font-medium text-gray-900">{t('Chat with our team on WhatsApp')}</p>
                <p className="mt-1 text-[13px] text-gray-500 leading-relaxed">{t('Message us any time. We usually reply within one business day.')}</p>
                <p className="mt-2 text-[14px] font-medium text-gray-900" dir="ltr">{PHONE_DISPLAY}</p>
                <a
                  href={`https://wa.me/${WHATSAPP_NUMBER}?text=${waText}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] hover:bg-[#1fb957] text-white px-5 py-2.5 text-[14px] font-medium transition-colors"
                >
                  <WhatsAppIcon size={16} />
                  {t('Open WhatsApp')}
                </a>
              </div>
            </div>
          )}

          {/* Email */}
          {tab === 'email' && (
            <div className="px-5 pb-5 overflow-y-auto" data-lenis-prevent>
              {sent ? (
                <div className="rounded-3xl bg-gray-50 p-5">
                  <span className="w-11 h-11 rounded-full bg-white flex items-center justify-center text-[#0400F5]">
                    <CheckCircle2 size={22} />
                  </span>
                  <p className="mt-4 text-[15px] font-medium text-gray-900">{t('Thank you,')} {name.trim().split(' ')[0]}.</p>
                  <p className="mt-1 text-[13px] text-gray-500 leading-relaxed">{t('We received your message and will reply within one business day.')}</p>
                </div>
              ) : (
                <form onSubmit={submitEmail} noValidate className="space-y-2.5">
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder={t('Your name')} aria-label={t('Your name')} autoComplete="name" className={field} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setMailHint(null);
                    }}
                    placeholder={t('Your email')}
                    aria-label={t('Your email')}
                    autoComplete="email"
                    className={field}
                  />
                  {mailHint && (
                    <p className="text-[12.5px] text-gray-700" role="status">
                      {t('Did you mean')} <span dir="ltr" className="font-medium">{mailHint}</span>?{' '}
                      <button type="button" className="underline font-medium cursor-pointer" onClick={() => { setEmail(mailHint); setMailHint(null); }}>{t('Yes, use it')}</button>
                      {' · '}
                      <button type="button" className="underline cursor-pointer" onClick={() => { setMailOk(email.trim()); setMailHint(null); }}>{t('No, keep mine')}</button>
                    </p>
                  )}
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    placeholder={t('How can we help?')}
                    aria-label={t('How can we help?')}
                    className="w-full rounded-3xl bg-gray-900/[0.06] px-4 py-3 text-[14px] text-gray-900 placeholder:text-gray-400 focus:bg-gray-900/10 focus:outline-none transition-colors resize-none"
                  />
                  {mailError && <p className="text-[12.5px] text-red-600" role="alert">{mailError}</p>}
                  <div className="flex items-center justify-between gap-3 pt-1">
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-[12.5px] text-gray-500 hover:text-gray-900 transition-colors" dir="ltr">
                      {CONTACT_EMAIL}
                    </a>
                    <button
                      type="submit"
                      disabled={sending}
                      className="inline-flex items-center gap-2 rounded-full bg-[#0400F5] hover:bg-[#0300cc] disabled:opacity-60 text-white px-5 py-2.5 text-[14px] font-medium transition-colors cursor-pointer"
                    >
                      {sending ? t('Sending…') : t('Send message')}
                      {!sending && <Check size={15} />}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      )}

      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? t('Close') : t('Open contact chat')}
        title={t('Contact Eotra')}
        className="pointer-events-auto group relative flex items-center justify-center w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] bg-gray-950 hover:bg-black text-white rounded-full shadow-2xl hover:shadow-black/40 transition-all duration-200 ease-out hover:scale-105 active:scale-95 cursor-pointer border border-white/15"
      >
        <MessageSquare
          size={22}
          className={`absolute shrink-0 transition-all duration-300 ease-out ${open ? 'opacity-0 rotate-90 scale-50' : 'opacity-100 rotate-0 scale-100'}`}
        />
        <X
          size={22}
          className={`absolute shrink-0 transition-all duration-300 ease-out ${open ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-90 scale-50'}`}
        />
      </button>
    </aside>
  );
}
