import React, { createContext, useContext, useState, useCallback, useMemo } from 'react';
import type { Product, CartItem } from '../types';

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  subtotal: number;
}

const CartContext = createContext<CartContextType>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  itemCount: 0,
  subtotal: 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('ds_cart');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });

  const persistCart = useCallback((newItems: CartItem[]) => {
    try { localStorage.setItem('ds_cart', JSON.stringify(newItems)); } catch {}
  }, []);

  const addItem = useCallback((product: Product, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      let next: CartItem[];
      if (existing) {
        next = prev.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
      } else {
        next = [...prev, { ...product, quantity }];
      }
      persistCart(next);
      return next;
    });
  }, [persistCart]);

  const removeItem = useCallback((productId: number) => {
    setItems(prev => {
      const next = prev.filter(i => i.id !== productId);
      persistCart(next);
      return next;
    });
  }, [persistCart]);

  const updateQuantity = useCallback((productId: number, quantity: number) => {
    if (quantity <= 0) {
      setItems(prev => {
        const next = prev.filter(i => i.id !== productId);
        persistCart(next);
        return next;
      });
      return;
    }
    setItems(prev => {
      const next = prev.map(i => i.id === productId ? { ...i, quantity } : i);
      persistCart(next);
      return next;
    });
  }, [persistCart]);

  const clearCart = useCallback(() => {
    setItems([]);
    persistCart([]);
  }, [persistCart]);

  const itemCount = useMemo(() => items.reduce((sum, i) => sum + i.quantity, 0), [items]);
  const subtotal = useMemo(() => items.reduce((sum, i) => sum + i.price * i.quantity, 0), [items]);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, itemCount, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
