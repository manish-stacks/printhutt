"use client"
import React, { useState, useRef, useEffect } from 'react';
import { BiRefresh, BiUpload } from 'react-icons/bi';
import { BsUpload } from 'react-icons/bs';
import { Canvas, IText } from 'fabric';
import { CustomizationButton } from '@/components/CustomizationButton';
import { useCartStore } from '@/store/useCartStore';
import html2canvas from 'html2canvas';
import { get_product_by_id } from '@/_services/admin/product';
import { Product } from '@/lib/types/product';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { formatCurrency } from '@/helpers/helpers';

export default function App() {
  const [previewImage, setPreviewImage] = useState('');
  const [product, setProduct] = useState<Product>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFont, setSelectedFont] = useState("ariblk");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const addToCart = useCartStore(state => state.addToCart);
  const router = useRouter();
  const [names, setNames] = useState({ name1: '' });
  const [fontSize, setFontSize] = useState(32);
  const [lineHeight, setLineHeight] = useState(1.5);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeVarient, setActiveVarient] = useState<string>('0');
  const [isDownloading, setIsDownloading] = useState(false);
  const [varientSize, setVarientSize] = useState('default');
  useEffect(() => {
    (async () => {
      try {
        const product = await get_product_by_id('6798c64a304fd29e187e6576');
        setProduct(product);
        setActiveVarient(product?.varient[0]?._id || '0');
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    })();
  }, []);

  useEffect(() => {
    const initializeCanvas = (canvasElement: HTMLCanvasElement, text: string, left: number, top: number) => {
      const canvas = new Canvas(canvasElement);
      const textObj = new IText(text, {
        left,
        top,
        fill: '#fde68a',
        fontSize: fontSize, // Use font size state
        fontFamily: selectedFont,
        lineHeight: lineHeight,
      });
      canvas.add(textObj);
      canvas.renderAll();
      return canvas;
    };

    const canvas1 = canvasRef.current && initializeCanvas(canvasRef.current, names.name1 || 'Preview', 50, 40);

    return () => {
      canvas1?.dispose();
    };
  }, [names, selectedFont, lineHeight, fontSize]); // Add fontSize to dependencies


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
  const handleFontChange = (font: string) => {
    setSelectedFont(font);
  };

  const handleLineHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLineHeight(parseFloat(e.target.value));
  };

  const handleFontSizeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFontSize(parseInt(e.target.value));
  };

  const onchangeVarient = (id: string) => {
    setActiveVarient(id)
    const varient = product?.varient.find(item => item._id === id);
    product.price = varient?.price || 0
    setVarientSize(varient?.size || 'default')
  }


  const handleAddToCart = async () => {

    if (!previewImage) {
      toast.error('Please upload a preview image.');
      return;
    }
    try {
     
      setIsAddingToCart(true);
      const previewCanvas = await handleCanvasAction();
      if (previewCanvas && product) {
        const custom_data = {
          previewImage,
          name1: names.name1,
          previewCanvas,
          selectedFont,
          price: product?.price,
          variant: varientSize=='default'?product?.varient[0]?.size :varientSize,
        };

        const updatedProduct = {
          ...product,
          thumbnail: { ...product.thumbnail, url: previewImage },
          custom_data,
        };

        setProduct(updatedProduct);

        addToCart(updatedProduct, 1);
        router.push('/checkout');
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
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: 'url("https://res.cloudinary.com/dxhs6vjab/image/upload/v1743664964/photo-1506744038136-46273834b3fb_hq8v7q_xgcbbw.avif")',
      }}
    >
      <div className="min-h-screen bg-black/40 backdrop-blur-sm py-8">
        <div className="container mx-auto px-4">
          <h1 className="lg:text-4xl md:text-3xl text-2xl font-script text-white text-center mb-8">
            Create Your Memory Light
          </h1>

          <div className="lg:grid md:grid-cols-2   gap-8 max-w-6xl mx-auto">
            {/* Preview Section */}

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-amber-100/20 to-amber-500/20 rounded-lg blur-xl"></div>
              <div id="preview-section" className="relative md:sticky top-0 bg-black/80 rounded-lg p-2 backdrop-blur-sm border border-white/10">
                <div className="aspect-[4/6] rounded-lg">
                  <div className="relative w-full h-full flex flex-col justify-between">
                    <div className="inset-0 flex items-center h-[80%]">
                      {previewImage ? (
                        <div className="w-full h-full relative">
                          <div className="inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full border-2 border-dashed border-amber-500/50 rounded-lg flex items-center justify-center bg-black/40">
                          <BiUpload className="w-12 h-12 text-amber-500/70" />
                        </div>
                      )}
                    </div>
                    <div className="text-box h-[20%] w-full text-center bg-black/80 border-2 border-t-0 border-dashed border-amber-500/50 rounded-lg">
                      <canvas ref={canvasRef} width="534" height="145" className="w-full h-full flex justify-center items-center"></canvas>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Customization Section */}
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-xl sm:mt-4">
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

                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Enter Names</h3>
                  <div>
                    <textarea
                      value={names.name1}
                      onChange={(e) => setNames({ ...names, name1: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      placeholder="Enter Line"
                      rows={3}
                    >
                    </textarea>
                  </div>
                  <div>
                    <label className="text-gray-800 text-lg font-semibold">Line Height</label>
                    <input
                      type="range"
                      min="1"
                      max="2"
                      step="0.1"
                      value={lineHeight}
                      onChange={handleLineHeightChange}
                      className="w-full mt-2"
                    />
                  </div>
                  <div>
                    <label className="text-gray-800 text-lg font-semibold">Font Size</label>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      step="1"
                      value={fontSize}
                      onChange={handleFontSizeChange}
                      className="w-full mt-2"
                    />
                  </div>
                </div>
                <div className="max-w-lg mx-auto mt-10">
                  <h2 className="text-xl font-semibold text-gray-800">Choose Your Font Family</h2>
                  <div className="max-h-[250px] overflow-auto">
                    <CustomizationButton selectedFont={selectedFont} handleFontChange={handleFontChange} />
                  </div>
                </div>

                {product?.isVarientStatus && (
                  <div className="bb-single-pro-weight mb-[24px]">
                    <div className="pro-title mb-[12px]">
                      <h4 className="font-quicksand leading-[1.2] tracking-[0.03rem] text-[16px] font-bold uppercase text-[#3d4750]">
                        Varient
                      </h4>
                    </div>
                    <div className="bb-pro-variation-contant">
                      <ul className="flex flex-wrap m-[-2px]">
                        {product?.varient.map((v, index) => (
                          <li key={index} className={`my-[10px] mx-[2px] py-[2px] px-[15px] border-[1px] border-solid border-[#eee] rounded-[10px] cursor-pointer ${activeVarient === v?._id ? 'bg-blue-500 text-slate-200' : 'text-[#686e7d]'}`}>
                            <span onClick={() => onchangeVarient(v?._id)} className="font-Poppins font-light text-[14px] leading-[28px] tracking-[0.03rem]">
                              {v.size}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}

                <div className="text-gray-600 text-md">
                  <ul className="list-disc list-inside">
                    <li>
                      Upload your original high-quality image for the frame.
                    </li>
                    <li>
                      The recommended resolution and size are <span className="text-amber-500">2,480 x 3,508</span> pixels at 300 DPI for the best results and printing quality.
                    </li>
                  </ul>
                </div>

                <div className="text-gray-600 text-2xl">
                  {product?.price &&
                    product?.discountType &&
                    product?.discountPrice
                    ? product.discountType === 'percentage'
                      ? formatCurrency(
                        product.price -
                        (product.price * product.discountPrice) / 100
                      )
                      : formatCurrency(product.price - product.discountPrice)
                    : "0"
                  }
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart} // Disable button while loading
                  className={`w-full py-3 rounded-lg font-semibold shadow-lg ${isAddingToCart
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-colors'
                    }`}
                >
                  {isAddingToCart ? 'Adding to Cart...' : `Add to Cart`}
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

