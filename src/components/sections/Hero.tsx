import React, { useEffect, useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '../../assets/images';
import { MagneticButton } from '../common/MagneticButton';
import { SplitLines } from '../../utils/textSplitter';
import { getLenis } from '../../hooks/useLenis';

gsap.registerPlugin(ScrollTrigger);

interface HeroProps {
  onOpenOrder: (item?: string) => void;
  preloaderFinished: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onOpenOrder, preloaderFinished }) => {
  const heroRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const bgImageRef = useRef<HTMLImageElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const wordmarkRef = useRef<HTMLDivElement>(null);
  const filledWordmarkRef = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);

  // 1. Ember Canvas Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // 60 Floating ember particles
    const emberCount = 60;
    const embers = Array.from({ length: emberCount }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2.5 + 1,
      speedY: Math.random() * 0.7 + 0.3,
      speedX: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.7 + 0.2,
      fadeSpeed: Math.random() * 0.008 + 0.002,
      color: Math.random() > 0.4 ? '#FF5A1F' : '#F2B441',
    }));

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < emberCount; i++) {
        const e = embers[i];
        e.y -= e.speedY;
        e.x += e.speedX;
        e.opacity += Math.sin(Date.now() * e.fadeSpeed) * 0.01;

        if (e.y < -10) {
          e.y = height + 10;
          e.x = Math.random() * width;
        }

        ctx.beginPath();
        ctx.arc(e.x, e.y, e.size, 0, Math.PI * 2);
        ctx.fillStyle = e.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, e.opacity));
        ctx.shadowBlur = 10;
        ctx.shadowColor = e.color;
        ctx.fill();
      }

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 2. Animations & ScrollTrigger & Parallax
  useLayoutEffect(() => {
    if (!preloaderFinished) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // Ken burns entry on hero image
      gsap.fromTo(
        bgImageRef.current,
        { scale: 1.18 },
        { scale: 1, duration: 2.4, ease: 'power2.out' }
      );

      // Headline lines reveal from mask
      gsap.fromTo(
        '.hero-line',
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          stagger: 0.12,
          duration: 1.2,
          ease: 'expo.out',
          delay: 0.2,
        }
      );

      // Subtext and CTAs reveal
      gsap.fromTo(
        '.hero-subtext',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.6 }
      );
      gsap.fromTo(
        '.hero-cta',
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, stagger: 0.1, duration: 1, ease: 'power3.out', delay: 0.75 }
      );

      // Wordmark entry
      gsap.fromTo(
        wordmarkRef.current,
        { opacity: 0, scale: 0.95 },
        { opacity: 1, scale: 1, duration: 1.6, ease: 'power3.out' }
      );

      if (!prefersReducedMotion) {
        // Scroll scrub effects
        const scrubTl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });

        // 1. Hero image scale 1 to 1.2 and moves y +15%
        scrubTl.to(bgImageRef.current, { scale: 1.2, yPercent: 15, ease: 'none' }, 0);

        // 2. Headline lines drift apart with different speeds
        scrubTl.to('.hero-line-0', { yPercent: -40, ease: 'none' }, 0);
        scrubTl.to('.hero-line-1', { yPercent: -20, ease: 'none' }, 0);
        scrubTl.to('.hero-line-2', { yPercent: -5, ease: 'none' }, 0);

        // 3. Outlined wordmark moves x -10%
        scrubTl.to(wordmarkRef.current, { xPercent: -10, ease: 'none' }, 0);

        // 4. Filled red version clipping in on scroll
        if (filledWordmarkRef.current) {
          scrubTl.to(
            filledWordmarkRef.current,
            { clipPath: 'inset(0% 0% 0% 0%)', ease: 'none' },
            0
          );
        }

        // Mouse Parallax on Desktop
        const xToImg = gsap.quickTo(bgImageRef.current, 'x', { duration: 0.6, ease: 'power3.out' });
        const yToImg = gsap.quickTo(bgImageRef.current, 'y', { duration: 0.6, ease: 'power3.out' });
        const xToHead = gsap.quickTo(headlineRef.current, 'x', { duration: 0.6, ease: 'power3.out' });
        const yToHead = gsap.quickTo(headlineRef.current, 'y', { duration: 0.6, ease: 'power3.out' });

        const handleMouseMove = (e: MouseEvent) => {
          const { innerWidth, innerHeight } = window;
          const xNorm = (e.clientX / innerWidth - 0.5) * 2; // -1 to 1
          const yNorm = (e.clientY / innerHeight - 0.5) * 2;

          xToImg(xNorm * 18);
          yToImg(yNorm * 18);
          xToHead(-xNorm * 18);
          yToHead(-yNorm * 18);
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
      }
    }, heroRef);

    return () => ctx.revert();
  }, [preloaderFinished]);

  const handleExploreClick = () => {
    const lenis = getLenis();
    const menuEl = document.querySelector('#menu');
    if (menuEl) {
      if (lenis) lenis.scrollTo(menuEl as HTMLElement, { offset: -20, duration: 1.5 });
      else menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-[#0A0A0A] pt-24 pb-16 px-6 sm:px-12 select-none"
    >
      {/* Background Image with Heavy Ink Gradient Scrim */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          ref={bgImageRef}
          src={IMAGES.hero.url}
          alt={IMAGES.hero.alt}
          width={IMAGES.hero.width}
          height={IMAGES.hero.height}
          loading="eager"
          className="w-full h-full object-cover object-center food-grade opacity-75 contrast-125"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-[#0A0A0A]/40 z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-[#0A0A0A]/80 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#0A0A0A_95%)] z-10" />
      </div>

      {/* Floating Embers Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-15 pointer-events-none"
        aria-hidden="true"
      />

      {/* Giant Outlined Wordmark Behind Food */}
      <div
        ref={wordmarkRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-12 w-full text-center pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
      >
        <span className="font-display uppercase tracking-tighter text-[clamp(6rem,24vw,26rem)] text-outline-faint leading-none block whitespace-nowrap">
          JUMBO
        </span>
      </div>

      {/* Filled Red Wordmark Clipping In on Scroll */}
      <div
        ref={filledWordmarkRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-13 w-full text-center pointer-events-none select-none overflow-hidden"
        style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        aria-hidden="true"
      >
        <span className="font-display uppercase tracking-tighter text-[clamp(6rem,24vw,26rem)] text-[#E01B24]/40 leading-none block whitespace-nowrap">
          JUMBO
        </span>
      </div>

      {/* Foreground Content */}
      <div
        ref={headlineRef}
        className="relative z-20 max-w-5xl mx-auto flex flex-col items-center text-center mt-8"
      >
        {/* Subtle Brand Tag */}
        <div className="inline-flex items-center gap-2 mb-6 text-xs uppercase font-display tracking-widest text-[#F2B441]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#E01B24]" />
          <span>The Art of Injected Broast</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#E01B24]" />
        </div>

        {/* Headline (Anton, 3 lines, line masks) */}
        <h1 className="font-display text-[clamp(3.5rem,11vw,9.5rem)] text-[#F6EEE1] tracking-tight leading-[0.88] uppercase mb-8">
          <span className="block overflow-hidden">
            <span className="inline-block hero-line hero-line-0">INJECTED.</span>
          </span>
          <span className="block overflow-hidden">
            <span className="inline-block hero-line hero-line-1 text-[#E01B24]">BROASTED.</span>
          </span>
          <span className="block overflow-hidden">
            <span className="inline-block hero-line hero-line-2 font-accent lowercase italic text-[#F2B441] tracking-normal font-normal text-[0.85em]">
              unforgettable.
            </span>
          </span>
        </h1>

        {/* Subtext */}
        <p className="hero-subtext max-w-xl text-base sm:text-lg text-[#F6EEE1]/85 font-body leading-relaxed mb-10 font-normal">
          Flavor that goes all the way to the bone. Juicy from the inside, crunchy on the outside.
          This is <span className="text-[#F6EEE1] font-semibold">Jumbo Broast</span>.
        </p>

        {/* Two CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <div className="hero-cta">
            <MagneticButton
              variant="primary"
              size="lg"
              onClick={() => onOpenOrder('Quarter Broast (Injected)')}
            >
              Order Now
            </MagneticButton>
          </div>
          <div className="hero-cta">
            <MagneticButton
              variant="outline"
              size="lg"
              onClick={handleExploreClick}
            >
              Explore Menu
            </MagneticButton>
          </div>
        </div>
      </div>

      {/* Rotating Circular Text Badge Bottom-Right */}
      <div
        ref={badgeRef}
        className="absolute bottom-8 right-8 sm:bottom-12 sm:right-12 z-25 hidden sm:block pointer-events-auto cursor-pointer"
        onClick={() => onOpenOrder()}
        aria-label="Fresh Hot Crispy Badge"
      >
        <div className="relative w-28 h-28 flex items-center justify-center group">
          {/* Rotating text */}
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full animate-[spin_14s_linear_infinite]"
          >
            <path
              id="badgeCirclePath"
              d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0"
              fill="none"
            />
            <text className="font-display uppercase tracking-widest text-[9.5px] fill-[#F6EEE1]">
              <textPath href="#badgeCirclePath" startOffset="0%">
                FRESH • HOT • CRISPY • JUMBO •
              </textPath>
            </text>
          </svg>

          {/* Center Flame / Chicken Drumstick SVG */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-10 h-10 rounded-full bg-[#E01B24] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <svg
                viewBox="0 0 24 24"
                className="w-5 h-5 fill-[#F6EEE1]"
                aria-hidden="true"
              >
                {/* Flame Icon */}
                <path d="M12 2C8.5 7 6 10 6 14a6 6 0 0 0 12 0c0-4-2.5-7-6-12zm0 18a4 4 0 0 1-4-4c0-2.5 1.5-4.5 4-7 2.5 2.5 4 4.5 4 7a4 4 0 0 1-4 4z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Bottom Scroll Hint */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 hidden md:flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity">
        <span className="font-display uppercase text-[10px] tracking-widest text-[#F6EEE1]">
          Scroll to taste
        </span>
        <div className="w-[1px] h-6 bg-gradient-to-b from-[#F6EEE1] to-transparent animate-pulse" />
      </div>
    </section>
  );
};
