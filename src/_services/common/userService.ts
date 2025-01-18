import { axiosInstance } from "@/utils/axios";

export const userService = {
    updateProfile: (formdata) => axiosInstance('/v1/user/update-profile', formdata),
};