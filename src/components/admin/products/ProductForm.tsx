"use client"
import React, { useState } from 'react';
import { ProductFormData } from '@/lib/types';
import { generateSlug, validateProductForm } from '@/utils/form';
import ProductHeader from './ProductHeader';
import ProductBasicInfo from './ProductBasicInfo';
import ProductGallery from './ProductGallery';
import ProductData from './ProductData';
import ProductPolicy from './ProductPolicy';
import ProductStatus from './ProductStatus';
import ProductVariants from './ProductVariants';
import ProductOffers from './ProductOffers';
import ProductCategories from './ProductCategories';
import ProductMeta from './ProductMeta';

const initialFormData: ProductFormData = {
  title: '',
  slug: '',
  description: '',
  category: '',
  subcategory: '',
  price: 0,
  discountType: 0,
  discountPrice: 0,
  rating: 0,
  stock: 0,
  tags: [],
  sku: '',
  weight: 0,
  availabilityStatus: 'in_stock',
  minimumOrderQuantity: 1,
  dimensions: '',
  warrantyInformation: '',
  shippingInformation: '',
  returnPolicy: '',
  demoVideo: '',
  imgAlt: '',
  status: false,
  ishome: false,
  tranding: false,
  hot: false,
  sale: false,
  new: false,
  isCustomize: false,
  images: [],
  thumbnail: '',
  keywords: '',
  meta_description: '',
  shippingFee: '',
  offer: '',
  isVarientStatus: false,
  varient: []
};

export default function ProductForm() {
  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [image, setImage] = useState<string | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => {
      const updatedData = { ...prev, [name]: value };
      if (name === 'title') {
        updatedData.slug = generateSlug(value);
      }
      return updatedData;
    });
  };

  const handleToggle = (field: keyof ProductFormData) => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const validationErrors = validateProductForm(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    // Clear previous errors
    setErrors([]);

    // Here you would typically send the data to your API
    console.log('Form data:', formData);
    
    // Create FormData for file upload
    const formDataToSend = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (key === 'images') {
        // Handle images separately if needed
        return;
      }
      if (key === 'thumbnail' && value instanceof File) {
        formDataToSend.append('thumbnail', value);
      } else {
        formDataToSend.append(key, JSON.stringify(value));
      }
    });

    try {
      // Add your API call here
      // const response = await fetch('/api/products', {
      //   method: 'POST',
      //   body: formDataToSend,
      // });
      
      // Reset form on success
      setFormData(initialFormData);
      setImage(null);
      
      // Show success message
      alert('Product created successfully!');
    } catch (error) {
      console.error('Error submitting form:', error);
      setErrors(['Failed to create product. Please try again.']);
    }
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data">
      {errors.length > 0 && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-red-800">Please correct the following errors:</h3>
              <ul className="mt-2 text-sm text-red-700 list-disc list-inside">
                {errors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-wrap mt-20 mb-52">
        {/* Left Column */}
        <div className="w-full md:w-8/12 lg:w-8/12 px-4 space-y-6">
          <ProductHeader />
          <ProductBasicInfo formData={formData} handleInputChange={handleInputChange} />
          <ProductGallery formData={formData} setFormData={setFormData} image={image} setImage={setImage} />
          <ProductData formData={formData} handleInputChange={handleInputChange} />
          <ProductPolicy formData={formData} handleInputChange={handleInputChange} />
        </div>

        {/* Right Column */}
        <div className="w-full md:w-4/12 lg:w-4/12 px-4 space-y-6">
          <div className="bg-white text-black p-6 rounded-lg space-x-3 shadow-md shadow-black-300">
            <button 
              type="submit" 
              className="bg-green-500 text-white py-2 px-7 rounded gap-1 hover:bg-green-600 transition"
            >
              Save
            </button>
            <button 
              type="button"
              className="bg-blue-500 text-white py-2 px-7 rounded gap-1 hover:bg-blue-600 transition"
            >
              Save & Edit
            </button>
          </div>
          
          <ProductStatus formData={formData} handleToggle={handleToggle} />
          <ProductVariants formData={formData} setFormData={setFormData} />
          <ProductOffers formData={formData} handleInputChange={handleInputChange} />
          <ProductCategories formData={formData} handleInputChange={handleInputChange} />
          <ProductMeta formData={formData} handleInputChange={handleInputChange} />
        </div>
      </div>
    </form>
  );
}