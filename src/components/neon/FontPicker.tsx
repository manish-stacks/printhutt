import React from 'react';
import { fonts } from '@/app/product/neon/_data/fonts';
import { Font } from '@/lib/types/neon';


interface FontPickerProps {
  selectedFont: Font;
  onFontChange: (font: Font) => void;
}

export const FontPicker: React.FC<FontPickerProps> = ({ selectedFont, onFontChange }) => {
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">2. CHOOSE FONT</h3>
      <p className="text-gray-600 text-xs">Pick from over 50 typefaces. Prices vary by the amount of LED neon required.</p>
      <select
        value={selectedFont.value}
        onChange={(e) => {
          const font = fonts.find(f => f.value === e.target.value);
          if (font) onFontChange(font);
        }}
        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        {fonts.map((font) => (
          <option key={font.value} value={font.value}>
            {font.name}
          </option>
        ))}
      </select>
    </div>
  );
};