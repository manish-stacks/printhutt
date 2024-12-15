import type { ReturnPolicy } from "@/lib/types";
import { axiosInstance } from "@/utils/axios";


export async function getOfferPolicies(page: string, search: string) {
    return axiosInstance.get(`/offer?page=${page}&search=${search}&limit=10`);
}

export async function createOffer(formData: Partial<ReturnPolicy>) {
    return axiosInstance.post(`/offer`, formData)
}

export async function modifyOffer(id: string, formData: Partial<ReturnPolicy>) {
    return axiosInstance.put(`/offer/${id}`, formData)
}

export async function removeOffer(id: string) {
    return axiosInstance.delete(`/offer/${id}`);
}

export const get_all_offer = async () => {
    return axiosInstance.get(`/offer/get-all`)
}