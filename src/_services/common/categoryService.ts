import { axiosInstance } from "@/utils/axios";;
export const categoryService = {
  getAll: (limit: string | number) => axiosInstance(`/v1/categories?limit=${limit}`),
  getCategory: (slug: string) => axiosInstance(`/v1/categories/${slug}?type=category`),
  getSubCategory: (slug: string) => axiosInstance(`/v1/categories/${slug}?type=subcategory`),
  getSubcategoryAll: (limit: string | number, category: string) => axiosInstance(`/v1/categories/sub-categories?limit=${limit}&category=${category}`),
};


