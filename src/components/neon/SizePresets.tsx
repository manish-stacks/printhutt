import React from 'react';
import { SizePreset } from '@/lib/types/neon';

interface SizePresetsProps {
  selectedSize: SizePreset;
  onSizeSelect: (size: SizePreset) => void;
  preset: SizePreset[];
}

export const SizePresets: React.FC<SizePresetsProps> = ({
  preset,
  selectedSize,
  onSizeSelect,
}) => {


  return (
    <div className="grid grid-cols-2 gap-4">
      {preset.map((size) => (
        <button
          key={size.name}
          onClick={() => onSizeSelect(size)}
          className={`relative p-4 rounded-lg border-2 transition-all text-left
          ${selectedSize.name === size.name
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
              <div className="text-sm text-gray-500 max-[576px]:text-xs">Length: {size.width}"</div>
              <div className="text-sm text-gray-500 max-[576px]:text-xs">Height: {size.height}"</div>
            </div>
            <div className="text-lg font-bold max-[576px]:text-xs">₹{size.price}</div>
          </div>
        </button>
      ))}
    </div>
  );
};
