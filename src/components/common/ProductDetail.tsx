import React, { useEffect, useState } from 'react';
import { Minus, Plus, ShoppingBag, X, Flame, Users, Check } from 'lucide-react';
import type { MenuProduct } from '../../data/menu';
import { formatRs } from '../../data/menu';
import { MagneticButton } from './MagneticButton';
import type { CartLine } from '../../hooks/useCart';

interface ProductDetailProps {
  product: MenuProduct | null;
  onClose: () => void;
  onAddToCart: (product: MenuProduct, qty: number, heat: CartLine['heat']) => void;
  onOpenCart: () => void;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenCart,
}) => {
  const [qty, setQty] = useState(1);
  const [heat, setHeat] = useState<CartLine['heat']>('hot');
  const [justAdded, setJustAdded] = useState(false);

  useEffect(() => {
    if (!product) return;
    setQty(1);
    setHeat('hot');
    setJustAdded(false);
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [product]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, qty, heat);
    setJustAdded(true);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="product-detail-title"
      className="fixed inset-0 z-[10000] flex items-stretch justify-center bg-[#0A0A0A]/55 backdrop-blur-sm"
    >
      <div className="relative m-0 flex h-full w-full max-w-6xl flex-col overflow-hidden bg-[#F6EEE1] text-[#0A0A0A] shadow-2xl md:m-6 md:h-[calc(100%-3rem)] md:rounded-[2rem] md:flex-row">
        <button
          type="button"
          onClick={onClose}
          aria-label="Close product details"
          className="absolute right-4 top-4 z-30 flex h-11 w-11 items-center justify-center rounded-full border border-[#0A0A0A]/15 bg-white text-[#0A0A0A] shadow-md transition hover:border-[#E01B24] hover:text-[#E01B24] cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Image column */}
        <div className="relative h-[38vh] w-full shrink-0 overflow-hidden md:h-full md:w-[48%]">
          <img
            src={product.image}
            alt={product.alt}
            className="h-full w-full object-cover food-grade"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/50 via-transparent to-transparent" />
          {product.spiceBadge && (
            <div className="absolute left-5 top-5 rounded-full border border-[#F2B441]/40 bg-[#0A0A0A]/80 px-3.5 py-1.5 backdrop-blur-md">
              <span className="font-display text-[10px] uppercase tracking-wider text-[#F2B441]">
                {product.spiceBadge}
              </span>
            </div>
          )}
          <div className="absolute bottom-5 left-5 right-5 md:hidden">
            <p className="font-display text-3xl uppercase tracking-tight text-[#F6EEE1]">
              {product.name}
            </p>
            <p className="mt-1 font-display text-xl text-[#F2B441]">{formatRs(product.price)}</p>
          </div>
        </div>

        {/* Details column */}
        <div className="flex flex-1 flex-col overflow-y-auto px-6 py-7 sm:px-10 sm:py-10">
          <div className="mb-2 hidden items-center gap-2 md:flex">
            <span className="w-7 h-[2px] bg-[#E01B24]" />
            <span className="font-display text-[11px] uppercase tracking-[0.22em] text-[#E01B24]">
              Product Details
            </span>
          </div>

          <h2
            id="product-detail-title"
            className="hidden font-display text-5xl uppercase tracking-tight leading-[0.9] text-[#0A0A0A] md:block"
          >
            {product.name}
          </h2>
          <p className="mt-2 hidden font-display text-2xl text-[#E01B24] md:block">
            {formatRs(product.price)}
          </p>

          <p className="mt-3 font-display text-[11px] uppercase tracking-widest text-[#8C857C]">
            {product.tagline}
          </p>
          <p className="mt-4 max-w-xl font-body text-sm sm:text-base leading-relaxed text-[#161413]/80">
            {product.longDesc}
          </p>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {product.serves && (
              <div className="rounded-2xl border border-[#0A0A0A]/10 bg-white/70 p-3">
                <Users className="mb-1.5 h-4 w-4 text-[#E01B24]" />
                <p className="font-display text-[10px] uppercase tracking-wider text-[#8C857C]">Serves</p>
                <p className="font-body text-sm font-semibold text-[#0A0A0A]">{product.serves}</p>
              </div>
            )}
            {product.heat && (
              <div className="rounded-2xl border border-[#0A0A0A]/10 bg-white/70 p-3">
                <Flame className="mb-1.5 h-4 w-4 text-[#FF5A1F]" />
                <p className="font-display text-[10px] uppercase tracking-wider text-[#8C857C]">Base Heat</p>
                <p className="font-body text-sm font-semibold text-[#0A0A0A]">{product.heat}</p>
              </div>
            )}
            <div className="rounded-2xl border border-[#0A0A0A]/10 bg-white/70 p-3 col-span-2 sm:col-span-1">
              <ShoppingBag className="mb-1.5 h-4 w-4 text-[#F2B441]" />
              <p className="font-display text-[10px] uppercase tracking-wider text-[#8C857C]">Fresh</p>
              <p className="font-body text-sm font-semibold text-[#0A0A0A]">Made to order</p>
            </div>
          </div>

          {product.includes && (
            <ul className="mt-6 space-y-2">
              {product.includes.map((item) => (
                <li key={item} className="flex items-center gap-2 font-body text-sm text-[#161413]/85">
                  <Check className="h-4 w-4 shrink-0 text-[#E01B24]" />
                  {item}
                </li>
              ))}
            </ul>
          )}

          <div className="mt-8">
            <p className="mb-2 font-display text-[11px] uppercase tracking-wider text-[#8C857C]">
              Injection Heat
            </p>
            <div className="grid grid-cols-3 gap-2">
              {(
                [
                  { key: 'regular', label: 'Classic' },
                  { key: 'hot', label: 'Fiery' },
                  { key: 'inferno', label: 'Ghost' },
                ] as const
              ).map((level) => (
                <button
                  key={level.key}
                  type="button"
                  onClick={() => setHeat(level.key)}
                  className={`rounded-xl border px-3 py-2.5 font-display text-xs uppercase tracking-wider transition cursor-pointer ${
                    heat === level.key
                      ? 'border-[#E01B24] bg-[#E01B24] text-white'
                      : 'border-[#0A0A0A]/15 bg-white text-[#0A0A0A] hover:border-[#E01B24]'
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-auto flex flex-col gap-4 pt-8 sm:flex-row sm:items-center">
            <div className="inline-flex items-center rounded-full border border-[#0A0A0A]/15 bg-white p-1">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#0A0A0A] hover:bg-[#F6EEE1] cursor-pointer"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="min-w-10 text-center font-display text-lg">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-[#0A0A0A] hover:bg-[#F6EEE1] cursor-pointer"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>

            <div className="flex flex-1 flex-col gap-2 sm:flex-row">
              <MagneticButton variant="primary" size="md" onClick={handleAdd} className="flex-1">
                {justAdded ? 'Added to Cart' : `Add · ${formatRs(product.price * qty)}`}
              </MagneticButton>
              {justAdded && (
                <MagneticButton variant="outlineDark" size="md" onClick={onOpenCart} className="flex-1">
                  View Cart
                </MagneticButton>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
