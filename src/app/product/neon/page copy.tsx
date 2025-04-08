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
import { CheckoutData } from '@/lib/types';
import { useCartStore } from '@/store/useCartStore';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/navigation';


export default function NeonPage() {
  const [text, setText] = useState('');
  const [selectedColor, setSelectedColor] = useState(colors[7]);
  const [selectedFont, setSelectedFont] = useState('Buttervill');
  const [textLength, setTextLength] = useState(1);
  const [lineHeight, setLineHeight] = useState(1);
  const [selectedSize, setSelectedSize] = useState(sizePresets[2]);
  const [width, setWidth] = useState(selectedSize.width);
  const [height, setHeight] = useState(selectedSize.height);
  const [selectedStyle, setSelectedStyle] = useState(styleOptions[0]);
  const [selectedPreview, setSelectedPreview] = useState(1);
  const [total, setTotal] = useState(selectedSize.price + selectedStyle.price);
  const fontSize = 72;
  const [preset, setPreset] = useState(sizePresets);
  const [multiColor, setMultiColor] = useState(false);
  const currentPreview = previewImages.find(img => img.id === selectedPreview);
  const [product, setProduct] = useState<Product>();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const router = useRouter();
  const addToCart = useCartStore(state => state.addToCart);
  const removeFromCart = useCartStore(state => state.removeFromCart);
 const existingCartState = useCartStore();

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
    const textline = newText.split('\n');
    // const calculatedLength = textline.reduce((total, line) => total + line.length, 0);
    const calculatedLength = textline.reduce((total, line) => total + line.replace(/\s/g, '').length, 0);
    setTextLength(calculatedLength);
  };



  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    getTextLength(newText);
    // setTextLength(newText.replace(/\s/g, '').length); // Count characters excluding spaces
  };


  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter') {
      setLineHeight((prev) => prev + 1);
    } else if (e.key === 'Backspace' && lineHeight > 1 && text.endsWith('\n')) {
      setLineHeight((prev) => prev - 1);
    }
  };



  useEffect(() => {
    getTextLength(text);
  }, [selectedSize, text]);





  useEffect(() => {

    const updatedPresets = sizePresets.map((item) => {

      const updatedPrice = item.price + item.perLetter * Math.max(textLength - 1, 0);
      const updatedWidth = item.startWidth * Math.max(textLength, 1);
      const updatedHeight = item.startHeight * Math.max(lineHeight, 1) + (lineHeight > 1 ? item.lineBreak : 0);

      return {
        ...item,
        price: updatedPrice,
        width: updatedWidth,
        height: updatedHeight,
      };
    });

    setPreset(updatedPresets);

    const selectSize = updatedPresets.find(item => item.name === selectedSize.name);
    if (!selectSize) return
    setWidth(selectSize.width);
    setHeight(selectSize.height);
    setTotal(selectSize.price + selectedStyle.price);

  }, [textLength, lineHeight, selectedSize, selectedStyle]);


  const handleCanvasAction = async () => {
    try {
      const previewElement = document.getElementById('preview-section');
      // if(!previewElement) return
      // previewElement.style.backgroundColor = '#FFF';

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



  const handleAddToCart = async () => {

    if (!text) {
      toast.error('Please enter some text');
      return
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



        // console.log('updatedProduct', updatedProduct);
        // console.log('product', product);
        // return
        //check already cart item
        const existingItem = existingCartState.items.find(
          (item) => item._id === product._id
        );
        if (existingItem) {
          removeFromCart(product._id);
        }

        addToCart(updatedProduct, 1);
        router.push('/cart');
        console.log("Product added to cart:", updatedProduct);
        return;
      }
    } catch (error) {
      console.error("Error while adding to cart:", error);
    } finally {
      setIsAddingToCart(false);
    }

  };

  return (
    <section>
      <div className="min-h-screen bg-gray-100 mt-[50px]">
        <div className="relative min-h-screen flex flex-col lg:flex-row items-start justify-between p-4 lg:p-8">
          <div
            className="w-full lg:flex-1 h-[40vh] lg:h-[calc(100vh-2rem)] flex items-center justify-center"
            style={{ backgroundImage: `url(${currentPreview?.url})`, backgroundSize: 'cover' }}
          >
            <div
              id="preview-section"
              className="relative w-[80%] h-[80%]  rounded-lg flex items-center justify-center overflow-hidden"
            >
              <NeonText
                text={text}
                color={selectedColor.value}
                font={selectedFont}
                width={width}
                height={height}
                fontSize={fontSize}
              />
            </div>

            <PreviewGallery selectedPreview={selectedPreview} onPreviewChange={setSelectedPreview} />
          </div>

          <div className="w-full lg:w-[480px] bg-white shadow-xl p-6 space-y-8 mt-4 lg:mt-0 max-h-[calc(100vh-2rem)] overflow-y-auto ">
            <div className="flex justify-between items-center">
              <div className="flex items-center space-x-2">
                <div className="w-12 h-6 bg-green-500 rounded-full" />
                <span className="text-sm text-gray-600">ON</span>
              </div>
              <div className="text-xl font-bold max-[576px]:text-sm">Total {formatCurrency(total)}</div>
            </div>

            <div className="space-y-4">
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

            <FontPicker selectedFont={selectedFont} onFontChange={setSelectedFont} />
            <ColorPicker selectedColor={selectedColor} onColorChange={setSelectedColor} multiColor={multiColor} setMultiColor={setMultiColor} />

            <div className="space-y-4">
              <h3 className="text-xl font-semibold max-[576px]:text-sm">4. CHOOSE SIZE</h3>
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
            <button
              onClick={handleAddToCart}
              disabled={isAddingToCart}
              className={`w-[100%] font-semibold py-3 px-8 rounded-lg shadow-lg ${isAddingToCart
                ? 'bg-gray-400 cursor-not-allowed'
                : ' bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-colors'
                }`}
            >
              {isAddingToCart ? 'Adding to Cart...' : `Buy Now -${formatCurrency(total)}`}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
