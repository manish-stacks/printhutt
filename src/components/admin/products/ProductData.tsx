import React from 'react';
import { ProductFormData } from '@/lib/types';

interface Props {
  formData: ProductFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export default function ProductData({ formData, handleInputChange }: Props) {
  return (
    <div className="bg-white text-black p-6 rounded-lg space-y-5 shadow-md shadow-black-300">
      <h3 className="text-lg font-medium">Product Data</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Price</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="Product price"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Discount Type</label>
          <select
            name="discountType"
            value={formData.discountType}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          >
            <option value="">Select discount type</option>
            <option value="percentage">Percentage</option>
            <option value="fixed">Fixed Amount</option>
            <option value="free_shipping">Free Shipping</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Discount Price</label>
          <input
            type="number"
            name="discountPrice"
            value={formData.discountPrice}
            onChange={handleInputChange}
            className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
            placeholder="Discount price"
          />
        </div>
      </div>

      {/* Add other product data fields similarly */}
    </div>
  );
}