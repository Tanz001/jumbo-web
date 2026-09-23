import React, { useEffect } from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import type { CartLine } from '../../hooks/useCart';
import { formatRs } from '../../data/menu';
import { MagneticButton } from './MagneticButton';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartLine[];
  subtotal: number;
  onUpdateQty: (productId: string, heat: CartLine['heat'], qty: number) => void;
  onRemove: (productId: string, heat: CartLine['heat']) => void;
  onCheckout: () => void;
}

const heatLabel: Record<CartLine['heat'], string> = {
  regular: 'Classic',
  hot: 'Fiery',
  inferno: 'Ghost',
};

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  onUpdateQty,
  onRemove,
  onCheckout,
}) => {
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10020] flex justify-end">
      <button
        type="button"
        aria-label="Close cart backdrop"
        className="absolute inset-0 bg-[#0A0A0A]/45 backdrop-blur-[2px] cursor-pointer"
        onClick={onClose}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-title"
        className="relative flex h-full w-full max-w-md flex-col bg-white text-[#0A0A0A] shadow-[-20px_0_60px_rgba(0,0,0,0.25)]"
      >
        <div className="flex items-center justify-between border-b border-[#0A0A0A]/08 px-5 py-5 sm:px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F6EEE1]">
              <ShoppingBag className="h-5 w-5 text-[#E01B24]" />
            </div>
            <div>
              <h2 id="cart-title" className="font-display text-2xl uppercase tracking-tight">
                Your Cart
              </h2>
              <p className="font-body text-xs text-[#8C857C]">
                {items.length === 0 ? 'Empty for now' : `${items.length} item line${items.length > 1 ? 's' : ''}`}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close cart"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-[#0A0A0A]/12 hover:border-[#E01B24] hover:text-[#E01B24] cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-5 sm:px-6">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F6EEE1]">
                <ShoppingBag className="h-7 w-7 text-[#8C857C]" />
              </div>
              <p className="font-display text-xl uppercase tracking-tight">Cart is empty</p>
              <p className="mt-2 max-w-[220px] font-body text-sm text-[#8C857C]">
                Browse the menu and add your first injected broast.
              </p>
              <MagneticButton variant="primary" size="sm" onClick={onClose} className="mt-6">
                Browse Menu
              </MagneticButton>
            </div>
          ) : (
            <ul className="space-y-4">
              {items.map((line) => (
                <li
                  key={`${line.product.id}-${line.heat}`}
                  className="flex gap-3 rounded-2xl border border-[#0A0A0A]/08 bg-[#FAFAF8] p-3"
                >
                  <div className="h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-[#F6EEE1]">
                    <img
                      src={line.product.image}
                      alt={line.product.alt}
                      className="h-full w-full object-cover food-grade"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="font-display text-base uppercase tracking-tight leading-tight">
                          {line.product.name}
                        </p>
                        <p className="mt-0.5 font-body text-[11px] text-[#8C857C]">
                          Heat · {heatLabel[line.heat]}
                        </p>
                      </div>
                      <button
                        type="button"
                        aria-label={`Remove ${line.product.name}`}
                        onClick={() => onRemove(line.product.id, line.heat)}
                        className="text-[#8C857C] hover:text-[#E01B24] cursor-pointer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center rounded-full border border-[#0A0A0A]/12 bg-white">
                        <button
                          type="button"
                          aria-label="Decrease"
                          onClick={() =>
                            onUpdateQty(line.product.id, line.heat, line.qty - 1)
                          }
                          className="flex h-8 w-8 items-center justify-center cursor-pointer"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="min-w-7 text-center font-display text-sm">{line.qty}</span>
                        <button
                          type="button"
                          aria-label="Increase"
                          onClick={() =>
                            onUpdateQty(line.product.id, line.heat, line.qty + 1)
                          }
                          className="flex h-8 w-8 items-center justify-center cursor-pointer"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="font-display text-sm text-[#E01B24]">
                        {formatRs(line.product.price * line.qty)}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-[#0A0A0A]/08 bg-white px-5 py-5 sm:px-6">
            <div className="mb-1 flex items-center justify-between font-body text-sm text-[#8C857C]">
              <span>Subtotal</span>
              <span className="font-display text-lg text-[#0A0A0A]">{formatRs(subtotal)}</span>
            </div>
            <p className="mb-4 font-body text-[11px] text-[#8C857C]">
              Taxes & delivery calculated at checkout.
            </p>
            <MagneticButton variant="primary" size="md" className="w-full" onClick={onCheckout}>
              Checkout · {formatRs(subtotal)}
            </MagneticButton>
          </div>
        )}
      </aside>
    </div>
  );
};
