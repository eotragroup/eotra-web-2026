import { goToBlog, goToConnect, goToFaq } from '../lib/nav';
import { smoothScrollTo } from '../lib/smoothScroll';
import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Menu, X } from 'lucide-react';
import { RollButton } from './RollButton';

interface NavbarProps {
  onOpenInquiry: (subject?: string) => void;
  onNavigateHome?: (sectionId?: string) => void;
  onNavigateToTeam?: () => void;
  /** Always use the dark glass (otherwise it switches by itself, depending on the section behind it) */
  dark?: boolean;
}

export function Navbar({ onOpenInquiry, onNavigateHome, onNavigateToTeam, dark: forceDark = false }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [onDark, setOnDark] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const dark = forceDark || onDark;

  // Glass follows the page: dark glass over sections marked data-nav-theme="dark", light glass elsewhere
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const header = headerRef.current;
      if (!header) return;
      const r = header.getBoundingClientRect();
      const stack = document.elementsFromPoint(window.innerWidth / 2, r.top + r.height / 2);
      const behind = stack.find((el) => !header.contains(el));
      setOnDark(behind?.closest('[data-nav-theme]')?.getAttribute('data-nav-theme') === 'dark');
    };
    const schedule = () => {
      if (!raf) raf = requestAnimationFrame(check);
    };
    check();
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    const t = window.setTimeout(check, 400);
    return () => {
      window.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      window.clearTimeout(t);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    if (onNavigateHome) {
      onNavigateHome(id);
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      smoothScrollTo(element);
    }
  };

  const handleBlogClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    goToBlog();
  };

  const handleFaqClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    goToFaq();
  };

  const handleTeamClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigateToTeam) {
      onNavigateToTeam();
    } else if (window.location.pathname === '/team') {
      smoothScrollTo(0);
    } else {
      window.history.pushState({}, '', '/team');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  const menuItems: { label: string; href: string; onClick: (e: React.MouseEvent) => void }[] = [
    { label: 'Projects', href: '#projects', onClick: (e) => { e.preventDefault(); scrollToSection('projects'); } },
    { label: 'Services', href: '#services', onClick: (e) => { e.preventDefault(); scrollToSection('services'); } },
    { label: 'Company', href: '#company', onClick: (e) => { e.preventDefault(); scrollToSection('company'); } },
    { label: 'Solutions', href: '#solutions', onClick: (e) => { e.preventDefault(); scrollToSection('solutions'); } },
    { label: 'Team', href: '/team', onClick: handleTeamClick },
    { label: 'FAQ', href: '/faq', onClick: handleFaqClick },
    { label: 'Blog', href: '/blog', onClick: handleBlogClick },
    { label: 'Connect', href: '/connect', onClick: (e) => { e.preventDefault(); setMobileMenuOpen(false); goToConnect(); } },
  ];

  return (
    <>
      {/* Keeps the space the floating bar takes up */}
      <div aria-hidden="true" className="h-[72px] sm:h-[80px]" />
      <header ref={headerRef} className="fixed top-0 inset-x-0 z-40 pointer-events-none">
        <div className="w-full max-w-[1440px] mx-auto p-2 sm:p-3">
        <nav
          aria-label="Primary navigation"
          className={`pointer-events-auto rounded-full p-[5px] flex items-center justify-between border backdrop-blur-xl backdrop-saturate-150 transition-[background-color,border-color,box-shadow] duration-300 ${
            dark
              ? 'bg-white/[0.08] border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]'
              : 'bg-white/60 border-gray-200/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]'
          }`}
        >
          {/* LEFT: Logo + Desktop Nav Links */}
          <div className="flex items-center">
            <a
              href="/"
              onClick={(e) => {
                if (onNavigateHome) {
                  e.preventDefault();
                  onNavigateHome();
                }
              }}
              className="flex items-center shrink-0 pl-3.5 sm:pl-4 pr-1 py-1"
              aria-label="Eotra Home"
            >
              <span className="overflow-hidden inline-flex items-center">
                <img
                  src="/assets/aistudio/Eotra_aef517cd.svg"
                  alt="Eotra"
                  className={`h-[32px] sm:h-[36px] w-auto max-w-none -ml-3.5 -mr-7 ${dark ? 'brightness-0 invert' : ''}`}
                />
              </span>
            </a>

            <div className="hidden md:flex items-center gap-6 ml-6">
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('projects');
                }}
                className={`text-[14px] transition-colors duration-300 whitespace-nowrap shrink-0 ${dark ? 'text-white/85 hover:text-white' : 'text-gray-900 hover:text-gray-500'}`}
              >
                Projects
              </a>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('services');
                }}
                className={`text-[14px] transition-colors duration-300 whitespace-nowrap shrink-0 ${dark ? 'text-white/85 hover:text-white' : 'text-gray-900 hover:text-gray-500'}`}
              >
                Services
              </a>
              <a
                href="#company"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('company');
                }}
                className={`text-[14px] transition-colors duration-300 whitespace-nowrap shrink-0 ${dark ? 'text-white/85 hover:text-white' : 'text-gray-900 hover:text-gray-500'}`}
              >
                Company
              </a>
              <a
                href="#solutions"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('solutions');
                }}
                className={`text-[14px] transition-colors duration-300 whitespace-nowrap shrink-0 ${dark ? 'text-white/85 hover:text-white' : 'text-gray-900 hover:text-gray-500'}`}
              >
                Solutions
              </a>
              <a
                href="/team"
                onClick={handleTeamClick}
                className={`text-[14px] transition-colors duration-300 whitespace-nowrap shrink-0 ${dark ? 'text-white/85 hover:text-white' : 'text-gray-900 hover:text-gray-500'}`}
              >
                Team
              </a>
              <a
                href="/faq"
                onClick={handleFaqClick}
                className={`text-[14px] transition-colors duration-300 whitespace-nowrap shrink-0 ${dark ? 'text-white/85 hover:text-white' : 'text-gray-900 hover:text-gray-500'}`}
              >
                FAQ
              </a>
              <a
                href="/blog"
                onClick={handleBlogClick}
                className={`text-[14px] transition-colors duration-300 whitespace-nowrap shrink-0 ${dark ? 'text-white/85 hover:text-white' : 'text-gray-900 hover:text-gray-500'}`}
              >
                Blog
              </a>
              <button
                type="button"
                onClick={() => goToConnect()}
                className={`text-[14px] transition-colors duration-300 whitespace-nowrap shrink-0 cursor-pointer ${dark ? 'text-white/85 hover:text-white' : 'text-gray-900 hover:text-gray-500'}`}
              >
                Connect
              </button>
            </div>
          </div>

          {/* RIGHT: CTA */}
          <div className="hidden md:flex items-center gap-5">
            <RollButton
              label="Book a demo"
              variant={dark ? 'light' : 'dark'}
              size="nav"
              onClick={() => onOpenInquiry('Book an Eotra Demo')}
            />
          </div>

          {/* MOBILE TOGGLE */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className={`md:hidden rounded-full px-4 py-2 text-[13px] font-medium flex items-center gap-2 cursor-pointer ${dark ? 'bg-white text-gray-900' : 'bg-gray-900 text-white'}`}
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
            {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </nav>

        {/* PHONE MENU: the glass bar opens downwards into a glass panel of pill links */}
        {mobileMenuOpen && (
          <div
            aria-hidden="true"
            className="fixed inset-0 -z-10 md:hidden pointer-events-auto bg-black/25 backdrop-blur-[2px]"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
        <div
          className={`md:hidden pointer-events-auto grid transition-[grid-template-rows,margin] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            mobileMenuOpen ? 'grid-rows-[1fr] mt-2' : 'grid-rows-[0fr] mt-0'
          }`}
          aria-hidden={!mobileMenuOpen}
        >
          <div className="overflow-hidden">
            <div
              className={`rounded-[28px] border backdrop-blur-xl backdrop-saturate-150 p-3 ${
                dark
                  ? 'bg-white/[0.10] border-white/15 shadow-[inset_0_1px_0_rgba(255,255,255,0.18)]'
                  : 'bg-white/70 border-gray-200/80 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)]'
              }`}
            >
              <div className="grid grid-cols-2 gap-2">
                {menuItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    tabIndex={mobileMenuOpen ? 0 : -1}
                    onClick={item.onClick}
                    className={`rounded-full px-4 py-3 text-center text-[15px] font-medium transition-colors ${
                      dark
                        ? 'bg-white/10 text-white hover:bg-white/20'
                        : 'bg-gray-900/[0.06] text-gray-900 hover:bg-gray-900/10'
                    }`}
                  >
                    {item.label}
                  </a>
                ))}
              </div>

              <button
                type="button"
                tabIndex={mobileMenuOpen ? 0 : -1}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenInquiry('Get Started with Eotra');
                }}
                className="mt-2 w-full bg-[#0400F5] hover:bg-[#0300cc] text-white rounded-full pl-6 pr-2 py-2.5 text-[14px] font-medium flex items-center justify-between transition-colors duration-300 cursor-pointer"
              >
                <span>Get started now</span>
                <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <ArrowRight className="w-4 h-4 text-[#0400F5]" />
                </span>
              </button>

              <div className={`mt-3 px-2 pb-1 flex items-center justify-between text-[12px] ${dark ? 'text-white/60' : 'text-gray-500'}`}>
                <a href="mailto:info@eotra.com" tabIndex={mobileMenuOpen ? 0 : -1} className="hover:underline">
                  info@eotra.com
                </a>
                <span>&copy; 2026 Eotra Inc.</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </header>
    </>
  );
}
