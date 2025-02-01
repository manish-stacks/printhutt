'use client'
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { CouponTable } from '@/components/admin/coupon/CouponTable';
import { Pagination } from '@/components/admin/Pagination';
import { CouponForm } from '@/components/admin/coupon/CouponForm';

import Swal from 'sweetalert2';
import { addNewCoupon, deleteCoupon, getAllCouponsPagination, updateCoupon } from '@/_services/admin/coupon';
import { toast } from 'react-toastify';
import { CouponAttributes } from '@/lib/types/coupon';


export default function CouponPage() {

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<string | null>(null);

    const [coupons, setCoupons] = useState<CouponAttributes[]>([]);
    const [pagination, setPagination] = useState<number | undefined>(undefined);
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState({
        code: '',
        description: '',
        discountType: '',
        discountValue: '',
        minimumPurchaseAmount: '',
        maxDiscountAmount: '',
        validFrom: '',
        validUntil: '',
        usageLimit: '',
        isActive: true,
    });

    const searchParams = useSearchParams();
    const router = useRouter();
    const page = searchParams?.get('page') || '1';
    const search = searchParams?.get('search') || '';



    async function fetchCoupons() {
        try {
            setIsLoading(true);
            const response = await getAllCouponsPagination(page, search);
            
            const data = response?.coupons as unknown as { coupons: CouponAttributes[], pagination: number };
            setCoupons(data);
            setPagination(response?.pagination);
        } catch (error) {
            console.error('Failed to fetch return methods:', error);
            toast.error('Failed to fetch return methods');
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchCoupons();
    }, [page]);


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
            if (!formData) {
                throw new Error("Form data is empty or invalid.");
            }
    
            console.log("Submitting Form Data:", formData);
    
            const success = editingId
                ? await updateCoupon(editingId, formData)
                : await addNewCoupon(formData);
    
            if (success) {
                console.log("Coupon added/updated successfully.");
                try {
                    await fetchCoupons();
                } catch (fetchError) {
                    console.error("Failed to fetch coupons:", fetchError);
                }
                handleCloseModal?.();
            } else {
                throw new Error("Coupon operation failed.");
            }
        } catch (error) {
            console.error("Failed to add/edit coupon:", error);
        } finally {
            setIsSubmitting(false);
        }
    };
    

    const handleEdit = (id: string) => {
        const couponToEdit = coupons.find(coupon => coupon._id === id);
        if (couponToEdit) {
            setFormData({
                code: couponToEdit.code,
                description: couponToEdit.description,
                discountType: couponToEdit.discountType,
                discountValue: couponToEdit.discountValue.toString(),
                minimumPurchaseAmount: couponToEdit.minimumPurchaseAmount.toString(),
                maxDiscountAmount: couponToEdit.maxDiscountAmount?.toString() || '',
                validFrom: new Date(couponToEdit.validFrom).toISOString().slice(0, 16),
                validUntil: new Date(couponToEdit.validUntil).toISOString().slice(0, 16),
                usageLimit: couponToEdit.usageLimit?.toString() || '',
                isActive: couponToEdit.isActive,
            });
            setEditingId(id);
            setIsOpen(true);
        }
    };

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            try {
                await deleteCoupon(id);
                setCoupons(prev => prev.filter(coupon => coupon?._id !== id));
                Swal.fire({
                    title: "Deleted!",
                    text: "Coupon has been deleted.",
                    icon: "success"
                });
            } catch (error) {
                if (error instanceof Error) {
                    console.error('Error deleting coupon:', error.message);
                    Swal.fire({
                        title: "Error!",
                        text: "There was an issue deleting the coupon.",
                        icon: "error"
                    });
                } else {
                    console.error('Unexpected error:', error);
                    Swal.fire({
                        title: "Error!",
                        text: "There was an issue deleting the coupon.",
                        icon: "error"
                    });
                }
            }
        }
    };

    const handleCloseModal = () => {
        setIsOpen(false);
        setEditingId(null);
        setFormData({
            code: '',
            description: '',
            discountType: '',
            discountValue: '',
            minimumPurchaseAmount: '',
            maxDiscountAmount: '',
            validFrom: '',
            validUntil: '',
            usageLimit: '',
            isActive: true,
        });
    };

    return (
        <>
            <div className="max-w-10xl mx-auto lg:px-10 py-20">
                <div className="w-full md:w-12/12 lg:w-12/12 mb-5">
                    <div className="bg-white text-black flex justify-between align-middle p-6 rounded-lg shadow-md">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Coupon Management</h2>
                            <p className="text-gray-600">Create and manage discount coupons</p>
                        </div>
                        <div>
                            <button
                                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                                onClick={() => setIsOpen(true)}
                            >
                                Add Coupon
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
                                placeholder="Search coupons..."
                                value={search}
                                onChange={(e) => handleSearch(e.target.value)}
                                className="w-80 rounded-lg border border-gray-200 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                        </div>
                    </div>

                    <div className="overflow-x-auto bg-white shadow-md rounded-lg">
                        <CouponTable
                            coupons={coupons}
                            isLoading={isLoading}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                        />
                    </div>

                    {pagination && (
                        <Pagination
                            pagination={pagination}
                            onPageChange={handlePageChange}
                        />
                    )}
                </div>

                {isOpen && (
                    <CouponForm
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