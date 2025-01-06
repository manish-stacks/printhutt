import { axiosInstance } from "@/utils/axios";
import { ProductFormData } from '@/lib/types/product';
export const productService = {
  getAll: () => axiosInstance<ProductFormData[]>('/products'),
  getTopProducts: () => axiosInstance<ProductFormData[]>('/products/top'),
};


