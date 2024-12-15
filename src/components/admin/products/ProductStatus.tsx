import React from 'react';
import { ProductFormData } from '@/lib/types';

interface Props {
  formData: ProductFormData;
  handleToggle: (field: keyof ProductFormData) => void;
}

export default function ProductStatus({ formData, handleToggle }: Props) {
  const statusOptions = [
    { key: 'status', label: 'Active' },
    { key: 'ishome', label: 'Show on Home' },
    { key: 'tranding', label: 'Trending' },
    { key: 'hot', label: 'Hot Deal' },
    { key: 'sale', label: 'On Sale' },
    { key: 'new', label: 'New Arrival' },
    { key: 'isVarientStatus', label: 'Variant Available' },
    { key: 'isCustomize', label: 'Customizable' }
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Product Status</h3>
      <div className="space-y-4">
        {statusOptions.map(({ key, label }) => (
          <label key={key} className="flex items-center">
            <input
              type="checkbox"
              checked={formData[key as keyof ProductFormData] as boolean}
              onChange={() => handleToggle(key as keyof ProductFormData)}
              className="sr-only peer"
            />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
            <span className="ml-3 text-sm font-medium text-gray-900">
              {label}
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}