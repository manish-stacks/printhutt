import React, { useEffect, useState } from 'react';
import { ProductFormData, CategoryFormData } from '@/lib/types';
import { get_parent_categories } from '@/_services/admin/category';
import { get_parent_sub_categories } from '@/_services/admin/sub-category';

interface Props {
  formData: ProductFormData;
  handleInputChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export default function ProductCategories({ formData, handleInputChange }: Props) {
  const [categories, setCategories] = useState<CategoryFormData[]>([]);
  const [subcategories, setSubcategories] = useState<CategoryFormData[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await get_parent_categories() as any;
        setCategories(data.category);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchSubcategories = async () => {
      if (formData.category) {
        try {
          const data = await get_parent_sub_categories(formData.category) as any;
          setSubcategories(data.category);
        } catch (error) {
          console.error('Error fetching subcategories:', error);
        }
      } else {
        setSubcategories([]);
      }
    };

    fetchSubcategories();
  }, [formData.category]);

  return (
    <div className="bg-white text-black p-6 rounded-lg space-y-4 shadow-md shadow-black-300">
      <div>
        <label className="block text-sm font-medium text-gray-700">Select Category</label>
        <select
          name="category"
          value={formData.category}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        >
          <option value="">Choose Category</option>
          {categories.map((category) => (
            <option key={category._id} value={category._id}>
              {category.name.toUpperCase()}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Select Sub Category</label>
        <select
          name="subcategory"
          value={formData.subcategory}
          onChange={handleInputChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          disabled={!formData.category}
        >
          <option value="">Choose SubCategory</option>
          {subcategories.map((subcategory) => (
            <option key={subcategory._id} value={subcategory._id}>
              {subcategory.name.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}