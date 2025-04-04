'use client'
import { get_product_by_id } from '@/_services/admin/product';
import { Product } from '@/lib/types/product';
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Canvas, IText } from 'fabric';
import { useCartStore } from '@/store/useCartStore';
import html2canvas from 'html2canvas';
import { CustomizationButton } from '@/components/CustomizationButton';
import { BiRefresh, BiUpload } from 'react-icons/bi';
import { BsUpload } from 'react-icons/bs';
import useCartSidebarStore from '@/store/useCartSidebarStore';

export default function Page() {
  const [names, setNames] = useState({ name1: '' });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedFont, setSelectedFont] = useState("orangina_demo");
  const [product, setProduct] = useState<Product>();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const addToCart = useCartStore(state => state.addToCart);
  const { openCartSidebarView } = useCartSidebarStore();
  const [previewImage, setPreviewImage] = useState('');
  const [previewImageTwo, setPreviewImageTwo] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRefTwo = useRef<HTMLInputElement>(null);

  useEffect(() => {
    (async () => {
      try {
        const fetchedProduct = await get_product_by_id("67978c9486aa717ceccd44c1");
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

    const canvas1 = canvasRef.current && initializeCanvas(canvasRef.current, names.name1 || 'Preview', 100, 60);

    return () => {
      canvas1?.dispose();
    };
  }, [names, selectedFont]);

  const handleFontChange = (font: string) => {
    setSelectedFont(font);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleImageUploadTwo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImageTwo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleCanvasAction = async () => {
    try {
      setIsDownloading(true);
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
    } finally {
      setIsDownloading(false);
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
    if (names.name1 === '' || previewImage === '' || previewImageTwo === '') {
      toast.error('Please enter the name.');
      return;
    }

    try {
      setIsAddingToCart(true);
      const previewCanvas = await handleCanvasAction();

      if (previewCanvas && product) {
        const custom_data = {
          name1: names.name1,
          previewImage,
          previewImageTwo,
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
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: 'url("https://res.cloudinary.com/dxhs6vjab/image/upload/v1743664964/photo-1506744038136-46273834b3fb_hq8v7q_xgcbbw.avif")',
      }}
    >
      <div className="min-h-screen bg-black/40 py-8 lamp-rectangle-shape">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-script text-white text-center mb-8">
            Create Your Memory Light
          </h1>

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <div className="relative rounded-lg">
              <div id="preview-section" className="relative rounded-lg p-2 border border-white/10">
                <div className="img-box relative">
                  <img
                    src="https://res.cloudinary.com/dxhs6vjab/image/upload/v1743665004/love-forever_sutsha_c_fill_w_600_h_600_lcjqut_n6xol2.png"
                    alt="Preview"
                    className="w-full h-full object-cover rounded-lg"
                    crossOrigin="anonymous"
                  />
                  <div className='absolute top-[14%] left-[15%] w-full h-full '>
                    {previewImage ? (
                      <div className="w-[33%] h-[33%] relative rotate-[352deg]">
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent rounded-sm "></div>
                        <img
                          src={previewImage}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-sm"
                        />
                      </div>
                    ) : (
                      <div className="w-[33%] h-[33%]  border-2 border-dashed border-amber-500/50 rounded-sm rotate-[352deg] flex items-center justify-center bg-black/40">
                        <BiUpload className="w-12 h-12 text-amber-500/70" />
                      </div>
                    )}

                  </div>

                  <div className='absolute top-[31%] left-[51%] w-full h-full '>
                    {previewImageTwo ? (
                      <div className="w-[33%] h-[33%] relative rotate-[8deg]">
                        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent rounded-sm "></div>
                        <img
                          src={previewImageTwo}
                          alt="Preview"
                          className="w-full h-full object-cover rounded-sm"
                        />
                      </div>
                    ) : (
                      <div className="w-[33%] h-[33%]  border-2 border-dashed border-amber-500/50 rounded-sm rotate-[8deg] flex items-center justify-center bg-black/40">
                        <BiUpload className="w-12 h-12 text-amber-500/70" />
                      </div>
                    )}

                  </div>
                  <div className="text-box absolute top-[78%] left-[50%] w-[54%] h-[13%] transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <canvas ref={canvasRef} width="340" height="100" className="w-full h-full"></canvas>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white/95 rounded-lg p-8 shadow-xl z-10">
              <div className="space-y-6">

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Upload Your Photo</h3>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-colors flex items-center gap-2 shadow-lg"
                    >
                      <BsUpload className="w-4 h-4" />
                      Choose Photo
                    </button>
                    {previewImage && (
                      <button
                        onClick={() => setPreviewImage('')}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <BiRefresh className="w-4 h-4" />
                        Reset
                      </button>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">Upload Your Photo</h3>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => fileInputRefTwo.current?.click()}
                      className="px-4 py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-colors flex items-center gap-2 shadow-lg"
                    >
                      <BsUpload className="w-4 h-4" />
                      Choose Photo
                    </button>
                    {previewImageTwo && (
                      <button
                        onClick={() => setPreviewImageTwo('')}
                        className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                      >
                        <BiRefresh className="w-4 h-4" />
                        Reset
                      </button>
                    )}
                  </div>
                  <input
                    type="file"
                    ref={fileInputRefTwo}
                    onChange={handleImageUploadTwo}
                    accept="image/*"
                    className="hidden"
                  />
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Enter Name</h3>
                  <div>
                    <input
                      type="text"
                      value={names.name1}
                      onChange={(e) => setNames({ ...names, name1: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      placeholder="Enter name"
                      maxLength={20}
                    />
                  </div>
                </div>

                <div className="max-w-lg mx-auto mt-10">
                  <h2 className="text-xl font-semibold text-gray-800">Choose Your Font</h2>
                  <CustomizationButton selectedFont={selectedFont} handleFontChange={handleFontChange} />
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className={`w-full py-3 rounded-lg font-semibold shadow-lg ${isAddingToCart
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-colors'
                    }`}
                >
                  {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                </button>

                <button
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className={`w-full py-3 rounded-lg font-semibold shadow-lg ${isDownloading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-colors'
                    }`}
                >
                  {isDownloading ? 'Downloading...' : 'Download Preview'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
