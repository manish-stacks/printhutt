
import { ITestimonial } from "@/lib/types";
import { axiosInstance } from "@/utils/axios";


export async function getTestimonial(page: string, search: string) {
    return axiosInstance.get(`/testimonial?page=${page}&search=${search}&limit=10`);
}

export async function createTestimonial(formData: Partial<ITestimonial>) {
    return axiosInstance.post(`/testimonial`, formData)
}

export async function updateTestimonial(id: string, formData: Partial<ITestimonial>) {
    return axiosInstance.put(`/testimonial/${id}`, formData)
}

export async function deleteTestimonial(id: string) {
    return axiosInstance.delete(`/testimonial/${id}`);
}

