import { axiosInstance } from "@/utils/axios";

interface Params {
  queryParams: string;
}

export const productService = {
  getAll: (queryParams: Params) => axiosInstance.get(`/v1/products?${queryParams}`),
  getTopProducts: (limit: string | number) => axiosInstance.get(`/v1/products/top-related-products?limit=${limit}`),
  getProductsByCategory: (category: string) => axiosInstance.get(`/v1/products?category=${category}&limit=10`),
  getProductsBySubCategory: (subCategory: string) => axiosInstance.get(`/v1/products?subCategory=${subCategory}&limit=10`),
  getNewArrivals: (limit: string | number, type: string) => axiosInstance.get(`/v1/products/new-arrivals?limit=${limit}&type=${type}`),
  getOfferProduct: (limit: string | number) => axiosInstance.get(`/v1/products/offers?limit=${limit}`)

};



