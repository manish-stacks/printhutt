import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { getAllWarrantyPagination, addNewWarranty, updateWarranty, deleteWarranty } from '@/services/warranty';
import { Warranty } from '@/lib/types';

export function useWarranty() {
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [pagination, setPagination] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchWarranties = useCallback(async (page: string, search: string) => {
    try {
      setIsLoading(true);
      const data = await getAllWarrantyPagination(page, search);
      setWarranties(data.warranty);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch warranties:', error);
      toast.error('Failed to fetch warranties');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createWarranty = async (data: Partial<Warranty>) => {
    try {
      await addNewWarranty(data);
      toast.success('Warranty added successfully');
      return true;
    } catch (error) {
      toast.error('Failed to add warranty');
      return false;
    }
  };

  const modifyWarranty = async (id: string, data: Partial<Warranty>) => {
    try {
      await updateWarranty(id, data);
      toast.success('Warranty updated successfully');
      return true;
    } catch (error) {
      toast.error('Failed to update warranty');
      return false;
    }
  };

  const removeWarranty = async (id: string) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    });

    if (result.isConfirmed) {
      try {
        await deleteWarranty(id);
        setWarranties(prev => prev.filter(warranty => warranty._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Warranty has been deleted.",
          icon: "success"
        });
        return true;
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There was an issue deleting the warranty.",
          icon: "error"
        });
        return false;
      }
    }
    return false;
  };

  return {
    warranties,
    pagination,
    isLoading,
    fetchWarranties,
    createWarranty,
    modifyWarranty,
    removeWarranty,
  };
}