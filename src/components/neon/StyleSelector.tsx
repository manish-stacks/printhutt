import { styleOptions } from '@/app/product/neon/_data/styles';
import { StyleOption } from '@/lib/types/neon';
import React from 'react';


interface StyleSelectorProps {
  selectedStyle: StyleOption;
  onStyleChange: (style: StyleOption) => void;
}

export const StyleSelector: React.FC<StyleSelectorProps> = ({
  selectedStyle,
  onStyleChange,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">BACKBOARD STYLE</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {styleOptions.map((style) => (
          <button
            key={style.id}
            onClick={() => onStyleChange(style)}
            className={`relative aspect-square border border-slate-300 rounded-lg overflow-hidden group 
              ${selectedStyle.id === style.id ? "ring-1 ring-pink-500" : ""}`}
          >
            <img              src={style.preview}
              alt={style.name}
              className="w-full h-full object-contain p-4"
            />
            <div className="absolute inset-0 flex flex-col justify-between p-2 text-black text-sm">
              <span className="text-left">Cut Around</span>
              <span className="text-right font-bold">
                {style.price === 0 ? "FREE" : `+₹${style.price}`}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};