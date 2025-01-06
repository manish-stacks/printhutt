import { StateCreator } from 'zustand';
import { Product } from '@/types';

export interface ProductSlice {
  products: Product[];
  topProducts: Product[];
  recentViewProducts: Product[];
  setProducts: (products: Product[]) => void;
  setTopProducts: (products: Product[]) => void;
  addRecentViewProduct: (product: Product) => void;
}

export const createProductSlice: StateCreator<ProductSlice> = (set, get) => ({
  products: [],
  topProducts: [],
  recentViewProducts: [],
  setProducts: (products) => set({ products }),
  setTopProducts: (products) => set({ topProducts }),
  addRecentViewProduct: (product) => {
    const current = get().recentViewProducts;
    const filtered = current.filter((p) => p.id !== product.id);
    set({ recentViewProducts: [product, ...filtered].slice(0, 10) });
  },
});