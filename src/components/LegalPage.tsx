import { useEffect } from 'react';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { useI18n } from '../i18n';
import { RevealWords } from './RevealWords';
import { usePageAnimations } from '../lib/pageAnimations';

export type LegalKind = 'privacy' | 'terms' | 'security';

interface PageProps {
  kind: LegalKind;
  onNavigateHome: (sectionId?: string) => void;
  onOpenInquiry: (subject?: string) => void;
  onNavigateToTeam?: () => void;
  onSelectProduct?: (id: string) => void;
}

const UPDATED = 'November 2026';

const DOCS: Record<LegalKind, { title: string; intro: string; sections: { h: string; p: string[] }[] }> = {
  privacy: {
    title: 'Privacy Policy',
    intro: 'This policy explains what personal data Eotra collects through this website, why we collect it, and the choices you have.',
    sections: [
      {
        h: 'Who we are',
        p: ['Eotra is a software company based in Istanbul, Türkiye. You can reach us about anything in this policy at info@eotra.com.'],
      },
      {
        h: 'What we collect',
        p: [
          'Contact and quote forms: your name, email address, optional phone number, the services you are interested in, your budget range and anything you write in the message.',
          'Newsletter: your email address.',
          'Blog: we count how many times each article is opened. This count is anonymous and is not linked to you.',
        ],
      },
      {
        h: 'How we use it',
        p: [
          'We use form details only to reply to you, prepare a proposal and keep a record of our conversation. We send newsletter emails only to people who signed up, and you can unsubscribe at any time.',
          'We do not sell your personal data and we do not use it for advertising.',
        ],
      },
      {
        h: 'Who handles it',
        p: [
          'Form submissions are delivered to our inbox through an email-forwarding service. The website is hosted on Cloudflare. These providers process data only to deliver the service to us.',
        ],
      },
      {
        h: 'Cookies and storage',
        p: ['This site does not use advertising or tracking cookies. If we add analytics in the future, we will update this page.'],
      },
      {
        h: 'How long we keep it',
        p: ['We keep enquiry details for as long as needed to handle your request and our business relationship, then delete them.'],
      },
      {
        h: 'Your rights',
        p: [
          'You can ask us to access, correct or delete your personal data, or to stop contacting you, by emailing info@eotra.com. Where applicable law gives you further rights (for example under KVKK or GDPR), we will honour them.',
        ],
      },
      {
        h: 'Changes',
        p: ['We may update this policy from time to time. The date at the top shows when it last changed.'],
      },
    ],
  },
  terms: {
    title: 'Terms of Service',
    intro: 'By using the Eotra website you agree to these terms. If you do not agree, please do not use the site.',
    sections: [
      {
        h: 'Using the site',
        p: ['You may browse this site and contact us through it for lawful purposes. You must not misuse it, attempt to disrupt it or try to access it in an unauthorised way.'],
      },
      {
        h: 'Our content',
        p: ['The text, design, logos and images on this site belong to Eotra or its clients and are protected by intellectual property laws. Client names and logos appear with their permission. You may not copy or reuse them without written consent.'],
      },
      {
        h: 'Information on this site',
        p: ['We work to keep the information accurate, but it is provided for general purposes and may change. Nothing here is a binding offer. Any project is governed by a separate written agreement.'],
      },
      {
        h: 'Links to other sites',
        p: ['This site links to client and third-party websites. We do not control them and are not responsible for their content or practices.'],
      },
      {
        h: 'Liability',
        p: ['To the extent permitted by law, Eotra is not liable for any loss arising from your use of this website. Nothing in these terms limits liability that cannot be limited by law.'],
      },
      {
        h: 'Governing law',
        p: ['These terms are governed by the laws of the Republic of Türkiye. Disputes are subject to the courts of Istanbul.'],
      },
      {
        h: 'Contact',
        p: ['Questions about these terms: info@eotra.com.'],
      },
    ],
  },
  security: {
    title: 'Security',
    intro: 'How we protect the website and the information you share with us.',
    sections: [
      {
        h: 'In transit',
        p: ['All traffic to this site is encrypted with HTTPS.'],
      },
      {
        h: 'Hosting',
        p: ['The site runs on Cloudflare’s global network, which provides protection against common web attacks and denial-of-service traffic.'],
      },
      {
        h: 'Your information',
        p: ['Enquiries are delivered to a limited set of Eotra team members and are never published. We collect only what is needed to answer you.'],
      },
      {
        h: 'How we build',
        p: ['Our own products are built with access controls, code review and automated testing, and we keep dependencies up to date.'],
      },
      {
        h: 'Report a vulnerability',
        p: ['If you believe you have found a security problem, please email info@eotra.com with the details. We will investigate and reply as soon as we can. Please give us reasonable time to fix an issue before sharing it publicly.'],
      },
    ],
  },
};

export function LegalPage({ kind, onNavigateHome, onOpenInquiry, onNavigateToTeam, onSelectProduct }: PageProps) {
  const { t } = useI18n();
  usePageAnimations(kind);
  const doc = DOCS[kind];
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [kind]);

  return (
    <div className="min-h-screen bg-white text-gray-900 antialiased">
      <section className="relative flex flex-col bg-white">
        <Navbar onOpenInquiry={onOpenInquiry} onNavigateHome={onNavigateHome} onNavigateToTeam={onNavigateToTeam} />
      </section>

      <section className="bg-white pt-10 sm:pt-14 lg:pt-16 pb-16 sm:pb-24">
        <div className="max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          <div className="lg:col-span-5">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-3.5 py-1.5 text-[12px] sm:text-[13px] font-medium text-gray-900">
              {t('Updated')} {t(UPDATED)}
            </span>
            <h1 className="mt-6 text-[clamp(2.25rem,5.5vw,4.25rem)] font-medium leading-[1.03] tracking-[-0.03em] text-gray-900"><RevealWords text={t(doc.title)} /></h1>
            <p className="mt-5 text-[16px] sm:text-[18px] text-gray-500 leading-relaxed max-w-md">{t(doc.intro)}</p>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-2.5">
            {doc.sections.map((s) => (
              <div key={s.h} className="rounded-3xl bg-gray-50 px-6 sm:px-8 py-6 sm:py-7">
                <h2 className="text-[18px] sm:text-[20px] font-medium tracking-[-0.01em] text-gray-900">{t(s.h)}</h2>
                <div className="mt-3 space-y-3 text-[15px] sm:text-[16px] text-gray-600 leading-relaxed">
                  {s.p.map((x) => (
                    <p key={x}>{t(x)}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer
        onNavigateHome={() => onNavigateHome()}
        onOpenInquiry={onOpenInquiry}
        onNavigateToProduct={(id) => onSelectProduct?.(id)}
        onNavigateToTeam={onNavigateToTeam}
      />
    </div>
  );
}
