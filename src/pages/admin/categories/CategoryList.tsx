'use client';

import { useEffect, useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaSearch } from 'react-icons/fa';
import { RiArrowDropLeftLine, RiArrowDropRightLine, RiDeleteBin2Line, RiEdit2Fill, RiLoader2Line, RiSkipLeftLine, RiSkipRightLine } from 'react-icons/ri';
import Swal from 'sweetalert2';
import { delete_categories, getAllCatPagination, update_category_status } from '@/_services/admin/category';
import { toast } from 'react-toastify';
import type { PaginationData } from '@/lib/types';
import Link from 'next/link';
import { CategoryFormData } from '@/lib/types/category';


export default function CategoryList() {

  const [categories, setCategories] = useState<CategoryFormData[]>([]);
  const [pagination, setPagination] = useState<PaginationData>();
  const [isLoading, setIsLoading] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  const page = searchParams?.get('page') || '1';
  const search = searchParams?.get('search') || '';

  useEffect(() => {
    fetchCategories();
  }, [page, search]);

  async function fetchCategories() {
    try {
      setIsLoading(true);
      const data = await getAllCatPagination(page, search)
      setCategories(data?.categories);
      setPagination(data?.pagination);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      toast.error('Failed to fetch categories')
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




  const deleteCategory = async (id: string) => {
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
          await delete_categories(id);
          setCategories(prevCategories => prevCategories.filter(category => category._id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Your category has been deleted.",
            icon: "success"
          });
        } catch (error) {
          if (error instanceof Error) {

            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the category.",
              icon: "error"
            });
          } else {
            Swal.fire({
              title: "Error!",
              text: "There was an issue deleting the category.",
              icon: "error"
            });
          }
        }
      }
    });
  };


  const editCategory = async (id: string) => {
    router.push(`/admin/categories/edit/${id}`);
  }


  const handleStatusToggle = (categoryId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;

    setCategories((prevCategories) =>
      prevCategories.map((category) =>
        category._id === categoryId ? { ...category, status: newStatus } : category
      )
    );
    updateCategoryStatus(categoryId, newStatus);
  };




  const updateCategoryStatus = async (categoryId: string, newStatus: boolean) => {
    try {
      setIsLoading(true);
      await update_category_status(categoryId, newStatus)
      toast.success('Status updated successfully')
    } catch (error) {
      console.error('Error updating category status:', error);
      toast.error('Error updating category status');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-10xl mx-auto lg:px-10 py-20">
        <div className="w-full md:w-12/12 lg:w-12/12 mb-5">
          <div className=" bg-white text-black flex justify-between align-middle p-6 rounded-lg shadow-md shadow-black-300">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">All Category</h2>
              <p className="text-gray-600">
                List a new category with an image and description.
              </p>
            </div>
            <div>
              <Link href={'/admin/categories/add'} className="bg-blue-500 text-white py-1 px-6 rounded">Add</Link>
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
                    <th className="py-3 px-4 font-semibold">Image</th>
                    <th className="py-3 px-4 font-semibold">Name</th>
                    <th className="py-3 px-4 font-semibold">Slug</th>
                    <th className="py-3 px-4 font-semibold">Level</th>
                    <th className="py-3 px-4 font-semibold">Status</th>
                    <th className="py-3 px-4 font-semibold">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-3 px-4 text-center">No categories found.</td>
                    </tr>
                  ) : (categories.map((category) => (
                    <tr key={category._id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">
                        {category.image?.url ? (
                          <div className="relative w-12 h-12">
                            <Image
                              src={category.image.url}
                              alt={category.name}
                              height={40}
                              width={40}
                              className="object-cover rounded-full"
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 bg-gray-200 rounded-full" />
                        )}
                      </td>
                      <td className="py-3 px-4">{category.name}</td>
                      <td className="py-3 px-4">{category.slug}</td>
                      <td className="py-3 px-4">{category.level}</td>
                      <td>
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={category.status}
                            onChange={() => handleStatusToggle(category._id || '', category.status)}
                            className="sr-only peer"
                          />
                          <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                          <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {category.status ? "Active" : "Inactive"}
                          </span>
                        </label>
                      </td>
                      <td>
                        <div className='flex space-x-2'>
                          <button
                            onClick={() => editCategory(category._id || '')}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full">
                            <RiEdit2Fill />
                          </button>
                          <button
                            onClick={() => deleteCategory(category._id || '')}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded-full">
                            <RiDeleteBin2Line />
                          </button>

                        </div>
                      </td>
                    </tr>
                  )))}
                </tbody>
              </table>
            )}
          </div>

          {/* Pagination Information */}
          {pagination && (
            <div className="flex justify-between items-center mt-6">
              <div className="text-gray-600">
                <span>{`Total: ${pagination.total}`}</span>
                <span className="ml-4">{`Page: ${pagination.page} of ${pagination.pages}`}</span>
              </div>

              {/* Pagination Controls */}
              <div className="flex items-center gap-4">
                <button
                  disabled={pagination.page <= 1}
                  onClick={() => handlePageChange(1)}
                  className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-full disabled:opacity-50"
                >
                  <RiSkipLeftLine />
                </button>
                <button
                  disabled={pagination.page <= 1}
                  onClick={() => handlePageChange(pagination.page - 1)}
                  className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:opacity-50"
                >
                  <RiArrowDropLeftLine />
                </button>

                {/* Page Number Buttons */}
                {pagination.pages > 1 && (
                  <div className="flex gap-2">
                    {Array.from({ length: pagination.pages }, (_, index) => (
                      <button
                        key={index}
                        onClick={() => handlePageChange(index + 1)}
                        className={`px-1 py-1 w-8 h-8 rounded-full text-sm ${pagination.page === index + 1
                          ? 'bg-blue-500 text-white'
                          : 'bg-white text-blue-500 border border-gray-300 hover:bg-blue-50'
                          }`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>
                )}

                <button
                  disabled={pagination.page >= pagination.pages}
                  onClick={() => handlePageChange(pagination.page + 1)}
                  className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:opacity-50"
                >
                  <RiArrowDropRightLine />
                </button>
                <button
                  disabled={pagination.page >= pagination.pages}
                  onClick={() => handlePageChange(pagination.pages)}
                  className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 disabled:opacity-50"
                >
                  <RiSkipRightLine />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
