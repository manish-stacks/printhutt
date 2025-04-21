import { ReviewData } from "@/lib/types";
import { axiosInstance } from "@/utils/axios";;
export const commonApi = {
    postReviews: (reviewData: ReviewData) => axiosInstance.post(`/reviews`, reviewData),
    checkProductOrder: (slug: string) => axiosInstance.get(`/order/check-order/${slug}`),
    getCouponsCode: () => axiosInstance.get(`/v1/coupon`)

};



