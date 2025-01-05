import { axiosInstance } from "@/utils/axios";
import { IOrder } from "@/lib/types/order";


export const create_a_new_order = async (formData: IOrder) => {
  return axiosInstance.post(`/order`, formData)
}

export async function get_all_orders_of_user(page: string, search: string, status: string) {
  return axiosInstance.get(`/order?status=${status}&page=${page}&search=${search}&limit=10`);
}

interface IOrderDetails {
  _id: string;
  payAmt: number;
  orderId:string;
  user: {
    username: string;
    number: string;
    email: string;
  }
}
export async function initiate_Payment(order: IOrderDetails) {
  const data = {
    orderId: order._id,
    amount: order.payAmt,
    transactionId: order.orderId, //`txn_${Date.now()}`,
    userDetails: {
      name: order.user.username || 'user',
      email: order?.user?.email || 'admin@gmail.com',
      phone: order?.user?.number || '1234567890',
    },
  }
  return axiosInstance.post(`/payment/initiate`, data);
}


export const get_order_details = async (id: string) => {

  return axiosInstance.get(`/order/${id}`)
}