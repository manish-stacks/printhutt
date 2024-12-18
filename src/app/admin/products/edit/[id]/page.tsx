"use client"
import { get_parent_categories } from '@/_services/admin/category';
import { get_all_offer } from '@/_services/admin/offer';
import { get_product_by_id, update_a_product } from '@/_services/admin/product';
import { get_all_return } from '@/_services/admin/return-policy';
import { get_all_shipping } from '@/_services/admin/shipping';
import { get_parent_sub_categories } from '@/_services/admin/sub-category';
import { get_all_warranty } from '@/_services/admin/warranty';
import { ImageUpload } from '@/components/admin/products/ImageUpload';
import { generateSlug } from '@/helpers/helpers';
import { CategoryFormData, Offer, ProductFormData, ReturnPolicy, ShippingInformation, Warranty } from '@/lib/types';
import { validateProductForm } from '@/utils/form';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaTrash } from 'react-icons/fa';
import { RiLoader2Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import Select from 'react-select';


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
  trending: false,
  hot: false,
  sale: false,
  new: false,
  isCustomize: false,
  images: [],
  thumbnail: '',
  keywords: '',
  meta_description: '',
  shippingFee: 0,
  offers: [],
  isVarientStatus: false,
  varient: []
};

export default function EditProduct() {
  const params = useParams();
  const id = params?.id as string | undefined;
  // console.log(id)
  if (!id) {
    toast.error("No category ID provided.");
    return;
  }

  const [formData, setFormData] = useState<ProductFormData>(initialFormData);
  const [warranties, setWarranties] = useState<Warranty[]>([]);
  const [shippings, setShippings] = useState<ShippingInformation[]>([]);
  const [returns, setReturns] = useState<ReturnPolicy[]>([]);
  const [categories, setCategories] = useState<CategoryFormData[]>([]);
  const [subcategories, setSubCategories] = useState<CategoryFormData[]>([]);
  const [offers, setOffers] = useState<Offer[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [image, setImage] = useState(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(true);




  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [
          warrantyData,
          shippingData,
          returnData,
          categoryData,
          offerData,
          productData,
        ] = await Promise.all([
          get_all_warranty(),
          get_all_shipping(),
          get_all_return(),
          get_parent_categories(),
          get_all_offer(),
          get_product_by_id(id)
        ]) as any;

        console.log(productData)

        setFormData(productData)
        setFormData(prevData => ({
          ...prevData,
          meta_description: productData.meta.meta_description,
          keywords: productData.meta.keywords,
        }));

        setImage(productData.thumbnail.url); // set thumbnail
        setWarranties(warrantyData.warranty);
        setShippings(shippingData.shipping);
        setReturns(returnData.returnData);
        setCategories(categoryData.category);
        setOffers(offerData.returnData);


        if (productData.category) {
          const subcategoryData = await get_parent_sub_categories(productData.category) as any;
          setSubCategories(subcategoryData.category || []);
        }


      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const toggleVariantAccordion = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index); // Toggle open/close
  };



  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;

    setFormData(prev => {
      const updatedData = { ...prev, [name]: value };

      if (name === 'title') {
        updatedData.slug = generateSlug(value);
      }

      if (name === 'shippingInformation') {
        const shippingfilter = shippings.find(ship => ship._id === value) as any;
        updatedData.shippingFee = shippingfilter?.shippingFee ? shippingfilter?.shippingFee : 0;
      }


      return updatedData;
    });

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


  const handleAddVarient = () => {
    setFormData((prev: ProductFormData) => ({
      ...prev,
      varient: [
        ...prev.varient,
        {
          size: '',
          color: '#000000',
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
      // formData.thumbnail = URL.createObjectURL(file);
      formData.thumbnail = file;
      const reader = new FileReader() as any;
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCategoryChange = async (event: any) => {
    const { value } = event.target;

    try {
      setFormData(prev => ({ ...prev, category: value, subcategory: '' }));

      if (value) {
        const subcategoryData = await get_parent_sub_categories(value) as any;
        setSubCategories(subcategoryData.category || []);
      } else {
        setSubCategories([]);
      }
    } catch (error) {
      console.error('Error fetching subcategories:', error);
      toast.error('Error loading subcategories');
      setSubCategories([]);
    }
  }

  const handleTagsChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
    const inputValue = e.currentTarget.value.trim();

    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (inputValue && !formData.tags.includes(inputValue)) {
        setFormData((prev) => ({
          ...prev,
          tags: [...prev.tags, inputValue],
        }));
        e.currentTarget.value = '';
      }
    }
  };

  const removeTag = (tag: string) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((t) => t !== tag),
    }));
  };

  const options = offers.map((offer) => ({
    value: offer._id,
    label: offer.offerTitle.toUpperCase(),
  }));

  const handleSelectChangeOffer = (selectedOptions) => {
    const selectedOffers = selectedOptions ? selectedOptions.map(option => option.value) : [];
    setFormData({
      ...formData,
      offers: selectedOffers,
    });
  };
  const selectedOffers = options.filter(option => formData.offers.includes(option.value));


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const validationErrors = validateProductForm(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);

    console.log('Form data:', formData);

    try {
      setIsSubmitting(true);
      const formDataToSend = new FormData();

      if (formData.thumbnail instanceof File) {
        formDataToSend.append('thumbnail', formData.thumbnail);
      }

      if (formData.images && formData.images.length > 0) {
        formData.images.forEach((image, index) => {
          if (image.file instanceof File) {
            formDataToSend.append(`images`, image.file);
          }
        });
      }

      Object.entries(formData).forEach(([key, value]) => {
        if (key !== 'thumbnail' && key !== 'images') {
          if (typeof value === 'object') {
            formDataToSend.append(key, JSON.stringify(value));
          } else {
            formDataToSend.append(key, String(value));
          }
        }
      });

      const response = await update_a_product(id, formDataToSend) as any;

      if (response.success) {
        toast.success('Product created successfully!');
        // setFormData(initialFormData);
        // setImage(null);
        //router.push('/admin/products')
      } else {
        toast.error(response.message || 'Failed to Update product');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error('Failed to Update product. Please try again.');
      setErrors(['Failed to Update product. Please try again.']);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-wrap mt-20 mb-52 justify-center items-center">
        <div className="text-center h-screen mx-auto">
          <p className="font-serif text-4xl text-brown-800">Loading...</p>
          <div className="flex justify-center mt-4">
            <RiLoader2Line className="mr-2 h-12 w-12 animate-spin" />
          </div>

        </div>
      </div>
    );
  }


  return (
    <>
      <form onSubmit={handleSubmit} encType={'multipart/form-data'}>


        <div className="flex flex-wrap mt-20 mb-52">
          {/* top row */}
          <div className="w-full md:w-12/12 lg:w-12/12 px-4 mb-5">
            <div className=" bg-white text-black flex justify-between align-middle p-6 rounded-lg shadow-md shadow-black-300">
              <h3 className="text-lg font-bold">Update Product</h3>
              <button className="bg-blue-500 text-white py-1 px-7 rounded">Back</button>
            </div>
          </div>
          <div className="w-full md:w-12/12 lg:w-12/12 px-4 mb-5">
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
                  productId={id}
                />
              </div>
            </div>

            {/* <div className="bg-white text-black p-6 rounded-lg space-y-5 shadow-md shadow-black-300">
            <div><label className="block text-sm font-medium text-gray-700">Gallery image *</label>
              <input className="w-50 flex mt-5 h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50" id="name"  placeholder="Product name" type="file" name="attachment" />
              <button className="bg-green-500 text-white py-1 px-5 rounded gap-1 mt-4">+ Add More</button>
            </div>
          </div> */}

            <div className="bg-white text-black p-6 rounded-lg space-y-5 shadow-md shadow-black-300">
              <div>
                <label className="block text-sm font-medium text-gray-700">Description *</label>

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

                    >
                      <option value="">Select discount type</option>
                      <option value="percentage">Percentage</option>
                      <option value="fixed">Fixed Amount</option>
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
                    {/* <input
                      className="block w-full h-10 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                      type="text"
                      name="tags"
                      id="tags"
                      value={formData.tags || ''}
                      onChange={handleInputChange}
                      placeholder='Tags'
                    /> */}

                    {formData.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 mx-1 text-sm text-blue-700"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-red-500 hover:text-red-700"
                          aria-label="Remove tag"
                        >
                          &times;
                        </button>
                      </span>
                    ))}
                    <input
                      className="flex-grow bg-white px-2 py-2 mt-2 text-base text-gray-900 outline-none placeholder-gray-400 focus:ring-0"
                      type="text"
                      id="tags"
                      placeholder="Add a tag"
                      onKeyDown={handleTagsChange} // Handle tags on key press
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
                  <div className="w-4/12 mt-4">
                    <label className="block font-medium text-gray-700">Product weight</label>
                    <div className="mt-2">
                      <input
                        type="text"
                        name="weight"
                        id="weight"
                        value={formData.weight || ''}
                        onChange={handleInputChange}
                        className="block w-full h-10 rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
                        placeholder='weight' />
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
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-green-500 text-white py-2 px-7 rounded gap-1"
              >
                <span className='flex'>
                  {isSubmitting && (
                    <RiLoader2Line className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isSubmitting ? 'Updating...' : 'Update'}
                </span>
              </button>
              <button type="submit" className="bg-blue-500 text-white py-2 px-7 rounded gap-1">
                <span className='flex'>
                  {isSubmitting && (
                    <RiLoader2Line className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isSubmitting ? 'Updating...' : 'Update & Edit'}
                </span>
              </button>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-bold mb-4">Product Status</h3>
              <div className="space-y-4">
                {[
                  { key: 'status', label: 'Active' },
                  { key: 'ishome', label: 'Show on Home' },
                  { key: 'trending', label: 'Trending' },
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
              {/* <select
                id="offers"
                name="offers"
                value={formData.offers || []}
                onChange={handleInputChange}
                multiple
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option disabled>Choose offers</option>
                {offers.length === 0 ? (
                  <option>No data found</option>
                ) : (
                  offers.map((offer) => (
                    <option key={offer._id} value={offer._id}>
                      {offer.offerTitle.toUpperCase()}
                    </option>
                  ))
                )}
              </select> */}
              <Select
                options={options}
                isMulti
                value={selectedOffers}
                onChange={handleSelectChangeOffer}
              />

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
                onChange={handleCategoryChange}
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
                disabled={!formData.category}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option>Choose SubCategory</option>
                {
                  subcategories.length === 0 ? (
                    <option>No data found</option>
                  ) :
                    subcategories.map((subcategory) => (
                      <option key={subcategory._id} value={subcategory._id}>{subcategory.name.toUpperCase()}</option>
                    ))
                }
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
                  placeholder="Meta Description"
                  id='meta_description'
                  name='meta_description'
                  value={formData.meta_description || ''}
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

