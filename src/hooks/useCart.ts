import { useCallback, useMemo, useState } from 'react';
import type { MenuProduct } from '../data/menu';

export interface CartLine {
  product: MenuProduct;
  qty: number;
  heat: 'regular' | 'hot' | 'inferno';
}

export function useCart() {
  const [items, setItems] = useState<CartLine[]>([]);

  const addItem = useCallback(
    (product: MenuProduct, qty = 1, heat: CartLine['heat'] = 'hot') => {
      setItems((prev) => {
        const existing = prev.find(
          (line) => line.product.id === product.id && line.heat === heat
        );
        if (existing) {
          return prev.map((line) =>
            line.product.id === product.id && line.heat === heat
              ? { ...line, qty: line.qty + qty }
              : line
          );
        }
        return [...prev, { product, qty, heat }];
      });
    },
    []
  );

  const updateQty = useCallback((productId: string, heat: CartLine['heat'], qty: number) => {
    setItems((prev) =>
      prev
        .map((line) =>
          line.product.id === productId && line.heat === heat
            ? { ...line, qty }
            : line
        )
        .filter((line) => line.qty > 0)
    );
  }, []);

  const removeItem = useCallback((productId: string, heat: CartLine['heat']) => {
    setItems((prev) =>
      prev.filter((line) => !(line.product.id === productId && line.heat === heat))
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const totalQty = useMemo(
    () => items.reduce((sum, line) => sum + line.qty, 0),
    [items]
  );

  const subtotal = useMemo(
    () => items.reduce((sum, line) => sum + line.product.price * line.qty, 0),
    [items]
  );

  return {
    items,
    addItem,
    updateQty,
    removeItem,
    clearCart,
    totalQty,
    subtotal,
  };
}
