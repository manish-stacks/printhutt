// Recommended implementation for useCartStore.ts
// This implementation adds chunking for large data items

import { create } from 'zustand';
import { persist, createJSONStorage, StateStorage } from 'zustand/middleware';
import { Product } from '@/lib/types/product';

// Define custom storage for handling large items with chunking
const createChunkedStorage = (): StateStorage => {
  // Maximum size per chunk (in bytes)
  const MAX_CHUNK_SIZE = 1024 * 1024; // 1MB per chunk

  // Get total localStorage capacity (estimate)
  const MAX_STORAGE = 5 * 1024 * 1024; // Assume 5MB total

  return {
    getItem: (key) => {
      try {
        // Check if the item is chunked
        const info = localStorage.getItem(`${key}:info`);

        if (!info) {
          // If no chunk info, try to get the item directly
          const item = localStorage.getItem(key);
          return item;
        }

        // Parse chunk info
        const { chunks } = JSON.parse(info);
        let result = '';

        // Reassemble chunks
        for (let i = 0; i < chunks; i++) {
          const chunk = localStorage.getItem(`${key}:${i}`);
          if (chunk === null) {
            console.error(`Missing chunk ${i} for ${key}`);
            return null;
          }
          result += chunk;
        }

        return result;
      } catch (error) {
        console.error('Error retrieving chunked item from localStorage:', error);
        return null;
      }
    },

    setItem: (key, value) => {
      try {
        // Check if value needs chunking (if it's large)
        if (value.length > MAX_CHUNK_SIZE) {
          // Clear any existing chunks
          const existingInfo = localStorage.getItem(`${key}:info`);
          if (existingInfo) {
            const { chunks } = JSON.parse(existingInfo);
            for (let i = 0; i < chunks; i++) {
              localStorage.removeItem(`${key}:${i}`);
            }
          }

          // Calculate number of chunks needed
          const chunkCount = Math.ceil(value.length / MAX_CHUNK_SIZE);

          // Estimate total size needed
          const totalSize = value.length + (key.length + 12) * chunkCount;

          // Check if we have enough space
          if (totalSize > MAX_STORAGE) {
            throw new Error('Storage quota would be exceeded');
          }

          // Split and store chunks
          for (let i = 0; i < chunkCount; i++) {
            const start = i * MAX_CHUNK_SIZE;
            const end = Math.min(start + MAX_CHUNK_SIZE, value.length);
            const chunk = value.substring(start, end);
            localStorage.setItem(`${key}:${i}`, chunk);
          }

          // Store chunk info
          localStorage.setItem(`${key}:info`, JSON.stringify({
            chunks: chunkCount,
            originalSize: value.length,
            timestamp: new Date().toISOString()
          }));

          // Remove original key to avoid confusion
          localStorage.removeItem(key);
        } else {
          // For small values, store directly and clean up any chunks
          localStorage.setItem(key, value);

          // Clean up any existing chunks
          const existingInfo = localStorage.getItem(`${key}:info`);
          if (existingInfo) {
            const { chunks } = JSON.parse(existingInfo);
            for (let i = 0; i < chunks; i++) {
              localStorage.removeItem(`${key}:${i}`);
            }
            localStorage.removeItem(`${key}:info`);
          }
        }
      } catch (error) {
        console.error('Error storing chunked item in localStorage:', error);
        // Fall back to session storage for this item
        try {
          sessionStorage.setItem(key, value);
        } catch (sessionError) {
          console.error('Error storing in sessionStorage as fallback:', sessionError);
          // At this point, we're out of options for persistence
        }
      }
    },

    removeItem: (key) => {
      try {
        // Check if the item is chunked
        const info = localStorage.getItem(`${key}:info`);

        if (info) {
          // Remove all chunks
          const { chunks } = JSON.parse(info);
          for (let i = 0; i < chunks; i++) {
            localStorage.removeItem(`${key}:${i}`);
          }
          localStorage.removeItem(`${key}:info`);
        }

        // Remove the main item
        localStorage.removeItem(key);
      } catch (error) {
        console.error('Error removing item from localStorage:', error);
      }
    }
  };
};

// Cart item type
interface CartItem extends Product {
  quantity: number;
}

// Cart store state
interface CartState {
  items: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  // getTotalPrice: () => number;
  getTotalPrice: () => {
    discountPrice: number;
    totalPrice: number;
    shippingTotal: number;
  };
}

// Create the cart store
export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],

      addToCart: (product, quantity) => {
        set((state) => {
          const existingItem = state.items.find(item => item._id === product._id);

          if (existingItem) {
            // Update existing item
            return {
              items: state.items.map(item =>
                item._id === product._id
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
            };
          } else {
            // Add new item
            return {
              items: [...state.items, { ...product, quantity }],
            };
          }
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item._id !== productId),
        }));
      },

      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items.map(item =>
            item._id === productId
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => {
        set({ items: [] });
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
      // getTotalPrice: () => {
      //   return get().items.reduce((total, item) => {
      //     const price = item.discountType === 'percentage'
      //       ? item.price - (item.price * (item.discountPrice ?? 0)) / 100
      //       : item.price - (item.discountPrice ?? 0);

      //     return total + (price * item.quantity);
      //   }, 0);
      // },
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => createChunkedStorage()),
    }
  )
);

/*
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
*/