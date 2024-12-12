import { axiosInstance } from "@/utils/axios";

export const get_all_warranty_pagination = async (page: string, search: string) => {
  return axiosInstance.get(`/warranty?page=${page}&search=${search}&limit=10`);
}

export const add_new_warranty = async (formData: any) => {
  return axiosInstance.post(`/warranty`, formData)
}

export const delete_warranty = async (id: string) => {
  return axiosInstance.delete(`/warranty/${id}`);
};

// export const get_warranty_by_id = async (id: string) => {
//     return axiosInstance..get(`/warranty/${id}`)
// };

export const update_warranty = async (id: string, formData: any) => {
  return axiosInstance.put(`/warranty/${id}`, formData)
}

