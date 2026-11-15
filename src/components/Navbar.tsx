import { goToBlog, goToCompany, goToConnect, goToFaq, goToReferences, goToService, goToSolutions } from '../lib/nav';
import { SERVICES } from '../data/services';
import { smoothScrollTo } from '../lib/smoothScroll';
import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Minus, Plus } from 'lucide-react';
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
  const [hidden, setHidden] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [menuLeft, setMenuLeft] = useState(0);
  const wrapRef = useRef<HTMLDivElement>(null);
  const servicesLinkRef = useRef<HTMLAnchorElement>(null);
  const lastY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const dark = forceDark || onDark;

  // Hides while scrolling down, comes back as soon as you scroll up
  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = Math.max(0, window.scrollY);
      const delta = y - lastY.current;
      if (y < 80) setHidden(false);
      else if (delta > 6) setHidden(true);
      else if (delta < -6) setHidden(false);
      if (Math.abs(delta) > 6 || y < 80) lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Glass follows the page: dark glass over sections marked data-nav-theme="dark", light glass elsewhere
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const header = headerRef.current;
      if (!header) return;
      const stack = document.elementsFromPoint(window.innerWidth / 2, 36);
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

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
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

  const openServices = () => {
    const link = servicesLinkRef.current;
    const wrap = wrapRef.current;
    if (link && wrap) {
      const l = link.getBoundingClientRect().left - wrap.getBoundingClientRect().left;
      setMenuLeft(Math.max(0, Math.min(l - 16, wrap.clientWidth - 600)));
    }
    setServicesOpen(true);
  };

  const openService = (slug: string) => {
    setServicesOpen(false);
    setMobileMenuOpen(false);
    goToService(slug);
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
    { label: 'References', href: '/references', onClick: (e) => { e.preventDefault(); setMobileMenuOpen(false); goToReferences(); } },
    { label: 'Services', href: '#services', onClick: (e) => { e.preventDefault(); scrollToSection('services'); } },
    { label: 'Company', href: '/company', onClick: (e) => { e.preventDefault(); setMobileMenuOpen(false); goToCompany(); } },
    { label: 'Solutions', href: '/solutions', onClick: (e) => { e.preventDefault(); setMobileMenuOpen(false); goToSolutions(); } },
    { label: 'Team', href: '/team', onClick: handleTeamClick },
    { label: 'FAQ', href: '/faq', onClick: handleFaqClick },
    { label: 'Blog', href: '/blog', onClick: handleBlogClick },
    { label: 'Connect', href: '/connect', onClick: (e) => { e.preventDefault(); setMobileMenuOpen(false); goToConnect(); } },
  ];

  // Pure glass: no outline, no highlight edge
  const glass = dark ? 'bg-white/[0.10]' : 'bg-gray-100/80';

  return (
    <>
      {/* Keeps the space the floating bar takes up */}
      <div aria-hidden="true" className="h-[68px] md:h-[72px]" />
      {mobileMenuOpen && (
        <div
          aria-hidden="true"
          className="fixed inset-0 z-30 md:hidden bg-black/20 backdrop-blur-[2px]"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}
      <header
        ref={headerRef}
        className={`fixed top-0 inset-x-0 z-40 pointer-events-none transition-transform duration-300 ease-out ${
          hidden && !mobileMenuOpen ? '-translate-y-[130%]' : 'translate-y-0'
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-3 sm:px-5 pt-3">
          <div className="w-full relative" ref={wrapRef} onMouseLeave={() => setServicesOpen(false)}>
            {/* The bar: just the logo and one round button */}
            <nav
              aria-label="Primary navigation"
              className={`pointer-events-auto h-[52px] md:h-[56px] rounded-full pl-4 md:pl-6 pr-1.5 md:pr-2 flex items-center justify-between backdrop-blur-xl backdrop-saturate-150 transition-[background-color] duration-300 ${glass}`}
            >
              <div className="flex items-center">
              <a
                href="/"
                onClick={(e) => {
                  setMobileMenuOpen(false);
                  if (onNavigateHome) {
                    e.preventDefault();
                    onNavigateHome();
                  }
                }}
                className="flex items-center shrink-0"
                aria-label="Eotra Home"
              >
                <span className="overflow-hidden inline-flex items-center">
                  <img
                    src="/assets/aistudio/Eotra_aef517cd.svg"
                    alt="Eotra"
                    className={`h-[28px] md:h-[32px] w-auto max-w-none -ml-3 -mr-6 ${dark ? 'brightness-0 invert' : ''}`}
                  />
                </span>
              </a>

                {/* Desktop: the links sit in the bar */}
                <div className="hidden md:flex items-center gap-7 ml-8">
                  {menuItems.map((item) => (
                    <a
                      key={item.label}
                      ref={item.label === 'Services' ? servicesLinkRef : undefined}
                      href={item.href}
                      onClick={(e) => {
                        setServicesOpen(false);
                        item.onClick(e);
                      }}
                      onMouseEnter={item.label === 'Services' ? openServices : () => setServicesOpen(false)}
                      onFocus={item.label === 'Services' ? openServices : undefined}
                      className={`text-[14px] transition-colors duration-300 whitespace-nowrap inline-flex items-center gap-1 ${
                        dark ? 'text-white/85 hover:text-white' : 'text-gray-900 hover:text-gray-500'
                      }`}
                    >
                      {item.label}
                      {item.label === 'Services' && (
                        <ChevronDown size={13} strokeWidth={1.8} className={`transition-transform duration-300 ${servicesOpen ? 'rotate-180' : ''}`} />
                      )}
                    </a>
                  ))}
                </div>
              </div>

              {/* Desktop: Book a demo */}
              <div className="hidden md:block">
                <RollButton
                  label="Book a demo"
                  variant={dark ? 'light' : 'dark'}
                  size="nav"
                  onClick={() => goToConnect('Book an Eotra Demo')}
                />
              </div>

              <button
                type="button"
                onClick={() => setMobileMenuOpen((o) => !o)}
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
                className={`md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                  dark ? 'bg-white/15 text-white hover:bg-white/25' : 'bg-gray-900/10 text-gray-900 hover:bg-gray-900/15'
                }`}
              >
                {mobileMenuOpen ? <Minus size={16} strokeWidth={1.75} /> : <Plus size={16} strokeWidth={1.75} />}
              </button>
            </nav>

            {/* Desktop: services menu */}
            <div
              className={`hidden md:block absolute top-full pt-2 z-10 transition-all duration-200 ease-out ${
                servicesOpen ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 -translate-y-1 pointer-events-none'
              }`}
              style={{ left: menuLeft }}
              aria-hidden={!servicesOpen}
            >
              <div
                className={`w-[600px] rounded-[28px] backdrop-blur-xl backdrop-saturate-150 p-2.5 ${
                  dark ? 'bg-[#0b0d1a]/80' : 'bg-white/90'
                }`}
              >
                <div className="grid grid-cols-2 gap-1">
                  {SERVICES.map((sv) => {
                    const SIcon = sv.icon;
                    return (
                      <a
                        key={sv.slug}
                        href={`/services/${sv.slug}`}
                        tabIndex={servicesOpen ? 0 : -1}
                        onClick={(e) => {
                          e.preventDefault();
                          openService(sv.slug);
                        }}
                        className={`flex items-start gap-3 rounded-2xl p-3 transition-colors ${
                          dark ? 'hover:bg-white/10' : 'hover:bg-gray-900/[0.05]'
                        }`}
                      >
                        <span
                          className={`w-9 h-9 shrink-0 rounded-full flex items-center justify-center ${
                            dark ? 'bg-white/10 text-white' : 'bg-gray-900/[0.06] text-gray-900'
                          }`}
                        >
                          <SIcon size={16} strokeWidth={1.7} />
                        </span>
                        <span className="min-w-0">
                          <span className={`block text-[14px] font-medium ${dark ? 'text-white' : 'text-gray-900'}`}>{sv.title}</span>
                          <span className={`block mt-0.5 text-[12.5px] leading-snug ${dark ? 'text-white/55' : 'text-gray-500'}`}>
                            {sv.description}
                          </span>
                        </span>
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* The panel: the bar opens downwards into thin pill links */}
            <div
              className={`md:hidden pointer-events-auto grid transition-[grid-template-rows,margin] duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
                mobileMenuOpen ? 'grid-rows-[1fr] mt-2' : 'grid-rows-[0fr] mt-0'
              }`}
              aria-hidden={!mobileMenuOpen}
            >
              <div className="overflow-hidden">
                <div className={`rounded-[26px] backdrop-blur-xl backdrop-saturate-150 p-2 ${glass}`}>
                  <div className="flex flex-wrap gap-1.5">
                    {menuItems.map((item) => (
                      <a
                        key={item.label}
                        href={item.href}
                        tabIndex={mobileMenuOpen ? 0 : -1}
                        onClick={
                          item.label === 'Services'
                            ? (e) => {
                                e.preventDefault();
                                setMobileServicesOpen((o) => !o);
                              }
                            : item.onClick
                        }
                        className={`flex-1 min-w-[28%] rounded-full px-3 py-2 text-center text-[14px] transition-colors ${
                          dark
                            ? 'bg-white/10 text-white hover:bg-white/20'
                            : 'bg-gray-900/[0.06] text-gray-900 hover:bg-gray-900/10'
                        }`}
                      >
                        {item.label}
                        {item.label === 'Services' && (
                          <ChevronDown size={13} strokeWidth={1.8} className={`inline ml-1 -mt-0.5 transition-transform duration-300 ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                        )}
                      </a>
                    ))}
                  </div>

                  {mobileServicesOpen && (
                    <div className="mt-1.5 grid grid-cols-1 gap-1">
                      {SERVICES.map((sv) => {
                        const SIcon = sv.icon;
                        return (
                          <a
                            key={sv.slug}
                            href={`/services/${sv.slug}`}
                            onClick={(e) => {
                              e.preventDefault();
                              openService(sv.slug);
                            }}
                            className={`flex items-center gap-3 rounded-full px-3 py-2 text-[14px] transition-colors ${
                              dark ? 'bg-white/10 text-white hover:bg-white/20' : 'bg-white/70 text-gray-900 hover:bg-white'
                            }`}
                          >
                            <SIcon size={15} strokeWidth={1.7} />
                            {sv.title}
                          </a>
                        );
                      })}
                    </div>
                  )}

                  <button
                    type="button"
                    tabIndex={mobileMenuOpen ? 0 : -1}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      goToConnect('Book an Eotra Demo');
                    }}
                    className="mt-1.5 w-full rounded-full bg-[#0400F5] hover:bg-[#0300cc] text-white px-3 py-2 text-[14px] transition-colors cursor-pointer"
                  >
                    Book a demo
                  </button>

                  <div className={`mt-2 px-3 pb-1 flex items-center justify-between text-[12px] ${dark ? 'text-white/55' : 'text-gray-500'}`}>
                    <a href="mailto:info@eotra.com" tabIndex={mobileMenuOpen ? 0 : -1} className="hover:underline">
                      info@eotra.com
                    </a>
                    <span>&copy; 2026 Eotra Inc.</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
