import { create } from 'zustand';
import { wishlistService } from '@/_services/common/wishlist';

interface WishlistState {
    wishlist: [];
    loading: boolean;
    error: string | null;
    fetchWishlist: () => Promise<void>;
}

const useWishlistStore = create<WishlistState>((set) => ({
    wishlist: [],
    loading: false,
    error: null,
    fetchWishlist: async () => {
        set({ loading: true, error: null });
        try {
            const response = await wishlistService.getAll();
            set({ wishlist: response.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
        
    },
}));

export default useWishlistStore;
