import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { 
  getAllCouponsPagination, 
  addNewCoupon, 
  updateCoupon, 
  deleteCoupon 
} from '@/_services/admin/coupon';
import { Coupon } from '@/lib/types';

export function useCoupon() {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [pagination, setPagination] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchCoupons = useCallback(async (page: string, search: string) => {
    try {
      setIsLoading(true);
      const data = await getAllCouponsPagination(page, search) as any;
      setCoupons(data.coupons);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch coupons:', error);
      toast.error('Failed to fetch coupons');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createCoupon = async (data: Partial<Coupon>) => {
    try {
      await addNewCoupon(data);
      toast.success('Coupon added successfully');
      return true;
    } catch (error) {
      toast.error('Failed to add coupon');
      return false;
    }
  };

  const modifyCoupon = async (id: string, data: Partial<Coupon>) => {
    try {
      await updateCoupon(id, data);
      toast.success('Coupon updated successfully');
      return true;
    } catch (error) {
      toast.error('Failed to update coupon');
      return false;
    }
  };

  const removeCoupon = async (id: string) => {
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
        await deleteCoupon(id);
        setCoupons(prev => prev.filter(coupon => coupon._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Coupon has been deleted.",
          icon: "success"
        });
        return true;
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There was an issue deleting the coupon.",
          icon: "error"
        });
        return false;
      }
    }
    return false;
  };

  return {
    coupons,
    pagination,
    isLoading,
    fetchCoupons,
    createCoupon,
    modifyCoupon,
    removeCoupon,
  };
}