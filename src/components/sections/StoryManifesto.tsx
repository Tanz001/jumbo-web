import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '../../assets/images';
import { FoodImage } from '../common/FoodImage';
import { SplitWords } from '../../utils/textSplitter';
import { CrispyEdge } from '../common/CrispyEdge';

gsap.registerPlugin(ScrollTrigger);

export const StoryManifesto: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageWrapperRef = useRef<HTMLDivElement>(null);
  const imageInnerRef = useRef<HTMLDivElement>(null);
  
  const [stats, setStats] = useState({ fresh: 0, hours: 0, plates: 0 });

  const manifestoText =
    "We don't just fry chicken. We *inject* it. Every piece is marinated deep, injected with our signature blend, and broasted under pressure until the crust turns golden and the meat stays unbelievably juicy. That is the Jumbo way.";

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Stats Counter Animation on view
      const statsObj = { fresh: 0, hours: 0, plates: 0 };
      ScrollTrigger.create({
        trigger: '#manifesto-stats',
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(statsObj, {
            fresh: 100,
            hours: 24,
            plates: 1000,
            duration: 2.2,
            ease: 'power2.out',
            onUpdate: () => {
              setStats({
                fresh: Math.round(statsObj.fresh),
                hours: Math.round(statsObj.hours),
                plates: Math.round(statsObj.plates),
              });
            },
          });
        },
      });

      // 2. Desktop Pinned Section with Word scrub and Image Clip
      ScrollTrigger.matchMedia({
        // Desktop
        '(min-width: 1024px)': function () {
          if (prefersReducedMotion) return;

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: sectionRef.current,
              pin: true,
              start: 'top top',
              end: '+=150%',
              scrub: 0.8,
              anticipatePin: 1,
            },
          });

          // Words scrub from 0.15 to 1 in sequence
          tl.fromTo(
            '.manifesto-word',
            { opacity: 0.15, y: 5 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.05,
              ease: 'power1.inOut',
            },
            0
          );

          // Tall image reveal with clip-path inset(100% 0 0 0) to inset(0)
          if (imageWrapperRef.current) {
            tl.fromTo(
              imageWrapperRef.current,
              { clipPath: 'inset(100% 0% 0% 0%)' },
              { clipPath: 'inset(0% 0% 0% 0%)', ease: 'power2.out' },
              0.1
            );
          }

          // Inner image parallax (yPercent -10 to 10)
          if (imageInnerRef.current) {
            tl.fromTo(
              imageInnerRef.current,
              { yPercent: -10 },
              { yPercent: 10, ease: 'none' },
              0
            );
          }
        },

        // Mobile / Small Screen fallback (no pin, trigger-based reveals)
        '(max-width: 1023px)': function () {
          gsap.fromTo(
            '.manifesto-word',
            { opacity: 0.2 },
            {
              opacity: 1,
              stagger: 0.03,
              scrollTrigger: {
                trigger: '#manifesto-text-container',
                start: 'top 80%',
                end: 'bottom 60%',
                scrub: true,
              },
            }
          );

          if (imageWrapperRef.current) {
            gsap.fromTo(
              imageWrapperRef.current,
              { clipPath: 'inset(50% 0% 0% 0%)', opacity: 0.4 },
              {
                clipPath: 'inset(0% 0% 0% 0%)',
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: imageWrapperRef.current,
                  start: 'top 80%',
                },
              }
            );
          }
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#0A0A0A] text-[#F6EEE1] flex flex-col justify-center py-20 px-6 sm:px-12 overflow-hidden"
    >
      <div
        ref={containerRef}
        className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"
      >
        {/* Left Column: Editorial Manifesto + Stats (7 cols) */}
        <div className="lg:col-span-7 space-y-10">
          <div className="flex items-center gap-3">
            <span className="w-8 h-[2px] bg-[#E01B24]" />
            <span className="font-display uppercase text-xs sm:text-sm tracking-widest text-[#E01B24]">
              THE INJECTION MANIFESTO
            </span>
          </div>

          {/* Large Paragraph in Fraunces */}
          <div id="manifesto-text-container">
            <p className="font-accent text-3xl sm:text-4xl md:text-5xl leading-[1.3] text-[#F6EEE1] font-normal select-none">
              <SplitWords
                text={manifestoText}
                wordClassName="manifesto-word"
                italicClassName="text-[#F2B441] font-semibold"
              />
            </p>
          </div>

          {/* Stat Blocks */}
          <div
            id="manifesto-stats"
            className="grid grid-cols-3 gap-4 pt-6 border-t border-[#F6EEE1]/10"
          >
            <div>
              <div className="font-display text-4xl sm:text-5xl md:text-6xl text-[#E01B24] tracking-tight">
                {stats.fresh}%
              </div>
              <p className="text-xs uppercase font-body tracking-wider text-[#8C857C] mt-1 font-medium">
                Fresh Farm Chicken
              </p>
            </div>

            <div>
              <div className="font-display text-4xl sm:text-5xl md:text-6xl text-[#F2B441] tracking-tight">
                {stats.hours}h
              </div>
              <p className="text-xs uppercase font-body tracking-wider text-[#8C857C] mt-1 font-medium">
                Deep Marination
              </p>
            </div>

            <div>
              <div className="font-display text-4xl sm:text-5xl md:text-6xl text-[#F6EEE1] tracking-tight">
                {stats.plates}+
              </div>
              <p className="text-xs uppercase font-body tracking-wider text-[#8C857C] mt-1 font-medium">
                Happy Broast Devotees
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Tall Image Reveal with Inset & Inner Parallax (5 cols) */}
        <div className="lg:col-span-5 relative">
          <div
            ref={imageWrapperRef}
            className="relative w-full aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl border border-[#F6EEE1]/10 bg-[#161413]"
            style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          >
            <div ref={imageInnerRef} className="w-full h-[120%] -mt-[10%]">
              <FoodImage
                src={IMAGES.broastCloseup.url}
                alt={IMAGES.broastCloseup.alt}
                width={IMAGES.broastCloseup.width}
                height={IMAGES.broastCloseup.height}
                className="w-full h-full object-cover"
                containerClassName="w-full h-full"
              />
            </div>

            {/* Subtle Overlay Badge */}
            <div className="absolute bottom-6 left-6 z-25 bg-[#0A0A0A]/85 backdrop-blur-md px-4 py-2 rounded-xl border border-[#F6EEE1]/15">
              <span className="font-display text-xs uppercase tracking-widest text-[#F2B441]">
                Macro Crust Texture
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Crispy edge section divider */}
      <CrispyEdge color="#161413" className="absolute bottom-0 left-0 right-0" />
    </section>
  );
};
