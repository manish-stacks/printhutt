import { create } from 'zustand';

type Product = {
    title: string;
    image: string;
    description: string;
    price: string;
    oldPrice: string;
    rating: number;
};

type QuickViewState = {
    isOpen: boolean;
    product: Product | null;
    openQuickView: (product: Product) => void;
    closeQuickView: () => void;
};

const useQuickStore = create<QuickViewState>((set) => ({
    isOpen: false,
    product: null,
    openQuickView: (product) => set({ isOpen: true, product }),
    closeQuickView: () => set({ isOpen: false, product: null }),
}));


export default useQuickStore;
