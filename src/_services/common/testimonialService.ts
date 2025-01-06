import { Testimonial } from "@/lib/types";
import { axiosInstance } from "@/utils/axios";

export const testimonialService = {
  getAll: () => axiosInstance<Testimonial[]>('/testimonials'),
};