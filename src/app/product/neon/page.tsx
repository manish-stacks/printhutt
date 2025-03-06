'use client';
import React, { useState } from 'react';
import { NeonText } from '@/components/neon/NeonText';
import { ColorPicker } from '@/components/neon/ColorPicker';
import { FontPicker } from '@/components/neon/FontPicker';
import { SizeControls } from '@/components/neon/SizeControls';
import { SizePresets } from '@/components/neon/SizePresets';
import { LocationSelector } from '@/components/neon/LocationSelector';
import { BackboardSelector } from '@/components/neon/BackboardSelector';
import { StyleSelector } from '@/components/neon/StyleSelector';
import { PreviewGallery } from '@/components/neon/PreviewGallery';
import { colors } from './_data/colors';
import { fonts } from './_data/fonts';
import { sizePresets } from './_data/sizes';
import { backboardOptions } from './_data/backboards';
import { styleOptions } from './_data/styles';
import { previewImages } from './_data/preview-images';

function App() {
  const [text, setText] = useState('Hello');
  const [selectedColor, setSelectedColor] = useState(colors[7]); // Pink by default
  const [selectedFont, setSelectedFont] = useState(fonts[0]);
  const [selectedSize, setSelectedSize] = useState(sizePresets[2]); // Medium by default
  const [width, setWidth] = useState(selectedSize.width);
  const [height, setHeight] = useState(selectedSize.height);
  const [fontSize, setFontSize] = useState(72);
  const [isIndoor, setIsIndoor] = useState(true);
  const [selectedBackboard, setSelectedBackboard] = useState(backboardOptions[0]);
  const [selectedStyle, setSelectedStyle] = useState(styleOptions[0]);
  const [selectedPreview, setSelectedPreview] = useState(1);

  // Calculate total price
  const total = selectedSize.price + selectedBackboard.price + selectedStyle.price;

  const currentPreview = previewImages.find(img => img.id === selectedPreview);

  return (
    <section >
      <div className="min-h-screen bg-gray-100 mt-[50px]">
        {/* Preview Background */}
        {/* <div className="fixed inset-0">
          <img
            src={currentPreview?.url}
            alt={currentPreview?.alt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/30" />
        </div> */}

        {/* Main Content */}
        <div className="relative min-h-screen flex flex-col lg:flex-row items-start justify-between p-4 lg:p-8">
          {/* Neon Sign Preview */}
          <div className="w-full lg:flex-1 h-[40vh] lg:h-[calc(100vh-16rem)] flex items-center justify-center" style={{backgroundImage: `url(${currentPreview?.url})`, backgroundSize: 'cover'}}>
            <div
              className="relative"
              style={{
                backgroundColor: selectedBackboard.color,
                padding: selectedBackboard.name !== 'No backboard' ? '2rem' : 0,
                borderRadius: '0.5rem',
              }}
            >
              <NeonText
                text={text}
                color={selectedColor.value}
                font={selectedFont.value}
                width={width * 20}
                height={height * 20}
                fontSize={fontSize}
              />
            </div>
          </div>

          {/* Controls Panel */}
          <div className="w-full lg:w-[480px] bg-white rounded-2xl shadow-xl p-6 space-y-8 mt-4 lg:mt-0 max-h-[calc(100vh-2rem)] lg:overflow-y-auto">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-6 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-600">ON</span>
              </div>
              <div className="text-xl font-bold">Total ${total}</div>
            </div>

            {/* Text Input */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">1. ENTER YOUR TEXT</h3>
              <p className="text-gray-600 text-xs">Create your own stunning Custom Neon sign in a few simple steps.</p>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your text"
              />
              
            </div>

            <FontPicker selectedFont={selectedFont} onFontChange={setSelectedFont} />
            <ColorPicker selectedColor={selectedColor} onColorChange={setSelectedColor} />

            <div className="space-y-4">
              <h3 className="text-xl font-semibold">4. CHOOSE SIZE</h3>
              <SizePresets
                selectedSize={selectedSize}
                onSizeSelect={(size) => {
                  setSelectedSize(size);
                  setWidth(size.width);
                  setHeight(size.height);
                }}
              />
              {/* <SizeControls
                width={width}
                height={height}
                fontSize={fontSize}
                onWidthChange={setWidth}
                onHeightChange={setHeight}
                onFontSizeChange={setFontSize}
              /> */}
            </div>

            {/* <LocationSelector isIndoor={isIndoor} onLocationChange={setIsIndoor} /> */}
            {/* <BackboardSelector selectedBackboard={selectedBackboard} onBackboardChange={setSelectedBackboard} /> */}
            <StyleSelector selectedStyle={selectedStyle} onStyleChange={setSelectedStyle} />

            <button className="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold">
              NEXT
            </button>
          </div>
        </div>

        {/* Preview Gallery */}
        <PreviewGallery
          selectedPreview={selectedPreview}
          onPreviewChange={setSelectedPreview}
        />
      </div>

    </section>
  );
}

export default App;