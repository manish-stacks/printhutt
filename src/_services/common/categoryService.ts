import { axiosInstance } from "@/utils/axios";;
export const categoryService = {
  getAll: (limit: string | number) => axiosInstance(`/v1/categories?limit=${limit}`),
};


