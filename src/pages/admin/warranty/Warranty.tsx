'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { RiArrowDropLeftLine, RiArrowDropRightLine, RiDeleteBin2Line, RiEdit2Fill, RiLoader2Line, RiSkipLeftLine, RiSkipRightLine } from 'react-icons/ri';
import { toast } from 'react-toastify';
import type { Warranty, PaginationData } from '@/lib/types';
import { add_new_warranty, delete_warranty, get_all_warranty_pagination, update_warranty } from '@/_services/admin/warranty';
import Swal from 'sweetalert2';
import { WarrantyForm } from '@/components/admin/warranty/WarrantyForm';
import { Pagination } from '@/components/admin/Pagination';


export default function Warranty() {
    const [warranties, setWarranties] = useState<Warranty[]>([]);
    const [pagination, setPagination] = useState<PaginationData>();
    const [isLoading, setIsLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        warrantyType: '',
        durationMonths: '',
        coverage: '',
        claimProcess: '',
    });

    const page = searchParams?.get('page') || '1';
    const search = searchParams?.get('search') || '';

    useEffect(() => {
        fetchWarranty();
    }, [page, search]);

    async function fetchWarranty() {
        try {
            setIsLoading(true);
            const data = await get_all_warranty_pagination(page, search) as any
            setWarranties(data.warranty);
            setPagination(data.pagination);
        } catch (error) {
            console.error('Failed to fetch Warranty:', error);
            toast.error('Failed to fetch Warranty')
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
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        try {
            if (editingId) {
                await update_warranty(editingId, formData);
                toast.success('Warranty updated successfully');
            } else {
                await add_new_warranty(formData);
                toast.success('Warranty added successfully');
            }
            fetchWarranty();
            handleCloseModal();
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setIsSubmitting(false);
        }

    };



    const editWarrantyInfo = (id: string) => {
        const warrantyToEdit = warranties.find(warranty => warranty._id === id);
        if (warrantyToEdit) {
            setFormData({
                warrantyType: warrantyToEdit.warrantyType,
                durationMonths: warrantyToEdit.durationMonths,
                coverage: warrantyToEdit.coverage,
                claimProcess: warrantyToEdit.claimProcess,
            });
            setEditingId(id);
            setIsOpen(true);
        }
    }

    const handleCloseModal = () => {
        setIsOpen(false);
        setEditingId(null);
        setFormData({
            warrantyType: '',
            durationMonths: '',
            coverage: '',
            claimProcess: '',
        });
    };

    const deleteWarrantyInfo = (id: string) => {
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
                    await delete_warranty(id);
                    setWarranties(prev => prev.filter(warranty => warranty._id !== id));
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your warranty has been deleted.",
                        icon: "success"
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "There was an issue deleting the warranty.",
                        icon: "error"
                    });
                }
            }
        });
    }


    return (
        <>
            <div className="max-w-10xl mx-auto lg:px-10 py-20">


                <div className="w-full md:w-12/12 lg:w-12/12 mb-5">
                    <div className=" bg-white text-black flex justify-between align-middle p-6 rounded-lg shadow-md shadow-black-300">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">All Warranty</h2>
                            <p className="text-gray-600">
                                List a new warranty and description.
                            </p>
                        </div>
                        <div>
                            {/* <Link href={'/admin/categories/add'} className="bg-blue-500 text-white py-1 px-6 rounded">Add</Link> */}
                            <button
                                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                onClick={() => setIsOpen(true)}
                            >
                                Add
                            </button>



                        </div>
                    </div>
                </div>

                <div className="bg-white px-5 py-10">

                    {/* Search Section */}
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

                    {/* Category Table */}
                    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                        {isLoading ? (
                            <div className="flex justify-center py-8">
                                <RiLoader2Line className="h-8 w-8 text-blue-500 animate-spin" />
                            </div>
                        ) : (
                            <table className="min-w-full table-auto text-left text-sm text-gray-600">
                                <thead>
                                    <tr className="bg-gray-100 border-b">
                                        <th className="py-3 px-4">Type</th>
                                        <th className="py-3 px-4">Duration</th>
                                        <th className="py-3 px-4">Coverage</th>
                                        <th className="py-3 px-4">Claim Process</th>
                                        <th className="py-3 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {
                                        warranties.length === 0 ? (
                                            <tr>
                                                <td colSpan={4} className="py-3 px-4 text-center">No categories found.</td>
                                            </tr>
                                        ) : (warranties.map((warranty) => (
                                            <tr key={warranty._id} className="border-b hover:bg-gray-50">
                                                <td className="py-3 px-4">{warranty.warrantyType.toLocaleUpperCase()}</td>
                                                <td className="py-3 px-4">{warranty.durationMonths} months</td>
                                                <td className="py-3 px-4">{warranty.coverage}</td>
                                                <td className="py-3 px-4">{warranty.claimProcess}</td>
                                                <td>
                                                    <div className="flex space-x-2">
                                                        <button
                                                            onClick={() => editWarrantyInfo(warranty._id)}
                                                            className="bg-blue-500 text-white py-2 px-2 rounded-full"
                                                        >
                                                            <RiEdit2Fill />
                                                        </button>
                                                        <button
                                                            onClick={() => deleteWarrantyInfo(warranty._id)}
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

                    {/* Pagination Information */}
                    {pagination && (
                        <Pagination
                            pagination={pagination}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>
            </div>


            {isOpen && (
                <WarrantyForm
                    formData={formData}
                    isSubmitting={isSubmitting}
                    onSubmit={handleSubmit}
                    onChange={handleChange}
                    onClose={handleCloseModal}
                    mode={editingId ? 'edit' : 'add'}
                />
            )}
        </>
    );
}
