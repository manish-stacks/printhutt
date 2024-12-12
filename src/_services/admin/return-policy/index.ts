import type { ReturnPolicy } from "@/lib/types";
import { axiosInstance } from "@/utils/axios";

export async function getReturnPolicies(page: string, search: string) {
    return axiosInstance.get(`/return-policy?page=${page}&search=${search}&limit=10`);
}

export async function createReturnPolicy(formData: Partial<ReturnPolicy>) {
    return axiosInstance.post(`/return-policy`, formData)
}

export async function modifyReturnPolicy(id: string, formData: Partial<ReturnPolicy>) {
    return axiosInstance.put(`/return-policy/${id}`, formData)
}

export async function removeReturnPolicy(id: string) {
    return axiosInstance.delete(`/return-policy/${id}`);
}

