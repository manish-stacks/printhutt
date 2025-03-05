"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Canvas, IText } from 'fabric';
import { CustomizationButton } from '@/components/CustomizationButton';
import { useCartStore } from '@/store/useCartStore';
import html2canvas from 'html2canvas';
import { get_product_by_id } from '@/_services/admin/product';
import { Product } from '@/lib/types/product';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function Page() {
    const [names, setNames] = useState({ name1: '' });
    const [product, setProduct] = useState<Product>();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedFont, setSelectedFont] = useState("Barbara-Calligraphy");
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [selectedDesign, setSelectedDesign] = useState('cutout');

    const addToCart = useCartStore(state => state.addToCart);
    const router = useRouter();
    const fetchProduct = async (id: string) => {
        try {
            const product = await get_product_by_id(id);
            setProduct(product);
        } catch (error) {
            console.error('Error fetching product:', error);
            toast.error('Error fetching product.');
        }
    };


    useEffect(() => {
        fetchProduct('679277f42f3c20b2851e939c');
    }, []);

    useEffect(() => {
        const initializeCanvas = (canvasElement: HTMLCanvasElement, text: string, left: number, top: number) => {
            const canvas = new Canvas(canvasElement);
            const textObj = new IText(text, {
                left,
                top,
                fill: '#fde68a',
                fontSize: 32,
                fontFamily: selectedFont,
            });
            canvas.add(textObj);
            canvas.renderAll();
            return canvas;
        };

        const canvas1 = canvasRef.current && initializeCanvas(canvasRef.current, names.name1 || 'First Name', 80, 80);

        return () => {
            canvas1?.dispose();
        };
    }, [names, selectedFont]);


    const handleFontChange = (font: string) => {
        setSelectedFont(font);
    };

    const handleDownload = async () => {
        const previewElement = document.getElementById('preview-section');
        if (previewElement) {
            const canvas = await html2canvas(previewElement);
            const link = document.createElement('a');
            link.download = 'preview.jpg';
            link.href = canvas.toDataURL('image/jpeg');
            link.click();
        }
    };

    const changeDesign = (design: string) => {
        setSelectedDesign(design);
    };

    const handleAddToCart = async () => {
        if (names.name1 === '') {
            toast.error('Please enter both names.');
            return;
        }

        try {
            setIsAddingToCart(true);

            const previewElement = document.getElementById('preview-section');
            if (!previewElement) {
                console.error("Preview section not found.");
                return;
            }

            const canvas = await html2canvas(previewElement);
            const previewCanvas = canvas.toDataURL('image/png');

            if (previewCanvas && product) {
                const custom_data = {
                    name1: names.name1,
                    selectedDesign,
                    previewCanvas,
                    selectedFont,
                };

                const updatedProduct = {
                    ...product,
                    thumbnail: { ...product.thumbnail, url: previewCanvas },
                    custom_data,
                };

                //setProduct(updatedProduct);

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
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{

                backgroundImage: 'url("https://res.cloudinary.com/dkprths9f/image/upload/v1737650717/photo-15_gyd3jd.avif")',
            }}
        >
            <div className="min-h-screen bg-black/40 backdrop-blur-sm py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-script text-white text-center mb-8">
                        Create Your Memory Light
                    </h1>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Preview Section */}

                        <div className="relative">
                            {/* <div className="absolute inset-0 bg-gradient-to-b from-amber-100/20 to-amber-500/20 rounded-lg blur-xl"></div> */}
                            <div id="preview-section" className=" relative md:sticky top-0 bg-black/80 rounded-lg p-8 backdrop-blur-sm border  border-[#fde68a6b]">
                                <div className="aspect-[16/9] rounded-lg overflow-hidden flex items-center justify-center">
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <canvas ref={canvasRef} className="w-full h-full"></canvas>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>



                        {/* Customization Section */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-xl">
                            <div className="space-y-6">
                                <div className="space-y-4">
                                    <h3 className="text-xl font-semibold text-gray-800">Enter Names</h3>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                                        <input
                                            type="text"
                                            value={names.name1}
                                            onChange={(e) => setNames({ ...names, name1: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                            placeholder="Enter first name"
                                        />
                                    </div>

                                </div>
                                <div className="max-w-lg mx-auto mt-10">
                                    <h2 className="text-xl font-semibold text-gray-800">Choose Your Font Family</h2>
                                    <CustomizationButton selectedFont={selectedFont} handleFontChange={handleFontChange} />
                                </div>

                                <div className="list-group-item mb-10 mt-10">

                                    <div className="flex flex-wrap">


                                        <div className="w-full md:w-1/2 mb-4 md:mb-0">
                                            <label className="text-gray-800 text-lg font-semibold">Select Your Design</label>
                                            <div className="radio-itens mr-[20px]" onClick={() => changeDesign('cutout')}>
                                                <input
                                                    type="radio"
                                                    id="address"
                                                    name="addres"
                                                    className="w-auto mr-[2px] p-[10px]"
                                                    checked={selectedDesign === 'cutout'}
                                                    onChange={() => changeDesign('cutout')}
                                                />
                                                <label
                                                    className="relative font-normal text-[14px] text-[#686e7d] pl-[26px] cursor-pointer leading-[16px] inline-block tracking-[0]"
                                                >
                                                    Cutout Design
                                                </label>
                                            </div>

                                            <div className="radio-itens mr-[20px]" onClick={() => changeDesign('rectangle')}>
                                                <input
                                                    type="radio"
                                                    id="address"
                                                    name="addres"
                                                    className="w-auto mr-[2px] p-[10px]"
                                                    checked={selectedDesign === 'rectangle'}
                                                    onChange={() => changeDesign('rectangle')}
                                                />
                                                <label
                                                    className="relative font-normal text-[14px] text-[#686e7d] pl-[26px] cursor-pointer leading-[16px] inline-block tracking-[0]"
                                                >
                                                    Rectangle Design
                                                </label>
                                            </div>


                                        </div>
                                        <div className="w-full md:w-1/2">
                                            {selectedDesign === 'cutout' && (
                                                <div id="cutoutDesign">
                                                    <img
                                                        src="https://res.cloudinary.com/dkprths9f/image/upload/v1737654372/510341279_20240810_152907_nioxer.jpg"
                                                        alt="cutout"
                                                        className="h-[96px] w-[170px] object-cover rounded-xl"
                                                    />
                                                </div>
                                            )}
                                            {selectedDesign === 'rectangle' && (
                                                <div id="rectangleDesign">
                                                    <img
                                                        src="https://res.cloudinary.com/dkprths9f/image/upload/v1737654373/rect_n4e399.jpg"
                                                        alt="rectangle"
                                                        className="h-[96px] w-[170px] object-cover rounded-xl"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={isAddingToCart} // Disable button while loading
                                    className={`w-full py-3 rounded-lg font-semibold shadow-lg ${isAddingToCart
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-colors'
                                        }`}
                                >
                                    {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                                </button>

                                <button
                                    onClick={handleDownload}
                                    className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-colors font-semibold shadow-lg">
                                    Download Preview
                                </button>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

