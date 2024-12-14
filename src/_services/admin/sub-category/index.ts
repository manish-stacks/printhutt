import { axiosInstance } from "@/utils/axios";


export async function getAllCatPagination(page: string, search: string) {
  return axiosInstance.get(`/sub-category?page=${page}&search=${search}&limit=10`);
}

export const add_new_category = async (formData: any) => {
  return axiosInstance.post(`/sub-category`, formData)
}


export const get_parent_categories = async () => {
  return axiosInstance.get('/sub-category/fetch-category');
}

export const get_all_categories = async () => {
  return axiosInstance.get('/sub-category');
}

export const delete_categories = async (id: string) => {
  return axiosInstance.delete(`/sub-category/${id}`);
};

export const get_category_by_id = async (id: string) => {
  return axiosInstance.get(`/sub-category/${id}`)
}

export const update_category = async (id: string, formData: any) => {
  return axiosInstance.put(`/sub-category/${id}`, formData)
}

export const update_category_status = async (categoryId: string, newStatus: any) => {
  return axiosInstance.patch(`/sub-category/${categoryId}`, {
    status: newStatus,
  });
}





