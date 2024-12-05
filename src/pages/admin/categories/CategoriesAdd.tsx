'use client'
import React, { useState, useCallback } from 'react';
import { RiLoader2Line } from 'react-icons/ri';

interface CategoryFormData {
  name: string;
  description: string;
  imageUrl: string;
}


const CategoriesAdd = () => {

  const [formData, setFormData] = useState<CategoryFormData>({
    name: '',
    description: '',
    imageUrl: '',
  });

  const [previewUrl, setPreviewUrl] = useState<string>();
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    setIsUploading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsUploading(false);
  }, []);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Form submitted:', formData);
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSubmitting(false);
  }, [formData]);


  return (
    <>
      <div className="max-w-10xl mx-auto lg:px-10 py-20">
        <form className="space-y-6 bg-white p-6 rounded-lg shadow-sm">
          <div className="space-y-2">
            <h2 className="text-2xl font-bold text-gray-900">Add New Category</h2>
            <p className="text-gray-600">
              Create a new category with an image and description.
            </p>
          </div>
          <div className="space-y-6">
            <div className="space-y-5">

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Category Image
                </label>
                <div className="flex flex-col sm:flex-row gap-4 items-start">
                  <div className="flex-1">
                    <div className="flex items-center justify-center w-44 h-40 bg-gray-100 rounded-lg">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width={24}
                        height={24}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="lucide lucide-image w-12 h-12 text-gray-400"
                      >
                        <rect width={18} height={18} x={3} y={3} rx={2} ry={2} />
                        <circle cx={9} cy={9} r={2} />
                        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                    </div>
                    <p>Image Size Should Be 60 x 60.</p>
                  </div>
                </div>
              </div>


              <div>
                <input
                  className="flex h-10 w-[400px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Parent Category
                </label>
                <select
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  id="name"
                  name="name"
                  required
                  defaultValue=""
                >
                  <option value="dummy">dummy</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category Name
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter category name"
                  defaultValue=""
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Category Slug
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter category name"
                  defaultValue=""
                />
              </div>
              <div>
                <label
                  htmlFor="description"
                  className="block text-sm font-medium text-gray-700"
                >
                  Description
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  id="description"
                  name="description"
                  type="text"
                  placeholder="Enter category description"
                  defaultValue=""
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Meta Keywords
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter Meta Keywords"
                  defaultValue=""
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Meta Description
                </label>
                <textarea
                  className="flex  w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  id="name"
                  name="name"
                  rows={5}
                  required
                  placeholder="Enter Meta Description"
                  defaultValue=""
                >
                </textarea>

              </div>


              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Serial *
                </label>
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder="Enter Serial"
                  defaultValue=""
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting || isUploading}
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600"
            >
              {(isSubmitting || isUploading) && (
                <RiLoader2Line className="mr-2 h-4 w-4 animate-spin" />
              )}
              {isSubmitting ? 'Creating Category...' : 'Create Category'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default CategoriesAdd