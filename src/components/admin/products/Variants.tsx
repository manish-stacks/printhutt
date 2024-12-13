'use client';

import { useFieldArray } from 'react-hook-form';

interface VariantsProps {
  control: any;
  register: any;
}

export default function Variants() {
 
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3>Product Variants</h3>
        <button
          type="button"
          onClick={() =>
            append({
              size: '',
              color: '',
              price: 0,
              stock: 0,
              discountPercentage: 0,
              discountPrice: 0,
            })
          }
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Add Variant
        </button>
      </div>

      {fields.map((field, index) => (
        <div key={field.id} className="space-y-4">
          <div className="flex justify-between items-center">
            <h4>Variant {index + 1}</h4>
            <button
              type="button"
              onClick={() => remove(index)}
              className="px-2 py-1 bg-red-500 text-white rounded text-sm"
            >
              Remove
            </button>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col">
              <label>Size</label>
              <input
                {...register(`varient.${index}.size`)}
                type="text"
                className="border p-2 rounded"
              />
              <label>Color</label>
              <input
                {...register(`varient.${index}.color`)}
                type="text"
                className="border p-2 rounded"
              />
              <label>Price</label>
              <input
                {...register(`varient.${index}.price`)}
                type="number"
                step="0.01"
                className="border p-2 rounded"
              />
              <label>Stock</label>
              <input
                {...register(`varient.${index}.stock`)}
                type="number"
                className="border p-2 rounded"
              />
              <label>Discount Percentage</label>
              <input
                {...register(`varient.${index}.discountPercentage`)}
                type="number"
                step="0.01"
                className="border p-2 rounded"
              />
              <label>Discount Price</label>
              <input
                {...register(`varient.${index}.discountPrice`)}
                type="number"
                step="0.01"
                className="border p-2 rounded"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
