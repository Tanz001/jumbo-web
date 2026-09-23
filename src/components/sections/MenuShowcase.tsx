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

      <div className="mx-auto max-w-7xl space-y-10">
        {/* Heading — fixed brand title, not category name */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-3">
            <span className="h-[2px] w-6 bg-[#E01B24]" />
            <span className="font-display text-[11px] uppercase tracking-[0.28em] text-[#E01B24]">
              Culinary Selection
            </span>
            <span className="h-[2px] w-6 bg-[#E01B24]" />
          </div>

          <h2 className="font-display text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight leading-[0.88] text-[#0A0A0A]">
            Our{' '}
            <span className="font-accent lowercase italic text-[#E01B24]">Menu</span>
          </h2>

          <p className="font-body text-sm sm:text-base text-[#5C564E] leading-relaxed">
            Injected broast, burgers, wings & more — fresh off the broaster.
          </p>
        </div>

        {/* Compact category toggle */}
        <div className="flex justify-center">
          <div
            role="tablist"
            aria-label="Menu categories"
            className="inline-flex max-w-full items-center gap-0.5 overflow-x-auto rounded-full border border-[#0A0A0A]/10 bg-white p-1 shadow-sm"
          >
            {MENU_CATEGORIES.map((cat) => {
              const count = MENU_PRODUCTS.filter((p) => p.category === cat.key).length;
              const active = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => handleCategoryChange(cat.key)}
                  className={`shrink-0 rounded-full px-3.5 py-2 font-display text-[10px] uppercase tracking-[0.12em] transition-all cursor-pointer sm:px-4 sm:text-[11px] ${
                    active
                      ? 'bg-[#E01B24] text-white shadow-sm'
                      : 'text-[#5C564E] hover:text-[#0A0A0A] hover:bg-[#F6EEE1]'
                  }`}
                >
                  {cat.label}
                  <span
                    className={`ml-1.5 tabular-nums ${
                      active ? 'text-white/70' : 'text-[#8C857C]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Subtle active category label */}
        <p className="text-center font-display text-[11px] uppercase tracking-[0.2em] text-[#8C857C]">
          Showing{' '}
          <span className="text-[#E01B24]">
            {MENU_CATEGORIES.find((c) => c.key === activeCategory)?.label}
          </span>
          {' · '}
          {currentItems.length} items
        </p>

        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {currentItems.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => onSelectProduct(item)}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              data-cursor="view"
              className="group relative flex flex-col overflow-hidden rounded-2xl border border-[#0A0A0A]/08 bg-white text-left shadow-md transition-all duration-300 hover:border-[#E01B24]/40 hover:shadow-xl cursor-pointer"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#EDE4D6]">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="h-full w-full object-cover food-grade transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                {item.spiceBadge && (
                  <div className="absolute left-3 top-3 rounded-full border border-[#F2B441]/35 bg-[#0A0A0A]/85 px-2.5 py-1 backdrop-blur-md">
                    <span className="font-display text-[9px] uppercase tracking-wider text-[#F2B441]">
                      {item.spiceBadge}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-1 flex-col gap-2 p-5">
                <p className="font-display text-[10px] uppercase tracking-widest text-[#E01B24] line-clamp-1">
                  {item.tagline}
                </p>
                <h3 className="font-display text-xl uppercase tracking-tight text-[#0A0A0A] transition-colors group-hover:text-[#E01B24] sm:text-2xl">
                  {item.name}
                </h3>
                <p className="line-clamp-2 font-body text-xs leading-relaxed text-[#5C564E]">
                  {item.desc}
                </p>

                <div className="mt-auto flex items-center justify-between border-t border-[#0A0A0A]/08 pt-3.5">
                  <span className="font-display text-lg text-[#E01B24]">{item.priceLabel}</span>
                  <span
                    aria-hidden
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E01B24] text-[#F6EEE1] shadow transition group-hover:rotate-90 group-hover:bg-[#FF5A1F]"
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
