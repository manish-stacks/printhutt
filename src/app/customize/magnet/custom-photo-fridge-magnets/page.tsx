"use client"
import { get_product_by_id } from '@/_services/admin/product';
import LoadingSpinner from '@/components/LoadingSpinner';
import { formatCurrency } from '@/helpers/helpers';
import { Product } from '@/lib/types/product';
import { useCartStore } from '@/store/useCartStore';
import { useRouter } from 'next/navigation';
import React, { useState, useCallback, ChangeEvent, useEffect } from 'react';
import { BiMinus, BiPlus } from 'react-icons/bi';
import { toast } from 'react-toastify';

interface ShapeOption {
    id: string;
    name: string;
    className: string;
}

interface Position {
    x: number;
    y: number;
}

const shapes: ShapeOption[] = [
    { id: 'rectangle', name: 'Rectangle', className: 'rounded-lg' },
    { id: 'rhombus', name: 'Rhombus', className: 'rhombus-shape' },
    { id: 'pentagon', name: 'Pentagon', className: 'pentagon-shape' },
    { id: 'hexagon', name: 'Hexagon', className: 'hexagon-shape' },
    { id: 'heptagon', name: 'Heptagon', className: 'heptagon-shape' },
    { id: 'octagon', name: 'Octagon', className: 'octagon-shape' },
    { id: 'nonagon', name: 'Nonagon', className: 'nonagon-shape' },
    { id: 'bevel', name: 'Bevel', className: 'bevel-shape' },
    { id: 'rabbet', name: 'Rabbet', className: 'rabbet-shape' },
    { id: 'circle', name: 'Circle', className: 'circle-shape' },
    { id: 'ellipse', name: 'Ellipse', className: 'ellipse-shape' },
    // { id: 'star', name: 'Star', className: 'star-shape' },
];

export default function App() {
    const [selectedShape, setSelectedShape] = useState<string>('rectangle');
    const [previewImage, setPreviewImage] = useState<string>('https://res.cloudinary.com/dkprths9f/image/upload/v1742471595/image-preview_cvtp97.png');
    const [isDragging, setIsDragging] = useState(false);
    const [imagePosition, setImagePosition] = useState<Position>({ x: 0, y: 0 });
    const [isDraggingImage, setIsDraggingImage] = useState(false);
    const [dragStart, setDragStart] = useState<Position>({ x: 0, y: 0 });
    const [imageScale, setImageScale] = useState(1);
    const [selectedSize, setSelectedSize] = useState('3.5x3.5');
    const [product, setProduct] = useState<Product>();
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const addToCart = useCartStore(state => state.addToCart);
    const router = useRouter();
    const [productPrice, setProductPrice] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const fetchedProduct = await get_product_by_id("67da79a8fdc9b101013ca240");
                setProduct(fetchedProduct);
                setProductPrice(fetchedProduct?.varient[0].price);
            } catch {
                console.error("Error fetching product.");
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const handleDragOver = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    }, []);

    const handleDragLeave = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);

        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewImage(event.target?.result as string);
                setImagePosition({ x: 0, y: 0 });
                setImageScale(1.2);
            };
            reader.readAsDataURL(file);
        }
    }, []);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setPreviewImage(event.target?.result as string);
                setImagePosition({ x: 0, y: 0 });
                setImageScale(1.2);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleImageMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setIsDraggingImage(true);
        setDragStart({
            x: e.clientX - imagePosition.x,
            y: e.clientY - imagePosition.y
        });
    };

    const handleImageMouseMove = (e: React.MouseEvent) => {
        if (!isDraggingImage) return;

        const newX = e.clientX - dragStart.x;
        const newY = e.clientY - dragStart.y;

        const maxDrag = 100;
        const boundedX = Math.max(Math.min(newX, maxDrag), -maxDrag);
        const boundedY = Math.max(Math.min(newY, maxDrag), -maxDrag);

        setImagePosition({
            x: boundedX,
            y: boundedY
        });
    };

    const handleImageMouseUp = () => {
        setIsDraggingImage(false);
    };

    const handleMouseLeave = () => {
        setIsDraggingImage(false);
    };

    const increaseScale = () => {
        setImageScale(prev => Math.min(prev + 0.1, 2.0)); // Max 200%
    };

    const decreaseScale = () => {
        setImageScale(prev => Math.max(prev - 0.1, 1.0)); // Min 100%
    };

    const handleSizeChange = (size: string, price: number) => {
        setSelectedSize(size);
        setProductPrice(price);
    }

    const handleAddToCart = async () => {
        if (!previewImage) {
            toast.error('Please upload a preview image.');
            return;
        }
        try {
            setIsAddingToCart(true);

            if (product) {
                const custom_data = {
                    previewImage,
                    variant: selectedSize,
                    shapeName: selectedShape,
                };

                const updatedProduct = {
                    ...product,
                    thumbnail: { ...product.thumbnail, url: previewImage },
                    price: productPrice,
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

    if (loading) {
        return <LoadingSpinner />
    }

    return (
        <div className="min-h-screen overflow-hidden bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: 'url("https://res.cloudinary.com/dkprths9f/image/upload/v1737650777/photo-1506744038136-46273834b3fb_hq8v7q.avif")',
            }}>
            <section className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
                    <h1 className="text-2xl font-bold text-gray-900">Photo Magnet Designer</h1>
                </div>
            </section>
            <section className="min-h-screen bg-black/30 py-8">
                <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Preview Area */}
                        <div className="bg-white p-4 rounded-lg shadow-lg">
                            <div className="aspect-[3/3] bg-gray-200 rounded-lg flex items-center justify-center relative">
                                <div
                                    className={`w-60 h-60 bg-white shadow-lg overflow-hidden ${shapes.find(s => s.id === selectedShape)?.className}`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onMouseMove={handleImageMouseMove}
                                    onMouseUp={handleImageMouseUp}
                                    onMouseLeave={handleMouseLeave}
                                >
                                    <div
                                        className="relative w-full h-full cursor-move"
                                        style={{
                                            transform: `translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                                        }}
                                        onMouseDown={handleImageMouseDown}
                                    >
                                        <img
                                            src={previewImage}
                                            alt="Preview"
                                            className="object-cover absolute -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
                                            style={{
                                                width: `${imageScale * 100}%`,
                                                height: `${imageScale * 100}%`,
                                            }}
                                            draggable={false}
                                        />
                                    </div>
                                    {isDragging && (
                                        <div className="absolute inset-0 bg-blue-500/20 border-2 border-dashed border-blue-500 rounded-lg flex items-center justify-center">
                                            <p className="text-blue-700 font-medium">Drop image here</p>
                                        </div>
                                    )}
                                </div>
                                <p className="absolute bottom-3 left-0 text-sm text-gray-600 px-2 hidden md:block">
                                    Click and drag to adjust image position
                                </p>

                                {/* Image Scale Controls */}
                                <div className="mt-4 px-4 flex items-center justify-center gap-4 absolute bottom-2 right-0">
                                    <button
                                        onClick={decreaseScale}
                                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                        disabled={imageScale <= 1.0}
                                    >
                                        <BiMinus className="w-5 h-5" />
                                    </button>
                                    <span className="text-sm font-medium text-rose-700">
                                        {Math.round(imageScale * 100)}%
                                    </span>
                                    <button
                                        onClick={increaseScale}
                                        className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                                        disabled={imageScale >= 2.0}
                                    >
                                        <BiPlus className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Controls */}
                        <div className="space-y-2">
                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-lg font-semibold mb-4">Choose Your Shape</h2>
                                <div className="grid grid-cols-4 sm:grid-cols-3 md:grid-cols-6 gap-8">
                                    {shapes.map((shape) => (
                                        <button
                                            key={shape.id}
                                            onClick={() => setSelectedShape(shape.id)}
                                            className={`max-[567px]:p-0 max-[567px]:border-0 py-2 rounded-lg border-2 flex flex-col items-center gap-2 transition-all
                                                ${selectedShape === shape.id
                                                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                    : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                                                }`}
                                        >
                                            <div className={`w-8 h-8 bg-slate-500 ${shape.className}`}></div>
                                            <span className="text-[0.6rem] hidden md:block">{shape.name}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="bg-white p-6 rounded-lg shadow-lg">
                                <h2 className="text-lg font-semibold mb-4">Upload Your Photo</h2>
                                <div
                                    className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors
                                        ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                >
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                        id="photo-upload"
                                        onChange={handleFileChange}
                                    />
                                    <label
                                        htmlFor="photo-upload"
                                        className="cursor-pointer inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
                                    >
                                        Choose Photo
                                    </label>
                                    <p className="mt-2 text-sm text-gray-600">or drag and drop your image here</p>
                                </div>
                            </div>

                            <div className="bg-white p-8 rounded-lg shadow-xl transition-all hover:shadow-2xl">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <h2 className="text-xl font-semibold text-gray-800">Choose Size</h2>
                                    </div>
                                    <div className="flex space-x-4">
                                        {product?.varient.map((size, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleSizeChange(size.size, size.price)}
                                                className={`px-4 py-2 rounded-full border ${selectedSize === size.size ? 'border-blue-500 bg-blue-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'} focus:outline-none focus:ring-2 focus:ring-blue-500 active:bg-gray-200 transition duration-150 ease-in-out`}
                                            >
                                                {size.size}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleAddToCart}
                                disabled={isAddingToCart}
                                className={`w-full py-3 rounded-lg font-semibold shadow-lg ${isAddingToCart
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-colors'
                                    }`}
                            >
                                {isAddingToCart ? 'Adding to Cart...' : `Add to Cart - ${product && product.discountType === 'percentage'
                                    ? formatCurrency(productPrice - (productPrice * product.discountPrice) / 100)
                                    : product && formatCurrency(productPrice - product.discountPrice)}`}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}