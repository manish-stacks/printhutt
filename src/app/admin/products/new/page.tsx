"use client"
import { get_parent_categories } from '@/_services/admin/category';
import { get_all_offer } from '@/_services/admin/offer';
import { get_all_return } from '@/_services/admin/return-policy';
import { get_all_shipping } from '@/_services/admin/shipping';
import { get_all_warranty } from '@/_services/admin/warranty';
import { ImageUpload } from '@/components/admin/products/ImageUpload';
import { generateSlug } from '@/helpers/helpers';
import { CategoryFormData, Offer, ProductFormData, ReturnPolicy, ShippingInformation, Warranty } from '@/lib/types';
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';



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
  meta_discription: '',
  discription: '',
  shippingFee: '',
  offer: '',
  isVarientStatus: false,
  varient: []
};

export default function AddProduct() {

  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [shippings, setShippings] = useState<ShippingInformation[]>([]);
  const [returns, setReturns] = useState<ReturnPolicy[]>([]);
  const [categories, setCategories] = useState<CategoryFormData[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          warrantyData,
          shippingData,
          returnData,
          categoryData,
          offerData
        ] = await Promise.all([
          get_all_warranty(),
          get_all_shipping(),
          get_all_return(),
          get_parent_categories(),
          get_all_offer()
        ]) as any;

        // console.log(warrantyData)
        setWarranties(warrantyData.warranty);
        setShippings(shippingData.shipping);
        setReturns(returnData.returnData);

        setCategories(categoryData.category);
        setOffers(offerData.returnData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const toggleVariantAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle open/close
  };



  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'title') {
      formData.slug = generateSlug(value);
    }
  };

  const handleVariantChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const { name, value } = e.target;

    setFormData((prevFormData: any) => {
      const updatedVarient = [...prevFormData.varient];
      updatedVarient[index] = { ...updatedVarient[index], [name]: value };
      return { ...prevFormData, varient: updatedVarient };
    });
  };

  const handleToggle = (field: keyof ProductFormData) => {
    setFormData(prev => ({ ...prev, [field]: !prev[field] }));
  };

  const handleImagesChange = (images: ProductFormData['images']) => {
    setFormData(prev => ({ ...prev, images }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(formData);
  };

  const handleAddVarient = () => {
    setFormData((prev: ProductFormData) => ({
      ...prev,
      varient: [
        ...prev.varient,
        {
          size: '',
          color: '',
          price: 0,
          stock: 0,
        }
      ]
    }));
  };
  
  const handleRemoveVariant = (index: number) => {
    setFormData((prevFormData: any) => {
      const updatedVarient = prevFormData.varient.filter((_: unknown, i: number) => i !== index);
      return { ...prevFormData, varient: updatedVarient };
    });
    if (activeIndex === index) setActiveIndex(null);
  };


  const handleFileChange = (event: any) => {
    const file = event.target.files[0];
    if (file) {
      formData.thumbnail = file;
      const reader = new FileReader() as any;
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };


  return (
    <>
      <form onSubmit={handleSubmit} encType={'multipart/form-data'}>
        <div className="flex flex-wrap mt-20 mb-52">
          {/* top row */}
          <div className="w-full md:w-12/12 lg:w-12/12 px-4 mb-5">
            <div className=" bg-white text-black flex justify-between align-middle p-6 rounded-lg shadow-md shadow-black-300">
              <h3 className="text-lg font-bold">Create Product</h3>
              <button className="bg-blue-500 text-white py-1 px-7 rounded">Back</button>
            </div>
          </div>
          {/* left side */}
          <div className="w-full md:w-8/12 lg:w-8/12 px-4 space-y-6">
            <div className="bg-white text-black p-6 rounded-lg space-y-5 shadow-md shadow-black-300">
              <div>
                <label className="block text-sm font-medium text-gray-700">Product Name *</label>
                <input
                  className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="Enter product name"
                  required

                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Slug Name *</label>
                <input className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  id="slug"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  placeholder="product-name"
                  required
                />
              </div>
            </div>




            <div className="bg-white text-black p-6 rounded-lg space-y-5 shadow-md shadow-black-300">
              <div>
                <label className="block text-sm font-medium text-gray-700">Thumbnail *</label>
                <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                  <div className="text-center">
                    {image ? (
                      <img src={image} alt="Thumbnail Preview" className="mx-auto max-w-full rounded-md w-40 h-40" />
                    ) : (
                      <svg
                        className="mx-auto size-12 text-gray-300"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        aria-hidden="true"
                        data-slot="icon"
                      >
                        <path
                          fillRule="evenodd"
                          d="M1.5 6a2.25 2.25 0 0 1 2.25-2.25h16.5A2.25 2.25 0 0 1 22.5 6v12a2.25 2.25 0 0 1-2.25 2.25H3.75A2.25 2.25 0 0 1 1.5 18V6ZM3 16.06V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18v-1.94l-2.69-2.689a1.5 1.5 0 0 0-2.12 0l-.88.879.97.97a.75.75 0 1 1-1.06 1.06l-5.16-5.159a1.5 1.5 0 0 0-2.12 0L3 16.061Zm10.125-7.81a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    )}
                    <div className="mt-4 flex text-sm/6 text-gray-600">
                      <label className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 focus-within:outline-hidden hover:text-indigo-500">
                        <span>Upload a file</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/png, image/jpg, image/jpeg, image/gif"
                          onChange={handleFileChange}  // Handle file change event
                        />
                      </label>
                      <p className="pl-1">or drag and drop</p>
                    </div>
                    <p className="text-xs/5 text-gray-600">PNG, JPG, GIF up to 10MB</p>
                  </div>
                </div>
              </div>
            </div>



            <div className="bg-white text-black p-6 rounded-lg space-y-5 shadow-md shadow-black-300">
              <div>
                <label className="block text-sm font-medium text-gray-700">Gallery Images *</label>
                <ImageUpload
                  images={formData.images}
                  onImagesChange={handleImagesChange}
                />
              </div>
            </div>

            {/* <div className="bg-white text-black p-6 rounded-lg space-y-5 shadow-md shadow-black-300">
            <div><label className="block text-sm font-medium text-gray-700">Gallery image *</label>
              <input className="w-50 flex mt-5 h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="name" required placeholder="Product name" type="file" name="attachment" />
              <button className="bg-green-500 text-white py-1 px-5 rounded gap-1 mt-4">+ Add More</button>
            </div>
          </div> */}

            <div className="bg-white text-black p-6 rounded-lg space-y-5 shadow-md shadow-black-300">
              <div>
                <label className="block text-sm font-medium text-gray-700">Short description *</label>

                <textarea
                  className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  id="description"
                  name="description"
                  rows={5}
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Enter category description"
                />


                {/* <JoditEditor
                className="h-28"
                ref={editor}
                value={content}
                config={config}
                onBlur={(newContent) => setContent(newContent)}
                onChange={(newContent) => { }}
              /> */}

              </div>
            </div>

            <div className="bg-white text-black p-6 rounded-lg space-y-5 shadow-md shadow-black-300">
              <div>
                <label className="block text-sm font-medium text-gray-900">Product Data *</label>
                <div className='flex justify-between gap-3'>
                  <div className="w-4/12 mt-4">
                    <label className="block font-medium text-gray-700">Product Price</label>
                    <div className="mt-2">
                      <input
                        className="block w-full h-10 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        type="number"
                        name='price'
                        value={formData.price || ''}
                        onChange={handleInputChange}
                        placeholder='Product price'
                      />
                    </div>
                  </div>
                  <div className="w-4/12 mt-4">
                    <label className="block mb-2 text-sm font-medium text-gray-900">
                      Discount Type
                    </label>
                    <select
                      name="discountType"
                      value={formData.discountType || ''}
                      onChange={handleInputChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      required
                    >
                      <option value="">Select discount type</option>
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
                      <option value="free_shipping">Free Shipping</option>
                    </select>

                  </div>
                  <div className="w-4/12 mt-4">
                    <label className="block font-medium text-gray-700">Discount Price</label>
                    <div className="mt-2">
                      <input
                        className="block w-full h-10 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        type="number"
                        name="discountPrice"
                        id="discountPrice"
                        value={formData.discountPrice || ''}
                        onChange={handleInputChange}
                        placeholder='Discount price' />
                    </div>
                  </div>
                </div>

                <div className="w-12/12 mt-4">
                  <label className="block font-medium text-gray-700">Tags</label>
                  <div className="mt-2">
                    <input
                      className="block w-full h-10 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      type="text"
                      name="tags"
                      id="tags"
                      value={formData.tags || ''}
                      onChange={handleInputChange}
                      placeholder='Tags'
                    />
                  </div>
                </div>

                <div className='flex justify-between gap-3'>
                  <div className="w-4/12 mt-4">
                    <label className="block font-medium text-gray-700">Rating</label>
                    <div className="mt-2">
                      <input
                        className="block w-full h-10 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        type="number"
                        name="rating"
                        id="rating"
                        placeholder='rating'
                        value={formData.rating || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="w-4/12 mt-4">
                    <label className="block font-medium text-gray-700">Stock</label>
                    <div className="mt-2">
                      <input
                        className="block w-full h-10 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        type="number"
                        name="stock"
                        id="stock"
                        placeholder='stock'
                        value={formData.stock || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="w-4/12 mt-4">
                    <label className="block font-medium text-gray-700">SKU</label>
                    <div className="mt-2">
                      <input
                        className="block w-full h-10 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        type="text"
                        name="sku"
                        id="sku"
                        placeholder='sku'
                        value={formData.sku || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </div>

                <div className='flex justify-between gap-3'>
                  <div className="w-4/12 mt-4">
                    <label className="block font-medium text-gray-700">Product Availability</label>
                    <div className="mt-2">
                      <select
                        id='availabilityStatus'
                        name="availabilityStatus"
                        value={formData.availabilityStatus || ''}
                        onChange={handleInputChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                        required
                      >
                        <option value="">Availability Status</option>
                        <option value="in_stock">In Stock</option>
                        <option value="low_stock">Low Stock</option>
                        <option value="out_of_stock">Out Of Stock</option>
                      </select>

                    </div>
                  </div>
                  <div className="w-4/12 mt-4">
                    <label className="block font-medium text-gray-700">Minimum Order Quantity</label>
                    <div className="mt-2">
                      <input
                        className="block w-full h-10 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        type="number"
                        name="minimumOrderQuantity"
                        id="minimumOrderQuantity"
                        placeholder='minimumOrderQuantity'
                        value={formData.minimumOrderQuantity || ''}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="w-4/12 mt-4">
                    <label className="block font-medium text-gray-700">Dimensions</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="dimensions"
                        id="dimensions"
                        value={formData.dimensions || ''}
                        onChange={handleInputChange}
                        className="block w-full h-10 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        placeholder='w x h x d' />
                    </div>
                  </div>
                </div>
                <div className='flex justify-between gap-3'>
                  <div className="w-8/12 mt-4">
                    <label className="block font-medium text-gray-700">Preview Video</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="demoVideo"
                        id="demoVideo"
                        value={formData.demoVideo || ''}
                        onChange={handleInputChange}
                        className="block w-full h-10 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        placeholder='Preview Video'
                      />
                    </div>
                  </div>

                </div>
              </div>
            </div>

            <div className="bg-white text-black p-6 rounded-lg space-y-5 shadow-md shadow-black-300">
              <div>
                <label className="block text-sm font-medium text-gray-900">
                  Product Policy</label>
                <div className='flex justify-between gap-3'>
                  <div className="w-4/12 mt-4">
                    <label className="block font-medium text-gray-700">
                      Warranty Information</label>
                    <div className="mt-2">
                      <select
                        name="warrantyInformation"
                        id="warrantyInformation"
                        value={formData.warrantyInformation || ''}
                        onChange={handleInputChange}

                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                      >
                        <option>Chhose Warraty</option>
                        {
                          warranties.length === 0 ? (
                            <option>No data found</option>
                          ) :
                            warranties.map((warranty) => (
                              <option key={warranty._id} value={warranty._id}>{warranty.warrantyType.toUpperCase()}</option>
                            ))
                        }
                      </select>
                    </div>
                  </div>
                  <div className="w-4/12 mt-4">
                    <label className="block font-medium text-gray-700">
                      Shipping Information</label>
                    <div className="mt-2">
                      <select
                        name="shippingInformation"
                        id="shippingInformation"
                        value={formData.shippingInformation || ''}
                        onChange={handleInputChange}

                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                      >
                        <option>Chhose Shipping</option>
                        {
                          shippings.length === 0 ? (
                            <option>No data found</option>
                          ) :
                            shippings.map((shipping) => (
                              <option key={shipping._id} value={shipping._id}>{shipping.shippingMethod.toUpperCase()}</option>
                            ))
                        }
                      </select>
                    </div>
                  </div>
                  <div className="w-4/12 mt-4">
                    <label className="block font-medium text-gray-700">Return Policy</label>
                    <div className="mt-2">
                      <select
                        name="returnPolicy"
                        id="returnPolicy"
                        value={formData.returnPolicy || ''}
                        onChange={handleInputChange}

                        className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                      >
                        <option>Chhose Warraty</option>
                        {
                          returns.length === 0 ? (
                            <option>No data found</option>
                          ) :
                            returns.map((returns) => (
                              <option key={returns._id} value={returns._id}>{returns.returnPeriod.toUpperCase()}</option>
                            ))
                        }
                      </select>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>


          {/* right side */}
          <div className="w-full md:w-4/12 lg:w-4/12 px-4 space-y-6">
            <div className="bg-white text-black p-6 rounded-lg space-x-3 shadow-md shadow-black-300">
              <button className="bg-green-500 text-white py-2 px-7 rounded gap-1"> Save</button>
              <button className="bg-blue-500 text-white py-2 px-7 rounded gap-1">Save & Edit</button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">Product Status</h3>
              <div className="space-y-4">
                {[
                  { key: 'status', label: 'Active' },
                  { key: 'ishome', label: 'Show on Home' },
                  { key: 'tranding', label: 'Trending' },
                  { key: 'hot', label: 'Hot Deal' },
                  { key: 'sale', label: 'On Sale' },
                  { key: 'new', label: 'New Arrival' },
                  { key: 'isVarientStatus', label: 'Varient Available' },
                  { key: 'isCustomize', label: 'Customizable' }

                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={formData[key as keyof ProductFormData] as boolean}
                      onChange={() => handleToggle(key as keyof ProductFormData)}
                      className="sr-only peer"
                    />
                    <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                    <span className="ml-3 text-sm font-medium text-gray-900">
                      {label}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            {/* Varient status */}
            {formData.isVarientStatus && (
              <div className="bg-white text-black p-6 rounded-lg space-y-5 shadow-md">
                <button onClick={() => handleAddVarient()} type='button'>+ Add Varient</button>
              </div>

            )}
            {formData.isVarientStatus && formData.varient.map((item, index) => (
              <div key={index} className="variant-section mb-6">
                <div
                  className="variant-header flex justify-between items-center cursor-pointer p-4 bg-indigo-50 rounded-md shadow-sm hover:bg-indigo-200 transition duration-300"
                  onClick={() => toggleVariantAccordion(index)}
                >
                  <h3 className="text-lg font-medium text-gray-800">Variant {index + 1}</h3>
                  <button
                    type="button"
                    onClick={() => handleRemoveVariant(index)}
                    className="bg-red-600 text-white p-2 text-sm rounded-full"
                  >
                    <FaTrash className='h-3 w-3' />
                  </button>
                </div>

                {/* Accordion Body with Animation */}
                <div
                  className={`variant-content px-5 py-5 rounded-xl bg-white mt-4 transition-all duration-500 ease-in-out overflow-hidden ${activeIndex === index ? 'max-h-[500px] block' : 'max-h-0 hidden'}`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Size and Color inputs in one row */}
                    <div className="col-span-1">
                      <label htmlFor={`size-${index}`} className="block text-sm font-medium text-gray-700">
                        Size
                      </label>
                      <input
                        type="text"
                        name="size"
                        id={`size-${index}`}
                        value={item.size}
                        onChange={(e) => handleVariantChange(e, index)}
                        className="block w-full h-10 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 focus:outline-indigo-600"
                        placeholder="Enter Size"
                      />
                    </div>

                    <div className="col-span-1">
                      <label htmlFor={`color-${index}`} className="block text-sm font-medium text-gray-700">
                        Color
                      </label>
                      <input
                        type="color"
                        name="color"
                        id={`color-${index}`}
                        value={item.color}
                        onChange={(e) => handleVariantChange(e, index)}
                        className="block w-full h-10 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 focus:outline-indigo-600"
                        placeholder="Enter Color"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    {/* Price and Stock inputs in one row */}
                    <div className="col-span-1">
                      <label htmlFor={`price-${index}`} className="block text-sm font-medium text-gray-700">
                        Price
                      </label>
                      <input
                        type="text"
                        name="price"
                        id={`price-${index}`}
                        value={item.price}
                        onChange={(e) => handleVariantChange(e, index)}
                        className="block w-full h-10 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 focus:outline-indigo-600"
                        placeholder="Enter Price"
                      />
                    </div>

                    <div className="col-span-1">
                      <label htmlFor={`stock-${index}`} className="block text-sm font-medium text-gray-700">
                        Stock
                      </label>
                      <input
                        type="text"
                        name="stock"
                        id={`stock-${index}`}
                        value={item.stock}
                        onChange={(e) => handleVariantChange(e, index)}
                        className="block w-full h-10 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 focus:outline-indigo-600"
                        placeholder="Enter Stock"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="bg-white text-black p-6 rounded-lg space-x-3 shadow-md shadow-black-300">
              <label className="block font-medium text-gray-700 ml-3">Offers On</label>
              <select
                id="offer"
                name="offer"
                value={formData.offer || ''}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option>Chhose offers</option>
                {
                  offers.length === 0 ? (
                    <option>No data found</option>
                  ) :
                    offers.map((offer) => (
                      <option key={offer._id} value={offer._id}>{offer.offerTitle.toUpperCase()}</option>
                    ))
                }

              </select>

              <label className="block font-medium text-gray-700 ml-3 mt-3">Shipping Fee</label>
              <input
                type="text"
                name="shippingFee"
                id="shippingFee"
                value={formData.shippingFee || ''}
                onChange={handleInputChange}
                className="block w-full h-10 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                placeholder='Shipping Fee' />
            </div>

            <div className="bg-white text-black p-6 rounded-lg space-x-3 shadow-md shadow-black-300">
              <label className="block font-medium text-gray-700 ml-3">Select Category</label>
              <select
                id="category"
                name="category"
                value={formData.category || ''}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option>Choose Category</option>
                {
                  categories.length === 0 ? (
                    <option>No data found</option>
                  ) :
                    categories.map((category) => (
                      <option key={category._id} value={category._id}>{category.name.toUpperCase()}</option>
                    ))
                }
              </select>

              <label className="block font-medium text-gray-700 ml-3 mt-3">Select Sub Category</label>
              <select
                id="subcategory"
                name="subcategory"
                value={formData.subcategory || ''}
                onChange={handleInputChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option>Choose SubCategory</option>
                {/* {
                  subcategories.length === 0 ? (
                    <option>No data found</option>
                  ) :
                    subcategories.map((category) => (
                      <option key={category._id} value={category._id}>{category.name.toUpperCase()}</option>
                    ))
                } */}
              </select>
            </div>

            <div className="bg-white text-black p-6 rounded-lg space-y-5 shadow-md shadow-black-300">
              <div>
                <label className="block text-sm font-medium text-gray-700">Meta keywords</label>
                <input className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  id='keywords'
                  placeholder="Meta Keywords"
                  type="text"
                  name='keywords'
                  value={formData.keywords || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Meta Description</label>
                <textarea
                  className="flex h-28 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                  placeholder="Meta Discription"
                  id='meta_discription'
                  name='meta_discription'
                  value={formData.meta_discription || ''}
                  onChange={handleInputChange}
                />
              </div>
              <div>
                <label className="block font-medium text-gray-700">Image Alt Text</label>
                <div className="mt-2">
                  <input
                    className="block w-full h-10 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                    type="text"
                    name="imgAlt"
                    id="imgAlt"
                    value={formData.imgAlt || ''}
                    onChange={handleInputChange}
                    placeholder='Img Alt' />
                </div>
              </div>
            </div>



          </div>
        </div>
      </form>
    </>
  )
}

