'use client'

import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import ProductSidebar from "@/components/products/ProductSidebar";
import ProductCart from "@/components/products/ProductCart";
import ProductsPagination from "@/components/products/ProductsPagination";
import { PaginationData, ProductFormData } from "@/lib/types";
import { toast } from "react-toastify";
import { get_all_products } from "@/_services/admin/product";
import { useSearchParams } from "next/navigation";
import { RiLoader2Line } from "react-icons/ri";

function Products() {
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationData>();
  const searchParams = useSearchParams();
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

  useEffect(() => {
    fetchProducts();
  }, [page, search]);



  if (loading) {
    return (
      <div className="flex flex-wrap mt-20 mb-52 justify-center items-center">
        <div className="text-center h-screen mx-auto">
          <p className="font-serif text-4xl text-brown-800">Loading...</p>
          <div className="flex justify-center mt-4">
            <RiLoader2Line className="mr-2 h-12 w-12 animate-spin" />
          </div>

        </div>
      </div>
    );
  }

  return (
    <>
      {/* Breadcrumb */}

      <Breadcrumb title={"Shop Page"} />

      {/* Shop section */}
      <section className="section-shop pb-[50px] max-[1199px]:pb-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">
            <div className="min-[992px]:w-[25%] w-full px-[12px] mb-[24px]">
              <ProductSidebar />
            </div>
            <div className="min-[992px]:w-[75%] w-full px-[12px] mb-[24px]">
              <div className="bb-shop-pro-inner">
                <div className="flex flex-wrap mx-[-12px] mb-[-24px]">
                  <div className="w-full px-[12px]">
                    <div className="bb-pro-list-top mb-[24px] rounded-[20px] flex bg-[#f8f8fb] border-[1px] border-solid border-[#eee] justify-between">
                      <div className="flex flex-wrap w-full">
                        <div className="w-[50%] px-[12px] max-[420px]:w-full">
                          <div className="bb-bl-btn py-[10px] flex max-[420px]:justify-center">
                            <button
                              type="button"
                              className="grid-btn btn-grid-100 h-[38px] w-[38px] flex justify-center items-center border-[0] p-[5px] bg-transparent mr-[5px] active"
                              title="grid"
                            >
                              <i className="ri-apps-line text-[20px]" />
                            </button>
                            <button
                              type="button"
                              className="grid-btn btn-list-100 h-[38px] w-[38px] flex justify-center items-center border-[0] p-[5px] bg-transparent"
                              title="grid"
                            >
                              <i className="ri-list-unordered text-[20px]" />
                            </button>
                          </div>
                        </div>
                        <div className="w-[50%] px-[12px] max-[420px]:w-full">
                          <div className="bb-select-inner h-full py-[10px] flex items-center justify-end max-[420px]:justify-center">
                            <div className="custom-select w-[130px] mr-[30px] flex justify-end text-[#777]  items-center text-[14px] relative max-[420px]:w-[100px] max-[420px]:justify-left">
                              <select defaultValue={1} className="p-1">
                                <option value={0} disabled> Sort by </option>
                                <option value={3}>Name, A to Z</option>
                                <option value={4}>Name, Z to A</option>
                                <option value={5}>Price, low to high</option>
                                <option value={6}>Price, high to low</option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>



                  {
                    products.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="py-3 px-4 text-center">No categories found.</td>
                      </tr>
                    ) : (
                      products.map((product, index) => (
                        <ProductCart product={product} key={index} />
                      ))
                    )
                  }




                  <ProductsPagination />


                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Products;
