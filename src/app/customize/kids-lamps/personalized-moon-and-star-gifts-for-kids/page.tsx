'use client'
import React, { useState, useRef } from 'react';
import { BiHeart, BiRefresh, BiUpload } from 'react-icons/bi';
import { BsHearts } from 'react-icons/bs';
import { text } from 'stream/consumers';

function App() {
  const [previewImage, setPreviewImage] = useState('');
  const [selectedShape, setSelectedShape] = useState('single-heart');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [textName, setText] = useState({title:''})

  const textChange = (e) => {
    
    const {name, value} = e.target;
    setText(pre => ({
        ...pre,
        [name]: value
    }))
  }

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
              
                <div className="relative bg-black/80 rounded-lg p-4 backdrop-blur-sm border border-white/10">
                    <div className='img-box'>
                        <img
                            src="https://res.cloudinary.com/dkprths9f/image/upload/v1737713785/2.1_nzb4wy.jpg"
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                        />
                    </div>
                    <div className='text-box absolute top-[72%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center'>
                        <h1 className='text-4xl font-script text-amber-400 mb-2 text-shadow max-[480px]:text-lg'>{textName.title}</h1>
                    </div>
                </div>
            </div>

            {/* Customization Section */}
            <div className="bg-white/95 backdrop-blur-sm rounded-lg p-8 shadow-xl">
              <div className="space-y-6">
                
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold text-gray-800">Enter Name</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">First Name</label>
                    <input
                      type="text"
                      name="title"
                      value={textName.title}
                    //   onChange={(e) => setNames({ ...names, name1: e.target.value })}
                        onChange={textChange}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      placeholder="Enter first name"
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