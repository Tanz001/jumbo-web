/**
 * JUMBO Image Asset Registry
 * Central export of all photo assets.
 * Replace URLs with production photography as needed.
 */

export interface ImageSlot {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export const IMAGES = {
  // Hero section - golden broast pieces, dark moody atmospheric lighting
  hero: {
    url: 'https://images.unsplash.com/photo-1626645738196-c2a7c87a8f58?auto=format&fit=crop&w=1800&q=80',
    alt: 'Jumbo Signature Crispy Injected Broast Chicken',
    width: 1800,
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
    url: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?auto=format&fit=crop&w=1800&q=80',
    alt: 'Golden fried chicken broast portions with seasoning',
    width: 1600,
    height: 1067,
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
    url: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?auto=format&fit=crop&w=1800&q=80',
    alt: 'Pressure cooked to golden shatteringly crispy perfection',
    width: 1600,
    height: 1067,
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
  // Masonry gallery slots 1 to 6
  gallery1: {
    url: 'https://images.unsplash.com/photo-1527477265147-19a9d7eb0b1f?auto=format&fit=crop&w=1800&q=80',
    alt: 'Jumbo kitchen craft and fiery culinary mastery',
    width: 1200,
    height: 1600,
  },
  gallery2: {
    url: 'https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1800&q=80',
    alt: 'Dark moody luxury dining ambiance',
    width: 1600,
    height: 1067,
  },
  gallery3: {
    url: 'https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=1800&q=80',
    alt: 'Freshly fried chicken portions in warm glow',
    width: 1400,
    height: 1400,
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
    url: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1800&q=80',
    alt: 'Grand feast table spread at Jumbo',
    width: 1600,
    height: 1067,
  },
  // Store front
  storeFront: {
    url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80',
    alt: 'Jumbo flagship store exterior with fiery warm illumination',
    width: 1800,
    height: 1200,
  },
};

export type ImageKey = keyof typeof IMAGES;
