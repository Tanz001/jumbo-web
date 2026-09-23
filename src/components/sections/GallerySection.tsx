import React, { useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '../../assets/images';
import { FoodImage } from '../common/FoodImage';
import { X } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const GallerySection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const marqueeTextRef = useRef<HTMLDivElement>(null);
  const [activePhoto, setActivePhoto] = useState<{ src: string; alt: string } | null>(null);

  const galleryItems = [
    {
      slot: IMAGES.gallery1,
      speed: 0.15,
      className: 'md:col-span-4 aspect-[3/4]',
      clip: 'inset(0% 100% 0% 0%)',
    },
    {
      slot: IMAGES.gallery2,
      speed: -0.1,
      className: 'md:col-span-8 aspect-[16/10]',
      clip: 'inset(100% 0% 0% 0%)',
    },
    {
      slot: IMAGES.gallery3,
      speed: 0.2,
      className: 'md:col-span-6 aspect-square',
      clip: 'inset(0% 0% 100% 0%)',
    },
    {
      slot: IMAGES.gallery4,
      speed: -0.15,
      className: 'md:col-span-6 aspect-square',
      clip: 'inset(0% 0% 0% 100%)',
    },
    {
      slot: IMAGES.gallery5,
      speed: 0.12,
      className: 'md:col-span-7 aspect-[16/10]',
      clip: 'inset(100% 0% 0% 0%)',
    },
    {
      slot: IMAGES.gallery6,
      speed: -0.2,
      className: 'md:col-span-5 aspect-[3/4]',
      clip: 'inset(0% 100% 0% 0%)',
    },
  ];

  useLayoutEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const ctx = gsap.context(() => {
      // 1. Moving horizontal outline text banner opposite to scroll
      if (!prefersReducedMotion && marqueeTextRef.current) {
        gsap.to(marqueeTextRef.current, {
          xPercent: -35,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // 2. Parallax and clip-path reveals for each gallery item
      const items = gsap.utils.toArray<HTMLElement>('.gallery-tile');
      items.forEach((item, idx) => {
        // Reveal clip-path
        gsap.fromTo(
          item,
          { clipPath: galleryItems[idx]?.clip || 'inset(100% 0% 0% 0%)', opacity: 0.3 },
          {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
            },
          }
        );

        // Parallax speed scrub
        if (!prefersReducedMotion) {
          const speed = galleryItems[idx]?.speed || 0.1;
          gsap.to(item.querySelector('.gallery-inner-img'), {
            yPercent: speed * 50,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
            },
          });
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#F6EEE1] text-[#0A0A0A] py-24 px-6 sm:px-12 select-none overflow-hidden"
    >
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-4 border-b border-[#0A0A0A]/10">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="w-8 h-[2px] bg-[#E01B24]" />
              <span className="font-display uppercase text-xs tracking-widest text-[#E01B24]">
                THE ATMOSPHERE & CRAFT
              </span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl uppercase tracking-tight text-[#0A0A0A]">
              FIERY <span className="font-accent lowercase italic text-[#E01B24]">moments</span>
            </h2>
          </div>
          <span className="font-display uppercase text-xs tracking-widest text-[#8C857C]">
            Click any frame to expand
          </span>
        </div>

        {/* First Grid Row (items 0 & 1) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {galleryItems.slice(0, 2).map((item, idx) => (
            <div
              key={idx}
              onClick={() => setActivePhoto({ src: item.slot.url, alt: item.slot.alt })}
              className={`gallery-tile relative rounded-3xl overflow-hidden cursor-pointer shadow-2xl border border-[#0A0A0A]/10 group ${item.className}`}
              data-cursor="view"
            >
              <div className="gallery-inner-img w-full h-[120%] -mt-[10%]">
                <FoodImage
                  src={item.slot.url}
                  alt={item.slot.alt}
                  width={item.slot.width}
                  height={item.slot.height}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  containerClassName="w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Giant Outlined Moving Text Line Between Rows */}
        <div className="py-6 overflow-hidden pointer-events-none select-none">
          <div
            ref={marqueeTextRef}
            className="whitespace-nowrap font-display text-6xl sm:text-8xl md:text-9xl text-outline-dark uppercase tracking-tight flex gap-8"
          >
            <span>CRISPY • JUICY • GOLDEN • INJECTED • BROASTED • </span>
            <span>CRISPY • JUICY • GOLDEN • INJECTED • BROASTED • </span>
          </div>
        </div>

        {/* Second Grid Row (items 2, 3, 4, 5) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {galleryItems.slice(2).map((item, idx) => (
            <div
              key={idx + 2}
              onClick={() => setActivePhoto({ src: item.slot.url, alt: item.slot.alt })}
              className={`gallery-tile relative rounded-3xl overflow-hidden cursor-pointer shadow-2xl border border-[#0A0A0A]/10 group ${item.className}`}
              data-cursor="view"
            >
              <div className="gallery-inner-img w-full h-[120%] -mt-[10%]">
                <FoodImage
                  src={item.slot.url}
                  alt={item.slot.alt}
                  width={item.slot.width}
                  height={item.slot.height}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  containerClassName="w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal on Card Click */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          onClick={() => setActivePhoto(null)}
          className="fixed inset-0 z-[10001] bg-black/90 backdrop-blur-xl flex items-center justify-center p-6 cursor-pointer"
        >
          <button
            onClick={() => setActivePhoto(null)}
            className="absolute top-6 right-6 w-12 h-12 rounded-full bg-[#161413] border border-[#F6EEE1]/20 flex items-center justify-center text-[#F6EEE1] hover:text-[#E01B24]"
            aria-label="Close Preview"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={activePhoto.src}
            alt={activePhoto.alt}
            className="max-w-5xl max-h-[85vh] w-auto h-auto rounded-2xl shadow-2xl object-contain food-grade border border-[#F6EEE1]/10"
          />
        </div>
      )}
    </section>
  );
};
