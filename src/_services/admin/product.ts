
import { axiosInstance } from "@/utils/axios";
import type { Product } from "@/lib/types/product";

export const add_new_product = async (formData: object) => {
  return axiosInstance.post(`/product`, formData)
}


export const get_all_products = async (page: string, search: string) => {
  return axiosInstance.get(`/product?page=${page}&search=${search}&limit=10`);
}


export const delete_a_product = async (id: string) => {
  return axiosInstance.delete(`/product/${id}`);
}


export const update_a_product = async (id: string, formData: object) => {
  return axiosInstance.put(`/product/${id}`, formData)
}

export const get_product_by_slug = async (slug: string): Promise<Product> => {
  return axiosInstance.get(`/product/details/${slug}`);
}

export const get_product_by_id = async (id: string): Promise<Product> => {
  return axiosInstance.get(`/product/${id}`);
}


export const get_product_by_category_id = async (id: string) => {
  return axiosInstance.get(`/product/by_category/${id}`);
}

export const update_product_status = async (categoryId: string, newStatus: boolean) => {
  return axiosInstance.patch(`/product/${categoryId}`, {
    status: newStatus,
  });
}

export const removeProductImage = async (productId: string, imageToRemove: object) => {
  return axiosInstance.post(`/product/image-delate`, {
    productId: productId,
    image: imageToRemove, 
  });
};

