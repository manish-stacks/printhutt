'use client'
import { get_parent_categories } from '@/_services/admin/category';
import { get_sub_category_by_id, update_sub_category } from '@/_services/admin/sub-category';
import LoadingSpinner from '@/components/LoadingSpinner';
import { generateSlug } from '@/helpers/helpers';
import { CategoryFormData } from '@/lib/types/category';

import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';

import React, { useState, useEffect, ChangeEvent } from 'react';
import { RiLoader2Line } from 'react-icons/ri';
import { toast } from 'react-toastify';


interface Category {
    _id: string;
    name: string;
}



const maxSize = (value: File) => {
    const fileSize = value.size / 1024 / 1024;
    return fileSize < 1 ? false : true
}


const CategoriesEdit = () => {
    const params = useParams();
    const id = params?.id as string | undefined;

    const [previewUrl, setPreviewUrl] = useState<string>();
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [formData, setFormData] = useState<CategoryFormData>({
        parentCategory: '',
        name: '',
        slug: '',
        description: '',
        metaKeywords: '',
        metaDescription: '',
        level: '',
        imageUrl: '',
        status: true,
    });
    const router = useRouter();


    useEffect(() => {
        const fetchCategory = async () => {
            try {
                setIsLoading(true)
                const data = await get_sub_category_by_id(id)
                if (data) {
                    setFormData({
                        parentCategory: data.parentCategory || "",
                        name: data.name || "",
                        slug: data.slug || "",
                        description: data.description || "",
                        metaKeywords: data.metaKeywords || "",
                        metaDescription: data.metaDescription || "",
                        level: data.level || "",
                        imageUrl: data?.image?.url || "",
                        status: data?.status || false,
                    });
                } else {
                    toast.error("Category not found.");
                }
            } catch (error) {
                console.error("Error fetching category:", error);
                toast.error("Failed to fetch category details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchCategory();

    }, [id]);



    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await get_parent_categories() 
                setCategories(data.category);
            } catch (error) {
                console.error("Error fetching categories:", error);
                toast.error("Error fetching categories");
            }
        };

        fetchCategories();
    }, [id]);



    const handleImageChange = (async (event: ChangeEvent<HTMLInputElement>) => {

        const file = event.target.files?.[0];

        if (!file) return;
        const CheckFileSize = maxSize(file);
        if (CheckFileSize) {
            event.target.value = ''
            return toast.error('Image size must be less then 1MB')
        }
        setFormData((prev) => ({
            ...prev,
            imageUrl: file,
        }));


        const reader = new FileReader();
        reader.onloadend = () => {
            setPreviewUrl(reader.result as string);
        };
        reader.readAsDataURL(file);

        setIsUploading(true);
        await new Promise(resolve => setTimeout(resolve, 1000));
        setIsUploading(false);
    });


    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => {
            const updatedData = { ...prevData, [name]: value };
            if (name === 'name') {
                updatedData.slug = generateSlug(value);
            }
            return updatedData;
        });
    };

    const handleSubmit = (async (e: React.FormEvent) => {
        e.preventDefault();

        // if (!formData.imageUrl) return toast.error('Please choose an image');
        if (!formData.name) return toast.error('Please enter a name');
        if (!formData.slug) return toast.error('Please enter a slug');
        if (!formData.description) return toast.error('Please enter a description');
        if (!formData.metaKeywords) return toast.error('Please enter meta keywords');
        if (!formData.metaDescription) return toast.error('Please enter meta description');
        if (!formData.level) return toast.error('Please enter level');
        if (!formData.status) return toast.error('Please enter level');


        setIsSubmitting(true);
        // console.log('Form submitted:', formData);
        // await new Promise(resolve => setTimeout(resolve, 5000));


        const data = new FormData()
        data.append('name', formData.name)
        data.append('slug', formData.slug)
        data.append('description', formData.description)
        data.append('metaKeywords', formData.metaKeywords)
        data.append('metaDescription', formData.metaDescription)
        data.append('level', formData.level)
        data.append('imageUrl', formData.imageUrl)
        data.append('parentCategory', formData.parentCategory as string)
        data.append('status', formData.status.toString())


        try {
            const res = await update_sub_category(id, data)
            if (res.success) {
                toast.success(res?.message);
                setTimeout(() => {
                   return router.push('/admin/sub-categories')
                }, 1000);
                setIsSubmitting(false);
            } else {
                toast.error(res?.message)
                setIsSubmitting(false);
            }
        } catch (error) {
            if(error instanceof Error){
            
                toast.error(error?.message)
            }
        } finally {
            setIsSubmitting(false);
        }



    });




    const handleStatusToggle = () => {
        setFormData((prevData) => ({ ...prevData, status: !prevData.status }));
    };

    if (!id) {
        toast.error("No category ID provided.");
        return;
    }

    if (isLoading) {
        return (
          <LoadingSpinner />
        );
      }

    return (
        <>
            <form onSubmit={handleSubmit} encType={'multipart/form-data'}>
                <div className="flex flex-wrap mt-20 mb-52">
                    {/* top row */}
                    <div className="w-full md:w-12/12 lg:w-12/12 px-4 mb-5">
                        <div className=" bg-white text-black flex justify-between align-middle p-6 rounded-lg shadow-md shadow-black-300">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Edit Category</h2>
                                <p className="text-gray-600">
                                    Edit a category with an image and description.
                                </p>
                            </div>
                            <div>
                                <button onClick={router.back} className="bg-blue-500 text-white py-1 px-6 rounded">Back</button>
                            </div>
                        </div>
                    </div>
                    {/* left side */}

                    <div className="w-full md:w-8/12 lg:w-8/12 px-4 space-y-6">
                        <div className="bg-white text-black p-6 rounded-lg space-y-5 shadow-md shadow-black-300">
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
                                    name="parentCategory"
                                    value={formData.parentCategory}
                                    onChange={handleChange}
                                >
                                    <option value="">Select Category</option>

                                    {categories.length === 0 ? (
                                        <option>Loading...</option>
                                    ) : (
                                        categories.map((category) => (
                                            <option key={category._id} value={category._id}>{category.name}</option>
                                        ))
                                    )}

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
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter category name"
                                    className="mt-1 flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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
                                    id="slug"
                                    name="slug"
                                    type="text"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    placeholder="Enter category name"
                                />
                            </div>
                        </div>

                        <div className="bg-white text-black p-6 rounded-lg space-y-5 shadow-md shadow-black-300">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Category Image
                                </label>
                                <div className="flex flex-col sm:flex-row gap-4 items-start">
                                    <div className="flex-1">
                                        {previewUrl ? (
                                            <div className="relative aspect-video w-40 h-40 rounded-lg overflow-hidden">
                                                <img
                                                    src={previewUrl}
                                                    alt="Preview"
                                                    className="h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center w-40 h-40 bg-gray-100 rounded-lg">
                                                {formData.imageUrl ? (
                                                    <img
                                                        src={typeof formData.imageUrl === 'string' ? formData.imageUrl : URL.createObjectURL(formData.imageUrl)}
                                                        alt="Preview"
                                                        className="w-full h-full object-cover rounded-lg"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center w-full h-full bg-gray-200 text-gray-400">
                                                        No Image
                                                    </div>
                                                )}
                                            </div>
                                        )}
                                        <p>Image Size Should Be 60 x 60.</p>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700">Image *</label>
                                <input
                                    className="flex h-10 w-[400px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                            </div>
                        </div>

                        <div className="bg-white text-black p-6 rounded-lg space-y-5 shadow-md shadow-black-300">
                            <div>
                                <label
                                    htmlFor="description"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Description
                                </label>
                                <textarea
                                    className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                                    id="description"
                                    name="description"
                                    rows={5}
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter category description"
                                />
                            </div>
                        </div>
                    </div>

                    {/* right side */}
                    <div className="w-full md:w-4/12 lg:w-4/12 px-4 space-y-6">
                        <div className="bg-white text-black p-6 rounded-lg space-x-3 shadow-md shadow-black-300">
                            <button
                                type="submit"
                                disabled={isSubmitting || isUploading}
                                className="bg-green-500 text-white py-2 px-7 rounded gap-1"
                            >
                                {(isSubmitting || isUploading) && (
                                    <RiLoader2Line className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                {isSubmitting ? 'Creating...' : 'Update'}
                            </button>
                            <Link href={'/admin/categories'} className="bg-blue-500 text-white py-[.7rem] px-7 rounded gap-1">Show all</Link>
                        </div>
                        <div className="bg-white text-black p-6 rounded-lg space-x-3 shadow-md shadow-black-300">
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={formData.status}
                                    onChange={handleStatusToggle}
                                    className="sr-only peer"
                                />
                                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                                <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                                    {formData.status ? "Active" : "Inactive"}
                                </span>
                            </label>

                        </div>



                        <div className="bg-white text-black p-6 rounded-lg space-x-3 shadow-md shadow-black-300">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Serial *
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                                    id="level"
                                    name="level"
                                    type="number"
                                    value={formData.level}
                                    onChange={handleChange}
                                    placeholder="Enter Serial"
                                />
                            </div>
                        </div>

                        <div className="bg-white text-black p-6 rounded-lg space-y-5 shadow-md shadow-black-300">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Meta Keywords
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                                    id="metaKeywords"
                                    name="metaKeywords"
                                    type="text"
                                    value={formData.metaKeywords}
                                    onChange={handleChange}
                                    placeholder="Enter Meta Keywords"
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
                                    id="metaDescription"
                                    name="metaDescription"
                                    rows={5}
                                    value={formData.metaDescription}
                                    onChange={handleChange}
                                    placeholder="Enter Meta Description"
                                />

                            </div>
                        </div>


                    </div>
                </div>
            </form>
        </>
    )
}

export default CategoriesEdit