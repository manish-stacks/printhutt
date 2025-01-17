import { axiosInstance } from "@/utils/axios";

export const wishlistService = {
    getAll: () => axiosInstance('/v1/wishlist'),
    addWishlist: (id: string) => axiosInstance.post('/v1/wishlist', { productId: id }),
    deleteWishlist: (id: string) => axiosInstance.delete(`/v1/wishlist/${id}`),
};