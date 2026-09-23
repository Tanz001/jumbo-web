import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { JumboLogo } from '../common/JumboLogo';
import { MagneticButton } from '../common/MagneticButton';
import { Menu as MenuIcon, X } from 'lucide-react';
import { getLenis } from '../../hooks/useLenis';

interface NavbarProps {
  onOpenOrder: (item?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrder }) => {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const lastScrollY = useRef(0);

  const navLinks = [
    { label: 'Story', href: '#story' },
    { label: 'Signature', href: '#signature' },
    { label: 'Menu', href: '#menu' },
    { label: 'Locations', href: '#locations' },
  ];

  // Hide on scroll down, show on scroll up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const nav = navRef.current;
      if (!nav) return;

      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY.current + 5) {
          // Scrolling down - hide
          gsap.to(nav, {
            y: -100,
            duration: 0.5,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        } else if (currentScrollY < lastScrollY.current - 5) {
          // Scrolling up - show
          gsap.to(nav, {
            y: 0,
            duration: 0.5,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        }
      } else {
        gsap.to(nav, {
          y: 0,
          duration: 0.4,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Animate mobile menu open/close
  useEffect(() => {
    const menuEl = mobileMenuRef.current;
    if (!menuEl) return;

    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      gsap.to(menuEl, {
        clipPath: 'circle(150% at 90% 5%)',
        duration: 0.7,
        ease: 'expo.out',
      });
      gsap.fromTo(
        '.mobile-nav-link',
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.07,
          duration: 0.8,
          ease: 'expo.out',
          delay: 0.15,
        }
      );
    } else {
      document.body.style.overflow = '';
      gsap.to(menuEl, {
        clipPath: 'circle(0% at 90% 5%)',
        duration: 0.5,
        ease: 'power3.in',
      });
    }
  }, [mobileMenuOpen]);

  const handleLinkClick = (href: string) => {
    setMobileMenuOpen(false);
    const lenis = getLenis();
    const target = document.querySelector(href);
    if (target) {
      if (lenis) {
        lenis.scrollTo(target as HTMLElement, { offset: -20, duration: 1.5 });
      } else {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <>
      <header
        ref={navRef}
        className="fixed top-0 left-0 right-0 z-50 px-5 sm:px-8 md:px-12 py-4 md:py-6 flex items-center justify-between transition-colors pointer-events-none"
      >
        {/* Brand Zone */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            const lenis = getLenis();
            if (lenis) lenis.scrollTo(0, { duration: 1.5 });
            else window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="pointer-events-auto flex items-center group cursor-pointer"
          aria-label="Jumbo Home"
        >
          <div className="bg-[#E01B24] px-3 py-1.5 rounded-xl shadow-lg border border-[#F2B441]/20 group-hover:scale-105 transition-transform duration-300">
            <JumboLogo className="w-16 sm:w-20 h-auto" fill="#FFFFFF" showSkewer={true} />
          </div>
        </a>

        {/* Center Nav Links */}
        <nav
          className="pointer-events-auto hidden md:flex items-center gap-8 px-6 py-2.5 rounded-full bg-[#161413]/85 backdrop-blur-md border border-[#F6EEE1]/10 shadow-xl"
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="text-xs uppercase font-display tracking-widest text-[#F6EEE1]/80 hover:text-[#FF5A1F] transition-colors relative py-1 group cursor-pointer"
            >
              {link.label}
              <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#E01B24] transition-all duration-300 group-hover:w-full" />
            </button>
          ))}
        </nav>

        {/* Action Button Zone */}
        <div className="pointer-events-auto flex items-center gap-3">
          <MagneticButton
            variant="primary"
            size="sm"
            onClick={() => onOpenOrder()}
            className="hidden sm:inline-flex"
            aria-label="Order Now"
          >
            Order Now
          </MagneticButton>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-11 h-11 rounded-full bg-[#161413] border border-[#F6EEE1]/20 flex items-center justify-center text-[#F6EEE1] cursor-pointer hover:border-[#E01B24] transition-colors"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Overlay */}
      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-[#E01B24] flex flex-col justify-between p-8 sm:p-12 text-[#F6EEE1] md:hidden select-none pointer-events-auto"
        style={{ clipPath: 'circle(0% at 90% 5%)' }}
      >
        <div className="flex justify-between items-center pt-2">
          <div className="bg-white/10 px-3 py-1.5 rounded-xl">
            <JumboLogo className="w-20 h-auto" fill="#FFFFFF" showSkewer={true} />
          </div>
        </div>

        <div className="my-auto space-y-6">
          {navLinks.map((link) => (
            <div key={link.label} className="overflow-hidden">
              <button
                onClick={() => handleLinkClick(link.href)}
                className="mobile-nav-link text-left block w-full font-display text-5xl sm:text-6xl text-[#F6EEE1] uppercase tracking-tight relative group cursor-pointer"
              >
                <span className="relative z-10 group-hover:text-[#F2B441] transition-colors">
                  {link.label}
                </span>
                {/* Strike-through line on hover */}
                <span className="absolute top-1/2 left-0 w-0 h-1 bg-[#0A0A0A] transition-all duration-300 group-hover:w-full" />
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <MagneticButton
            variant="cream"
            size="md"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenOrder();
            }}
            className="w-full text-center"
          >
            Order Now
          </MagneticButton>
          <div className="flex justify-between text-xs text-[#F6EEE1]/70 font-body">
            <span>Lahore • Karachi • Islamabad</span>
            <span>Est. Pakistan</span>
          </div>
        </div>
      </div>
    </>
  );
};
