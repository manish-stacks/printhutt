"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Product } from "@/lib/types/product";
import axios from "axios";

const add_product = async (product_id: string) => {
  try {
    if (!product_id) {
      throw new Error("Product ID is required");
    }
    const response = await axios.post(`/api/session-cart`, {
      product_id,
    });
    console.log(response.data);
  } catch (error) {
    return error;
  }
};
interface CartItem extends Product {
  quantity: number;
  custom_data?: object;
}

interface CartStore {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  removeAllItems: () => void;
  updateQuantity: (productId: string, quantity: number) => void;
  getTotalItems: () => number;
  getTotalPrice: () => {
    discountPrice: number;
    totalPrice: number;
    shippingTotal: number;
  };
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addToCart: (product, quantity) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) => item._id === product._id
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item._id === product._id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          }
          add_product(product._id).catch((err) =>
            console.error("Failed to add product:", err)
          );
          return {
            items: [...state.items, { ...product, quantity }],
          };
        });
      },
      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter((item) => item._id !== productId),
        }));
      },
      removeAllItems: () => {
        set({ items: [] });
      },
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items
            .map((item) =>
              item._id === productId
                ? { ...item, quantity: Math.max(0, quantity) }
                : item
            )
            .filter((item) => item.quantity > 0),
        }));
      },
      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },
      getTotalPrice: () => {
        const items = get().items;
        const totalPrice = items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );
        const discountPrice = items.reduce((total, item) => {
          if (item.discountType === "percentage") {
            return (
              total +
              (item.price - (item.price * item.discountPrice) / 100) *
                item.quantity
            );
          } else {
            return total + (item.price - item.discountPrice) * item.quantity;
          }
        }, 0);

        const shippingTotal = items.reduce(
          (total, item) => total + item.shippingFee,
          0
        );
        return {
          totalPrice,
          discountPrice,
          shippingTotal,
        };
      },
    }),
    {
      name: "cart-storage",
    }
  )
);
