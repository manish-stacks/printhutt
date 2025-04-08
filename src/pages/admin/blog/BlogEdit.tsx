'use client'
import { blogCategoryService, blogService } from '@/_services/admin/blog';
import LoadingSpinner from '@/components/LoadingSpinner';
import { generateSlug } from '@/helpers/helpers';
import type { BlogPost } from '@/lib/types/blog';
import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect, ChangeEvent } from 'react';
import { RiLoader2Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
const QuillEditor = dynamic(() => import('@/components/QuillEditor'), { ssr: false });

const maxSize = (value: File) => {
    const fileSize = value.size / 1024 / 1024;
    return fileSize < 1 ? false : true
}

const BlogEdit = () => {
    const params = useParams();
    const id = params?.id as string | undefined;

    const [previewUrl, setPreviewUrl] = useState<string>();
    const [isUploading, setIsUploading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [categories, setCategories] = useState([]);

    const router = useRouter();
    const [formData, setFormData] = useState<BlogPost>({
        category: '',
        title: '',
        slug: '',
        short_description: '',
        description: '',
        metaKeywords: '',
        metaTitle: '',
        metaDescription: '',
        author: '',
        imageUrl: '',
        status: true,
    });

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await blogCategoryService.getAll('1', '');
                setCategories(data.blogCategories);
            } catch (error) {
                console.error("Error fetching categories:", error);
                toast.error("Error fetching categories");
            }
        };

        fetchCategories();
    }, []);
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                setIsLoading(true);
                const data = await blogService.getBlog(id);
                if (data) {
                    setFormData({
                        category: data?.category,
                        title: data?.title || "",
                        slug: data?.slug || "",
                        description: data?.description || "",
                        short_description: data?.short_description || "",
                        metaKeywords: data?.metaKeywords || "",
                        metaTitle: data?.metaTitle || "",
                        metaDescription: data?.metaDescription || "",
                        imageUrl: data?.image?.url || "",
                        author: data?.author || "Admin",
                        status: data?.status || false,
                    });
                } else {
                    toast.error("Blog post not found.");
                }
            } catch (error) {
                console.error("Error fetching blog post:", error);
                toast.error("Failed to fetch blog post details.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchBlog();
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
            if (name === 'title') {
                updatedData.slug = generateSlug(value);
            }
            return updatedData;
        });
    };

    const handleSubmit = (async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.title) return toast.error('Please enter a title');
        if (!formData.slug) return toast.error('Please enter a slug');
        if (!formData.description) return toast.error('Please enter description');
        if (!formData.short_description) return toast.error('Please enter short description')
        if (!formData.metaKeywords) return toast.error('Please enter meta keywords');
        if (!formData.metaTitle) return toast.error('Please enter meta title');
        if (!formData.metaDescription) return toast.error('Please enter meta description');

        setIsSubmitting(true);

        const data = new FormData();
        data.append('title', formData.title);
        data.append('slug', formData.slug);
        data.append('description', formData.description);
        data.append('short_description', formData.short_description);
        data.append('metaKeywords', formData.metaKeywords);
        data.append('metaTitle', formData.metaTitle);
        data.append('metaDescription', formData.metaDescription);
        data.append('imageUrl', formData.imageUrl);
        data.append('status', formData.status.toString());
        data.append('author', formData.author)

        try {
            const res = await blogService.update(id, data);
            toast.success(res?.message);
            router.push('/admin/blogs');
            setIsSubmitting(false);
            return
        } catch (error) {
            if (error instanceof Error) {
                toast.error(error?.message);
            }
        } finally {
            setIsSubmitting(false);
        }
    });

    const handleStatusToggle = () => {
        setFormData((prevData) => ({ ...prevData, status: !prevData.status }));
    };

    const handleEditorChange = (value: string) => {
        setFormData((prev) => ({
            ...prev,
            description: value,
        }));
    };

    if (!id) {
        toast.error("No blog post ID provided.");
        return;
    }

    if (isLoading) return <LoadingSpinner />;

    return (
        <>
            <form onSubmit={handleSubmit} encType={'multipart/form-data'}>
                <div className="flex flex-wrap mt-20 mb-52">
                    {/* top row */}
                    <div className="w-full md:w-12/12 lg:w-12/12 px-4 mb-5">
                        <div className=" bg-white text-black flex justify-between align-middle p-6 rounded-lg shadow-md shadow-black-300">
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900">Edit Blog Post</h2>
                                <p className="text-gray-600">
                                    Edit a blog post with an image and content.
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
                                    Category
                                </label>
                                <select
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                                    id="name"
                                    name="category"
                                    value={formData.category}
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
                                    htmlFor="title"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Blog Title
                                </label>
                                <input
                                    id="title"
                                    name="title"
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Enter blog title"
                                    className="mt-1 flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="slug"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Blog Slug
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                                    id="slug"
                                    name="slug"
                                    type="text"
                                    value={formData.slug}
                                    onChange={handleChange}
                                    placeholder="Enter blog slug"
                                />
                            </div>
                        </div>

                        <div className="bg-white text-black p-6 rounded-lg space-y-5 shadow-md shadow-black-300">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    Blog Image
                                </label>
                                <div className="flex flex-col sm:flex-row gap-4 items-start">
                                    <div className="flex-1">
                                        {previewUrl ? (
                                            <div className="relative aspect-video w-40 h-40 rounded-lg overflow-hidden">
                                                <img                                                    src={previewUrl}
                                                    alt="Preview"
                                                    className="h-full object-cover"
                                                />
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center w-40 h-40 bg-gray-100 rounded-lg">
                                                {formData.imageUrl ? (
                                                    <Image
                                                        fill
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
                                        <p>Image Size Should Be 800 x 500.</p>
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
                                    htmlFor="short_description"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Short description
                                </label>
                                <textarea
                                    className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                                    id="short_description"
                                    name="short_description"
                                    rows={5}
                                    value={formData.short_description}
                                    onChange={handleChange}
                                    placeholder="Enter blog short_description"
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
                                <QuillEditor value={formData.description} onChange={handleEditorChange} />

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
                                {isSubmitting ? 'Updating...' : 'Update'}
                            </button>
                            <Link href={'/admin/blogs'} className="bg-blue-500 text-white py-[.7rem] px-7 rounded gap-1">Show all</Link>
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

                        <div className="bg-white text-black p-6 rounded-lg space-y-5 shadow-md shadow-black-300">
                            <div>
                                <label
                                    htmlFor="author"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Author *
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                                    id="author"
                                    name="author"
                                    type="text"
                                    value={formData.author}
                                    onChange={handleChange}
                                    placeholder="Enter Author"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="metaTitle"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Meta title
                                </label>
                                <input
                                    className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
                                    id="metaTitle"
                                    name="metaTitle"
                                    type="text"
                                    value={formData.metaTitle}
                                    onChange={handleChange}
                                    placeholder="Enter Meta title"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="metaKeywords"
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
                                    htmlFor="metaDescription"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Meta Description
                                </label>
                                <textarea
                                    className="flex w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 mt-1"
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
            </form >
        </>
    );
};

export default BlogEdit;