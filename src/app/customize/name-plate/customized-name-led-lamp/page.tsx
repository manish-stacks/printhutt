"use client"
import React, { useState, useRef, useEffect } from 'react';
import { Canvas, IText } from 'fabric';
import { useCartStore } from '@/store/useCartStore';
import html2canvas from 'html2canvas';
import { get_product_by_id } from '@/_services/admin/product';
import { Product } from '@/lib/types/product';
import { toast } from 'react-toastify';
import useCartSidebarStore from '@/store/useCartSidebarStore';
import { FontPicker } from '@/components/neon/FontPicker';
import { RiShoppingBag2Line } from 'react-icons/ri';
import { BiDownload } from 'react-icons/bi';
import Image from 'next/image';

export default function Page() {
    const [names, setNames] = useState({ name1: '' });
    const [product, setProduct] = useState<Product>();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedFont, setSelectedFont] = useState("Barbara-Calligraphy");
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [selectedDesign, setSelectedDesign] = useState('cutout');
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

                backgroundImage: 'url("https://s3.ap-south-1.amazonaws.com/printhutt.dev.bucket/others/photo-15_gyd3jd_ffbqvb.avif")',
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
                                        />
                                    </div>

                                </div>
                                <div className="max-w-lg mx-auto mt-10">
                                    <FontPicker selectedFont={selectedFont} onFontChange={handleFontChange} />
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
                                                    <Image
                                                        width={200}
                                                        height={100}
                                                        src="https://s3.ap-south-1.amazonaws.com/printhutt.dev.bucket/others/product/510341279_20240810_152907_nioxer_bm8dwt.jpg"
                                                        alt="cutout"
                                                        className="h-[96px] w-[170px] object-cover rounded-xl"
                                                    />
                                                </div>
                                            )}
                                            {selectedDesign === 'rectangle' && (
                                                <div id="rectangleDesign">
                                                    <Image
                                                        width={200}
                                                        height={100}    
                                                        src="https://s3.ap-south-1.amazonaws.com/printhutt.dev.bucket/others/product/rect_n4e399_ets0sv.jpg"
                                                        alt="rectangle"
                                                        className="h-[96px] w-[170px] object-cover rounded-xl"
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex gap-2" >
                                        <button
                                            onClick={() => handleAddToCart()}
                                            disabled={isAddingToCart}
                                            className="flex-1 bg-yellow-400 text-slate-700 py-3 px-6 max-[567px]:px-1 rounded-md font-medium hover:bg-yellow-500 flex items-center justify-center gap-2">
                                            <RiShoppingBag2Line className="w-5 h-5" /> {isAddingToCart ? 'Adding to Cart...' : 'Add to Cart'}
                                        </button>
                                        <button onClick={() => handleDownload()} className="px-6 py-3 border border-gray-300 rounded-md hover:bg-gray-50">
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

