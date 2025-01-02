import { axiosInstance } from "@/utils/axios";

export async function getAllUsers(page: string, search: string) {
    return axiosInstance.get(`/user?page=${page}&search=${search}&limit=10`);
}