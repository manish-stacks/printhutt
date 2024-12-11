import { Coupon } from "@/lib/types";
import { axiosInstance } from "@/utils/axios";


export async function getAllCouponsPagination(page: string, search: string) {
  return axiosInstance.get(`/coupon`, {
    params: { page, search },
  });
}
 
export async function addNewCoupon(data: Partial<Coupon>) {
  return axiosInstance.post('/coupon', data);
}

export async function updateCoupon(id: string, data: Partial<Coupon>) {
  return axiosInstance.put(`/coupon/${id}`, data);
}

export async function deleteCoupon(id: string) {
  return axiosInstance.delete(`/coupon/${id}`);
}

export async function validateCoupon(code: string) {
  return axiosInstance.post(`/coupon/validate`, { code });
}