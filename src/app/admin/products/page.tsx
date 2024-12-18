"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSearchParams, useRouter } from 'next/navigation';
import { delete_a_product, get_all_products, update_product_status } from '@/_services/admin/product';
import { toast } from 'react-toastify';
import Link from 'next/link';
import { FaSearch } from 'react-icons/fa';
import { RiDeleteBin2Line, RiEdit2Fill, RiLoader2Line } from 'react-icons/ri';
import Image from 'next/image';
import { PaginationData } from '@/lib/types';
import { Pagination } from '@/components/admin/Pagination';
import Swal from 'sweetalert2';

const ProductList: React.FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationData>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const page = searchParams?.get('page') || '1';
  const search = searchParams?.get('search') || '';


  const fetchProducts = async () => {
    try {
      const response = await get_all_products(page, search) as any;
      setProducts(response.products);
      setPagination(response.pagination);
    } catch (error) {
      toast.error('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  //console.log(products)

  useEffect(() => {
    fetchProducts();
  }, [page, search]);

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
          setLoading(true)
          await delete_a_product(id);
          setProducts(prev => prev.filter(product => product._id !== id));
          Swal.fire({
            title: "Deleted!",
            text: "Your category has been deleted.",
            icon: "success"
          });
        } catch (error) {
          Swal.fire({
            title: "Error!",
            text: "There was an issue deleting the category.",
            icon: "error"
          });
        } finally {
          setLoading(false)
        }
      }
    });
  };

  const handleStatusToggle = (categoryId: string, currentStatus: boolean) => {
    const newStatus = !currentStatus;

    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === categoryId ? { ...product, status: newStatus } : product
      )
    );

    try {
      update_product_status(categoryId, newStatus);
      toast.success("Status updated successfully")
    } catch (error) {
      toast.error('Failed to fetch products');
      setLoading(false);
    }
  };
  const editHandel = async (id: string) => {
    router.push(`/admin/products/edit/${id}`);
  }
  return (
    <div className="max-w-10xl mx-auto lg:px-10 py-20">

      <div className="w-full md:w-12/12 lg:w-12/12 mb-5">
        <div className=" bg-white text-black flex justify-between align-middle p-6 rounded-lg shadow-md shadow-black-300">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">All Products</h2>
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
              placeholder="Search product..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-80 rounded-lg border border-gray-200 py-2 pl-10 pr-4 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Category Table */}
        <div className="overflow-x-auto bg-white shadow-md rounded-lg">
          {loading ? (
            <div className="flex justify-center py-8">
              <RiLoader2Line className="h-8 w-8 text-blue-500 animate-spin" />
            </div>
          ) : (
            <table className="min-w-full table-auto text-left text-sm text-gray-600">
              <thead>
                <tr className="bg-gray-100 border-b">
                  <th className="py-3 px-4 font-semibold">Image</th>
                  <th className="py-3 px-4 font-semibold">Name</th>
                  <th className="py-3 px-4 font-semibold">Price</th>
                  <th className="py-3 px-4 font-semibold">Category</th>
                  <th className="py-3 px-4 font-semibold">Stock</th>
                  <th className="py-3 px-4 font-semibold">Type</th>
                  <th className="py-3 px-4 font-semibold">Status</th>
                  <th className="py-3 px-4 font-semibold">Action</th>
                </tr>
              </thead>
              <tbody>
                {products.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-3 px-4 text-center">No categories found.</td>
                  </tr>
                ) : (products.map((product) => (
                  <tr key={product._id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      {product.thumbnail?.url ? (
                        <div className="relative w-12 h-12">
                          <Image
                            src={product?.thumbnail?.url}
                            alt={product?.title}
                            height={40}
                            width={40}
                            className="object-cover rounded-full"
                          />
                        </div>
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded-full" />
                      )}
                    </td>
                    <td className="py-3 px-4">{product.title}</td>
                    <td className="py-3 px-4">{`₹${product.price.toFixed(2)}`}</td>
                    <td className="py-3 px-4">
                      {product.category.name}
                      {product.subcategory && (
                        <>
                          <br />
                          <span>{`-- ${product.subcategory.name}`}</span>
                        </>
                      )}
                    </td>
                    <td className="py-3 px-4">{product.stock}</td>
                    <td className="py-3 px-4" style={{ color: product.isCustomize ? 'green' : 'blue' }}>
                      {product.isCustomize ? 'Customize' : <span>Pre</span>}
                    </td>
                    <td>
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={product.status}
                          onChange={() => handleStatusToggle(product._id || '', product.status)}
                          className="sr-only peer"
                        />
                        <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
                        <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">
                          {product.status ? "Active" : "Inactive"}
                        </span>
                      </label>
                    </td>
                    <td>
                      <div className='flex space-x-2'>
                        <button
                          onClick={() => editHandel(product._id || '')}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded-full">
                          <RiEdit2Fill />
                        </button>
                        <button
                          onClick={() => handleDelete(product._id || '')}
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
          <Pagination
            pagination={pagination}
            onPageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default ProductList;
