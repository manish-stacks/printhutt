"use client";
import React, { useEffect, useRef, useState } from 'react';
import { ThicknessOption, CheckoutData } from '@/lib/types';
import { BUTTON_VALUES_AND_PRICES, DEFAULT_IMAGE_URL } from './constants';
import { Canvas, FabricImage } from 'fabric';
import { formatCurrency } from '@/helpers/helpers';
import html2canvas from 'html2canvas';
import { get_product_by_id } from '@/_services/admin/product';
import { Product } from '@/lib/types/product';
import { useCartStore } from '@/store/useCartStore';
import { toast } from 'react-toastify';
import useCartSidebarStore from '@/store/useCartSidebarStore';

export default function AcrylicPhoto() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fabricCanvasRef = useRef<Canvas | null>(null);
  const [selectedSize, setSelectedSize] = useState(BUTTON_VALUES_AND_PRICES[0].size);
  const [selectedThickness, setSelectedThickness] = useState(BUTTON_VALUES_AND_PRICES[0].thickness[0]);
  const [radiusValue, setRadiusValue] = useState<string>('normal-canvas');
  const [imageUrl, setImageUrl] = useState<string>(DEFAULT_IMAGE_URL);
  const [orientation, setOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [product, setProduct] = useState<Product>();
  const addToCart = useCartStore(state => state.addToCart);
  const removeFromCart = useCartStore(state => state.removeFromCart);
  const existingCartState = useCartStore();
  const { openCartSidebarView } = useCartSidebarStore();
  const [design, setDesign] = useState('frame');
  const [isShape, setIsShape] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const fetchedProduct = await get_product_by_id("67bef94296ffd7574b647c40");
        setProduct(fetchedProduct);
      } catch {
        console.error("Error fetching product.");
      }
    })();
  }, []);

  useEffect(() => {
    if (canvasRef.current) {
      fabricCanvasRef.current = initCanvas(canvasRef.current);
      loadImage(DEFAULT_IMAGE_URL);
    }
    return () => {
      fabricCanvasRef.current?.dispose();
    };
  }, []);

  const initCanvas = (canvasElement: HTMLCanvasElement) => {
    return new Canvas(canvasElement, {
      width: 700,
      height: 450,
      backgroundColor: 'white'
    });
  };

  const loadImage = async (url: string) => {
    if (!fabricCanvasRef.current) return;

    try {
      const img = await FabricImage.fromURL(url, { crossOrigin: 'Anonymous' });
      const canvas = fabricCanvasRef.current;
      const canvasWidth = canvas.width || 700;
      const canvasHeight = canvas.height || 450;

      const scaleX = canvasWidth / img.width!;
      const scaleY = canvasHeight / img.height!;
      const scale = Math.min(scaleX, scaleY);

      img.set({
        scaleX: scale,
        scaleY: scale,
        left: (canvasWidth - img.width! * scale) / 2,
        top: (canvasHeight - img.height! * scale) / 2,
      });

      canvas.clear();
      canvas.add(img);
      canvas.renderAll();
    } catch (error) {
      console.error("Error loading image:", error);
    }
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

  const handleOrientationChange = (newOrientation: 'portrait' | 'landscape') => {
    setOrientation(newOrientation);
    if (!fabricCanvasRef.current) return;

    const canvas = fabricCanvasRef.current;
    const currentWidth = canvas.width || 700;
    const currentHeight = canvas.height || 450;

    // Swap dimensions
    canvas.setWidth(newOrientation === 'landscape' ? currentHeight : 700);
    canvas.setHeight(newOrientation === 'landscape' ? currentWidth : 450);

    // Update the shadow box
    const shadowBox = document.querySelector('.shadow-box');
    if (shadowBox) {
      shadowBox.classList.toggle('landscape', newOrientation === 'landscape');
    }

    loadImage(imageUrl);

    // Update width and height display
    const [width, height] = selectedSize.split('x').map(Number);
    const widthElement = document.getElementById('width_val');
    const heightElement = document.getElementById('height_val');

    if (widthElement && heightElement) {
      if (newOrientation === 'landscape') {
        widthElement.textContent = height.toString();
        heightElement.textContent = width.toString();
      } else {
        widthElement.textContent = width.toString();
        heightElement.textContent = height.toString();
      }
    }
  };

  const handleThicknessChange = (thickness: ThicknessOption) => {
    setSelectedThickness(thickness);
  };

  const handleRadiusChange = (radius: string) => {
    setRadiusValue(radius);
    const canvasElement = canvasRef.current;
    if (!canvasElement) return;
    canvasElement.className = '';
    canvasElement.classList.add(radius);
    // canvasElement.classList.remove('shadow-box');
  };

  const [width, height] = selectedSize.split('x').map(Number);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const result = e.target?.result as string;
          setImageUrl(result);
          loadImage(result);
        };
        reader.readAsDataURL(file);
      }
    }
  };

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
    }
  };

  // const handleDownload = async () => {
  //   const finalCanvas = await handleCanvasAction();
  //   if (!finalCanvas) {
  //     return;
  //   }
  //   const link = document.createElement('a');
  //   link.download = `custom-memory-light-${Date.now()}.png`;
  //   link.href = finalCanvas;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);

  // };


  const handleDesignChange = (design: string) => {
    setDesign(design);
    if (design === 'frame') {
      setIsShape(true);
    } else {
      setIsShape(false);
      setRadiusValue('normal-canvas');
      const canvasElement = canvasRef.current;
      if (!canvasElement) return;
      canvasElement.className = '';
      canvasElement.classList.add('normal-canvas');
    }
    console.log("Design Changed");
  }
  const handleAddToCart = async () => {

    if (imageUrl === DEFAULT_IMAGE_URL) {
      toast.error('Please upload an image');
      return;
    }
    try {
      setIsAddingToCart(true);
      const previewCanvas = await handleCanvasAction();
      if (previewCanvas && product) {

        const custom_data: CheckoutData = {
          previewCanvas,
          previewImage: imageUrl,
          radiusValue: radiusValue,
          shapeName: radiusValue.split('-')[0],
          variant: orientation === 'landscape' ? selectedSize.split('x').reverse().join('x') : selectedSize,
          sizeThickness: selectedThickness.value,
          price: selectedThickness.price,
          frameDesign: design,
          orientation: orientation === 'landscape' ? 'portrait' : 'landscape',
        };

       
        const updatedProduct = {
          ...product,
          thumbnail: { ...product.thumbnail, url: previewCanvas },
          price: product.discountType === "percentage" ? (selectedThickness.price / ((100 - product.discountPrice) / 100)) : (selectedThickness.price + product.discountPrice),
          custom_data,
        };



        //check already cart item
        const existingItem = existingCartState.items.find(
          (item) => item._id === product._id
        );
        if (existingItem) {
          removeFromCart(product._id);
        }

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
    <>
      <section className="section-register py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full">
            <div className="w-full">
              <div
                className="bb-register  aos-init aos-animate"
                data-aos="fade-up"
                data-aos-duration={1000}
                data-aos-delay={200}
              >
                <div className="flex flex-wrap">

                  <div className="w-full px-[12px]">
                    <div className="section-title mb-[20px] pb-[20px] z-[5] relative flex flex-col items-center text-center max-[991px]:pb-[0]">
                      <div className="section-detail max-[991px]:mb-[12px]">
                        <h2 className="bb-title font-quicksand mb-[0] p-[0] text-[25px] font-bold text-[#3d4750] relative inline capitalize leading-[1] tracking-[0.03rem] max-[767px]:text-[23px]">
                          Acrylic Photo Frame
                        </h2>
                        <p className="font-Poppins max-w-[400px] mt-[10px] text-[14px] text-[#686e7d] leading-[18px] font-light tracking-[0.03rem] max-[991px]:mx-[auto]">
                          Best place to buy and sell digital products
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="w-full px-[12px]">

                    <div className="flex justify-center mb-8">
                      <div id="canvasContainer" className="relative">
                        <div className={`shadow-box ${radiusValue} ${orientation === 'landscape' ? 'landscape' : ''}`} id="preview-section">
                          <canvas ref={canvasRef} width={700} height={450} className={`w-full h-full`}> </canvas>
                        </div>

                        <div id="width" className="absolute bg-black text-white text-center text-sm px-2 w-28">
                          <span id="width_val">{orientation === 'landscape' ? height : width}</span> inch Width
                        </div>

                        <div id="height" className="absolute bg-black text-white px-2 transform -rotate-90">
                          <span id="height_val">{orientation === 'landscape' ? width : height}</span> inch Height
                        </div>

                        <div className="flex flex-col gap-2">
                          {isShape && (
                            <div id="cpanel-shape" className="cpanel-share">
                              <div id="availableShape">
                                <svg
                                  onClick={() => handleRadiusChange('normal-canvas')}
                                  viewBox="0 0 600 400"
                                  width={600}
                                  height={400}
                                  r="horizontal"
                                  className={`normal ${radiusValue === 'normal-canvas' ? 'activeshape' : ''} `}
                                >
                                  <path
                                    d="M 0,0 L 600,0 L 600,400 L 0,400 Z"
                                    fill="#DD037C"
                                  />
                                </svg>
                                <svg
                                  onClick={() => handleRadiusChange('roundEdge-canvas')}
                                  viewBox="70 100 660 460"
                                  width={660}
                                  height={460}
                                  r="horizontal"

                                  className={`RoundEdge ${radiusValue === 'roundEdge-canvas' ? 'activeshape' : ''} `}
                                >
                                  <path
                                    d="M 100 100 h 600 a 30 30 0 0 1 30 30 v 400 a 30 30 0 0 1 -30 30 h -600 a 30 30 0 0 1 -30 -30 v -400 a 30 30 0 0 1 30 -30 z"
                                    fill="#DD037C"
                                  />
                                </svg>

                                <svg
                                  onClick={() => handleRadiusChange('leaf-canvas')}
                                  viewBox="-0.021657049655914307 -12000 12000.021484375 12000.001953125"
                                  width="12000.021484375"
                                  height="12000.001953125"
                                  r="square"
                                  className={`Leaf ${radiusValue === 'leaf-canvas' ? 'activeshape' : ''} `}
                                >
                                  <path
                                    d="M 11995.6 -4370 c -26.8 440 -98 813.2 -231.6 1214 c -130.4 392 -307.2 752.8 -537.6 1097.2 c -179.6 269.2 -344.8 470 -580 705.2 c -128.4 128 -191.2 186 -308.4 283.6 c -412.8 344.4 -887.6 617.6 -1387.6 797.6 c -371.2 134 -761.2 220.4 -1156.4 256.4 c -184.4 16.4 -35.6 16 -4016.8 16 l -3777.2 -0 l 0 -3777.2 c 0 -4122.4 -1.6 -3839.2 22.4 -4070.8 c 49.2 -482.8 174.4 -954 372 -1400 c 36.4 -82 140.4 -290.4 183.6 -368 c 400.8 -716.8 974.8 -1309.6 1676 -1730 c 424.8 -254.8 881.6 -437.2 1366 -545.2 c 223.6 -50 393.6 -75.2 688 -101.6 c 41.6 -3.6 932.4 -5.2 3873.2 -6 l 3818.8 -1.2 l -0.4 3788.8 c -0.4 2084 -2 3812.4 -4 3841.2 z"
                                    fill="#DD037C"
                                  />
                                </svg>
                                <svg
                                  onClick={() => handleRadiusChange('egghorizontal-canvas')}
                                  viewBox="-490 71.9000015258789 490 346.20001220703125"
                                  width={490}
                                  height="346.20001220703125"
                                  r="horizontal"
                                  className={`Egghorizontal ${radiusValue === 'egghorizontal-canvas' ? 'activeshape' : ''} `}
                                >
                                  <path
                                    d="M -302.6 418.1 C -437.9 418.1 -490 340.7 -490 245 S -437.9 71.9 -302.6 71.9 S 0 149.3 0 245 S -167.2 418.1 -302.6 418.1 z"
                                    fill="#DD037C"
                                  />
                                </svg>
                                <svg
                                  onClick={() => handleRadiusChange('extraRoundhorizontal-canvas')}
                                  viewBox="-2754.613037109375 11.048904418945312 2745.621826171875 1800.828125"
                                  width="2745.621826171875"
                                  height="1800.828125"
                                  r="horizontal"
                                  className={`ExtraRoundhorizontal ${radiusValue === 'extraRoundhorizontal-canvas' ? 'activeshape' : ''} `}
                                >
                                  <path
                                    d="M -2750 615 c 8 -133 31 -211 91 -311 c 49 -81 162 -183 251 -227 c 141 -68 135 -68 1063 -65 c 828 3 830 3 895 25 c 218 75 380 256 424 475 c 22 108 23 700 1 803 c -48 228 -234 423 -460 480 c -89 23 -1698 22 -1794 0 c -216 -51 -399 -231 -455 -448 c -17 -65 -27 -545 -16 -732 z"
                                    fill="#DD037C"
                                  />
                                </svg>
                              </div>
                            </div>
                          )}
                        </div>
                        <a className="sizeguide" target='_blank' href="https://res.cloudinary.com/dxhs6vjab/image/upload/v1743664965/size-chart-new_optimized_tns7y8_yujbed.webp">Size guide?</a>
                      </div>
                    </div>

                    <div className="max-w-md mx-auto mb-8">
                      <p className="text-center text-green-600 text-sm mb-2">
                        Kindly upload your image in high resolution for a high-quality printing, and our designer will respectfully rectify the design to your satisfaction.
                      </p>
                      <div
                        className="bg-white p-6 rounded-lg shadow-md border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors"
                        onDragOver={handleDragOver}
                        onDrop={handleDrop}
                      >

                        <input
                          type="file"
                          ref={fileInputRef}
                          onChange={handleFileChange}
                          accept="image/png,image/jpeg,image/jpg"
                          className="w-full cursor-pointer"
                        />
                        <p className="text-xs text-gray-500 mt-2">
                          Supported formats: PNG, JPEG, JPG (Max size: 10MB)
                        </p>
                      </div>
                    </div>

                    <div className="p-4">
                      {/* Design Selection */}
                      <div className="text-center mb-4">
                        <p className="mb-2 text-lg font-medium">Select Design</p>
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleDesignChange('frame')}
                            className={`px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition 
                    duration-300 ease-in-out 
                    ${design === 'frame' ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-blue-500 border border-blue-500'}
                    hover:bg-blue-600 hover:text-white active:scale-95`}
                          >
                            Frame
                          </button>
                          <button
                            onClick={() => handleDesignChange('cutout')}
                            className={`px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition 
                    duration-300 ease-in-out 
                    ${design === 'cutout' ? 'bg-blue-500 text-white shadow-md' : 'bg-white text-blue-500 border border-blue-500'}
                    hover:bg-blue-600 hover:text-white active:scale-95`}
                          >
                            Cutout
                          </button>
                        </div>
                      </div>

                      {/* Orientation Selection */}
                      <div className="text-center mb-4">
                        <p className="mb-2 text-lg font-medium">Select Orientation</p>
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => handleOrientationChange('portrait')}
                            className={`px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition 
                    duration-300 ease-in-out 
                    ${orientation === 'portrait' ? 'bg-green-500 text-white shadow-md' : 'bg-white text-green-500 border border-green-500'}
                    hover:bg-green-600 hover:text-white active:scale-95`}
                          >
                            Landscape
                          </button>
                          <button
                            onClick={() => handleOrientationChange('landscape')}
                            className={`px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition 
                    duration-300 ease-in-out 
                    ${orientation === 'landscape' ? 'bg-green-500 text-white shadow-md' : 'bg-white text-green-500 border border-green-500'}
                    hover:bg-green-600 hover:text-white active:scale-95`}
                          >
                            Portrait
                          </button>
                        </div>
                      </div>

                      {/* Size Selection */}
                      <div className="text-center mb-6">
                        <p className="text-lg font-medium">Sizes (inches)</p>
                        <div className="flex flex-wrap justify-center gap-2">
                          {BUTTON_VALUES_AND_PRICES.map((option) => (
                            <button
                              key={option.size}
                              onClick={() => handleSizeChange(option.size)}
                              className={`px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition 
                      duration-300 ease-in-out 
                      ${selectedSize === option.size ? 'bg-purple-500 text-white shadow-md' : 'bg-white text-purple-500 border border-purple-500'}
                      hover:bg-purple-600 hover:text-white active:scale-95`}
                            >
                              {option.size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Thickness Selection */}
                      <div className="text-center">
                        <p className="text-lg font-medium">Thickness (mm)</p>
                        <div className="flex flex-wrap justify-center gap-2">
                          {BUTTON_VALUES_AND_PRICES
                            .find((option) => option.size === selectedSize)
                            ?.thickness.map((thickness) => (
                              <button
                                key={thickness.value}
                                onClick={() => handleThicknessChange(thickness)}
                                className={`px-4 py-2 rounded-lg text-sm sm:text-base font-semibold transition 
                        duration-300 ease-in-out 
                        ${selectedThickness.value === thickness.value ? 'bg-red-500 text-white shadow-md' : 'bg-white text-red-500 border border-red-500'}
                        hover:bg-red-600 hover:text-white active:scale-95`}
                              >
                                {thickness.value}
                              </button>
                            ))}
                        </div>
                      </div>
                    </div>


                    <div className="text-center">
                      <button
                        onClick={handleAddToCart}
                        disabled={isAddingToCart}
                        className={`font-semibold py-3 px-8 rounded-lg shadow-lg ${isAddingToCart
                          ? 'bg-gray-400 cursor-not-allowed'
                          : ' bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 transition-colors'
                          }`}
                      >
                        {isAddingToCart ? 'Adding to Cart...' : `Buy Now -${formatCurrency(selectedThickness.price)}`}
                      </button>
                      {/* <button onClick={handleDownload}>download</button> */}
                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

    </>
  );
}
