import type { Product } from "@/types/shop";
import { create } from "zustand";

interface CartItem {
    product: Product;
    quantity: number;
}

interface CartState {
    items: CartItem[];
    addItem: (product: Product) => void;
    reset: () => void;
}

/**
 * useCart hook
 *
 * Provides the cart state and actions to manipulate it.
 *
 * @returns {CartState} The cart state and actions.
 */
export const useCart = create<CartState>((set) => ({
    items: [],
    addItem: (product: Product) => {
        set((state) => {
            const existingItem = state.items.find((item) =>
                item.product.id === product.id
            );
            if (existingItem) {
                return {
                    items: state.items.map((item) =>
                        item.product.id === product.id
                            ? { product, quantity: item.quantity + 1 }
                            : item
                    ),
                };
            }
            return {
                items: [...state.items, { product, quantity: 1 }],
            };
        });
    },
    reset: () => set({ items: [] }),
}));
