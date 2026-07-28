import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "@/types/product";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  clearCart: () => void;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const currentItems = get().items;
        const existingIndex = currentItems.findIndex((item) => item.id === product.id);
        if (existingIndex > -1) {
          const updated = [...currentItems];
          updated[existingIndex].quantity += 1;
          set({ items: updated });
        } else {
          set({ items: [...currentItems, { ...product, quantity: 1 }] });
        }
      },
      removeItem: (productId) => {
        set({ items: get().items.filter((item) => item.id !== productId) });
      },
      increaseQuantity: (productId) => {
        set({
          items: get().items.map((item) =>
            item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
          ),
        });
      },
      decreaseQuantity: (productId) => {
        set({
          items: get().items
            .map((item) =>
              item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
            )
            .filter((item) => item.quantity > 0),
        });
      },
      clearCart: () => set({ items: [] }),
    }),
    { name: "shopping-cart-storage" }
  )
);