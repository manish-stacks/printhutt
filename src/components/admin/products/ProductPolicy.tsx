import React, { useEffect, useState } from 'react';
import { ProductFormData, Warranty, ShippingInformation, ReturnPolicy } from '@/lib/types';
import { get_all_return } from '@/_services/admin/return-policy';
import { get_all_shipping } from '@/_services/admin/shipping';
import { get_all_warranty } from '@/_services/admin/warranty';
// import { getWarranties, getShippingInfo, getReturnPolicies } from '@/services/api';

interface Props {
  formData: ProductFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function ProductPolicy({ formData, handleInputChange }: Props) {
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [shippings, setShippings] = useState<ShippingInformation[]>([]);
  const [returns, setReturns] = useState<ReturnPolicy[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [warrantyData, shippingData, returnData] = await Promise.all([
          get_all_warranty(),
          get_all_shipping(),
          get_all_return()
        ])as any;

        setWarranties(warrantyData.warranty);
        setShippings(shippingData.shipping);
        setReturns(returnData.returnData);
      } catch (error) {
        console.error('Error fetching policy data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="bg-white text-black p-6 rounded-lg space-y-5 shadow-md shadow-black-300">
      <h3 className="text-lg font-medium">Product Policy</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Warranty Information</label>
          <select
            name="warrantyInformation"
            value={formData.warrantyInformation}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="">Choose Warranty</option>
            {warranties.map((warranty) => (
              <option key={warranty._id} value={warranty._id}>
                {warranty.warrantyType.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Shipping Information</label>
          <select
            name="shippingInformation"
            value={formData.shippingInformation}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="">Choose Shipping</option>
            {shippings.map((shipping) => (
              <option key={shipping._id} value={shipping._id}>
                {shipping.shippingMethod.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Return Policy</label>
          <select
            name="returnPolicy"
            value={formData.returnPolicy}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="">Choose Return Policy</option>
            {returns.map((returnPolicy) => (
              <option key={returnPolicy._id} value={returnPolicy._id}>
                {returnPolicy.returnPeriod.toUpperCase()}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}