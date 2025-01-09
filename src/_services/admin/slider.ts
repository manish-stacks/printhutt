
import { ISlider } from "@/lib/types";
import { axiosInstance } from "@/utils/axios";


export async function getSlider(page: string, search: string) {
    return axiosInstance.get(`/slider?page=${page}&search=${search}&limit=10`);
}

export async function createSlider(formData: Partial<ISlider>) {
    return axiosInstance.post(`/slider`, formData)
}

export async function updateSlider(id: string, formData: Partial<ISlider>) {
    return axiosInstance.put(`/slider/${id}`, formData)
}

export async function deleteSlider(id: string) {
    return axiosInstance.delete(`/slider/${id}`);
}

