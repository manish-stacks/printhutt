
import { axiosInstance } from "@/utils/axios";

export async function getAllSessionCarts() {
    return axiosInstance.get(`/session-cart`);
  }
