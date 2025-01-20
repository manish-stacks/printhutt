"use client"
import React, { useState, useRef } from 'react';
import { BiHeart, BiRefresh, BiUpload } from 'react-icons/bi';
import { BsHearts, BsUpload } from 'react-icons/bs';
// import { Heart, Upload, RefreshCw, Heart as Hearts } from 'lucide-react';

function App() {
    const [names, setNames] = useState({ name1: '', name2: '' });
    const [previewImage, setPreviewImage] = useState('');
    const [selectedShape, setSelectedShape] = useState('single-heart');
    const fileInputRef = useRef<HTMLInputElement>(null);

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

    const renderHeartShape = () => {
        switch (selectedShape) {
            case 'double-heart':
                return (
                    <div className="relative">
                        <BiHeart className="w-8 h-8 text-pink-500 mx-auto drop-shadow-glow absolute -left-2" />
                        <BiHeart className="w-8 h-8 text-pink-500 mx-auto drop-shadow-glow absolute -right-2" />
                    </div>
                );
            case 'hearts':
                return <BsHearts className="w-10 h-10 text-pink-500 mx-auto drop-shadow-glow" />;
            default:
                return <BiHeart className="w-8 h-8 text-pink-500 mx-auto drop-shadow-glow" />;
        }
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&q=80&w=2000")',
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
                            <div className="absolute inset-0 bg-gradient-to-b from-amber-100/20 to-amber-500/20 rounded-lg blur-xl"></div>
                            <div className="relative bg-black/80 rounded-lg p-8 backdrop-blur-sm border border-white/10">
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
                                            <div className="flex-1 text-center">
                                                <h2 className="text-4xl font-script text-amber-200 mb-2 text-shadow">
                                                    {names.name1 || 'First Name'}
                                                </h2>
                                                <div className="h-12 flex items-center justify-center">
                                                    {renderHeartShape()}
                                                </div>
                                                <h2 className="text-4xl font-script text-amber-200 text-shadow">
                                                    {names.name2 || 'Second Name'}
                                                </h2>
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
                                    <h3 className="text-xl font-semibold text-gray-800">Choose Heart Style</h3>
                                    <div className="grid grid-cols-3 gap-4">
                                        <button
                                            onClick={() => setSelectedShape('single-heart')}
                                            className={`p-4 rounded-lg border-2 transition-all ${selectedShape === 'single-heart'
                                                    ? 'border-amber-500 bg-amber-50'
                                                    : 'border-gray-200 hover:border-amber-200'
                                                }`}
                                        >
                                            <BiHeart className="w-8 h-8 text-pink-500 mx-auto" />
                                            <span className="text-sm mt-2 block text-gray-600">Single Heart</span>
                                        </button>
                                        <button
                                            onClick={() => setSelectedShape('double-heart')}
                                            className={`p-4 rounded-lg border-2 transition-all ${selectedShape === 'double-heart'
                                                    ? 'border-amber-500 bg-amber-50'
                                                    : 'border-gray-200 hover:border-amber-200'
                                                }`}
                                        >
                                            <div className="relative h-8 flex items-center justify-center">
                                                <BiHeart className="w-6 h-6 text-pink-500 absolute -left-1" />
                                                <BiHeart className="w-6 h-6 text-pink-500 absolute -right-1" />
                                            </div>
                                            <span className="text-sm mt-2 block text-gray-600">Double Hearts</span>
                                        </button>
                                        <button
                                            onClick={() => setSelectedShape('hearts')}
                                            className={`p-4 rounded-lg border-2 transition-all ${selectedShape === 'hearts'
                                                    ? 'border-amber-500 bg-amber-50'
                                                    : 'border-gray-200 hover:border-amber-200'
                                                }`}
                                        >
                                            <BsHearts className="w-8 h-8 text-pink-500 mx-auto" />
                                            <span className="text-sm mt-2 block text-gray-600">Multiple Hearts</span>
                                        </button>
                                    </div>
                                </div>

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
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Second Name</label>
                                        <input
                                            type="text"
                                            value={names.name2}
                                            onChange={(e) => setNames({ ...names, name2: e.target.value })}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                                            placeholder="Enter second name"
                                        />
                                    </div>
                                </div>

                                <button className="w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg hover:from-amber-600 hover:to-amber-700 transition-colors font-semibold shadow-lg">
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;