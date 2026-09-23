import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IMAGES } from '../../assets/images';
import { FoodImage } from '../common/FoodImage';
import { Plus } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface MenuItem {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  price: string;
  image: string;
  alt: string;
  spiceBadge?: string;
}

interface MenuShowcaseProps {
  onSelectItem: (itemName: string) => void;
}

export const MenuShowcase: React.FC<MenuShowcaseProps> = ({ onSelectItem }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsGridRef = useRef<HTMLDivElement>(null);
  const floatingPreviewRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<'broast' | 'burgers' | 'wings' | 'sides'>('broast');
  const [hoveredItem, setHoveredItem] = useState<MenuItem | null>(null);

  const categories = [
    { key: 'broast', label: 'Broast' },
    { key: 'burgers', label: 'Burgers' },
    { key: 'wings', label: 'Wings & Bites' },
    { key: 'sides', label: 'Sides' },
  ] as const;

  const menuData: Record<typeof activeCategory, MenuItem[]> = {
    broast: [
      {
        id: 'b1',
        name: 'Quarter Broast',
        tagline: '2 Pieces • Chest & Wing or Leg & Thigh',
        desc: 'Deep-injected fresh chicken with crunchy shatter-crust, served with garlic roll & signature sauce.',
        price: 'Rs. ---',
        image: IMAGES.hero.url,
        alt: 'Quarter Broast chicken portions',
        spiceBadge: 'Signature Injection',
      },
      {
        id: 'b2',
        name: 'Half Broast',
        tagline: '4 Pieces • Mixed Cuts',
        desc: 'Double the crunch. Perfectly balanced heat infused straight into the bone with fluffy dinner rolls.',
        price: 'Rs. ---',
        image: IMAGES.broastPieces.url,
        alt: 'Half Broast chicken platter',
        spiceBadge: 'Signature Injection',
      },
      {
        id: 'b3',
        name: 'Full Broast Bucket',
        tagline: '8 Pieces • Whole Feast',
        desc: 'The ultimate gathering feast. 8 huge pieces of injected broast, large garlic dip, fries, and fresh rolls.',
        price: 'Rs. ---',
        image: IMAGES.crisp.url,
        alt: 'Full Broast bucket with crisp golden chicken',
        spiceBadge: 'Feast Size',
      },
    ],
    burgers: [
      {
        id: 'bg1',
        name: 'Zinger Burger',
        tagline: 'Classic Crunch Fillet',
        desc: 'Whole chicken breast marinated in signature chili blend, fried golden, topped with iceberg & house mayo.',
        price: 'Rs. ---',
        image: IMAGES.burgerHero.url,
        alt: 'Crispy fried chicken zinger burger',
        spiceBadge: 'Crispy Fillet',
      },
      {
        id: 'bg2',
        name: 'Crispy Stacker',
        tagline: 'Double Fillet • Melted Cheddar',
        desc: 'Two stacked crispy fillets drizzled with fiery house glaze, pickled jalapeños, and toasted brioche bun.',
        price: 'Rs. ---',
        image: IMAGES.burger2.url,
        alt: 'Double stacker crispy chicken burger',
        spiceBadge: 'Double Stack',
      },
      {
        id: 'bg3',
        name: 'Double Crunch Burger',
        tagline: 'Spicy Glazed Smash',
        desc: 'Crunchy battered thigh fillet submerged in chili honey butter with garlic emulsion and brioche.',
        price: 'Rs. ---',
        image: IMAGES.gallery4.url,
        alt: 'Double crunch spicy chicken burger',
        spiceBadge: 'Fiery Glaze',
      },
    ],
    wings: [
      {
        id: 'w1',
        name: 'Hot Wings',
        tagline: '6 or 12 Pieces • Fiery Glaze',
        desc: 'Tossed in bubbling red chili glaze with toasted sesame seeds and cool house ranch dip.',
        price: 'Rs. ---',
        image: IMAGES.wings.url,
        alt: 'Glazed hot wings',
        spiceBadge: 'Hot & Spicy',
      },
      {
        id: 'w2',
        name: 'Chicken Strips',
        tagline: '5 Tenderloin Fillets',
        desc: '100% whole tenderloins breaded in our flaky seasoned flour, served with smoky BBQ dip.',
        price: 'Rs. ---',
        image: IMAGES.gallery5.url,
        alt: 'Crunchy chicken strips',
        spiceBadge: 'Boneless Crunch',
      },
      {
        id: 'w3',
        name: 'Nuggets Box',
        tagline: '9 Golden Bites',
        desc: 'Crispy bite-sized pieces with a golden crunch outside and juicy chicken inside.',
        price: 'Rs. ---',
        image: IMAGES.gallery3.url,
        alt: 'Golden nuggets bites',
        spiceBadge: 'Classic Bite',
      },
    ],
    sides: [
      {
        id: 's1',
        name: 'Loaded Fries',
        tagline: 'Melted Cheese • Minced Crunch',
        desc: 'Golden potato cuts smothered in hot cheese sauce, chopped crispy chicken bits, and jalapeño mayo.',
        price: 'Rs. ---',
        image: IMAGES.fries.url,
        alt: 'Loaded crispy cheese fries',
        spiceBadge: 'House Specialty',
      },
      {
        id: 's2',
        name: 'Coleslaw',
        tagline: 'Crisp Cabbage • Sweet Cream',
        desc: 'Chilled hand-shredded cabbage and carrots tossed in our thick, tangy sweet-cream dressing.',
        price: 'Rs. ---',
        image: IMAGES.gallery6.url,
        alt: 'Creamy fresh coleslaw',
        spiceBadge: 'Cooling Side',
      },
      {
        id: 's3',
        name: 'Garlic Mayo Dip',
        tagline: 'Secret Broast Sauce',
        desc: 'Our iconic whipped garlic emulsion seasoned with roasted black pepper and lemon zest.',
        price: 'Rs. ---',
        image: IMAGES.broastCloseup.url,
        alt: 'Signature garlic mayo dipping cup',
        spiceBadge: 'Original Recipe',
      },
    ],
  };

  // Animate category switch
  const handleCategoryChange = (cat: typeof activeCategory) => {
    if (cat === activeCategory) return;
    const cards = cardsGridRef.current;
    if (!cards) {
      setActiveCategory(cat);
      return;
    }

    gsap.to(cards.children, {
      y: -25,
      opacity: 0,
      stagger: 0.04,
      duration: 0.25,
      ease: 'power2.in',
      onComplete: () => {
        setActiveCategory(cat);
        // Animate new cards in
        gsap.fromTo(
          cards.children,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 0.5,
            ease: 'power3.out',
          }
        );
      },
    });
  };

  // Cursor Floating Preview Tracking
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const preview = floatingPreviewRef.current;
    if (!preview) return;

    const xTo = gsap.quickTo(preview, 'x', { duration: 0.4, ease: 'power3.out' });
    const yTo = gsap.quickTo(preview, 'y', { duration: 0.4, ease: 'power3.out' });
    const rotTo = gsap.quickTo(preview, 'rotation', { duration: 0.4, ease: 'power3.out' });

    let lastX = 0;
    const handleMouseMove = (e: MouseEvent) => {
      const mouseVelocity = e.clientX - lastX;
      lastX = e.clientX;

      xTo(e.clientX + 25);
      yTo(e.clientY - 90);
      rotTo(Math.max(-12, Math.min(12, mouseVelocity * 0.4)));
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const currentItems = menuData[activeCategory];

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="relative min-h-screen w-full bg-[#0A0A0A] text-[#F6EEE1] py-24 px-6 sm:px-12 select-none overflow-hidden"
    >
      {/* Floating Image Preview Following Cursor (Desktop) */}
      <div
        ref={floatingPreviewRef}
        className={`fixed top-0 left-0 w-52 h-36 rounded-2xl overflow-hidden shadow-2xl border-2 border-[#E01B24] pointer-events-none z-[9990] transition-opacity duration-200 hidden lg:block ${
          hoveredItem ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
        }`}
      >
        {hoveredItem && (
          <img
            src={hoveredItem.image}
            alt={hoveredItem.name}
            className="w-full h-full object-cover food-grade"
          />
        )}
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Title & Tagline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-[#F6EEE1]/10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#E01B24]" />
              <span className="font-display uppercase text-xs tracking-widest text-[#E01B24]">
                THE CULINARY SELECTION
              </span>
            </div>
            <h2 className="font-display text-5xl sm:text-7xl md:text-8xl uppercase tracking-tight text-[#F6EEE1] leading-[0.9]">
              THE <span className="font-accent lowercase italic text-[#F2B441]">menu</span>
            </h2>
          </div>

          <p className="max-w-md text-sm text-[#8C857C] font-body">
            Every broast portion is hand-injected on order and pressure-fried fresh. Never held under lamps.
          </p>
        </div>

        {/* Category Filter Pills (Functional Tabs) */}
        <div className="flex items-center gap-2 p-1.5 bg-[#161413] rounded-full w-max border border-[#F6EEE1]/10 max-w-full overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryChange(cat.key)}
              className={`px-5 sm:px-7 py-2.5 rounded-full text-xs sm:text-sm font-display uppercase tracking-wider transition-all cursor-pointer whitespace-nowrap ${
                activeCategory === cat.key
                  ? 'bg-[#E01B24] text-[#F6EEE1] shadow-lg shadow-[#E01B24]/30'
                  : 'text-[#8C857C] hover:text-[#F6EEE1]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* 3-Column Card Grid (1 col on mobile) */}
        <div
          ref={cardsGridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {currentItems.map((item) => (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredItem(item)}
              onMouseLeave={() => setHoveredItem(null)}
              className="group relative bg-[#161413] rounded-3xl overflow-hidden border border-[#F6EEE1]/10 hover:border-[#E01B24]/50 transition-all duration-500 shadow-xl flex flex-col justify-between"
            >
              {/* Card Image on Top with Hover Zoom (scale 1.08, 0.8s expo.out) */}
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#0A0A0A]">
                <img
                  src={item.image}
                  alt={item.alt}
                  loading="lazy"
                  className="w-full h-full object-cover food-grade transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161413] via-transparent to-transparent pointer-events-none" />

                {item.spiceBadge && (
                  <div className="absolute top-4 left-4 bg-[#0A0A0A]/85 backdrop-blur-md px-3 py-1 rounded-full border border-[#F2B441]/30">
                    <span className="font-display text-[10px] uppercase tracking-wider text-[#F2B441]">
                      {item.spiceBadge}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
                <div className="space-y-1.5">
                  <div className="text-[11px] font-display uppercase tracking-widest text-[#E01B24]">
                    {item.tagline}
                  </div>
                  <h3 className="font-display text-2xl sm:text-3xl uppercase tracking-tight text-[#F6EEE1] group-hover:text-[#FF5A1F] transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#8C857C] font-body line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Card Footer: Price Placeholder + Round Rotate Button */}
                <div className="pt-4 border-t border-[#F6EEE1]/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[#8C857C] font-body block uppercase tracking-wider">
                      Price
                    </span>
                    <span className="font-display text-xl text-[#F2B441] tracking-wider">
                      {item.price}
                    </span>
                  </div>

                  {/* Round + Button rotates 90deg on hover */}
                  <button
                    onClick={() => onSelectItem(item.name)}
                    aria-label={`Order ${item.name}`}
                    className="w-12 h-12 rounded-full bg-[#E01B24] text-[#F6EEE1] flex items-center justify-center cursor-pointer shadow-lg hover:bg-[#FF5A1F] transition-all group-hover:rotate-90 duration-300"
                  >
                    <Plus className="w-5 h-5 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
