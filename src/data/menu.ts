import { IMAGES } from '../assets/images';

export type MenuCategory =
  | 'deals'
  | 'broast'
  | 'burgers'
  | 'wings'
  | 'fries'
  | 'extras'
  | 'beverages';

export interface MenuProduct {
  id: string;
  name: string;
  tagline: string;
  desc: string;
  longDesc: string;
  price: number;
  priceLabel: string;
  image: string;
  alt: string;
  spiceBadge?: string;
  category: MenuCategory;
  serves?: string;
  heat?: string;
  includes?: string[];
}

export const MENU_CATEGORIES: { key: MenuCategory; label: string }[] = [
  { key: 'deals', label: 'Deals' },
  { key: 'broast', label: 'Broast' },
  { key: 'burgers', label: 'Burgers' },
  { key: 'wings', label: 'Wings' },
  { key: 'fries', label: 'Fries' },
  { key: 'extras', label: 'Extras' },
  { key: 'beverages', label: 'Beverages' },
];

export const MENU_PRODUCTS: MenuProduct[] = [
  // —— Deals ——
  {
    id: 'd1',
    name: 'Solo Crunch Deal',
    tagline: 'Quarter Broast + Fries + Drink',
    desc: 'Perfect one-person feast — injected quarter, seasoned fries, and a cold drink.',
    longDesc:
      'Your everyday Jumbo deal: signature quarter broast, golden fries, garlic dip, and a soft drink — ready in minutes.',
    price: 1190,
    priceLabel: 'Rs. 1,190',
    image: IMAGES.broastCombo.url,
    alt: 'Solo crunch deal tray',
    spiceBadge: 'Best Seller',
    category: 'deals',
    serves: '1 person',
    heat: 'Medium',
    includes: ['Quarter broast', 'Fries', 'Drink', 'Garlic dip'],
  },
  {
    id: 'd2',
    name: 'Duo Feast Deal',
    tagline: 'Half Broast + Fries + 2 Drinks',
    desc: 'Share the crunch — half broast, large fries, twin drinks, and double dips.',
    longDesc:
      'Built for two: half injected broast, large fries, two soft drinks, and signature garlic emulsion.',
    price: 2190,
    priceLabel: 'Rs. 2,190',
    image: IMAGES.broastPlatter.url,
    alt: 'Duo feast broast deal',
    spiceBadge: 'For Two',
    category: 'deals',
    serves: '2 people',
    heat: 'Medium–Hot',
    includes: ['Half broast', 'Large fries', '2 drinks', '2 dips'],
  },
  {
    id: 'd3',
    name: 'Family Bucket Deal',
    tagline: 'Full Broast + Large Fries + 4 Drinks',
    desc: 'Table-ready feast for the whole crew with rolls and house dips.',
    longDesc:
      'Full broast bucket, large fries, four drinks, rolls, and garlic dips — the gathering classic.',
    price: 3990,
    priceLabel: 'Rs. 3,990',
    image: IMAGES.broastPlatter.url,
    alt: 'Family broast bucket deal',
    spiceBadge: 'Family Size',
    category: 'deals',
    serves: '4–5 people',
    heat: 'Your choice',
    includes: ['Full broast', 'Large fries', '4 drinks', 'Rolls', 'Dips'],
  },
  {
    id: 'd4',
    name: 'Burger Box Deal',
    tagline: 'Zinger + Fries + Drink',
    desc: 'Crispy zinger burger boxed with fries and a chilled drink.',
    longDesc:
      'Zinger burger, seasoned fries, and soft drink — the fast crunch lunch that never misses.',
    price: 990,
    priceLabel: 'Rs. 990',
    image: IMAGES.burgerHero.url,
    alt: 'Burger box deal',
    spiceBadge: 'Quick Bite',
    category: 'deals',
    serves: '1 person',
    heat: 'Hot',
    includes: ['Zinger burger', 'Fries', 'Drink'],
  },

  // —— Broast ——
  {
    id: 'b1',
    name: 'Quarter Broast',
    tagline: '2 Pieces • Chest & Wing or Leg & Thigh',
    desc: 'Deep-injected fresh chicken with crunchy shatter-crust, served with garlic roll & signature sauce.',
    longDesc:
      'Our signature cut — hand-injected with Jumbo spice emulsion, pressure-broasted until the crust shatters and the meat stays bone-juicy.',
    price: 890,
    priceLabel: 'Rs. 890',
    image: IMAGES.broastCombo.url,
    alt: 'Quarter Broast chicken meal tray',
    spiceBadge: 'Signature Injection',
    category: 'broast',
    serves: '1–2 people',
    heat: 'Medium',
    includes: ['2 broast pieces', 'Garlic roll', 'Signature sauce'],
  },
  {
    id: 'b2',
    name: 'Half Broast',
    tagline: '4 Pieces • Mixed Cuts',
    desc: 'Double the crunch. Perfectly balanced heat infused straight into the bone with fluffy dinner rolls.',
    longDesc:
      'Four mixed cuts of injected broast — finished under pressure for maximum crunch and deep spice.',
    price: 1690,
    priceLabel: 'Rs. 1,690',
    image: IMAGES.broastPlatter.url,
    alt: 'Half Broast chicken platter with fries',
    spiceBadge: 'Signature Injection',
    category: 'broast',
    serves: '2–3 people',
    heat: 'Medium–Hot',
    includes: ['4 broast pieces', 'Dinner rolls', 'Large garlic dip'],
  },
  {
    id: 'b3',
    name: 'Full Broast Bucket',
    tagline: '8 Pieces • Whole Feast',
    desc: 'The ultimate gathering feast. 8 huge pieces of injected broast, large garlic dip, fries, and fresh rolls.',
    longDesc:
      'Eight pressure-broasted pieces, golden fries, fluffy rolls, and generous garlic emulsion.',
    price: 3190,
    priceLabel: 'Rs. 3,190',
    image: IMAGES.broastPlatter.url,
    alt: 'Full Broast feast platter',
    spiceBadge: 'Feast Size',
    category: 'broast',
    serves: '4–5 people',
    heat: 'Your choice',
    includes: ['8 broast pieces', 'Large fries', 'Rolls', 'Garlic dip'],
  },
  {
    id: 'b4',
    name: 'Broast Platter',
    tagline: '6 Pieces • Fries Basket • Dip',
    desc: 'Shareable platter of injected pieces with a wire basket of fries and peppered garlic mayo.',
    longDesc:
      'Six golden pieces on a tray with basket fries and our peppered garlic dip — made for sharing.',
    price: 2490,
    priceLabel: 'Rs. 2,490',
    image: IMAGES.broastPlatter.url,
    alt: 'Broast platter with fries basket',
    spiceBadge: 'Share Plate',
    category: 'broast',
    serves: '3–4 people',
    heat: 'Medium–Hot',
    includes: ['6 pieces', 'Fries basket', 'Garlic mayo'],
  },

  // —— Burgers ——
  {
    id: 'bg1',
    name: 'Zinger Burger',
    tagline: 'Classic Crunch Fillet',
    desc: 'Whole chicken breast marinated in signature chili blend, fried golden, topped with iceberg & house mayo.',
    longDesc:
      'Chili-marinated breast fillet, golden crunch, iceberg, and house mayo on toasted brioche.',
    price: 750,
    priceLabel: 'Rs. 750',
    image: IMAGES.burgerHero.url,
    alt: 'Crispy fried chicken zinger burger',
    spiceBadge: 'Crispy Fillet',
    category: 'burgers',
    serves: '1 person',
    heat: 'Hot',
    includes: ['Crispy fillet', 'Brioche bun', 'House mayo'],
  },
  {
    id: 'bg2',
    name: 'Crispy Stacker',
    tagline: 'Double Fillet • Melted Cheddar',
    desc: 'Two stacked crispy fillets drizzled with fiery house glaze, pickled jalapeños, and toasted brioche bun.',
    longDesc:
      'Double crunch fillets, melted cheddar, fiery glaze, and pickled jalapeños.',
    price: 990,
    priceLabel: 'Rs. 990',
    image: IMAGES.burger2.url,
    alt: 'Double stacker crispy chicken burger',
    spiceBadge: 'Double Stack',
    category: 'burgers',
    serves: '1 person',
    heat: 'Fiery',
    includes: ['Double fillet', 'Cheddar', 'House glaze'],
  },
  {
    id: 'bg3',
    name: 'Double Crunch Burger',
    tagline: 'Spicy Glazed Smash',
    desc: 'Crunchy battered thigh fillet submerged in chili honey butter with garlic emulsion and brioche.',
    longDesc:
      'Battered thigh fillet glazed in chili-honey butter with garlic emulsion on soft brioche.',
    price: 850,
    priceLabel: 'Rs. 850',
    image: IMAGES.gallery4.url,
    alt: 'Double crunch spicy chicken burger',
    spiceBadge: 'Fiery Glaze',
    category: 'burgers',
    serves: '1 person',
    heat: 'Hot',
    includes: ['Thigh fillet', 'Chili honey butter', 'Brioche'],
  },
  {
    id: 'bg4',
    name: 'Jumbo Tower',
    tagline: 'Triple Fillet • Cheese · Jalapeño',
    desc: 'Three crunch layers stacked with cheddar, jalapeños, and ember mayo.',
    longDesc:
      'The tallest crunch in the house — triple fillet, cheese, jalapeño heat, and ember mayo.',
    price: 1290,
    priceLabel: 'Rs. 1,290',
    image: IMAGES.burger2.url,
    alt: 'Jumbo triple tower burger',
    spiceBadge: 'Max Stack',
    category: 'burgers',
    serves: '1 person',
    heat: 'Fiery',
    includes: ['Triple fillet', 'Cheddar', 'Jalapeños', 'Ember mayo'],
  },

  // —— Wings ——
  {
    id: 'w1',
    name: 'Hot Wings',
    tagline: '6 Pieces • Fiery Glaze',
    desc: 'Tossed in bubbling red chili glaze with toasted sesame seeds and cool house ranch dip.',
    longDesc:
      'Glossy hot wings in bubbling red chili glaze, sesame finish, cooled with ranch.',
    price: 790,
    priceLabel: 'Rs. 790',
    image: IMAGES.wings.url,
    alt: 'Glazed hot wings',
    spiceBadge: 'Hot & Spicy',
    category: 'wings',
    serves: '1–2 people',
    heat: 'Fiery',
    includes: ['6 hot wings', 'Ranch dip'],
  },
  {
    id: 'w2',
    name: 'Chicken Strips',
    tagline: '5 Tenderloin Fillets',
    desc: '100% whole tenderloins breaded in our flaky seasoned flour, served with smoky BBQ dip.',
    longDesc:
      'Five whole tenderloin strips in seasoned flaky crust with smoky BBQ.',
    price: 720,
    priceLabel: 'Rs. 720',
    image: IMAGES.gallery5.url,
    alt: 'Crunchy chicken strips',
    spiceBadge: 'Boneless Crunch',
    category: 'wings',
    serves: '1–2 people',
    heat: 'Mild–Medium',
    includes: ['5 strips', 'Smoky BBQ dip'],
  },
  {
    id: 'w3',
    name: 'Nuggets Box',
    tagline: '9 Golden Bites',
    desc: 'Crispy bite-sized pieces with a golden crunch outside and juicy chicken inside.',
    longDesc:
      'Nine golden nugget bites with Jumbo seasoning — kids and late-night favorites.',
    price: 550,
    priceLabel: 'Rs. 550',
    image: IMAGES.gallery3.url,
    alt: 'Golden nuggets bites',
    spiceBadge: 'Classic Bite',
    category: 'wings',
    serves: '1 person',
    heat: 'Mild',
    includes: ['9 nuggets', 'Choice of dip'],
  },
  {
    id: 'w4',
    name: 'Fire Wings Dozen',
    tagline: '12 Pieces • Ghost Glaze',
    desc: 'A full dozen wings in ghost-heat glaze with ranch and celery coolers.',
    longDesc:
      'Twelve wings pushed to ghost heat — sesame, ranch, and crunch that photographs itself.',
    price: 1390,
    priceLabel: 'Rs. 1,390',
    image: IMAGES.wings.url,
    alt: 'Dozen fire wings',
    spiceBadge: 'Ghost Heat',
    category: 'wings',
    serves: '2–3 people',
    heat: 'Inferno',
    includes: ['12 wings', 'Ranch', 'Celery'],
  },

  // —— Fries ——
  {
    id: 'f1',
    name: 'Classic Fries',
    tagline: 'Seasoned Golden Cuts',
    desc: 'Crisp potato fries dusted with Jumbo salt blend.',
    longDesc: 'Thin-cut fries, double-fried for shatter crunch, finished with house seasoning.',
    price: 290,
    priceLabel: 'Rs. 290',
    image: IMAGES.fries.url,
    alt: 'Classic seasoned fries',
    spiceBadge: 'Side Classic',
    category: 'fries',
    serves: '1 person',
    includes: ['Seasoned fries'],
  },
  {
    id: 'f2',
    name: 'Loaded Fries',
    tagline: 'Melted Cheese • Minced Crunch',
    desc: 'Golden potato cuts smothered in hot cheese sauce, chopped crispy chicken bits, and jalapeño mayo.',
    longDesc:
      'Crisp fries under hot cheese, minced crunch chicken, and jalapeño mayo.',
    price: 490,
    priceLabel: 'Rs. 490',
    image: IMAGES.fries.url,
    alt: 'Loaded crispy cheese fries',
    spiceBadge: 'House Specialty',
    category: 'fries',
    serves: '1–2 people',
    heat: 'Medium',
    includes: ['Seasoned fries', 'Cheese sauce', 'Crunch bits'],
  },
  {
    id: 'f3',
    name: 'Jumbo Fries Basket',
    tagline: 'Share Size • Herb Finish',
    desc: 'Wire-basket fries finished with herbs — made for the table.',
    longDesc: 'A share-size basket of golden fries with herb dust and garlic dip on the side.',
    price: 450,
    priceLabel: 'Rs. 450',
    image: IMAGES.broastPlatter.url,
    alt: 'Jumbo fries basket',
    spiceBadge: 'Share Size',
    category: 'fries',
    serves: '2–3 people',
    includes: ['Large fries', 'Herb seasoning', 'Garlic dip'],
  },

  // —— Extras ——
  {
    id: 'e1',
    name: 'Garlic Mayo Dip',
    tagline: 'Secret Broast Sauce',
    desc: 'Our iconic whipped garlic emulsion seasoned with roasted black pepper and lemon zest.',
    longDesc: 'The legendary Jumbo garlic emulsion — whipped, peppered, and bright with lemon.',
    price: 120,
    priceLabel: 'Rs. 120',
    image: IMAGES.broastCloseup.url,
    alt: 'Signature garlic mayo dipping cup',
    spiceBadge: 'Original Recipe',
    category: 'extras',
    serves: 'Sharing',
    includes: ['Whipped garlic emulsion'],
  },
  {
    id: 'e2',
    name: 'Coleslaw',
    tagline: 'Crisp Cabbage • Sweet Cream',
    desc: 'Chilled hand-shredded cabbage and carrots tossed in thick, tangy sweet-cream dressing.',
    longDesc: 'Cool, crisp, and creamy — the classic cooler for every fiery plate.',
    price: 250,
    priceLabel: 'Rs. 250',
    image: IMAGES.gallery6.url,
    alt: 'Creamy fresh coleslaw',
    spiceBadge: 'Cooling Side',
    category: 'extras',
    serves: '1–2 people',
    includes: ['Hand-shredded slaw', 'Sweet cream dressing'],
  },
  {
    id: 'e3',
    name: 'Dinner Rolls',
    tagline: 'Fluffy • Butter Soft',
    desc: 'Warm soft rolls — the classic broast companion.',
    longDesc: 'Freshly warmed dinner rolls, soft and ready for garlic dip.',
    price: 150,
    priceLabel: 'Rs. 150',
    image: IMAGES.broastCombo.url,
    alt: 'Dinner rolls',
    spiceBadge: 'Add-On',
    category: 'extras',
    serves: 'Sharing',
    includes: ['4 dinner rolls'],
  },
  {
    id: 'e4',
    name: 'Chili Honey Glaze Cup',
    tagline: 'Sweet Heat Finish',
    desc: 'House chili-honey butter for wings, strips, or fries.',
    longDesc: 'Sweet heat glaze cup — drizzle on anything that needs an ember kick.',
    price: 180,
    priceLabel: 'Rs. 180',
    image: IMAGES.wings.url,
    alt: 'Chili honey glaze',
    spiceBadge: 'Sweet Heat',
    category: 'extras',
    serves: 'Sharing',
    heat: 'Hot',
    includes: ['Chili honey glaze'],
  },

  // —— Beverages ——
  {
    id: 'bv1',
    name: 'Soft Drink',
    tagline: 'Chilled Can / Cup',
    desc: 'Ice-cold soft drink to cut through the crunch.',
    longDesc: 'Your choice of chilled soft drink — the classic broast cooler.',
    price: 120,
    priceLabel: 'Rs. 120',
    image: IMAGES.broastCombo.url,
    alt: 'Soft drink with broast meal',
    spiceBadge: 'Cold',
    category: 'beverages',
    serves: '1 person',
    includes: ['Soft drink'],
  },
  {
    id: 'bv2',
    name: 'Fresh Lime',
    tagline: 'Zesty • Ice Cold',
    desc: 'Fresh lime soda with a pinch of salt — heat’s best friend.',
    longDesc: 'Fresh lime over ice with a salted rim — bright and sharp against fiery broast.',
    price: 220,
    priceLabel: 'Rs. 220',
    image: IMAGES.hero.url,
    alt: 'Fresh lime drink',
    spiceBadge: 'House Cooler',
    category: 'beverages',
    serves: '1 person',
    includes: ['Fresh lime soda'],
  },
  {
    id: 'bv3',
    name: 'Mineral Water',
    tagline: 'Still · Chilled',
    desc: 'Chilled mineral water bottle.',
    longDesc: 'Simple, cold mineral water — always available.',
    price: 80,
    priceLabel: 'Rs. 80',
    image: IMAGES.gallery2.url,
    alt: 'Mineral water',
    category: 'beverages',
    serves: '1 person',
    includes: ['Mineral water'],
  },
];

export function findProductById(id: string) {
  return MENU_PRODUCTS.find((p) => p.id === id);
}

export function findProductByName(name: string) {
  const n = name.toLowerCase().replace(/\s*\(injected\)\s*/i, '').trim();
  return MENU_PRODUCTS.find(
    (p) =>
      p.name.toLowerCase() === n ||
      name.toLowerCase().includes(p.name.toLowerCase())
  );
}

export function formatRs(amount: number) {
  return `Rs. ${amount.toLocaleString('en-PK')}`;
}
