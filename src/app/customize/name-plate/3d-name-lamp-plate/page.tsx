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
import { BiDownload } from 'react-icons/bi';
import { RiShoppingBag2Line } from 'react-icons/ri';

export default function App() {
    const [names, setNames] = useState({ name1: '' });
    const [product, setProduct] = useState<Product>();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [selectedFont, setSelectedFont] = useState("Barbara-Calligraphy");
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [selectedColor, setSelectedColor] = useState('White');
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
        fetchProduct('67934192624b716ca19da403');
    }, []);

    useEffect(() => {
        const initializeCanvas = (canvasElement: HTMLCanvasElement, text: string) => {
            const canvas = new Canvas(canvasElement, {
                width: 534,
                height: 145,
                renderOnAddRemove: true,
                selection: false
            });

            const textObj = new IText(text, {
                fontSize: 44,
                fontFamily: selectedFont,
                fill: selectedColor === 'White' ? '#fff' : '#fde68a',
                textAlign: 'center',
                left: canvas.width / 2,
                top: canvas.height / 2,
                originX: 'center',
                originY: 'center',
                selectable: false
            });

            canvas.add(textObj);
            canvas.renderAll();
            return canvas;
        };

        const canvas1 = canvasRef.current && initializeCanvas(canvasRef.current, names.name1 || 'Preview');

        return () => {
            canvas1?.dispose();
        };
    }, [names, selectedFont, selectedColor]);

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

    const changeColor = (color: string) => {
        setSelectedColor(color);
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
                    selectedColor,
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
                backgroundImage: 'url("https://res.cloudinary.com/dxhs6vjab/image/upload/v1743664964/photo-15_gyd3jd_ffbqvb.avif")',
            }}
        >
            <div className="min-h-screen bg-black/40 backdrop-blur-sm py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-script text-white text-center mb-8 max-[567px]:text-lg">
                        Create Your Memory Light
                    </h1>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Preview Section */}
                        <div className="relative">
                            <div id="preview-section" className="relative md:sticky top-0 bg-black rounded-lg p-8 border border-[#fde68a6b]">
                                <div className="aspect-[16/9] rounded-lg overflow-hidden flex items-center justify-center">
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <canvas ref={canvasRef} width="534" height="145" className="w-full h-full" />
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
                                            maxLength={20}
                                        />
                                    </div>
                                </div>
                                <div className="max-w-lg mx-auto mt-10">
                                    <FontPicker selectedFont={selectedFont} onFontChange={handleFontChange} />
                                </div>

                                <div className="list-group-item mb-10 mt-10">
                                    <div className="flex flex-wrap">
                                        <div className="w-full md:w-1/2 mb-4 md:mb-0">
                                            <label className="text-gray-800 text-lg font-semibold">Light Colour</label>
                                            <div className="radio-itens mr-[20px]" onClick={() => changeColor('White')}>
                                                <input
                                                    type="radio"
                                                    id="address"
                                                    name="addres"
                                                    className="w-auto mr-[2px] p-[10px]"
                                                    checked={selectedColor === 'White'}
                                                    onChange={() => changeColor('White')}
                                                />
                                                <label
                                                    className="relative font-normal text-[14px] text-[#686e7d] pl-[26px] cursor-pointer leading-[16px] inline-block tracking-[0]"
                                                >
                                                    White
                                                </label>
                                            </div>

                                            <div className="radio-itens mr-[20px]" onClick={() => changeColor('Warm White')}>
                                                <input
                                                    type="radio"
                                                    id="address"
                                                    name="addres"
                                                    className="w-auto mr-[2px] p-[10px]"
                                                    checked={selectedColor === 'Warm White'}
                                                    onChange={() => changeColor('Warm White')}
                                                />
                                                <label
                                                    className="relative font-normal text-[14px] text-[#686e7d] pl-[26px] cursor-pointer leading-[16px] inline-block tracking-[0]"
                                                >
                                                    Warm White
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <div className="flex gap-2">
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

