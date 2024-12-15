import React from 'react';
import { ProductFormData } from '@/lib/types';

interface Props {
  formData: ProductFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export default function ProductMeta({ formData, handleInputChange }: Props) {
  return (
    <div className="bg-white text-black p-6 rounded-lg space-y-4 shadow-md shadow-black-300">
      <div>
        <label className="block text-sm font-medium text-gray-700">Meta keywords</label>
        <input
          type="text"
          name="keywords"
          value={formData.keywords}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="Meta Keywords"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Meta Description</label>
        <textarea
          name="meta_discription"
          value={formData.meta_discription}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 h-28"
          placeholder="Meta Description"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Image Alt Text</label>
        <input
          type="text"
          name="imgAlt"
          value={formData.imgAlt}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          placeholder="Image Alt Text"
        />
      </div>
    </div>
  );
}