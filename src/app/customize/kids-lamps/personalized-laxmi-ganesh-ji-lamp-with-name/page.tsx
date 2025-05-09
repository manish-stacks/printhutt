'use client'
import { get_product_by_id } from '@/_services/admin/product';
import { Product } from '@/lib/types/product';
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Canvas, IText } from 'fabric';
import { useCartStore } from '@/store/useCartStore';
import html2canvas from 'html2canvas';
import useCartSidebarStore from '@/store/useCartSidebarStore';
import { FontPicker } from '@/components/neon/FontPicker';
import { RiShoppingBag2Line } from 'react-icons/ri';
import { BiDownload } from 'react-icons/bi';
import Image from 'next/image';

export default function Page() {
  const [names, setNames] = useState({ name1: '' });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedFont, setSelectedFont] = useState("Barbara-Calligraphy");
  const [product, setProduct] = useState<Product>();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const addToCart = useCartStore(state => state.addToCart);
  const { openCartSidebarView } = useCartSidebarStore();

  useEffect(() => {
    (async () => {
      try {
        const fetchedProduct = await get_product_by_id("67965c8a5ab5c7966823e1e5");
        setProduct(fetchedProduct);
      } catch {
        toast.error("Error fetching product.");
      }
    })();
  }, []);

  useEffect(() => {
    const initializeCanvas = (canvasElement: HTMLCanvasElement, text: string, left: number, top: number) => {
      const canvas = new Canvas(canvasElement);
      const textObj = new IText(text, {
        left,
        top,
        fill: '#FEEDBF',
        fontSize: 36,
        // width: 220,
        // height: 100,
        fontFamily: selectedFont,
      });
      canvas.add(textObj);
      canvas.renderAll();
      return canvas;
    };

    const canvas1 = canvasRef.current && initializeCanvas(canvasRef.current, names.name1 || 'Text Preview', 100, 20);

    return () => {
      canvas1?.dispose();
    };
  }, [names, selectedFont]);

  const handleFontChange = (font: string) => {
    setSelectedFont(font);
  };

  const handleCanvasAction = async () => {
    try {
     
      const previewElement = document.getElementById('preview-section');

      if (!previewElement) {
        toast.error('Preview section not found');
        return;
      }

      await new Promise(resolve => setTimeout(resolve, 100));

      const canvas = await html2canvas(previewElement, {
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scale: 2,
        logging: false,
        onclone: (clonedDoc) => {
          const clonedCanvas = clonedDoc.querySelector('canvas');
          const originalCanvas = canvasRef.current;
          if (clonedCanvas && originalCanvas) {
            const context = clonedCanvas.getContext('2d');
            if (context) {
              context.drawImage(originalCanvas, 0, 0);
            }
          }
        }
      });

      const finalCanvas = document.createElement('canvas');
      finalCanvas.width = canvas.width;
      finalCanvas.height = canvas.height;
      const ctx = finalCanvas.getContext('2d');

      if (ctx) {
        ctx.drawImage(canvas, 0, 0);
        return finalCanvas.toDataURL('image/png');
      }
    } catch (error) {
      console.error('Error during download:', error);
      toast.error('Failed to download preview');
    } 
  };


  const handleDownload = async () => {
    const finalCanvas = await handleCanvasAction();
    if (!finalCanvas) {
      return;
    }
    const link = document.createElement('a');
    link.download = `custom-memory-light-${Date.now()}.png`;
    link.href = finalCanvas;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

  };
  const handleAddToCart = async () => {
    if (names.name1 === '') {
      toast.error('Please enter the name.');
      return;
    }

    try {
      setIsAddingToCart(true);
      const previewCanvas = await handleCanvasAction();

      if (previewCanvas && product) {
        const custom_data = {
          name1: names.name1,
          previewCanvas,
          selectedFont,
        };

        const updatedProduct = {
          ...product,
          thumbnail: { ...product.thumbnail, url: previewCanvas },
          custom_data,
        };

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
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("https://res.cloudinary.com/dxhs6vjab/image/upload/v1743664964/photo-1506744038136-46273834b3fb_hq8v7q_xgcbbw.avif")',
      }}
    >
      <div className="min-h-screen bg-black/40 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-script text-white text-center mb-8">
            Create Your Memory Light
          </h1>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="relative rounded-lg">
              <div id="preview-section" className="relative rounded-lg p-2 backdrop-blur-sm border border-white/10">
                <div className="img-box relative">
                  <img                    src="https://res.cloudinary.com/dxhs6vjab/image/upload/v1743665004/laxmi-ganesh-lamp_pvddvs_nk7kdq.png"
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                    crossOrigin="anonymous"
                  />
                  <div className="text-box absolute top-[68%] left-[48%] transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <canvas ref={canvasRef} width="400" height="80" className="w-full h-full"></canvas>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-xl">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Enter Name</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      value={names.name1}
                      onChange={(e) => setNames({ ...names, name1: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2"
                      placeholder="Enter name"
                      maxLength={20}
                    />
                  </div>
                </div>

                <div className="max-w-lg mx-auto mt-10">
                  <FontPicker selectedFont={selectedFont} onFontChange={handleFontChange} />
                </div>

                <div className="space-y-2">
                  <div className="flex gap-2" >
                    <button
                      onClick={() => handleAddToCart()}
                      disabled={isAddingToCart}
                      className="flex-1 bg-yellow-400 text-slate-700 py-3 px-6 max-[567px]:px-1 rounded-md font-medium hover:bg-yellow-500 flex items-center justify-center gap-2">
                      <RiShoppingBag2Line className="w-5 h-5" /> {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                    </button>
                    <button
                      onClick={() => handleDownload()}
                      className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
                      <BiDownload className="w-6 h-6" />
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
