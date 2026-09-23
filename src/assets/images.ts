/**
 * JUMBO Image Asset Registry
 * Local brand photos + curated Unsplash fallbacks.
 */

import event1 from './event1.png';
import event2 from './event2.png';
import broastTray from './borast1 (1).jpeg';
import broastCombo from './brast2.jpeg';
import jumboMascot from './chicken.jpeg';

export interface ImageSlot {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export const IMAGES = {
  // Local brand photography
  eventLaunch: {
    url: event1,
    alt: 'Jumbo Model Town grand launch — 24 September 2026',
    width: 1200,
    height: 1600,
  },
  eventCelebration: {
    url: event2,
    alt: 'Jumbo team celebrating with the signature launch cake',
    width: 1600,
    height: 1200,
  },
  broastPlatter: {
    url: broastTray,
    alt: 'Jumbo crispy broast platter with fries, bun, and garlic dip',
    width: 1600,
    height: 1200,
  },
  broastCombo: {
    url: broastCombo,
    alt: 'Jumbo broast meal tray with fries, sesame bun, and red drink',
    width: 1600,
    height: 1200,
  },
  mascot: {
    url: jumboMascot,
    alt: 'Jumbo rooster mascot',
    width: 1200,
    height: 1200,
  },

  // Hero — real Jumbo broast tray
  hero: {
    url: broastTray,
    alt: 'Jumbo Signature Crispy Injected Broast Chicken',
    width: 1600,
    height: 1200,
  },
  // Macro crust close-up in Story section
  broastCloseup: {
    url: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&w=1800&q=80',
    alt: 'Extreme close up of crunchy golden broast crust',
    width: 1200,
    height: 1600,
  },
  // Crispy pieces spread
  broastPieces: {
    url: broastCombo,
    alt: 'Golden fried chicken broast portions with seasoning',
    width: 1600,
    height: 1200,
  },
  // Signature Process 01: Marinate
  marinate: {
    url: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=1800&q=80',
    alt: 'Deep overnight marination with rich spice infusion',
    width: 1600,
    height: 1067,
  },
  // Signature Process 02: Inject
  inject: {
    url: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1800&q=80',
    alt: 'Deep flavor injection into fresh chicken meat',
    width: 1600,
    height: 1067,
  },
  // Signature Process 03: Pressure Broast / Crisp
  crisp: {
    url: broastTray,
    alt: 'Pressure cooked to golden shatteringly crispy perfection',
    width: 1600,
    height: 1200,
  },
  // Burger feature split
  burgerHero: {
    url: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=1800&q=80',
    alt: 'Jumbo Stacked Gourmet Crispy Broast Burger',
    width: 1400,
    height: 1400,
  },
  burger2: {
    url: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=1800&q=80',
    alt: 'Double crunch spicy chicken burger with house glaze',
    width: 1400,
    height: 1400,
  },
  // Wings
  wings: {
    url: 'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?auto=format&fit=crop&w=1800&q=80',
    alt: 'Glazed hot and spicy wings with toasted sesame',
    width: 1600,
    height: 1200,
  },
  // Fries
  fries: {
    url: 'https://images.unsplash.com/photo-1576107232684-1279f3908594?auto=format&fit=crop&w=1800&q=80',
    alt: 'Crispy seasoned jumbo potato fries',
    width: 1600,
    height: 1067,
  },
  // Masonry gallery slots
  gallery1: {
    url: broastTray,
    alt: 'Jumbo kitchen craft and fiery culinary mastery',
    width: 1600,
    height: 1200,
  },
  gallery2: {
    url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=80',
    alt: 'Dark moody luxury dining ambiance',
    width: 1600,
    height: 1067,
  },
  gallery3: {
    url: broastCombo,
    alt: 'Freshly fried chicken portions in warm glow',
    width: 1600,
    height: 1200,
  },
  gallery4: {
    url: 'https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1800&q=80',
    alt: 'Crispy burger and seasoned golden fries pairing',
    width: 1400,
    height: 1400,
  },
  gallery5: {
    url: 'https://images.unsplash.com/photo-1529193591184-b1d58069ecdd?auto=format&fit=crop&w=1800&q=80',
    alt: 'Sizzling glazed wings with signature garlic dip',
    width: 1200,
    height: 1600,
  },
  gallery6: {
    url: event2,
    alt: 'Jumbo team and store celebration',
    width: 1600,
    height: 1200,
  },
  // Store front
  storeFront: {
    url: event1,
    alt: 'Jumbo Model Town flagship store grand launch',
    width: 1200,
    height: 1600,
  },
};

export type ImageKey = keyof typeof IMAGES;
