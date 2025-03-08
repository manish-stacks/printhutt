'use client';
import React, { useEffect, useState } from 'react';
import { NeonText } from '@/components/neon/NeonText';
import { ColorPicker } from '@/components/neon/ColorPicker';
import { FontPicker } from '@/components/neon/FontPicker';
import { SizePresets } from '@/components/neon/SizePresets';
import { StyleSelector } from '@/components/neon/StyleSelector';
import { PreviewGallery } from '@/components/neon/PreviewGallery';
import { colors } from './_data/colors';
import { fonts } from './_data/fonts';
import { sizePresets } from './_data/sizes';
import { backboardOptions } from './_data/backboards';
import { styleOptions } from './_data/styles';
import { previewImages } from './_data/preview-images';
import { formatCurrency } from '@/helpers/helpers';

export default function NeonPage() {
  const [text, setText] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[7]);
  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [textLength, setTextLength] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);
  const [selectedSize, setSelectedSize] = useState(sizePresets[2]);
  const [width, setWidth] = useState(selectedSize.width);
  const [height, setHeight] = useState(selectedSize.height);
  const [selectedStyle, setSelectedStyle] = useState(styleOptions[0]);
  const [selectedPreview, setSelectedPreview] = useState(1);
  const fontSize = 72;
  const [preset, setPreset] = useState(sizePresets);
  const total = selectedSize.price + selectedStyle.price;
  const currentPreview = previewImages.find(img => img.id === selectedPreview);

  const getTextLength = (newText: string) => {
    const textline = newText.split('\n');
    const calculatedLength = textline.reduce((total, line) => total + line.length, 0);
    setTextLength(calculatedLength);
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    getTextLength(newText);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {

    if (e.key === 'Enter') {
      setLineHeight((prev) => prev + 1)
      console.log("Enter key pressed, line break detected.");
    } else if (e.key === 'Backspace') {
      if (lineHeight > 1) {
        setLineHeight((prev) => prev - 1)
      }
    } else {
      console.log("Key pressed:", e.key);
    }
  }

  useEffect(() => {
    getTextLength(text);
  }, [selectedSize]);


  


  useEffect(() => {

    const updatedPresets = sizePresets.map((item) => {
  
      let updatedPrice = item.price + item.perLetter * Math.max(textLength - 1, 0);
      let updatedWidth = item.startWidth * Math.max(textLength, 1);
      let updatedHeight = item.startHeight * Math.max(lineHeight, 1) + (lineHeight > 1 ? item.lineBreak : 0);
     
      return {
        ...item,
        price: updatedPrice,
        width: updatedWidth,
        height: updatedHeight,
      };
    });

    setPreset(updatedPresets);
  }, [textLength, lineHeight]); 


  return (
    <section>
      <div className="min-h-screen bg-gray-100 mt-[50px]">
        <div className="relative min-h-screen flex flex-col lg:flex-row items-start justify-between p-4 lg:p-8">
          <div
            className="w-full lg:flex-1 h-[40vh] lg:h-[calc(100vh-2rem)] flex items-center justify-center"
            style={{ backgroundImage: `url(${currentPreview?.url})`, backgroundSize: 'cover' }}
          >
            <div
              className="relative w-[80%] h-[80%]  rounded-lg flex items-center justify-center overflow-hidden"
            >
              <NeonText
                text={text}
                color={selectedColor.value}
                font={selectedFont.value}
                width={width}
                height={height}
                fontSize={fontSize}
              />
            </div>

            <PreviewGallery selectedPreview={selectedPreview} onPreviewChange={setSelectedPreview} />
          </div>

          <div className="w-full lg:w-[480px] bg-white shadow-xl p-6 space-y-8 mt-4 lg:mt-0 max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-6 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-600">ON</span>
              </div>
              <div className="text-xl font-bold">Total {formatCurrency(total)}</div>
            </div>

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">1. ENTER YOUR TEXT</h3>
              <p className="text-gray-600 text-xs">Create your own stunning Custom Neon sign in a few simple steps.</p>
              <textarea
                value={text}
                onChange={handleTextChange}
                onKeyDown={handleKeyDown}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your text"
              />
            </div>

            <FontPicker selectedFont={selectedFont} onFontChange={setSelectedFont} />
            <ColorPicker selectedColor={selectedColor} onColorChange={setSelectedColor} />

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">4. CHOOSE SIZE</h3>
              <SizePresets
                preset={preset}
                selectedSize={selectedSize}
                onSizeSelect={(size) => {
                  setSelectedSize(size);
                  setWidth(size.width);
                  setHeight(size.height);
                }}
              />
            </div>

            <StyleSelector selectedStyle={selectedStyle} onStyleChange={setSelectedStyle} />
            <button className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold">
              NEXT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
