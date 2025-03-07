import { axiosInstance } from "@/utils/axios";
import type { ShippingInformation } from "@/lib/types/shipping";

export async function getAllShippingPagination(page: string, search: string) {
        return axiosInstance.get(`/shipping?page=${page}&search=${search}&limit=10`);
}

export async function addNewShipping(formData: Partial<ShippingInformation>) {
        return axiosInstance.post(`/shipping`, formData)
}

export async function updateShipping(id: string, formData: Partial<ShippingInformation>) {
        return axiosInstance.put(`/shipping/${id}`, formData)
}

export async function deleteShipping(id: string) {
        return axiosInstance.delete(`/shipping/${id}`);
}
export const get_all_shipping = async () => {
        return axiosInstance.get(`/shipping/get-all`)
}
