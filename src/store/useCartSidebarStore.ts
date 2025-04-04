import { create } from 'zustand';

type CartSidebarViewState = {
    isOpen: boolean;
    openCartSidebarView: () => void;
    closeCartSidebarView: () => void;
};

const useCartSidebarStore = create<CartSidebarViewState>((set) => ({
    isOpen: false,
    openCartSidebarView: () => set({ isOpen: true }),
    closeCartSidebarView: () => set({ isOpen: false}),
}));


export default useCartSidebarStore;
