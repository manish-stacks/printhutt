'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import { addNewShipping, deleteShipping, getAllShippingPagination, updateShipping } from '@/_services/admin/shipping';
import type { PaginationData, ShippingInformation } from '@/lib/types';
import { Pagination } from '@/components/admin/Pagination';
import { ShippingForm } from '@/components/admin/shipping/ShippingForm';
import { RiDeleteBin2Line, RiEdit2Fill, RiLoader2Line } from 'react-icons/ri';

export default function ShippingPage() {
    const [shippingMethods, setShippingMethods] = useState<ShippingInformation[]>([]);
    const [pagination, setPagination] = useState<PaginationData>();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState<Partial<ShippingInformation>>({
        shippingMethod: '',
        shippingFee: 0,
        shippingTime: '',
        isFreeShipping: false,
    });

    const searchParams = useSearchParams();
    const router = useRouter();
    const page = searchParams?.get('page') || '1';
    const search = searchParams?.get('search') || '';

    useEffect(() => {
        fetchShippingMethods();
    }, [page, search]);

    async function fetchShippingMethods() {
        try {
            setIsLoading(true);
            const data = await getAllShippingPagination(page, search);
            setShippingMethods(data.shipping);
            setPagination(data.pagination);
        } catch (error) {
            console.error('Failed to fetch shipping methods:', error);
            toast.error('Failed to fetch shipping methods');
        } finally {
            setIsLoading(false);
        }
    }

    function handleSearch(value: string) {
        const params = new URLSearchParams(searchParams!);
        if (value) {
            params.set('search', value);
        } else {
            params.delete('search');
        }
        params.set('page', '1');
        router.push(`?${params.toString()}`);
    }

    function handlePageChange(newPage: number) {
        const params = new URLSearchParams(searchParams!);
        params.set('page', newPage.toString());
        router.push(`?${params.toString()}`);
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (editingId) {
                await updateShipping(editingId, formData);
                toast.success('Shipping method updated successfully');
            } else {
                await addNewShipping(formData);
                toast.success('Shipping method added successfully');
            }
            fetchShippingMethods();
            handleCloseModal();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (id: string) => {
        const methodToEdit = shippingMethods.find(method => method._id === id);
        if (methodToEdit) {
            setFormData({
                shippingMethod: methodToEdit.shippingMethod,
                shippingFee: methodToEdit.shippingFee,
                shippingTime: methodToEdit.shippingTime,
                isFreeShipping: methodToEdit.isFreeShipping,
            });
            setEditingId(id);
            setIsOpen(true);
        }
    };

    const handleDelete = (id: string) => {
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
                    await deleteShipping(id);
                    setShippingMethods(prev => prev.filter(method => method._id !== id));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Shipping method has been deleted.",
                        icon: "success"
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "There was an issue deleting the shipping method.",
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
            shippingMethod: '',
            shippingFee: 0,
            shippingTime: '',
            isFreeShipping: false,
        });
    };

    return (
        <div className="max-w-10xl mx-auto lg:px-10 py-20">
            <div className="w-full md:w-12/12 lg:w-12/12 mb-5">
                <div className="bg-white text-black flex justify-between align-middle p-6 rounded-lg shadow-md shadow-black-300">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Shipping Methods</h2>
                        <p className="text-gray-600">Manage shipping methods and delivery options.</p>
                    </div>
                    <div>
                        <button
                            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            onClick={() => setIsOpen(true)}
                        >
                            Add
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
                            placeholder="Search shipping methods..."
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
                                    <th className="py-3 px-4">Method</th>
                                    <th className="py-3 px-4">Fee</th>
                                    <th className="py-3 px-4">Time</th>
                                    <th className="py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>

                                {
                                    shippingMethods.length === 0 ? (
                                        <tr>
                                            <td colSpan={4} className="py-3 px-4 text-center">No categories found.</td>
                                        </tr>
                                    ) : (shippingMethods.map((shipping) => (
                                        <tr key={shipping._id} className="border-b hover:bg-gray-50">
                                            <td className="py-3 px-4">{shipping.shippingMethod.toLocaleUpperCase()}</td>
                                            <td className="py-3 px-4">{shipping.shippingFee} months</td>
                                            <td className="py-3 px-4">{shipping.shippingTime}</td>
                                            <td>
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(shipping._id)}
                                                        className="bg-blue-500 text-white py-2 px-2 rounded-full"
                                                    >
                                                        <RiEdit2Fill />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(shipping._id)}
                                                        className="bg-red-500 text-white py-2 px-2 rounded-full"
                                                    >
                                                        <RiDeleteBin2Line />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    )))
                                }
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
                <ShippingForm
                    formData={formData}
                    isSubmitting={isSubmitting}
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                    onClose={handleCloseModal}
                    mode={editingId ? 'edit' : 'add'}
                />
            )}
        </div>
    );
}