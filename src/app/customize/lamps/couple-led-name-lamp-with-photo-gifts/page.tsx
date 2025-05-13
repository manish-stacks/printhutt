"use client"
import Image from 'next/image';
import React, { useState, useRef, useEffect } from 'react';
import { BiDownload, BiRefresh, BiUpload } from 'react-icons/bi';
import { BsUpload } from 'react-icons/bs';
import { Canvas, IText } from 'fabric';
import { useCartStore } from '@/store/useCartStore';
import html2canvas from 'html2canvas';
import { get_product_by_id } from '@/_services/admin/product';
import { Product } from '@/lib/types/product';
import { toast } from 'react-toastify';
import LoadingSpinner from '@/components/LoadingSpinner';
import useCartSidebarStore from '@/store/useCartSidebarStore';
import { FontPicker } from '@/components/neon/FontPicker';
import { RiShoppingBag2Line } from 'react-icons/ri';

export default function Page() {
    const [names, setNames] = useState({ name1: '', name2: '' });
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [product, setProduct] = useState<Product>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const canvasRefTwo = useRef<HTMLCanvasElement>(null);
    const [selectedFont, setSelectedFont] = useState("Barbara-Calligraphy");
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const addToCart = useCartStore(state => state.addToCart);
    const { openCartSidebarView } = useCartSidebarStore();


    const fetchProduct = async (id: string) => {
        try {
            const product = await get_product_by_id(id);
            setProduct(product);
        } catch (error) {
            console.error('Error fetching product:', error);
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        setLoading(true);
        fetchProduct('678e356cdc2bb80cb1dc2cb4');
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
        const canvas2 = canvasRefTwo.current && initializeCanvas(canvasRefTwo.current, names.name2 || 'Second Name', 70, 30);

        return () => {
            canvas1?.dispose();
            canvas2?.dispose();
        };
    }, [names, selectedFont]);

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
        if (names.name1 === '' || names.name2 === '') {
            toast.error('Please enter both names.');
            return;
        }
        if (!previewImage) {
            toast.error('Please upload a preview image.');
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
                    name2: names.name2,
                    previewImage,
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


    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <div
            className="min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: 'url("https://s3.ap-south-1.amazonaws.com/printhutt.dev.bucket/others/photo-1506744038136-46273834b3fb_hq8v7q_xgcbbw.avif")',
            }}
        >
            <div className="min-h-screen bg-black/40 py-8">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-script text-white text-center mb-8">
                        Create Your Memory Light
                    </h1>

                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        {/* Preview Section */}
                        <div className="relative">
                            {/* <div className="absolute inset-0 bg-gradient-to-b from-amber-100/20 to-amber-500/20 rounded-lg blur-xl"></div> */}
                            <div id="preview-section" className=" relative md:sticky top-0 bg-black/80 rounded-lg p-8 border border-white/10">
                                <div className="aspect-[16/9] rounded-lg overflow-hidden flex items-center justify-center">
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <div className="absolute inset-0 flex items-center">
                                            {previewImage ? (
                                                <div className="w-1/3 h-full relative mr-4">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
                                                    <Image
                                                        fill
                                                        src={previewImage}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-1/3 h-full border-2 border-dashed border-amber-500/50 rounded-lg flex items-center justify-center bg-black/40">
                                                    <BiUpload className="w-12 h-12 text-amber-500/70" />
                                                </div>
                                            )}
                                            <div className="flex-1 w-2/3 text-center items-center justify-center h-full">
                                                <div className="text-4xl font-script h-[40%] text-amber-200 mb-2 text-shadow">
                                                    {/* {names.name1 || 'First Name'} */}
                                                    <canvas ref={canvasRef} className="w-full h-full"></canvas>
                                                </div>
                                                <div className="flex items-center h-[20%] justify-center">
                                                    <Image
                                                        src="https://s3.ap-south-1.amazonaws.com/printhutt.dev.bucket/others/heart-2_kvhmjm_updrxw.png"
                                                        alt="heart"
                                                        width={48}
                                                        height={48}
                                                        className="w-12 h-12 text-amber-500/70" />
                                                </div>
                                                <div className="text-4xl font-script h-[40%] text-amber-200 text-shadow">
                                                    {/* {names.name2 || 'Second Name'} */}
                                                    <canvas ref={canvasRefTwo} className="w-full h-full"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        {/* Customization Section */}
                        <div className="bg-white/95 rounded-lg p-8 shadow-xl">
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
                                        <label className="block text-sm font-medium text-gray-700">First Name</label>
                                        <input
                                            type="text"
                                            value={names.name1}
                                            onChange={(e) => setNames({ ...names, name1: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2"
                                            placeholder="Enter first name"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Second Name</label>
                                        <input
                                            type="text"
                                            value={names.name2}
                                            onChange={(e) => setNames({ ...names, name2: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500 p-2"
                                            placeholder="Enter second name"
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

