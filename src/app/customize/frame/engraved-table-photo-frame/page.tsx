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
import LoadingSpinner from '@/components/LoadingSpinner';

export default function App() {
    const [names, setNames] = useState({ name1: '' });
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [product, setProduct] = useState<Product>();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    // const [previewCanvas, setPreviewCanvas] = useState<string>('');
    const [selectedFont, setSelectedFont] = useState("Barbara-Calligraphy");
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const addToCart = useCartStore(state => state.addToCart);
    const router = useRouter();
    const [selectedColor, setSelectedColor] = useState('White');
    const [lineHeight, setLineHeight] = useState(1.5);
    const [fontSize, setFontSize] = useState(28); // New state for font size


    useEffect(() => {
        setLoading(true);
        (async () => {
            try {
                const product = await get_product_by_id('679724965656f753f4d67881');
                setProduct(product);
            } catch (error) {
                console.error('Error fetching product:', error);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    useEffect(() => {
        const initializeCanvas = (canvasElement: HTMLCanvasElement, text: string, left: number, top: number) => {
            const canvas = new Canvas(canvasElement);
            const textObj = new IText(text, {
                left,
                top,
                fill: selectedColor == 'White' ? '#fff' : '#fde68a',
                fontSize: fontSize, // Use font size state
                fontFamily: selectedFont,
                lineHeight: lineHeight,
            });
            canvas.add(textObj);
            canvas.renderAll();
            return canvas;
        };

        const canvas1 = canvasRef.current && initializeCanvas(canvasRef.current, names.name1 || 'Preview', 80, 100);

        return () => {
            canvas1?.dispose();
        };
    }, [names, selectedFont, selectedColor, lineHeight, fontSize]); // Add fontSize to dependencies

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

    const changeColor = (color: string) => {
        setSelectedColor(color);
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
            toast.error('Please enter a name.');
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
                    previewImage,
                    previewCanvas,
                    selectedFont,
                    lineHeight,
                    fontSize,
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


    if (loading) {
        return <LoadingSpinner />
    }
    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: 'url("https://res.cloudinary.com/dkprths9f/image/upload/v1737650777/photo-1506744038136-46273834b3fb_hq8v7q.avif")',
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
                            <div id="preview-section" className=" relative md:sticky top-0 bg-black/80 rounded-lg p-8 backdrop-blur-sm border border-white/10">
                                <div className="aspect-[16/9] rounded-lg overflow-hidden flex items-center justify-center">
                                    <div className="relative w-full h-full flex items-center justify-center">
                                        <div className="absolute inset-0 flex items-center">
                                            {previewImage ? (
                                                <div className="w-1/3 h-full relative mr-4">
                                                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
                                                    <img
                                                        src={previewImage}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                </div>
                                            ) : (
                                                <div className="w-1/3 h-full mr-4 border-2 border-dashed border-amber-500/50 rounded-lg flex items-center justify-center bg-black/40">
                                                    <BiUpload className="w-12 h-12 text-amber-500/70" />
                                                </div>
                                            )}
                                            <div className="flex-1 text-center ">
                                                <div className="text-4xl font-script text-amber-200 mb-2 text-shadow">
                                                    <canvas ref={canvasRef} width={320} height={400} className="w-full h-full"></canvas>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>



                        {/* Customization Section */}
                        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-xl">
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
                                    <div className=' max-h-[250px] overflow-auto'>
                                        <CustomizationButton selectedFont={selectedFont} handleFontChange={handleFontChange} />
                                    </div>
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

