import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { JumboLogo } from '../common/JumboLogo';
import { MagneticButton } from '../common/MagneticButton';
import { Menu as MenuIcon, ShoppingBag, X } from 'lucide-react';
import { getLenis } from '../../hooks/useLenis';

interface NavbarProps {
  onOpenOrder: (item?: string) => void;
  onOpenCart: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenOrder, onOpenCart, cartCount }) => {
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const lastScrollY = useRef(0);

  const navLinks = [
    { label: 'View Menu', href: '#menu' },
    { label: 'Events', href: '#events' },
    { label: 'Our Story', href: '#story' },
    { label: 'Field Voices', href: '#voices' },
    { label: 'Find Us', href: '#locations' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const nav = navRef.current;
      if (!nav) return;

      setScrolled(currentScrollY > 40);

      if (currentScrollY > 120) {
        if (currentScrollY > lastScrollY.current + 5) {
          gsap.to(nav, {
            y: -110,
            duration: 0.5,
            ease: 'power3.out',
            overwrite: 'auto',
          });
        } else if (currentScrollY < lastScrollY.current - 5) {
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
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-8 md:px-10 py-3 md:py-4 flex items-center justify-between pointer-events-none"
      >
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
          <div className="bg-[#E01B24] px-3 py-1.5 rounded-xl shadow-lg border border-[#F2B441]/25 group-hover:scale-105 transition-transform duration-300">
            <JumboLogo className="w-16 sm:w-20 h-auto" fill="#FFFFFF" showSkewer={true} />
          </div>
        </a>

        <nav
          className={`pointer-events-auto hidden lg:flex items-center gap-1 xl:gap-2 px-2 py-1.5 rounded-full border shadow-lg transition-colors duration-300 ${
            scrolled
              ? 'bg-[#F6EEE1]/95 border-[#0A0A0A]/10 backdrop-blur-md'
              : 'bg-[#F6EEE1]/90 border-[#0A0A0A]/08 backdrop-blur-md'
          }`}
          aria-label="Main Navigation"
        >
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => handleLinkClick(link.href)}
              className="px-3.5 xl:px-4 py-2 rounded-full text-[11px] xl:text-xs uppercase font-display tracking-[0.14em] text-[#0A0A0A]/75 hover:text-[#E01B24] hover:bg-white/70 transition-colors relative cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="pointer-events-auto flex items-center gap-2 sm:gap-3">
          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`View cart, ${cartCount} items`}
            className="relative hidden sm:inline-flex items-center gap-2 rounded-full border border-[#0A0A0A]/12 bg-[#F6EEE1] px-4 py-2.5 font-display text-[11px] uppercase tracking-[0.14em] text-[#0A0A0A] shadow-md hover:border-[#E01B24] hover:text-[#E01B24] transition-colors cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4" />
            <span>View Cart</span>
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E01B24] px-1 font-display text-[10px] text-white">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>

          <MagneticButton
            variant="primary"
            size="sm"
            onClick={() => onOpenOrder()}
            className="hidden sm:inline-flex"
            aria-label="Order Now"
          >
            Order Now
          </MagneticButton>

          <button
            type="button"
            onClick={onOpenCart}
            aria-label={`View cart, ${cartCount} items`}
            className="relative sm:hidden w-11 h-11 rounded-full bg-[#F6EEE1] border border-[#0A0A0A]/12 flex items-center justify-center text-[#0A0A0A] cursor-pointer hover:border-[#E01B24] hover:text-[#E01B24] transition-colors"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-[#E01B24] px-1 font-display text-[10px] text-white">
                {cartCount > 9 ? '9+' : cartCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-11 h-11 rounded-full bg-[#0A0A0A] border border-[#F6EEE1]/20 flex items-center justify-center text-[#F6EEE1] cursor-pointer hover:border-[#E01B24] transition-colors"
            aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </header>

      <div
        ref={mobileMenuRef}
        className="fixed inset-0 z-40 bg-[#F6EEE1] flex flex-col justify-between p-8 sm:p-12 text-[#0A0A0A] lg:hidden select-none pointer-events-auto"
        style={{ clipPath: 'circle(0% at 90% 5%)' }}
      >
        <div className="flex justify-between items-center pt-2">
          <div className="bg-[#E01B24] px-3 py-1.5 rounded-xl">
            <JumboLogo className="w-20 h-auto" fill="#FFFFFF" showSkewer={true} />
          </div>
        </div>

        <div className="my-auto space-y-5">
          {navLinks.map((link) => (
            <div key={link.label} className="overflow-hidden">
              <button
                onClick={() => handleLinkClick(link.href)}
                className="mobile-nav-link text-left block w-full font-display text-4xl sm:text-5xl text-[#0A0A0A] uppercase tracking-tight relative group cursor-pointer"
              >
                <span className="relative z-10 group-hover:text-[#E01B24] transition-colors">
                  {link.label}
                </span>
                <span className="absolute top-1/2 left-0 w-0 h-1 bg-[#E01B24] transition-all duration-300 group-hover:w-full" />
              </button>
            </div>
          ))}
        </div>

        <div className="space-y-3">
          <MagneticButton
            variant="outlineDark"
            size="md"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenCart();
            }}
            className="w-full text-center"
          >
            View Cart{cartCount > 0 ? ` (${cartCount})` : ''}
          </MagneticButton>
          <MagneticButton
            variant="primary"
            size="md"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenOrder();
            }}
            className="w-full text-center"
          >
            Order Now
          </MagneticButton>
          <div className="flex justify-between text-xs text-[#8C857C] font-body pt-1">
            <span>Lahore · Karachi · Islamabad</span>
            <span>Est. Pakistan</span>
          </div>
        </div>
      </div>
    </>
  );
};
