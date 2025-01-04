"use client"

import { Suspense, useCallback, useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { RiLoader2Line } from 'react-icons/ri';
import Link from 'next/link';
import { Pagination } from '@/components/admin/Pagination';
import { IOrder } from '@/lib/types/order';
import { get_all_orders_of_user } from '@/_services/common/order';
import { toast } from 'react-toastify';

export default function OrderPage() {
    const searchParams = useSearchParams();
    const [orders, setOrders] = useState<IOrder[]>([]);
    const [pagination, setPagination] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const page = searchParams?.get('page') || '1';
    const search = searchParams?.get('search') || '';
    const status = searchParams?.get('status') || '';

    const fetchOrders = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await get_all_orders_of_user(page, search, status);
            const data = response.data;
            setOrders(data.orders);
            setPagination(data.pagination);
        } catch (error) {
            console.error('Failed to fetch orders:', error);
            toast.error('Failed to fetch orders');
        } finally {
            setIsLoading(false);
        }
    }, [page, search, status]);

    useEffect(() => {
        fetchOrders();
    }, [fetchOrders]);

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

    return (
        <Suspense fallback={<div>Loading...</div>}>
            <div className="max-w-10xl mx-auto lg:px-10 py-20">
                <div className="w-full md:w-12/12 lg:w-12/12 mb-5">
                    <div className="bg-white text-black flex justify-between align-middle p-6 rounded-lg shadow-md">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Orders</h2>
                            <p className="text-gray-600">Manage orders and shipping</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white px-5 py-10">
                    <div className="mb-6 flex justify-between items-center">
                        <div className="relative hidden sm:block mt-4">
                            <FaSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search orders..."
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
                                        <th className="py-3 px-4">Order ID</th>
                                        <th className="py-3 px-4">Placed On</th>
                                        <th className="py-3 px-4">Amount</th>
                                        <th className="py-3 px-4">Items</th>
                                        <th className="py-3 px-4">Status</th>
                                        <th className="py-3 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="py-3 px-4 text-center">
                                                No orders found.
                                            </td>
                                        </tr>
                                    ) : (
                                        orders.map((order, index) => (
                                            <tr key={index} className="border-b hover:bg-gray-50">
                                                <td className="py-3 px-4">{order.orderId}</td>
                                                <td className="py-3 px-4">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </td>
                                                <td className="py-3 px-4">{order.totalAmount.toFixed(2)}</td>
                                                <td className="py-3 px-4">{order.totalquantity}</td>
                                                <td className="py-3 px-4">{order.status}</td>
                                                <td className="py-3 px-4">
                                                    <Link
                                                        target="_blank"
                                                        href={`/orders/${order._id}`}
                                                        className="text-blue-500 hover:underline"
                                                    >
                                                        View Details
                                                    </Link>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>

                    {pagination && (
                        <Pagination pagination={pagination} onPageChange={handlePageChange} />
                    )}
                </div>
            </div>
        </Suspense>
    );
}


