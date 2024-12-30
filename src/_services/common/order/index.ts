import { axiosInstance } from "@/utils/axios";
import { IOrder } from "@/lib/types/order";


export const create_a_new_order = async (formData: IOrder) => {
  return axiosInstance.post(`/order`, formData)
}




export const get_all_orders_of_user = async (id: string) => {
  return axiosInstance.get(`/order`, { id: id })
}


export const get_order_details = async (id: any) => {
  return axiosInstance.get(`/order/${id}`)
}