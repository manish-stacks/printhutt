"use client"
import { get_product_by_id } from '@/_services/admin/product';
import { formatCurrency } from '@/helpers/helpers';
import { Product } from '@/lib/types/product';
import { useCartStore } from '@/store/useCartStore';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import { BsUpload } from 'react-icons/bs';
import { RiCloseLargeFill } from 'react-icons/ri';

interface ImagePreview {
    id: string;
    url: string;
}

export default function App() {
    const [previews, setPreviews] = useState<ImagePreview[]>([]);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [product, setProduct] = useState<Product>();
    const addToCart = useCartStore(state => state.addToCart);
    const router = useRouter();

    useEffect(() => {
        (async () => {
            try {
                const product = await get_product_by_id('67dbd1ec8c6a18777f77f261');
                setProduct(product);
            } catch (error) {
                console.error('Error fetching product:', error);
            }
        })();
    }, []);
    const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (!files) return;

        Array.from(files).slice(0, 4 - previews.length).forEach(file => {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviews(prev => [...prev, {
                    id: crypto.randomUUID(),
                    url: e.target?.result as string
                }]);
            };
            reader.readAsDataURL(file);
        });

        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const removeImage = (id: string) => {
        setPreviews(prev => prev.filter(preview => preview.id !== id));
    };

    const handleAddToCart = async () => {
        if (previews.length < 4) {
            alert('Please upload at least 4 images before proceeding.');
            return;
        }

        try {
            setIsAddingToCart(true);
            // Simulate API call
            if (product) {
                const custom_data = {
                    previewImage: previews[0].url,
                    previewImageTwo: previews[1].url,
                    previewImageThree: previews[2].url,
                    previewImageFour: previews[3].url,
                };

                const updatedProduct = {
                    ...product,
                    custom_data,
                };

                setProduct(updatedProduct);

                addToCart(updatedProduct, 1);
                router.push('/checkout');
                console.log("Product added to cart:", updatedProduct);
                return;
            }

            alert('Images have been added to your cart.');
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
                    <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                        <div className="relative">
                            <div className="aspect-[650/800] rounded-lg overflow-hidden flex items-center justify-center">
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <video
                                        autoPlay
                                        loop
                                        muted
                                        playsInline
                                        className="w-[650px] h-auto rounded-lg object-cover"
                                        preload="none"
                                    >
                                        <source src="https://cloudify.printhutt.com/video/cube.mp4" type="video/mp4" />
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-xl">
                            <div className="max-w-3xl mx-auto">
                                <h1 className="text-3xl font-bold text-gray-800 mb-8">Image Upload</h1>

                                <div className="bg-white p-6 rounded-lg shadow-md">
                                    {previews.length < 4 && (
                                        <div className="mb-6">
                                            <input
                                                type="file"
                                                ref={fileInputRef}
                                                onChange={handleFileSelect}
                                                accept="image/*"
                                                multiple
                                                className="hidden"
                                                id="file-upload"
                                            />
                                            <label
                                                htmlFor="file-upload"
                                                className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                                            >
                                                <BsUpload className="w-12 h-12 text-gray-400 mb-2" />
                                                <p className="text-sm text-gray-600">Click to upload images</p>
                                                <p className="text-xs text-gray-500 mt-1">
                                                    {4 - previews.length} {4 - previews.length === 1 ? 'slot' : 'slots'} remaining
                                                </p>
                                            </label>
                                        </div>
                                    )}

                                    {previews.length > 0 && (
                                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                            {previews.map((preview) => (
                                                <div key={preview.id} className="relative group">
                                                    <img
                                                        src={preview.url}
                                                        alt="Preview"
                                                        className="h-30 w-30 object-cover rounded-lg"
                                                    />
                                                    <button
                                                        onClick={() => removeImage(preview.id)}
                                                        className="absolute top-2 right-2 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                    >
                                                        <RiCloseLargeFill className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-6 mt-3">
                                <div className='text-gray-600 text-md'>
                                    <ul className='list-disc list-inside max-[560px]:text-sm'>
                                        <li>
                                            Upload your original high-quality image for the frame.
                                        </li>
                                        <li>
                                            The recommended resolution and size are <span className='text-amber-500'>250 x 250</span> pixels at 300 DPI for the best results and printing quality.
                                        </li>
                                    </ul>
                                </div>

                                <button
                                    onClick={handleAddToCart}
                                    disabled={isAddingToCart}
                                    className={`w-full py-3 rounded-lg font-semibold shadow-lg ${isAddingToCart
                                        ? 'bg-gray-400 cursor-not-allowed'
                                        : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-colors'
                                        }`}
                                >
                                    {isAddingToCart
                                        ? 'Adding to Cart...'
                                        : product && product.price !== undefined && product.discountType
                                            ? `Add to Cart - ${formatCurrency(
                                                product.discountType === 'percentage'
                                                    ? product.price - (product.price * (product.discountPrice ?? 0)) / 100
                                                    : product.price - (product.discountPrice ?? 0)
                                            )}`
                                            : 'Add to Cart'}

                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}