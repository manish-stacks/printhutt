import React, { useEffect, useState } from 'react';
import { ProductFormData, Offer } from '@/lib/types';
import { get_all_offer } from '@/_services/admin/offer';
// import { getOffers } from '@/services/api';

interface Props {
  formData: ProductFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
}

export default function ProductOffers({ formData, handleInputChange }: Props) {
  const [offers, setOffers] = useState<Offer[]>([]);

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const data = await get_all_offer() as any;
        setOffers(data.returnData);
      } catch (error) {
        console.error('Error fetching offers:', error);
      }
    };

    fetchOffers();
  }, []);

  return (
    <div className="bg-white text-black p-6 rounded-lg space-y-4 shadow-md shadow-black-300">
      <div>
        <label className="block text-sm font-medium text-gray-700">Offers On</label>
        <select
          name="offer"
          value={formData.offer}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="">Choose offers</option>
          {offers.map((offer) => (
            <option key={offer._id} value={offer._id}>
              {offer.offerTitle.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Shipping Fee</label>
        <input
          type="text"
          name="shippingFee"
          value={formData.shippingFee}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="Shipping Fee"
        />
      </div>
    </div>
  );
}