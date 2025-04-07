import { create } from 'zustand';

interface CartSidebarStore {
    isOpen: boolean;
    openCartSidebarView: () => void;
    closeCartSidebarView: () => void;
}

const useCartSidebarStore = create<CartSidebarStore>((set) => ({
    isOpen: false,
    openCartSidebarView: () => set({ isOpen: true }),
    closeCartSidebarView: () => set({ isOpen: false }),
}));


export default useCartSidebarStore;
