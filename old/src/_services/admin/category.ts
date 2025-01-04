import { axiosInstance } from "@/utils/axios";


export async function getAllCatPagination(page: string, search: string) {
  return axiosInstance.get(`/category?page=${page}&search=${search}&limit=10`);
}

export const add_new_category = async (formData: any) => {
  return axiosInstance.post(`/category`, formData)
}


export const get_parent_categories = async () => {
  return axiosInstance.get('/category/fetch-category');
}

// export const get_all_categories = async () => {
//   return axiosInstance.get('/category');
// }

export const delete_categories = async (id: string) => {
  return axiosInstance.delete(`/category/${id}`);
};

export const get_category_by_id = async (id: string) => {
  return axiosInstance.get(`/category/${id}`)
}

export const update_category = async (id: string, formData: any) => {
  return axiosInstance.put(`/category/${id}`, formData)
}


export const update_category_status = async (categoryId: string, newStatus: any) => {
  return axiosInstance.patch(`/category/${categoryId}`, {
    status: newStatus,
  });
}





