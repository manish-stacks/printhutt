import { axiosInstance } from "@/utils/axios";

export const add_new_product = async (formData: any) => {
  return axiosInstance.post(`/product`, formData)
}


export const get_all_products = async (page: string, search: string) => {
  return axiosInstance.get(`/product?page=${page}&search=${search}&limit=10`);
}


export const delete_a_product = async (id: string) => {
  return axiosInstance.delete(`/product/${id}`);
}


export const update_a_product = async (id: string, formData: any) => {
  return axiosInstance.put(`/product/${id}`, formData)
}

export const get_product_by_id = async (id: string) => {
  return axiosInstance.get(`/product/${id}`);
}


export const get_product_by_category_id = async (id: string) => {
  return axiosInstance.get(`/product/by_category/${id}`);
}

export const update_product_status = async (categoryId: string, newStatus: any) => {
  return axiosInstance.patch(`/product/${categoryId}`, {
    status: newStatus,
  });
}