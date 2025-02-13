"use client";
import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import UserSidebar from "@/components/user/user-sidebar";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { Pagination } from "@/components/admin/Pagination";
import { RiLoader2Line } from "react-icons/ri";
import { IOrder } from "@/lib/types/order";
import { get_all_orders_of_user } from "@/_services/common/order";
import { FaDownload, FaEye, FaSearch } from "react-icons/fa";
import Link from "next/link";
import LoadingSpinner from "@/components/LoadingSpinner";

const UserOrdersPage = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [pagination, setPagination] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams?.get('page') || '1';
  const search = searchParams?.get('search') || '';

  async function fetchOrders() {
    try {
      setIsLoading(true);
      const data = await get_all_orders_of_user(page, search, '')
      setOrders(data.orders);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Failed to fetch return methods:', error);
      toast.error('Failed to fetch return methods');
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    fetchOrders();
  }, [page, search]);

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


  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <>

      <Breadcrumb title={"Orders"} />

      <section className="section-about py-[50px] max-[1199px]:py-[35px]">
        <div className="flex flex-wrap justify-between items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">
            <UserSidebar activemenu={'orders'} />
            <div className="flex-1 p-6 pt-0">
              <div className="bg-purple-600 text-white rounded-lg p-8 flex items-center justify-between mb-6 w-full max-w-full">
                <div className="flex items-center space-x-4">
                  <div>
                    <h2 className="text-lg font-semibold">Order History</h2>
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
                          <th className="py-3 px-4">orderId</th>
                          <th className="py-3 px-4">Placed on</th>
                          <th className="py-3 px-4">Amount</th>
                          <th className="py-3 px-4">Items</th>
                          <th className="py-3 px-4">Status</th>
                          <th className="py-3 px-4 text-center">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.length === 0 ? (
                          <tr>
                            <td colSpan={6} className="py-3 px-4 text-center">No offers found.</td>
                          </tr>
                        ) : (
                          orders.map((order, index) => (
                            <tr key={index} className="border-b hover:bg-gray-50">
                              <td className="py-3 px-4">{order.orderId}</td>
                              <td className="py-3 px-4">{new Date(order.createdAt).toLocaleDateString()}</td>
                              <td className="py-3 px-4">{order.totalAmount.discountPrice.toFixed(2)}</td>
                              <td className="py-3 px-4">{order.totalQuantity}</td>
                              <td className="py-3 px-4">{order.status}</td>
                              <td className="py-3 px-4">
                                <div className="flex justify-center space-x-2">
                                  <Link
                                    href={`/orders/${order._id}`}
                                    className="text-blue-700 px-2 py-2 bg-blue-300 rounded-full"
                                  >
                                    <FaEye />
                                  </Link>
                                  <Link
                                    target="_blank"
                                    href={`/orders/${order._id}/billing`}
                                    className="text-rose-700 px-2 py-2 bg-rose-300 rounded-full"
                                  >
                                    <FaDownload />
                                  </Link>
                                  {
                                    order?.shipment?.trackingId && (
                                      <Link
                                        href={`/user/order-track/${order?.shipment?.trackingId}`}
                                        className="text-blue-700 underline"
                                      >
                                        Track
                                      </Link>
                                    )
                                  }
                                 
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
            </div>
          </div>
        </div>
      </section>
    </>

  );
};

export default UserOrdersPage; 
