import { useState, useCallback } from 'react';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { Offer } from '@/types/offer';
import { 
  getAllOffersPagination, 
  addNewOffer, 
  updateOffer, 
  deleteOffer 
} from '@/services/offer';

export function useOffer() {
  const [offers, setOffers] = useState<Offer[]>([]);
  const [pagination, setPagination] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);

  const fetchOffers = useCallback(async (page: string, search: string) => {
    try {
      setIsLoading(true);
      const data = await getAllOffersPagination(page, search);
      setOffers(data.offers);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch offers:', error);
      toast.error('Failed to fetch offers');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createOffer = async (data: Partial<Offer>) => {
    try {
      await addNewOffer(data);
      toast.success('Offer added successfully');
      return true;
    } catch (error) {
      toast.error('Failed to add offer');
      return false;
    }
  };

  const modifyOffer = async (id: string, data: Partial<Offer>) => {
    try {
      await updateOffer(id, data);
      toast.success('Offer updated successfully');
      return true;
    } catch (error) {
      toast.error('Failed to update offer');
      return false;
    }
  };

  const removeOffer = async (id: string) => {
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
        await deleteOffer(id);
        setOffers(prev => prev.filter(offer => offer._id !== id));
        Swal.fire({
          title: "Deleted!",
          text: "Offer has been deleted.",
          icon: "success"
        });
        return true;
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "There was an issue deleting the offer.",
          icon: "error"
        });
        return false;
      }
    }
    return false;
  };

  return {
    offers,
    pagination,
    isLoading,
    fetchOffers,
    createOffer,
    modifyOffer,
    removeOffer,
  };
}