'use client';
import React, { useEffect, useState } from 'react';
import { NeonText } from '@/components/neon/NeonText';
import { ColorPicker } from '@/components/neon/ColorPicker';
import { FontPicker } from '@/components/neon/FontPicker';
import { SizePresets } from '@/components/neon/SizePresets';
import { StyleSelector } from '@/components/neon/StyleSelector';
import { PreviewGallery } from '@/components/neon/PreviewGallery';
import { colors } from './_data/colors';
import { sizePresets } from './_data/sizes';
import { styleOptions } from './_data/styles';
import { previewImages } from './_data/preview-images';
import { formatCurrency } from '@/helpers/helpers';
import { toast } from 'react-toastify';
import { Product } from '@/lib/types/product';
import { get_product_by_id } from '@/_services/admin/product';
import { useCartStore } from '@/store/useCartStore';
import html2canvas from 'html2canvas';
import { RiMenu2Line, RiMenu3Line, RiMenuLine } from 'react-icons/ri';
import { SizeControls } from '@/components/neon/SizeControls';
import useCartSidebarStore from '@/store/useCartSidebarStore';

interface CheckoutData {
  previewCanvas: string;
  text: string;
  color: string;
  font: string;
  size: string;
  style: string;
  lineHeight: number;
  fontSize: number;
  width: number;
  height: number;
  total: number;
}

export default function NeonPage() {
  const [text, setText] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[7]);
  const [selectedFont, setSelectedFont] = useState('Buttervill');
  const [textLength, setTextLength] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);
  const [selectedSize, setSelectedSize] = useState(sizePresets[0]);
  const [width, setWidth] = useState(selectedSize.width);
  const [height, setHeight] = useState(selectedSize.height);
  const [selectedStyle, setSelectedStyle] = useState(styleOptions[0]);
  const [selectedPreview, setSelectedPreview] = useState(1);
  const [total, setTotal] = useState(selectedSize.price + selectedStyle.price);
  const [fontSize, setFontSize] = useState(70);
  const [preset, setPreset] = useState(sizePresets);
  const [multiColor, setMultiColor] = useState(false);
  const currentPreview = previewImages.find(img => img.id === selectedPreview);
  const [product, setProduct] = useState<Product>();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { openCartSidebarView } = useCartSidebarStore();
  const addToCart = useCartStore(state => state.addToCart);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const existingCartState = useCartStore();
  const [textAlignment, setTextAlignment] = useState('center');

  useEffect(() => {
    (async () => {
      try {
        const fetchedProduct = await get_product_by_id("67cee1becd0dd15f69fc92bb");
        setProduct(fetchedProduct);
      } catch {
        console.error("Error fetching product.");
      }
    })();
  }, []);

  const getTextLength = (newText: string) => {
    const textLines = newText.split('\n');
    const calculatedLength = textLines.reduce((total, line) => total + line.replace(/\s/g, '').length, 0);
    setTextLength(calculatedLength);
    return calculatedLength;
  };

  const updateAvailableSizes = (text: string) => {
    const lines = text.split('\n').filter(line => line.trim() !== '');
    const currentLineCount = lines.length;
    // const maxLineLength = Math.max(...lines.map(line => line.replace(/\s/g, '').length), 0);

    const matchingSizes = sizePresets.filter((size) => {
      const supportsLineCount = size.maxLineLength >= currentLineCount;
      const fitsTextLength = lines.every(line => line.replace(/\s/g, '').length <= size.maxTextLengthPerLine);

      if (size.maxLineLength === 1) {
        return currentLineCount <= 1 && fitsTextLength;
      }

      if (size.maxLineLength === 2) {
        return currentLineCount <= 2 && fitsTextLength;
      }

      return supportsLineCount && fitsTextLength;
    });

    setPreset(matchingSizes);

    if (!matchingSizes.find(size => size._id === selectedSize._id)) {
      if (matchingSizes.length > 0) {
        const newSize = matchingSizes[0];
        setSelectedSize(newSize);
        setWidth(newSize.width);
        setHeight(newSize.height);
      }
    }
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    getTextLength(newText);
    updateAvailableSizes(newText);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      const currentLines = text.split('\n').filter(line => line.trim() !== '');
      if (currentLines.length < selectedSize.maxLineLength) {
        setLineHeight(currentLines.length + 1);
      }
    } else if (e.key === 'Backspace' && lineHeight > 1 && text.endsWith('\n')) {
      setLineHeight(lineHeight - 1);
    }
  };

  useEffect(() => {
    updateAvailableSizes(text);
  }, [selectedSize, text]);

  useEffect(() => {
    setTotal(selectedSize.price + selectedStyle.price);
  }, [textLength, lineHeight, selectedSize, selectedStyle]);

  const handleCanvasAction = async () => {
    try {
      const previewElement = document.getElementById('preview-section');
      if (!previewElement) {
        console.error('Preview section not found');
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 100));
      const canvas = await html2canvas(previewElement, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: 2,
        logging: false,
      });

      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = canvas.width;
      finalCanvas.height = canvas.height;
      const ctx = finalCanvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(canvas, 0, 0);
        const dataURL = finalCanvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'preview.png';
        link.click();
        return dataURL;
      }
    } catch (error) {
      console.error('Error during download:', error);
    }
  };

  const handleAlignText = (align: string) => {
    setTextAlignment(align);
  }

  const handleAddToCart = async () => {
    if (!text) {
      toast.error('Please enter some text');
      return;
    }
    if (!selectedSize) {
      toast.error('Please select a size');
      return;
    }

    try {
      setIsAddingToCart(true);
      const previewCanvas = await handleCanvasAction();
      if (previewCanvas && product) {
        const custom_data: CheckoutData = {
          previewCanvas,
          text,
          color: multiColor ? 'multi' : selectedColor.value,
          font: selectedFont,
          size: selectedSize.name,
          style: selectedStyle.name,
          lineHeight,
          fontSize,
          width,
          height,
          total,
        };

        const updatedProduct = {
          ...product,
          thumbnail: { ...product.thumbnail, url: previewCanvas },
          price: total,
          custom_data,
        };

        const existingItem = existingCartState.items.find(
          (item) => item._id === product._id
        );
        if (existingItem) {
          removeFromCart(product._id);
        }

        addToCart(updatedProduct, 1);
        openCartSidebarView();
        return;
      }
    } catch (error) {
      console.error("Error while adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <section className="min-h-screen bg-gray-100 mt-[50px]" style={{ backgroundImage: `url(${currentPreview?.url})` }}>
      <div className="relative flex flex-col lg:flex-row items-start justify-between p-4 lg:p-8">
        <div
          className="w-full lg:flex-1 h-[40vh] lg:h-[calc(100vh-2rem)] flex items-center justify-center bg-cover"
          style={{ backgroundImage: `url(${currentPreview?.url})` }}
        >
          <div
            id="preview-section"
            className="relative w-[80%] h-[80%] rounded-lg flex items-center justify-center overflow-hidden mt-[-25%] max-[567px]:mt-0"
          >
            <NeonText
              text={text}
              color={selectedColor.value}
              font={selectedFont}
              width={width}
              height={height}
              fontSize={fontSize}
              textAlignment={textAlignment}
            />
          </div>
          <PreviewGallery selectedPreview={selectedPreview} onPreviewChange={setSelectedPreview} />
        </div>

        <div className="w-full lg:w-[480px] bg-white shadow-xl p-6 space-y-4 mt-4 lg:mt-0 max-h-[calc(100vh-2rem)] overflow-y-auto rounded-l-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-12 h-6 bg-green-500 rounded-full relative">
                <div className="w-6 h-6 bg-white rounded-full shadow-md transform transition-all duration-300" />
              </div>
              <span className="text-sm text-gray-600">ON</span>
            </div>
            <div className="text-xl font-bold sm:text-sm">
              Total {formatCurrency(total)}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-xl font-semibold max-[576px]:text-sm">1. ENTER YOUR TEXT</h3>
            <p className="text-gray-600 text-xs max-[576px]:hidden">Create your own stunning Custom Neon sign in a few simple steps.</p>
            <textarea
              value={text}
              onChange={handleTextChange}
              onKeyDown={handleKeyDown}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Enter your text"
            />
          </div>

          <div className="space-y-1">
            <div className="flex gap-2">
              <button className={`p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition ${textAlignment === 'left' ? 'bg-gray-300' : ''}`} onClick={() => handleAlignText('left')}>
                <RiMenu2Line className="text-xl" />
              </button>
              <button className={`p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition ${textAlignment === 'center' ? 'bg-gray-300' : ''}`} onClick={() => handleAlignText('center')}>
                <RiMenuLine className="text-xl" />
              </button>
              <button className={`p-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition ${textAlignment === 'right' ? 'bg-gray-300' : ''}`} onClick={() => handleAlignText('right')}>
                <RiMenu3Line className="text-xl" />
              </button>
            </div>
            <SizeControls width={width} height={height} fontSize={fontSize} onWidthChange={setWidth} onHeightChange={setHeight} onFontSizeChange={setFontSize} />
          </div>

          <FontPicker selectedFont={selectedFont} onFontChange={setSelectedFont} />

          <div className="space-y-2">
            <h3 className="text-xl font-semibold max-[576px]:text-sm">3. CHOOSE SIZE</h3>
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

          <ColorPicker selectedColor={selectedColor} onColorChange={setSelectedColor} multiColor={multiColor} setMultiColor={setMultiColor} />

          <StyleSelector selectedStyle={selectedStyle} onStyleChange={setSelectedStyle} />

          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className={`w-[100%] font-semibold py-3 px-8 rounded-lg shadow-lg ${isAddingToCart
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-colors'
              }`}
          >
            {isAddingToCart ? 'Adding to Cart...' : `Buy Now - ${formatCurrency(total)}`}
          </button>
        </div>
      </div>
    </section>
  );
}