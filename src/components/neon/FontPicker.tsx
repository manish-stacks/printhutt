import React from 'react';
import { fonts } from '@/app/product/neon/_data/fonts';
import { Font } from '@/lib/types/neon';
import { CustomizationButton, fontsName } from '../CustomizationButton';
import { BiSolidDownArrow, BiSolidUpArrow } from 'react-icons/bi';


interface FontPickerProps {
  selectedFont: string;
  onFontChange: (font: string) => void;
}

export const FontPicker: React.FC<FontPickerProps> = ({ selectedFont, onFontChange }) => {
  const [open, setOpen] = React.useState(false);
  const selectFont = fontsName.find(item => item.font === selectedFont);
  if (!selectFont) return


  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold max-[576px]:text-sm">2. CHOOSE FONT</h3>
      <p className="text-gray-600 text-xs max-[576px]:hidden">Pick from over 50 typefaces. Prices vary by the amount of LED neon required.</p>
      <div
        onClick={() => setOpen(!open)}
        className='relative p-2 px-3 rounded-lg border-2 border-gray-200 hover:border-pink-300 flex'>
        <div style={{ fontFamily: selectFont.font }} className="font-medium text-lg" >
          {selectFont.name}
        </div>
        <div className='absolute right-2 py-1'>
          {
            open ? <BiSolidDownArrow /> : <BiSolidUpArrow />
          }
        </div>
      </div>
      {
        open && <CustomizationButton selectedFont={selectedFont} handleFontChange={onFontChange} />
      }

    </div>
  );
};