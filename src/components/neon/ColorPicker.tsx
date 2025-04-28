import React, { useEffect, useState } from 'react';
import { colors, multiColors } from '@/app/product/customize-neon-sign/_data/colors';
import { NeonColor } from '@/lib/types/neon';
import Link from 'next/link';

interface ColorPickerProps {
  selectedColor: NeonColor;
  onColorChange: (color: NeonColor) => void;
  multiColor: boolean;
  setMultiColor: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ColorPicker: React.FC<ColorPickerProps> = ({ selectedColor, onColorChange, multiColor, setMultiColor }) => {
  //const [multiColor, setMultiColor] = useState(false);
  const [currentColorIndex, setCurrentColorIndex] = useState(0);

  useEffect(() => {
    if (!multiColor) return;

    const interval = setInterval(() => {
      setCurrentColorIndex((prevIndex) => {
        const newIndex = (prevIndex + 1) % multiColors.length;
        return newIndex;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [multiColor]);

  useEffect(() => {
    if (multiColor) {
      onColorChange(multiColors[currentColorIndex]);
    }
  }, [currentColorIndex, multiColor, onColorChange]);

  const onColorChangeHandle = (color: NeonColor, type: string) => {
    if (type === 'multi') {
      if (!multiColor) {
        setMultiColor(true);
        setCurrentColorIndex(0);
      } else {
        setMultiColor(false);
      }
    } else {
      setMultiColor(false);
      onColorChange(color);
    }
  };


  const [currentIndex, setCurrentIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % multiColors.length);
    }, 1000);

    return () => clearInterval(interval);
  }, [multiColors.length]);

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold max-[576px]:text-sm`">CHOOSE COLOR</h3>
      <p className="text-gray-600 text-xs max-[576px]:hidden">Digital Mockup Only. Click to see photos of {multiColor ? 'multiple colors' : selectedColor.name} colored signs.</p>
      <div className="grid grid-cols-9 gap-2">
        {colors.map((color) => (
          <button
            key={color.name}
            className={`w-10 h-10 max-[576px]:w-6 max-[576px]:h-6 rounded-full ${color.class} border-2 transition-all duration-200
              ${!multiColor && selectedColor.name === color.name ? 'border-blue-500 scale-110' : 'border-gray-200 hover:scale-105'}`}
            onClick={() => onColorChangeHandle(color, 'single')}
            title={color.name}
          />
        ))}
      </div>
      <div className="flex items-center space-x-4 hidden">
        {/* Circular Color Indicator */}
        <button
          onClick={() => onColorChangeHandle(multiColors[currentColorIndex], 'multi')}
          className={`w-10 h-10 max-[576px]:w-6 max-[576px]:h-6 rounded-full ${multiColors[currentIndex].class} border-2 transition-all duration-200 ${multiColor ? 'border-blue-500 scale-110' : 'border-gray-200 hover:scale-105'}`}
          title={'RGB Color Changing'}
        />
        {/* Text Information */}
        <div className="flex-1">
          <div className="font-bold text-sm ">RGB COLOR CHANGING</div>
          <div className="text-gray-500 text-xs max-[576px]:hidden">Multiple colors with static and dynamic modes</div>
        </div>
        {/* Link */}
        <Link href={"/category/neon/neon-sign"} className="text-blue-600 font-semibold text-md max-[576px]:hidden">
          See Examples
        </Link>
      </div>
    </div>
  );
};
