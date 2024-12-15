import React, { useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { ProductFormData, ProductVariant } from '@/lib/types';

interface Props {
  formData: ProductFormData;
  setFormData: React.Dispatch<React.SetStateAction<ProductFormData>>;
}

export default function ProductVariants({ formData, setFormData }: Props) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleVariantChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updatedVarient = [...prev.varient];
      updatedVarient[index] = { 
        ...updatedVarient[index], 
        [name]: name === 'price' || name === 'stock' ? Number(value) : value 
      };
      return { ...prev, varient: updatedVarient };
    });
  };

  const handleAddVariant = () => {
    const newVariant: ProductVariant = {
      size: '',
      color: '',
      price: 0,
      stock: 0
    };
    
    setFormData(prev => ({
      ...prev,
      varient: [...prev.varient, newVariant]
    }));
  };

  const handleRemoveVariant = (index: number) => {
    setFormData(prev => ({
      ...prev,
      varient: prev.varient.filter((_, i) => i !== index)
    }));
    if (activeIndex === index) setActiveIndex(null);
  };

  const toggleVariantAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  if (!formData.isVarientStatus) return null;

  return (
    <>
      <div className="bg-white text-black p-6 rounded-lg space-y-5 shadow-md">
        <button 
          onClick={handleAddVariant}
          type="button"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
        >
          + Add Variant
        </button>
      </div>

      {formData.varient.map((variant, index) => (
        <div key={index} className="variant-section mb-6">
          <div
            className="variant-header flex justify-between items-center cursor-pointer p-4 bg-white rounded-md shadow-sm hover:bg-gray-50 transition duration-300"
            onClick={() => toggleVariantAccordion(index)}
          >
            <h3 className="text-lg font-medium text-gray-800">Variant {index + 1}</h3>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRemoveVariant(index);
              }}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition"
            >
              <FaTrash className="h-3 w-3" />
            </button>
          </div>

          {activeIndex === index && (
            <div className="variant-content p-6 rounded-xl bg-white mt-2 border border-gray-200">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Size</label>
                  <input
                    type="text"
                    name="size"
                    value={variant.size}
                    onChange={(e) => handleVariantChange(e, index)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter Size"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Color</label>
                  <input
                    type="color"
                    name="color"
                    value={variant.color}
                    onChange={(e) => handleVariantChange(e, index)}
                    className="mt-1 block w-full h-10 rounded-md border border-gray-300"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    name="price"
                    value={variant.price}
                    onChange={(e) => handleVariantChange(e, index)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter Price"
                    min="0"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Stock</label>
                  <input
                    type="number"
                    name="stock"
                    value={variant.stock}
                    onChange={(e) => handleVariantChange(e, index)}
                    className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-blue-500 focus:ring-blue-500"
                    placeholder="Enter Stock"
                    min="0"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}