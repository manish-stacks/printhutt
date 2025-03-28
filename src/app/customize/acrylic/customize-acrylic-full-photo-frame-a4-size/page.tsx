"use client"
import React, { useState, useRef, useEffect } from 'react';
import { BiRefresh, BiUpload } from 'react-icons/bi';
import { BsUpload } from 'react-icons/bs';
import { useCartStore } from '@/store/useCartStore';
import { get_product_by_id } from '@/_services/admin/product';
import { Product } from '@/lib/types/product';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';

export default function App() {
  const [previewImage, setPreviewImage] = useState('');
  const [product, setProduct] = useState<Product>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFont, setSelectedFont] = useState("Barbara-Calligraphy");
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const addToCart = useCartStore(state => state.addToCart);
  const router = useRouter();



    useEffect(() => {
      (async () => {
        try {
          const product = await get_product_by_id('679761185656f753f4d67b07');
          setProduct(product);
        } catch (error) {
          console.error('Error fetching product:', error);
        } 
      })();
    }, []);

 
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
          previewCanvas:previewImage,
          selectedFont,
        };

        const updatedProduct = {
          ...product,
          thumbnail: { ...product.thumbnail, url: previewImage },
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
              <div id="preview-section" className=" relative md:sticky top-0 bg-black/80 rounded-lg p-2 backdrop-blur-sm border border-white/10">
                <div className="aspect-[8/10] rounded-lg overflow-hidden flex items-center justify-center">
                  <div className="relative w-full h-full flex items-center justify-center">
                    <div className="absolute inset-0 flex items-center">
                      {previewImage ? (
                        <div className="w-full h-full relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent"></div>
                          <img
                            src={previewImage}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full border-2 border-dashed border-amber-500/50 rounded-lg flex items-center justify-center bg-black/40">
                          <BiUpload className="w-12 h-12 text-amber-500/70" />
                        </div>
                      )}
                      
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


                <div className='text-gray-600 text-md'>
                  <ul className='list-disc list-inside'>
                    <li>
                      Upload your original high-quality image for the frame.
                    </li>
                    <li>
                      The recommended resolution and size are <span className='text-amber-500'>2,480 x 3,508</span> pixels at 300 DPI for the best results and printing quality.
                    </li>
                  </ul>

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



              </div>
            </div>
          </div>
        </div>
      </div>
    </div >
  );
}

