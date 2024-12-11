import type { ShippingInformation } from "@/lib/types";
import axios from "axios";


export async function getAllShippingPagination(page: string, search: string) {
    try {
        const { data } = await axios.get(`/api/shipping?page=${page}&search=${search}&limit=10`);
        return data;
    } catch (error: any) {
        console.log('Error in getting all shipping (service) =>', error)
        throw new Error(error || error.message)
    }
}

export async function addNewShipping(formData: Partial<ShippingInformation>) {
    try {
        const { data } = await axios.post(`/api/shipping`, formData)
        return data;
    } catch (error: any) {
        console.log('Error in Add New shipping (service) =>', error);
        throw new Error(error || error.message)
    }
}

export async function updateShipping(id: string, formData: Partial<ShippingInformation>) {
    try {
        const { data } = await axios.put(`/api/shipping/${id}`, formData)
        return data;
    } catch (error) {
        console.log('Error in updating shipping (service) =>', error)
    }
}

export async function deleteShipping(id: string) {
    try {
        const { data } = await axios.delete(`/api/shipping/${id}`);
        return data;
    } catch (error: any) {
        console.log('Error in delete shipping (service) =>', error);
        throw new Error(error?.message || 'An error occurred while deleting the shipping');
    }
}


/*

import { ShippingInformation } from '@/types/shipping';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';

export async function getAllShippingPagination(page: string, search: string) {
  const response = await fetch(
    `${API_URL}/shipping?page=${page}&search=${search}`,
    { cache: 'no-store' }
  );
  if (!response.ok) throw new Error('Failed to fetch shipping methods');
  return response.json();
}

export async function addNewShipping(data: Partial<ShippingInformation>) {
  const response = await fetch(`${API_URL}/shipping`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to add shipping method');
  return response.json();
}

export async function updateShipping(id: string, data: Partial<ShippingInformation>) {
  const response = await fetch(`${API_URL}/shipping/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update shipping method');
  return response.json();
}

export async function deleteShipping(id: string) {
  const response = await fetch(`${API_URL}/shipping/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete shipping method');
  return response.json();
}
*/