import { customSizeType } from '@/lib/types/neon';
import React from 'react';


interface SizePresetsProps {
  selectedSize: customSizeType;
  onSizeSelect: (size: customSizeType) => void;
  preset: customSizeType[];
}

export const SizePresets: React.FC<SizePresetsProps> = ({
  preset,
  selectedSize,
  onSizeSelect,
}) => {

// console.log(preset)
  return (
    <div className="grid grid-cols-2 gap-4 max-h-[280px] overflow-y-auto pt-2">
      {preset && preset.map((size) => (
        <button
          key={size._id}
          onClick={() => onSizeSelect(size)}
          className={`relative p-4 rounded-lg border-2 transition-all text-left
          ${selectedSize._id === size._id
              ? "border-pink-500 bg-pink-50"
              : "border-gray-200 hover:border-pink-300"
            }`}
        >
          {/* Popular tag */}
          {size.isPopular && (
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full shadow">
              POPULAR
            </div>
          )}

          <div className="flex justify-between">
            <div>
              <div className="font-medium max-[576px]:text-xs">{size.name}</div>
              <div className="text-sm text-gray-500 max-[576px]:text-xs">Length: {size.width}&quot;</div>
              <div className="text-sm text-gray-500 max-[576px]:text-xs">Height: {size.height}&quot;</div>
            </div>
            <div className="text-lg font-bold max-[576px]:text-xs">₹{size.price}</div>
          </div>
        </button>
      ))}
    </div>
  );
};
