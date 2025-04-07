"use client"

import React, { useState, useRef, useEffect } from 'react';
import { Canvas, IText } from 'fabric';
import { CustomizationButtonTwo } from '@/components/CustomizationButton';
import { useCartStore } from '@/store/useCartStore';
import html2canvas from 'html2canvas';
import { get_product_by_id } from '@/_services/admin/product';
import { Product } from '@/lib/types/product';
import { toast } from 'react-toastify';
import useCartSidebarStore from '@/store/useCartSidebarStore';

export default function App() {
    const [names, setNames] = useState({ name1: '' });
    const [product, setProduct] = useState<Product>();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedFont, setSelectedFont] = useState("ariblk");
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const addToCart = useCartStore(state => state.addToCart);
    const { openCartSidebarView } = useCartSidebarStore();

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
        fetchProduct('6793374553f4c79e4665548f');
    }, []);

    useEffect(() => {
        const initializeCanvas = (canvasElement: HTMLCanvasElement, text: string, left: number, top: number) => {
            const canvas = new Canvas(canvasElement);
            const textObj = new IText(text, {
                left,
                top,
                fill: '#fde68a',
                fontSize: 35,
                fontFamily: selectedFont,
            });
            canvas.add(textObj);
            canvas.renderAll();
            return canvas;
        };

        const canvas1 = canvasRef.current && initializeCanvas(canvasRef.current, names.name1 || 'First Name', 30, 40);

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
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{

                backgroundImage: 'url("https://res.cloudinary.com/dxhs6vjab/image/upload/v1743664964/photo-15_gyd3jd_ffbqvb.avif")',
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
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2"
                                            placeholder="Enter first name"
                                            maxLength={10}
                                        />
                                    </div>

                                </div>
                                <div className="max-w-lg mx-auto mt-10">
                                    <h2 className="text-xl font-semibold text-gray-800">Choose Your Font Family</h2>
                                    <CustomizationButtonTwo selectedFont={selectedFont} handleFontChange={handleFontChange} />
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

