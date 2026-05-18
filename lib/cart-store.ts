"use client";

import { create } from "zustand";
import type { Product } from "@/types/product";

export type CartItem = {
  lineId: string;
  product: Product;
  quantity: number;
  addons: string[];
};

type CartState = {
  items: CartItem[];
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  addItem: (product: Product, quantity?: number, addons?: string[]) => void;
  removeItem: (lineId: string) => void;
  updateQuantity: (lineId: string, quantity: number) => void;
  clearCart: () => void;
  total: () => number;
  count: () => number;
};

function lineId(product: Product, addons: string[]) {
  return `${product.id}:${addons.slice().sort().join("|")}`;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  isCartOpen: false,
  openCart: () => set({ isCartOpen: true }),
  closeCart: () => set({ isCartOpen: false }),
  addItem: (product, quantity = 1, addons = []) => {
    const id = lineId(product, addons);
    const current = get().items.find((item) => item.lineId === id);

    if (current) {
      set({
        items: get().items.map((item) =>
          item.lineId === id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      });
      return;
    }

    set({
      items: [
        ...get().items,
        {
          lineId: id,
          product,
          quantity,
          addons
        }
      ]
    });
  },
  removeItem: (lineIdToRemove) =>
    set({ items: get().items.filter((item) => item.lineId !== lineIdToRemove) }),
  updateQuantity: (lineIdToUpdate, quantity) =>
    set({
      items: get().items.map((item) =>
        item.lineId === lineIdToUpdate
          ? { ...item, quantity: Math.max(1, quantity) }
          : item
      )
    }),
  clearCart: () => set({ items: [] }),
  total: () =>
    get().items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    ),
  count: () => get().items.reduce((sum, item) => sum + item.quantity, 0)
}));
