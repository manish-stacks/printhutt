import { Coupon } from "@/lib/types";
import { axiosInstance } from "@/utils/axios";


export async function getAllCouponsPagination(page: string, search: string) {
  return axiosInstance.get(`/coupon?page=${page}&search=${search}&limit=10`);
}

export async function addNewCoupon(formData: Partial<Coupon>) {
  return axiosInstance.post(`/coupon`, formData)
}

export async function updateCoupon(id: string, formData: Partial<Coupon>) {
  return axiosInstance.put(`/coupon/${id}`, formData);
}

export async function deleteCoupon(id: string) {
  return axiosInstance.delete(`/coupon/${id}`);
}

export async function validateCoupon(code: string) {
  return axiosInstance.post(`/coupon/validate`, { code });
}