import React from 'react';
import { backboardOptions } from '@/app/product/neon/_data/backboards';
import { BackboardOption } from '@/lib/types/neon';


interface BackboardSelectorProps {
  selectedBackboard: BackboardOption;
  onBackboardChange: (backboard: BackboardOption) => void;
}

export const BackboardSelector: React.FC<BackboardSelectorProps> = ({
  selectedBackboard,
  onBackboardChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">6. BACKBOARD COLOR</h3>
      <div className="grid grid-cols-1 gap-3">
        {backboardOptions.map((option) => (
          <button
            key={option.name}
            onClick={() => onBackboardChange(option)}
            className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
              selectedBackboard.name === option.name
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-6 h-6 rounded border border-gray-300"
                style={{
                  backgroundColor: option.color,
                  backgroundImage:
                    option.color === 'transparent'
                      ? 'repeating-conic-gradient(#CCCCCC 0% 25%, transparent 0% 50%) 50% / 8px 8px'
                      : undefined,
                }}
              />
              <span>{option.name}</span>
            </div>
            <div className="font-medium">
              {option.price === 0 ? 'FREE' : `+$${option.price}`}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};