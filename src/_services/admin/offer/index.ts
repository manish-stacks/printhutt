import type { ReturnPolicy } from "@/lib/types";
import axios from "axios";


export async function getOfferPolicies(page: string, search: string) {
    try {
        const { data } = await axios.get(`/api/offer?page=${page}&search=${search}&limit=10`);
        return data;
    } catch (error: any) {
        console.log('Error in getting all offer (service) =>', error)
        throw new Error(error || error.message)
    }
}

export async function createOffer(formData: Partial<ReturnPolicy>) {
    try {
        const { data } = await axios.post(`/api/offer`, formData)
        return data;
    } catch (error: any) {
        console.log('Error in Add New offer (service) =>', error);
        throw new Error(error || error.message)
    }
}

export async function modifyOffer(id: string, formData: Partial<ReturnPolicy>) {
    try {
        const { data } = await axios.put(`/api/offer/${id}`, formData)
        return data;
    } catch (error) {
        console.log('Error in updating offer (service) =>', error)
    }
}

export async function removeOffer(id: string) {
    try {
        const { data } = await axios.delete(`/api/offer/${id}`);
        return data;
    } catch (error: any) {
        console.log('Error in delete offer (service) =>', error);
        throw new Error(error?.message || 'An error occurred while deleting the return-policy');
    }
}


/*


import { axiosInstance } from '@/lib/axios';
import { Offer } from '@/types/offer';

export async function getAllOffersPagination(page: string, search: string) {
  return axiosInstance.get(`/offer`, {
    params: { page, search },
  });
}

export async function addNewOffer(data: Partial<Offer>) {
  return axiosInstance.post('/offer', data);
}

export async function updateOffer(id: string, data: Partial<Offer>) {
  return axiosInstance.put(`/offer/${id}`, data);
}

export async function deleteOffer(id: string) {
  return axiosInstance.delete(`/offer/${id}`);
}


*/