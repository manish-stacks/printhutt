import { axiosInstance } from "@/utils/axios";

export const add_new_product = async (formData: any) => {
  return axiosInstance.post(`/product`, formData)
}


export const get_all_products = async () => {
  return axiosInstance.get(`/product`);
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