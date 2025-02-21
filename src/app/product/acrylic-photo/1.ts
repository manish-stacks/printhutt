"use client"
import React, { useEffect, useRef, useState } from 'react';
import { Canvas, FabricImage, Image  } from 'fabric';
import { ThicknessOption,CheckoutData } from '@/lib/types';
import { BUTTON_VALUES_AND_PRICES, DEFAULT_IMAGE_URL } from './constants';

function App() {
  const canvasRef = useRef<Canvas | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedSize, setSelectedSize] = useState(BUTTON_VALUES_AND_PRICES[0].size);
  const [selectedThickness, setSelectedThickness] = useState(BUTTON_VALUES_AND_PRICES[0].thickness[0]);
  const [radiusValue, setRadiusValue] = useState('radius');
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE_URL);

  useEffect(() => {
    canvasRef.current = new Canvas('canvas');
    loadImage(DEFAULT_IMAGE_URL);

    return () => {
      canvasRef.current?.dispose();
    };
  }, []);

  const loadImage = (url: string) => {
    Image.fromURL(url, (img) => {
      if (!canvasRef.current) return;

      img.scaleToWidth(canvasRef.current.width + 18);
      img.scaleToHeight(canvasRef.current.height + 18);
      img.set({ left: 0, top: 0 });
      
      canvasRef.current.clear();
      canvasRef.current.add(img);
      canvasRef.current.renderAll();
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) {
      loadImage(DEFAULT_IMAGE_URL);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setImageUrl(result);
      loadImage(result);
    };
    reader.readAsDataURL(file);
  };

  const handleSizeChange = (size: string) => {
    setSelectedSize(size);
    const sizeOption = BUTTON_VALUES_AND_PRICES.find(option => option.size === size);
    if (sizeOption) {
      setSelectedThickness(sizeOption.thickness[0]);
    }
  };

  const handleThicknessChange = (thickness: ThicknessOption) => {
    setSelectedThickness(thickness);
  };

  const handleRadiusChange = (radius: string) => {
    setRadiusValue(radius);
    const canvasElement = document.getElementById('canvas');
    if (!canvasElement) return;

    canvasElement.className = '';
    switch (radius) {
      case 'radius':
        canvasElement.classList.add('rad1');
        break;
      case 'radius1':
        canvasElement.classList.add('rad2');
        break;
      case 'radius2':
        canvasElement.classList.add('rad3');
        break;
      default:
        canvasElement.classList.add('rad1');
    }
  };

  const handleCheckout = () => {
    if (imageUrl === DEFAULT_IMAGE_URL) {
      alert('Please upload an image');
      return;
    }

    const checkoutData: CheckoutData = {
      imageUrl,
      radiusValue: radiusValue === 'radius' ? '0%' : radiusValue === 'radius1' ? '20px' : '30px',
      shapeName: radiusValue === 'radius' ? 'Normal' : radiusValue === 'radius1' ? 'RoundEdge' : 'Egghorizontal',
      frameSize: selectedSize,
      sizeThickness: selectedThickness.value,
      totalPrice: selectedThickness.price,
    };

    // Here you would typically send this data to your backend
    console.log('Checkout data:', checkoutData);
  };

  const [width, height] = selectedSize.split('x').map(Number);

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold">Acrylic Photo Frame</h1>
      </div>

      <div className="flex justify-center mb-8">
        <div id="canvasContainer" className="relative">
          <div className="sahdow-box">
            <canvas id="canvas" width="700" height="450" className="norad" />
          </div>
          
          <div id="width" className="absolute bg-black text-white text-center text-sm px-2 w-28">
            {width} inch Width
          </div>
          
          <div id="height" className="absolute bg-black text-white px-2 transform -rotate-90">
            {height} inch Height
          </div>

          <div className="absolute right-0 flex flex-col gap-2">
            {['radius', 'radius1', 'radius2'].map((radius) => (
              <button
                key={radius}
                className={`${radius} ${radiusValue === radius ? 'selected' : ''}`}
                onClick={() => handleRadiusChange(radius)}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-md mx-auto mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/*"
            className="w-full mb-2"
          />
          <p className="text-center text-green-600 text-sm">
            Upload Image for Acrylic Photo Frame (High-Resolution Recommended) png|jpeg|jpg
          </p>
        </div>
      </div>

      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold">
          Price: ₹{selectedThickness.price}
        </h3>
      </div>

      <div className="text-center mb-8">
        <div>
          <p className="mb-2">Sizes in (inches)</p>
          <div className="flex flex-wrap justify-center gap-2">
            {BUTTON_VALUES_AND_PRICES.map((option) => (
              <button
                key={option.size}
                onClick={() => handleSizeChange(option.size)}
                className={`btn ${
                  selectedSize === option.size
                    ? 'bg-success text-white'
                    : 'btn-outline-primary'
                }`}
              >
                {option.size}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="mb-2">Frame Thickness in (mm)</p>
          <div className="flex flex-wrap justify-center gap-2">
            {BUTTON_VALUES_AND_PRICES
              .find((option) => option.size === selectedSize)
              ?.thickness.map((thickness) => (
                <button
                  key={thickness.value}
                  onClick={() => handleThicknessChange(thickness)}
                  className={`btn ${
                    selectedThickness.value === thickness.value
                      ? 'bg-success text-white'
                      : 'btn-outline-primary'
                  }`}
                >
                  {thickness.value}
                </button>
              ))}
          </div>
        </div>
      </div>

      <div className="text-center">
        <button
          onClick={handleCheckout}
          className="buyNowBtn bg-green-500 text-white font-semibold py-3 px-8 rounded-lg hover:bg-green-600 transition-colors"
        >
          Buy Now
        </button>
      </div>
    </main>
  );
}

export default App;