import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { ReturnPolicy } from '@/types/return-policy';
import { 
  getAllReturnPoliciesPagination, 
  addNewReturnPolicy, 
  updateReturnPolicy, 
  deleteReturnPolicy 
} from '@/services/return-policy';

export function useReturnPolicy() {
  const [returnPolicies, setReturnPolicies] = useState<ReturnPolicy[]>([]);
  const [pagination, setPagination] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchReturnPolicies = useCallback(async (page: string, search: string) => {
    try {
      setIsLoading(true);
      const data = await getAllReturnPoliciesPagination(page, search);
      setReturnPolicies(data.returnPolicies);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch return policies:', error);
      toast.error('Failed to fetch return policies');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createReturnPolicy = async (data: Partial<ReturnPolicy>) => {
    try {
      await addNewReturnPolicy(data);
      toast.success('Return policy added successfully');
      return true;
    } catch (error) {
      toast.error('Failed to add return policy');
      return false;
    }
  };

  const modifyReturnPolicy = async (id: string, data: Partial<ReturnPolicy>) => {
    try {
      await updateReturnPolicy(id, data);
      toast.success('Return policy updated successfully');
      return true;
    } catch (error) {
      toast.error('Failed to update return policy');
      return false;
    }
  };

  const removeReturnPolicy = async (id: string) => {
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
        await deleteReturnPolicy(id);
        setReturnPolicies(prev => prev.filter(policy => policy._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Return policy has been deleted.",
          icon: "success"
        });
        return true;
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There was an issue deleting the return policy.",
          icon: "error"
        });
        return false;
      }
    }
    return false;
  };

  return {
    returnPolicies,
    pagination,
    isLoading,
    fetchReturnPolicies,
    createReturnPolicy,
    modifyReturnPolicy,
    removeReturnPolicy,
  };
}