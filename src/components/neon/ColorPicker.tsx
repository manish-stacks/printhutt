import React, { useEffect, useState } from 'react';
import { colors, multiColors } from '@/app/product/neon/_data/colors';
import { NeonColor } from '@/lib/types/neon';

interface ColorPickerProps {
  selectedColor: NeonColor;
  onColorChange: (color: NeonColor) => void;
}


export const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorChange }) => {


  const [currentColorIndex, setCurrentColorIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => (prevIndex + 1) % multiColors.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [multiColors.length]);


  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">3. CHOOSE COLOR</h3>
      <p className="text-gray-600 text-xs">Digital Mockup Only. Click to see photos of {selectedColor.name} colored signs.</p>
      <div className="grid grid-cols-9 gap-2">
        {colors.map((color) => (
          <button
            key={color.name}
            className={`w-10 h-10 rounded-full ${color.class} border-2 transition-all duration-200
              ${selectedColor.name === color.name ? 'border-blue-500 scale-110' : 'border-gray-200 hover:scale-105'}`}
            onClick={() => onColorChange(color)}
            title={color.name}
          />
        ))}


      </div>
      <div className="flex items-center space-x-4">
        {/* Circular Color Indicator */}
        <button
          className={`w-10 h-10 rounded-full ${multiColors[currentColorIndex].class} border-2 transition-all duration-200 border-blue-500 scale-110}`}
          title={'bg-rose-600'}
        />


        {/* Text Information */}
        <div className="flex-1">
          <div className="font-bold text-sm">RGB COLOR CHANGING</div>
          <div className="text-gray-500 text-xs">Multiple colors with static and dynamic modes</div>
        </div>

        {/* Link */}
        <a href="{linkUrl}" className="text-blue-600 font-semibold text-md">
          See Examples
        </a>
      </div>
    </div>
  );
};