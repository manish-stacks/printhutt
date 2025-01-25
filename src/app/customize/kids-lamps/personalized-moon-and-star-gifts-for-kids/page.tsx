'use client'
import { get_product_by_id } from '@/_services/admin/product';
import { Product } from '@/lib/types/product';
import React, { useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Canvas, IText } from 'fabric';
import { useCartStore } from '@/store/useCartStore';
import html2canvas from 'html2canvas';
import { useRouter } from 'next/navigation';
import { CustomizationButtonTwo } from '@/components/CustomizationButton';

function App() {
  const [names, setNames] = useState({ name1: '' });
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [selectedFont, setSelectedFont] = useState("orangina_demo");
  const [product, setProduct] = useState<Product>();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const addToCart = useCartStore(state => state.addToCart);
  const router = useRouter();

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
    fetchProduct('67934b59624b716ca19da4cb');
  }, []);

  useEffect(() => {
    const initializeCanvas = (canvasElement: HTMLCanvasElement, text: string, left: number, top: number) => {
      const canvas = new Canvas(canvasElement);
      const textObj = new IText(text, {
        left,
        top,
        fill: '#FEEDBF',
        fontSize: 32,
        width: 220,
        height: 100,
        fontFamily: selectedFont,
      });
      canvas.add(textObj);
      canvas.renderAll();
      return canvas;
    };

    const canvas1 = canvasRef.current && initializeCanvas(canvasRef.current, names.name1 || 'First Name', 20, 40);

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
      toast.error('Please enter the name.');
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

            <div className="relative rounded-lg" >
              <div id='preview-section' className="relative  rounded-lg p-2 backdrop-blur-sm border border-white/10">
                  <div className='img-box'>
                    <img
                      src="https://res.cloudinary.com/dkprths9f/image/upload/v1737713785/2.1_nzb4wy.jpg"
                      alt="Preview"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                  <div className='text-box absolute top-[72%] left-[48%] transform -translate-x-1/2 -translate-y-1/2 text-center'>
                    <canvas ref={canvasRef} width="220" height="100" className="w-full h-full"></canvas>
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
                      value={names.name1}
                      onChange={(e) => setNames({ ...names, name1: e.target.value })}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-amber-500 focus:ring-amber-500"
                      placeholder="Enter name"
                    />
                  </div>

                </div>
                <div className="max-w-lg mx-auto mt-10">
                  <h2 className="text-xl font-semibold text-gray-800">Choose Your Font</h2>
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

export default App;