'use client';

import { useEffect, useState, useCallback } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';
import { Pagination } from '@/components/admin/Pagination';
import { toast } from 'react-toastify';
import { RiLoader2Line } from 'react-icons/ri';
import { getAllUsers } from '@/_services/admin/user';
import Link from 'next/link';

interface IUser {
    _id: number;
    username: string;
    email: string;
    number: string;
    isVerified: boolean;
    isBlocked: boolean;
    role: string;
    createdAt: string;
}

interface Pagination {
    total: number;
    pages: number;
    page: number;
    limit: number;
}

export default function UserPage() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const [users, setUsers] = useState<IUser[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const page = searchParams?.get('page') || '1';
    const search = searchParams?.get('search') || '';

    const fetchOrdes = useCallback(async () => {
        try {
            setIsLoading(true);
            const response = await getAllUsers(page, search);
            setUsers(response.users);
            setPagination(response.pagination);
        } catch (error) {
            console.error('Failed to fetch users:', error);
            toast.error('Failed to fetch users');
        } finally {
            setIsLoading(false);
        }
    }, [page, search]);

    useEffect(() => {
        fetchOrdes();
    }, [fetchOrdes]);

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
        <>
            <div className="max-w-10xl mx-auto lg:px-10 py-20">
                <div className="w-full mb-5">
                    <div className="bg-white text-black flex justify-between align-middle p-6 rounded-lg shadow-md">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900">Users</h2>
                            <p className="text-gray-600">Manage users and optimize accounts</p>
                        </div>
                    </div>
                </div>

                <div className="bg-white px-5 py-10">
                    <div className="mb-6 flex justify-between items-center">
                        <div className="relative hidden sm:block mt-4">
                            <FaSearch className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
                            <input
                                type="search"
                                placeholder="Search users..."
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
                                        <th className="py-3 px-4">Name</th>
                                        <th className="py-3 px-4">Email</th>
                                        <th className="py-3 px-4">Number</th>
                                        <th className="py-3 px-4">isVerified</th>
                                        <th className="py-3 px-4">Role</th>
                                        <th className="py-3 px-4">Created At</th>
                                        <th className="py-3 px-4">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {users.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="py-3 px-4 text-center">
                                                No users found.
                                            </td>
                                        </tr>
                                    ) : (
                                        users.map((user) => (
                                            <tr key={user._id} className="border-b hover:bg-gray-50">
                                                <td className="py-3 px-4">{user.username || 'N/A'}</td>
                                                <td className="py-3 px-4">{user.email || 'N/A'}</td>
                                                <td className="py-3 px-4">{user.number || 'N/A'}</td>
                                                <td className="py-3 px-4">{user.isVerified ? 'Verified' : 'Not Verified'}</td>
                                                <td className="py-3 px-4">{user.role || 'N/A'}</td>
                                                <td className="py-3 px-4">{new Date(user.createdAt).toLocaleDateString()}</td>
                                                <td className="py-3 px-4">
                                                    <Link href={`/admin/users/${user._id}`}>
                                                        <button className="text-blue-500 hover:underline">View</button>
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
        </>

    );
}
