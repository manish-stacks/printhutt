
import { axiosInstance } from "@/utils/axios";
import { BlogPost } from "@/lib/types/blog";
export const blogService = {
  getAll: () => axiosInstance<BlogPost[]>('/blog-posts'),
};


