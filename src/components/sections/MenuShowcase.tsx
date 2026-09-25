import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { Plus } from 'lucide-react';
import {
  MENU_CATEGORIES,
  MENU_PRODUCTS,
  type MenuCategory,
  type MenuProduct,
} from '../../data/menu';

interface MenuShowcaseProps {
  onSelectProduct: (product: MenuProduct) => void;
  preloaderFinished?: boolean;
}

export const MenuShowcase: React.FC<MenuShowcaseProps> = ({
  onSelectProduct,
  preloaderFinished = true,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('deals');
  const [hoveredItem, setHoveredItem] = useState<MenuProduct | null>(null);
  const floatingPreviewRef = useRef<HTMLDivElement>(null);

  const currentItems = MENU_PRODUCTS.filter((p) => p.category === activeCategory);
  const activeLabel =
    MENU_CATEGORIES.find((c) => c.key === activeCategory)?.label ?? 'Menu';

  const handleCategoryChange = (cat: MenuCategory) => {
    if (cat === activeCategory) return;
    const cards = cardsGridRef.current;
    if (!cards) {
      setActiveCategory(cat);
      return;
    }

    gsap.to(cards.children, {
      y: -12,
      opacity: 0,
      stagger: 0.02,
      duration: 0.18,
      ease: 'power2.in',
      onComplete: () => {
        setActiveCategory(cat);
        requestAnimationFrame(() => {
          gsap.fromTo(
            cards.children,
            { y: 20, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              stagger: 0.04,
              duration: 0.35,
              ease: 'power3.out',
            }
          );
        });
      },
    });
  };

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const preview = floatingPreviewRef.current;
    if (!preview) return;

    const xTo = gsap.quickTo(preview, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(preview, 'y', { duration: 0.4, ease: 'power3.out' });

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX + 22);
      yTo(e.clientY - 80);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useLayoutEffect(() => {
    if (!preloaderFinished || !cardsGridRef.current) return;
    gsap.fromTo(
      cardsGridRef.current.children,
      { y: 28, opacity: 0 },
      { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: 'power3.out', delay: 0.08 }
    );
  }, [preloaderFinished]);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative w-full bg-[#F6EEE1] text-[#0A0A0A] py-20 sm:py-24 px-6 sm:px-12 select-none overflow-hidden"
    >
      <div
        ref={floatingPreviewRef}
        className={`fixed top-0 left-0 z-[9990] hidden h-36 w-52 overflow-hidden rounded-2xl border-2 border-[#E01B24] shadow-2xl pointer-events-none transition-opacity duration-200 lg:block ${
          hoveredItem ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {hoveredItem && (
          <img
            src={hoveredItem.image}
            alt={hoveredItem.name}
            className="h-full w-full object-cover food-grade"
          />
        )}
      </div>

      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header row */}
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between border-b border-[#0A0A0A]/10 pb-8">
          <div className="max-w-xl">
            <div className="mb-3 flex items-center gap-3">
              <span className="h-[2px] w-7 bg-[#E01B24]" />
              <span className="font-ui text-[11px] uppercase text-[#E01B24]">
                Culinary Selection · {MENU_PRODUCTS.length} items
              </span>
            </div>
            <h2 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight leading-[0.88] text-[#0A0A0A]">
              Our{' '}
              <span className="font-accent lowercase italic text-[#E01B24]">Menu</span>
            </h2>
            <p className="mt-3 font-body text-sm sm:text-base text-[#5C564E] leading-relaxed">
              Injected broast, burgers, wings & more — made fresh, never held under lamps.
            </p>
          </div>

          {/* Compact category toggles */}
          <div
            role="tablist"
            aria-label="Menu categories"
            className="flex w-full max-w-xl flex-wrap gap-1.5 lg:justify-end"
          >
            {MENU_CATEGORIES.map((cat) => {
              const active = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleCategoryChange(cat.key)}
                  className={`rounded-full px-3.5 py-2 font-ui text-[11px] uppercase transition-all cursor-pointer ${
                    active
                      ? 'bg-[#E01B24] text-white shadow-md shadow-[#E01B24]/25'
                      : 'bg-white text-[#5C564E] border border-[#0A0A0A]/10 hover:border-[#E01B24]/40 hover:text-[#0A0A0A]'
                  }`}
                >
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex items-center justify-between gap-4">
          <p className="font-ui text-[11px] uppercase text-[#8C857C]">
            <span className="text-[#E01B24]">{activeLabel}</span>
            <span className="mx-2 text-[#0A0A0A]/20">·</span>
            {currentItems.length} items
          </p>
        </div>

        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
        >
          {currentItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectProduct(item)}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              data-cursor="view"
              className="group relative flex flex-col overflow-hidden rounded-[1.25rem] border border-[#0A0A0A]/08 bg-white text-left shadow-[0_8px_30px_rgba(10,10,10,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-[#E01B24]/35 hover:shadow-[0_16px_40px_rgba(224,27,36,0.12)] cursor-pointer"
            >
              <div className="relative aspect-[5/4] w-full overflow-hidden bg-[#EDE4D6]">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover food-grade transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/40 via-transparent to-transparent" />
                {item.spiceBadge && (
                  <div className="absolute left-3 top-3 rounded-full bg-[#E01B24] px-2.5 py-1 shadow-md">
                    <span className="font-ui text-[10px] uppercase text-white">
                      {item.spiceBadge}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-2 p-5">
                <p className="font-ui text-[10px] uppercase text-[#E01B24] line-clamp-1">
                  {item.tagline}
                </p>
                <h3 className="font-display text-xl uppercase tracking-tight leading-[0.95] text-[#0A0A0A] transition-colors group-hover:text-[#E01B24] sm:text-2xl">
                  {item.name}
                </h3>
                <p className="line-clamp-2 font-body text-[13px] leading-relaxed text-[#5C564E]">
                  {item.desc}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-[#0A0A0A]/08 pt-4">
                  <div>
                    <p className="font-ui text-[9px] uppercase text-[#8C857C]">Price</p>
                    <p className="font-ui text-base text-[#E01B24]">{item.priceLabel}</p>
                  </div>
                  <span
                    aria-hidden
                    className="flex h-11 w-11 items-center justify-center rounded-full bg-[#E01B24] text-white shadow-md transition duration-300 group-hover:rotate-90 group-hover:bg-[#FF5A1F]"
                  >
                    <Plus className="h-4 w-4" />
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
