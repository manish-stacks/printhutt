import { axiosInstance } from "@/utils/axios";

export const userService = {
    updateProfile: (formdata) => axiosInstance.post('/v1/user/update-profile', formdata),
};