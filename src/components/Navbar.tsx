import { useEffect, useState } from 'react';
import { ArrowRight, Clock, Menu, X } from 'lucide-react';
import { RollButton } from './RollButton';

interface NavbarProps {
  onOpenInquiry: (subject?: string) => void;
  onNavigateHome?: (sectionId?: string) => void;
  onNavigateToTeam?: () => void;
}

function getLondonTime(): string {
  return new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(new Date());
}

export function Navbar({ onOpenInquiry, onNavigateHome, onNavigateToTeam }: NavbarProps) {
  const [londonTime, setLondonTime] = useState<string>(() => getLondonTime());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLondonTime(getLondonTime());
    }, 1000);
    return () => clearInterval(interval);
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
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleTeamClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    if (onNavigateToTeam) {
      onNavigateToTeam();
    } else if (window.location.pathname === '/team') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.history.pushState({}, '', '/team');
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <>
      <header className="relative z-20 w-full max-w-[1440px] mx-auto p-2 sm:p-3">
        <nav
          aria-label="Primary navigation"
          className="bg-white rounded-full p-[5px] flex items-center justify-between"
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
                  className="h-[26px] sm:h-[28px] w-auto max-w-none -ml-3 -mr-6"
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
                className="text-[14px] text-gray-900 hover:text-gray-500 transition-colors duration-300 whitespace-nowrap shrink-0"
              >
                Projects
              </a>
              <a
                href="#services"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('services');
                }}
                className="text-[14px] text-gray-900 hover:text-gray-500 transition-colors duration-300 whitespace-nowrap shrink-0"
              >
                Services
              </a>
              <a
                href="#company"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('company');
                }}
                className="text-[14px] text-gray-900 hover:text-gray-500 transition-colors duration-300 whitespace-nowrap shrink-0"
              >
                Company
              </a>
              <a
                href="#solutions"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('solutions');
                }}
                className="text-[14px] text-gray-900 hover:text-gray-500 transition-colors duration-300 whitespace-nowrap shrink-0"
              >
                Solutions
              </a>
              <a
                href="/team"
                onClick={handleTeamClick}
                className="text-[14px] text-gray-900 hover:text-gray-500 transition-colors duration-300 whitespace-nowrap shrink-0"
              >
                Team
              </a>
              <button
                type="button"
                onClick={() => onOpenInquiry('Connect with Eotra')}
                className="text-[14px] text-gray-900 hover:text-gray-500 transition-colors duration-300 whitespace-nowrap shrink-0 cursor-pointer"
              >
                Connect
              </button>
            </div>
          </div>

          {/* RIGHT: Availability, Live Clock, CTA */}
          <div className="hidden md:flex items-center gap-5">
            <span className="hidden lg:inline text-[13px] text-gray-600 whitespace-nowrap">
              Taking on projects for Q1 2026
            </span>
            <div className="flex items-center gap-1.5 text-[13px] text-gray-600 whitespace-nowrap tabular-nums">
              <Clock size={14} className="shrink-0" />
              <span>{londonTime} in London</span>
            </div>
            <RollButton
              label="Book a demo"
              variant="dark"
              size="nav"
              onClick={() => onOpenInquiry('Book an Eotra Demo')}
            />
          </div>

          {/* MOBILE TOGGLE */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden bg-gray-900 text-white rounded-full px-4 py-2 text-[13px] font-medium flex items-center gap-2 cursor-pointer"
            aria-expanded={mobileMenuOpen}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            <span>{mobileMenuOpen ? 'Close' : 'Menu'}</span>
            {mobileMenuOpen ? <X size={14} /> : <Menu size={14} />}
          </button>
        </nav>
      </header>

      {/* MOBILE MENU OVERLAY */}
      <div
        className={`fixed inset-0 z-50 md:hidden flex flex-col justify-end transition-opacity duration-500 ${
          mobileMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!mobileMenuOpen}
      >
        <div
          className="absolute inset-0 bg-black/60"
          onClick={() => setMobileMenuOpen(false)}
        />
        <div
          className={`relative bg-white rounded-2xl mx-3 mb-3 p-6 flex flex-col gap-6 transition-transform duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] ${
            mobileMenuOpen ? 'translate-y-0' : 'translate-y-full'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 text-[13px] text-gray-600 bg-gray-100 px-3 py-1.5 rounded-full tabular-nums">
              <Clock size={14} />
              <span>{londonTime} in London</span>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-gray-900 text-white rounded-full px-3.5 py-1.5 text-[13px] font-medium inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>Close</span>
              <X size={14} />
            </button>
          </div>

          <div className="flex flex-col gap-3">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('projects');
              }}
              className="text-[28px] sm:text-[32px] font-medium text-gray-900 leading-tight hover:text-gray-500 transition-colors"
            >
              Projects
            </a>
            <a
              href="#services"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('services');
              }}
              className="text-[28px] sm:text-[32px] font-medium text-gray-900 leading-tight hover:text-gray-500 transition-colors"
            >
              Services
            </a>
            <a
              href="#company"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('company');
              }}
              className="text-[28px] sm:text-[32px] font-medium text-gray-900 leading-tight hover:text-gray-500 transition-colors"
            >
              Company
            </a>
            <a
              href="#solutions"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('solutions');
              }}
              className="text-[28px] sm:text-[32px] font-medium text-gray-900 leading-tight hover:text-gray-500 transition-colors"
            >
              Solutions
            </a>
            <a
              href="/team"
              onClick={handleTeamClick}
              className="text-[28px] sm:text-[32px] font-medium text-gray-900 leading-tight hover:text-gray-500 transition-colors"
            >
              Team
            </a>
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiry('Connect with Eotra');
              }}
              className="text-left text-[28px] sm:text-[32px] font-medium text-gray-900 leading-tight hover:text-gray-500 transition-colors cursor-pointer"
            >
              Connect
            </button>
          </div>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenInquiry('Get Started with Eotra');
            }}
            className="w-full bg-[#0400F5] hover:bg-[#0300cc] text-white rounded-full pl-6 pr-2 py-2.5 text-[14px] font-medium flex items-center justify-between transition-colors duration-300 cursor-pointer"
          >
            <span>Get started now</span>
            <span className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
              <ArrowRight className="w-4 h-4 text-[#0400F5]" />
            </span>
          </button>
        </div>
      </div>
    </>
  );
}
