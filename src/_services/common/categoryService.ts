import { axiosInstance } from "@/utils/axios";;
export const categoryService = {
  getAll: () => axiosInstance('/v1/categories'),
};


