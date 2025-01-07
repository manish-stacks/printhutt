import { axiosInstance } from "@/utils/axios";
import { ProductFormData } from '@/lib/types/product';
export const productService = {
  getAll: () => axiosInstance.get('/products'),
  getTopProducts: (limit: string | number) => axiosInstance.get(`/v1/products/top-related-products?limit=${limit}`),
};



