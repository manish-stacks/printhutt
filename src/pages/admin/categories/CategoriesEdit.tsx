'use client'
import { add_new_category, get_category_by_id, get_parent_categories, update_category } from '@/_services/admin/category';
import { generateSlug } from '@/helpers/helpers';
import { CategoryFormData } from '@/lib/types';
import { useParams, useRouter } from 'next/navigation';

import React, { useState, useCallback, useEffect, ChangeEvent } from 'react';
import { FaImage } from 'react-icons/fa';
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
    if (!id) {
        toast.error("No category ID provided.");
        return;
    }
    const [previewUrl, setPreviewUrl] = useState<string>();
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [categories, setCategories] = useState<Category[]>([]);
    const [formData, setFormData] = useState<CategoryFormData>({
        parentCategory: '',
        name: '',
        slug: '',
        description: '',
        metaKeywords: '',
        metaDescription: '',
        level: '',
        imageUrl: null,
    });
    const router = useRouter();


    useEffect(() => {
        const fetchCategory = async () => {
            try {
                const data = await get_category_by_id(id);
                console.log(data)
                if (data) {
                    setFormData({
                        parentCategory: data.parentCategory || "",
                        name: data.name || "",
                        slug: data.slug || "",
                        description: data.description || "",
                        metaKeywords: data.metaKeywords || "",
                        metaDescription: data.metaDescription || "",
                        level: data.level || "",
                        imageUrl: data?.image?.url,
                    });
                } else {
                    toast.error("Category not found.");
                }
            } catch (error) {
                console.error("Error fetching category:", error);
                toast.error("Failed to fetch category details.");
            }
        };

        fetchCategory();

    }, [id]);



    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await get_parent_categories();
                console.log(data)
                setCategories(data);
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

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.imageUrl) return toast.error('Please choose an image');
        if (!formData.name) return toast.error('Please enter a name');
        if (!formData.slug) return toast.error('Please enter a slug');
        if (!formData.description) return toast.error('Please enter a description');
        if (!formData.metaKeywords) return toast.error('Please enter meta keywords');
        if (!formData.metaDescription) return toast.error('Please enter meta description');
        if (!formData.level) return toast.error('Please enter level');


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
        // data.append('imageUrl', formData.imageUrl)
        data.append('parentCategory', formData.parentCategory)


        try {
            const res = await update_category(id,data)
            if (res.success) {
                toast.success(res?.message);
                setTimeout(() => {
                    router.push('/admin/categories')
                }, 1000);
                setIsSubmitting(false);
            } else {
                toast.error(res?.message)
                setIsSubmitting(false);
            }
        } catch (error: any) {
            toast.error(error?.message)
        } finally {
            setIsSubmitting(false);
        }



    }, [formData]);


   


    return (
        <>
            <div className="max-w-10xl mx-auto lg:px-10 py-20">
                <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-sm" encType={'multipart/form-data'}>
                    <div className="space-y-2">
                        <h2 className="text-2xl font-bold text-gray-900">Add New Category</h2>
                        <p className="text-gray-600">
                            update category with an image and description.
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
                                        {previewUrl ? (
                                            <div className="relative aspect-video w-48 h-48 rounded-lg overflow-hidden">
                                                <img
                                                    src={previewUrl}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center w-48 h-48 bg-gray-100 rounded-lg">
                                                {/* <FaImage className="w-12 h-12 text-gray-400" />*/}
                                                <img
                                                    src={formData.imageUrl}
                                                    alt="Preview"
                                                    className="w-full h-full object-cover rounded-lg"
                                                /> 
                                            </div>
                                        )}
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
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Enter category description"
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
                        <button
                            type="submit"
                            disabled={isSubmitting || isUploading}
                            className="inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 h-10 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 focus-visible:ring-blue-600"
                        >
                            {(isSubmitting || isUploading) && (
                                <RiLoader2Line className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            {isSubmitting ? 'Creating Category...' : 'Update Category'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default CategoriesEdit