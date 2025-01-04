import { axiosInstance } from "@/utils/axios";
import { IOrder } from "@/lib/types/order";


export const create_a_new_order = async (formData: IOrder) => {
  return axiosInstance.post(`/order`, formData)
}

export async function get_all_orders_of_user(page: string, search: string, status: string) {
  return axiosInstance.get(`/order?status=${status}&page=${page}&search=${search}&limit=10`);
}




export const get_order_details = async (id: any) => {

  return axiosInstance.get(`/order/${id}`)
}