import { axiosInstance } from "@/utils/axios";
import type { AddressFormData } from "@/lib/types/address";



export const saveAddress = async (formData: AddressFormData) => {
  return axiosInstance.post(`/address`, formData)
}

export const getAddress = async () => {
  return axiosInstance.get(`/address`)
}



export async function editAddress(id: string, formData: Partial<AddressFormData>) {
  return axiosInstance.put(`/address/${id}`, formData);
}

export async function deleteAddress(id: string) {
  return axiosInstance.delete(`/address/${id}`);
}

