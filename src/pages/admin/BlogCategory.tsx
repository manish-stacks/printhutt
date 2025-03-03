'use client';

import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { Pagination } from '@/components/admin/Pagination';
import { toast } from 'react-toastify';
import { RiDeleteBin2Line, RiEdit2Fill, RiLoader2Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { BlogCategoryForm } from '@/components/admin/blog/BlogCategoryForm';
import { blogCategoryService } from '@/_services/admin/blog';

export default function BlogCategory() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [blogCategories, setBlogCategories] = useState<any[]>([]);
    const [pagination, setPagination] = useState<number>();
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        isActive: '',
    });

    const searchParams = useSearchParams();
    const router = useRouter();
    const page = searchParams?.get('page') || '1';
    const search = searchParams?.get('search') || '';

    const fetchBlogCategories = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await blogCategoryService.getAll(page, search);
            setBlogCategories(response.blogCategories);
            setPagination(response.pagination);
        } catch {
            toast.error('Failed to fetch Blog Categories');
        } finally {
            setIsLoading(false);
        }
    }, [page, search]);

    useEffect(() => {
        fetchBlogCategories();
    }, [fetchBlogCategories]);

    const handleSearch = (value: string) => {
        const params = new URLSearchParams(searchParams!);
        if (value) {
            params.set('search', value);
        } else {
            params.delete('search');
        }
        params.set('page', '1');
        router.push(`?${params.toString()}`);
    };

    const handlePageChange = (newPage: number) => {
        const params = new URLSearchParams(searchParams!);
        params.set('page', newPage.toString());
        router.push(`?${params.toString()}`);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formDataToSend = new FormData();

        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, String(value));
        });

        try {
            if (editingId) {
                await blogCategoryService.update(editingId, formDataToSend);
                toast.success('Blog Category updated successfully');
            } else {
                await blogCategoryService.create(formDataToSend);
                toast.success('Blog Category created successfully');
            }
            await fetchBlogCategories();
            handleCloseModal();
        } catch {
            toast.error('Failed to save Blog Category');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (id: string) => {
        const ToEdit = blogCategories.find(category => category._id === id);
        if (ToEdit) {
            setFormData({
                name: ToEdit.name,
                isActive: ToEdit.isActive ? 'true' : 'false',
            });
            setEditingId(id);
            setIsOpen(true);
        }
    };

    const handleDelete = async (id: string) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await blogCategoryService.delete(id);

                    if (!response.success) {
                        throw new Error('There was an issue deleting the category.');
                    }

                    setBlogCategories(prev => prev.filter(category => category._id !== id));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Category has been deleted.",
                        icon: "success"
                    });
                } catch {
                    Swal.fire({
                        title: "Error!",
                        text: "There was an issue deleting the category.",
                        icon: "error"
                    });
                }
            }
        });
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setEditingId(null);
        setFormData({
            name: '',
            isActive: '',
        });
    };

    return (
        <>
            <div className="max-w-10xl mx-auto lg:px-10 py-20">
                <div className="w-full md:w-12/12 lg:w-12/12 mb-5">
                    <div className="bg-white text-black flex justify-between align-middle p-6 rounded-lg shadow-md">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Blog Category</h2>
                        </div>
                        <div>
                            <button
                                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                onClick={() => setIsOpen(true)}
                            >
                                Add Blog Category
                            </button>
                        </div>
                    </div>
                </div>

                <div className="bg-white px-5 py-10">
                    <div className="mb-6 flex justify-between items-center">
                        <div className="relative hidden sm:block mt-4">
                            <FaSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search categories..."
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-80 rounded-lg border border-gray-200 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                        {isLoading ? (
                            <div className="flex justify-center py-8">
                                <RiLoader2Line className="h-8 w-8 text-blue-500 animate-spin" />
                            </div>
                        ) : (
                            <table className="min-w-full table-auto text-left text-sm text-gray-600">
                                <thead>
                                    <tr className="bg-gray-100 border-b">
                                        <th className="py-3 px-4">Category Name</th>
                                        <th className="py-3 px-4">Status</th>
                                        <th className="py-3 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {blogCategories.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="py-3 px-4 text-center">No categories found.</td>
                                        </tr>
                                    ) : (
                                        blogCategories.map((category) => (
                                            <tr key={category._id} className="border-b hover:bg-gray-50">
                                                <td className="py-3 px-4">{category.name}</td>
                                                <td className="py-3 px-4">
                                                    <span className={`px-2 py-1 rounded-full text-xs ${category.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                                                        }`}>
                                                        {category.isActive ? 'Active' : 'Inactive'}
                                                    </span>
                                                </td>
                                                <td className="py-3 px-4">
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => handleEdit(category._id)}
                                                            className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                                                        >
                                                            <RiEdit2Fill />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDelete(category._id)}
                                                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600"
                                                        >
                                                            <RiDeleteBin2Line />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {pagination && (
                        <Pagination
                            pagination={pagination}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>

                {isOpen && (
                    <BlogCategoryForm
                        formData={formData}
                        isSubmitting={isSubmitting}
                        onSubmit={handleSubmit}
                        onChange={handleChange}
                        onClose={handleCloseModal}
                        mode={editingId ? 'edit' : 'add'}
                    />
                )}
            </div>
        </>
    );
}