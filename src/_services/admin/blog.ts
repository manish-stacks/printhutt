import { axiosInstance } from "@/utils/axios";
interface BlogCategory {
  name: string;
  isActive: boolean;
}
export const blogCategoryService = {
  getAll: (page: string, search: string) => axiosInstance.get(`/blog/category?page=${page}&search=${search}&limit=10`),
  create: (formData: BlogCategory) => axiosInstance.post(`/blog/category`, formData),
  update: (id: string, formData: BlogCategory) => axiosInstance.put(`/blog/category/${id}`, formData),
  delete: (id: string) => axiosInstance.delete(`/blog/category/${id}`),
};


export const blogService = {
  getAll: (page: string, search: string) => axiosInstance.get(`/blog?page=${page}&search=${search}&limit=10`),
  create: (formData: BlogCategory) => axiosInstance.post(`/blog`, formData),
  getBlog: (id: string) => axiosInstance.get(`/blog/${id}`),
  update: (id: string, formData: BlogCategory) => axiosInstance.put(`/blog/${id}`, formData),
  delete: (id: string) => axiosInstance.delete(`/blog/${id}`),
  update_status: (categoryId: string, newStatus: boolean) => axiosInstance.patch(`/category/${categoryId}`, { status: newStatus, })
};

