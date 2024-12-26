'use client';

import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { Pagination } from '@/components/admin/Pagination';
import { OfferForm } from '@/components/admin/offer/OfferForm';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { createOffer, getOfferPolicies, modifyOffer, removeOffer } from '@/_services/admin/offer';

import { RiDeleteBin2Line, RiEdit2Fill, RiLoader2Line } from 'react-icons/ri';
import type { Offer } from '@/lib/types/offer';


export default function OfferPage() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [offers, setOffers] = useState<Offer[]>([]);
    const [pagination, setPagination] = useState<any>();
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState({
        offerTitle: '',
        offerDescription: '',
        discountPercentage: '',
        validFrom: '',
        validTo: '',
    });

    const searchParams = useSearchParams();
    const router = useRouter();
    const page = searchParams?.get('page') || '1';
    const search = searchParams?.get('search') || '';

    useEffect(() => {
        fetchOffers();
    }, [page, search]);

    async function fetchOffers() {
        try {
            setIsLoading(true);
            const data = await getOfferPolicies(page, search) as any;
            setOffers(data.returndata);
            setPagination(data.pagination);
        } catch (error) {
            console.error('Failed to fetch return methods:', error);
            toast.error('Failed to fetch return methods');
        } finally {
            setIsLoading(false);
        }
    }

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
        try {
            const success = editingId
                ? await modifyOffer(editingId, formData)
                : await createOffer(formData);

            if (success) {
                fetchOffers();
                handleCloseModal();
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleEdit = (id: string) => {
        const offerToEdit = offers.find(offer => offer._id === id);
        if (offerToEdit) {
            setFormData({
                offerTitle: offerToEdit.offerTitle,
                offerDescription: offerToEdit.offerDescription,
                discountPercentage: offerToEdit.discountPercentage ? offerToEdit.discountPercentage.toString() : '',
                validFrom: offerToEdit.validFrom ? new Date(offerToEdit.validFrom).toISOString().slice(0, 16) : '',
                validTo: offerToEdit.validTo ? new Date(offerToEdit.validTo).toISOString().slice(0, 16) : '',
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
                    await removeOffer(id);
                    setOffers(prev => prev.filter(method => method._id !== id));
                    Swal.fire({
                        title: "Deleted!",
                        text: "return-policy method has been deleted.",
                        icon: "success"
                    });
                } catch (error) {
                    Swal.fire({
                        title: "Error!",
                        text: "There was an issue deleting the return-policy method.",
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
            offerTitle: '',
            offerDescription: '',
            discountPercentage: '',
            validFrom: '',
            validTo: '',
        });
    };


    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleString();
    };

    return (
        <div className="max-w-10xl mx-auto lg:px-10 py-20">
            <div className="w-full md:w-12/12 lg:w-12/12 mb-5">
                <div className="bg-white text-black flex justify-between align-middle p-6 rounded-lg shadow-md">
                    <div>
                        <h2 className="text-2xl font-bold text-gray-900">Special Offers</h2>
                        <p className="text-gray-600">Manage promotional offers and discounts</p>
                    </div>
                    <div>
                        <button
                            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            onClick={() => setIsOpen(true)}
                        >
                            Add Offer
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
                            placeholder="Search offers..."
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
                                    <th className="py-3 px-4">Title</th>
                                    <th className="py-3 px-4">Description</th>
                                    <th className="py-3 px-4">Discount</th>
                                    <th className="py-3 px-4">Valid From</th>
                                    <th className="py-3 px-4">Valid To</th>
                                    <th className="py-3 px-4">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {offers.length === 0 ? (
                                    <tr>
                                        <td colSpan={6} className="py-3 px-4 text-center">No offers found.</td>
                                    </tr>
                                ) : (
                                    offers.map((offer) => (
                                        <tr key={offer._id} className="border-b hover:bg-gray-50">
                                            <td className="py-3 px-4">{offer.offerTitle}</td>
                                            <td className="py-3 px-4">{offer.offerDescription}</td>
                                            <td className="py-3 px-4">{offer.discountPercentage || 0}%</td>
                                            <td className="py-3 px-4">{offer.validFrom ? formatDate(offer.validFrom) : null}</td>
                                            <td className="py-3 px-4">{offer.validTo ? formatDate(offer.validTo) : null}</td>
                                            <td className="py-3 px-4">
                                                <div className="flex space-x-2">
                                                    <button
                                                        onClick={() => handleEdit(offer._id)}
                                                        className="bg-blue-500 text-white p-2 rounded-full hover:bg-blue-600"
                                                    >
                                                        <RiEdit2Fill />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(offer._id)}
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
                <OfferForm
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
