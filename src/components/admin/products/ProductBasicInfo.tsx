import React from 'react';
import { ProductFormData } from '@/lib/types';

interface Props {
  formData: ProductFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function ProductBasicInfo({ formData, handleInputChange }: Props) {
  return (
    <div className="bg-white text-black p-6 rounded-lg space-y-5 shadow-md shadow-black-300">
      <div>
        <label className="block text-sm font-medium text-gray-700">Product Name *</label>
        <input
          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          placeholder="Enter product name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Slug Name *</label>
        <input 
          className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleInputChange}
          placeholder="product-name"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Short description *</label>
        <textarea
          className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
          id="description"
          name="description"
          rows={5}
          value={formData.description}
          onChange={handleInputChange}
          placeholder="Enter product description"
        />
      </div>
    </div>
  );
}