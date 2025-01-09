import { Slider } from "@/lib/types";
import { axiosInstance } from "@/utils/axios";

export const sliderService = {
  getAll: () => axiosInstance<Slider[]>('/v1/slider'),
};