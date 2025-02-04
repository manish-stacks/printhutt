'use client'

import React, { useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { ProductSidebar } from "@/components/products/ProductSidebar";
import type { FilterState } from "@/lib/types";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductHeader } from "@/components/products/ProductHeader";
import ProductGrid from "@/components/products/ProductGrid";
import type { Product } from "@/lib/types/product";
import { Pagination } from "@/components/admin/Pagination";
import { productService } from "@/_services/common/productService";
import { categoryService } from "@/_services/common/categoryService";

function Products() {

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [pagination, setPagination] = useState();
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 10000],
    rating: null,
    tags: [],
    sort: 'newest',
    type:'all'
  })

  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || '1';
  const search = searchParams?.get('search') || '';
  const [categoriesData, setCategoriesData] = useState([]);


  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams({
        page,
        search,
        categories: filters.categories.join(','),
        minPrice: String(filters.priceRange[0]),
        maxPrice: String(filters.priceRange[1]),
        ...(filters.rating && { rating: String(filters.rating) }),
        tags: filters.tags.join(','),
        sort: filters.sort
      });
      const data = await productService.getAll(queryParams);
      const categories = await categoryService.getAll('all');
      setCategoriesData(categories?.categories);

      setProducts(data.products);
      setPagination(data.pagination);
  
    } catch (error) {
      if (error instanceof Error) {

        toast.error('Failed to fetch products')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [page, search, filters])

  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams!);
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    // console.log(newFilters)
    setFilters(prev => ({ ...prev, ...newFilters }));
    const params = new URLSearchParams(searchParams!);
    params.set('page', '1'); // Reset to first page on filter change
    router.push(`?${params.toString()}`);
  };

  const skeletonItems = Array(6).fill(null);

  return (
    <>


      <Breadcrumb title={"Shop Page"} />

      {
        loading ? (
          <section className="section-shop pb-12 lg:pb-[50px]">
            <div className="flex flex-wrap justify-between relative items-center mx-auto container">
              <div className="flex flex-wrap w-full mb-6">
                {/* Sidebar Skeleton */}
                <div className="w-full lg:w-1/4 px-3 mb-6">
                  <div className="bg-gray-100 rounded-2xl p-5 space-y-6 skeleton">
                    {/* Category Section */}
                    <div className="space-y-4">
                      <div className="h-6 bg-gray-200 rounded w-24"></div>
                      <div className="space-y-3">
                        {Array(5).fill(null).map((_, i) => (
                          <div key={`cat-${i}`} className="h-4 bg-gray-200 rounded w-32"></div>
                        ))}
                      </div>
                    </div>

                    {/* Weight Section */}
                    <div className="space-y-4">
                      <div className="h-6 bg-gray-200 rounded w-24"></div>
                      <div className="space-y-3">
                        {Array(4).fill(null).map((_, i) => (
                          <div key={`weight-${i}`} className="h-4 bg-gray-200 rounded w-28"></div>
                        ))}
                      </div>
                    </div>

                    {/* Color Section */}
                    <div className="space-y-4">
                      <div className="h-6 bg-gray-200 rounded w-24"></div>
                      <div className="flex flex-wrap gap-2">
                        {Array(8).fill(null).map((_, i) => (
                          <div key={`color-${i}`} className="h-6 w-6 bg-gray-200 rounded-full"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Products Grid Skeleton */}
                <div className="w-full lg:w-3/4 px-3">
                  {/* Toolbar Skeleton */}
                  <div className="flex justify-between items-center bg-gray-100 p-4 rounded-2xl mb-6 skeleton">
                    <div className="h-8 bg-gray-200 rounded w-24"></div>
                    <div className="h-8 bg-gray-200 rounded w-32"></div>
                  </div>

                  {/* Products Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skeletonItems.map((_, index) => (
                      <div key={index} className="bg-gray-100 rounded-2xl p-4 skeleton">
                        {/* Product Image */}
                        <div className="w-full h-48 bg-gray-200 rounded-xl mb-4"></div>

                        {/* Product Details */}
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <div className="h-4 bg-gray-200 rounded w-20"></div>
                            <div className="h-4 bg-gray-200 rounded w-24"></div>
                          </div>
                          <div className="h-5 bg-gray-200 rounded w-40"></div>
                          <div className="flex justify-between items-center">
                            <div className="h-4 bg-gray-200 rounded w-16"></div>
                            <div className="h-4 bg-gray-200 rounded w-12"></div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>
        ) : (
          <section className="section-shop pb-[50px] max-[1199px]:pb-[35px]">
            <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
              <div className="flex flex-wrap w-full mb-[-24px]">
                <div className="min-[992px]:w-[25%] w-full px-[12px] mb-[24px]">

                  <ProductSidebar
                    products={products}
                    filters={filters}
                    categoriesData={categoriesData}
                    onFilterChange={handleFilterChange}
                  />

                </div>
                <div className="min-[992px]:w-[75%] w-full px-[12px] mb-[24px]">
                  <div className="bb-shop-pro-inner">
                    <div className="flex flex-wrap mx-[-12px] mb-[-24px]">

                      <ProductHeader
                        viewMode={viewMode}
                        onViewModeChange={setViewMode}
                        totalProducts={products.length}
                        onFilterChange={handleFilterChange}
                      />
                      <ProductGrid products={products} viewMode={viewMode} />
                      {/* <ProductsPagination /> */}
                      <div className="w-full px-[12px]">
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
              </div>
            </div>
          </section>
        )
      }

    </>

  );
}

export default Products;
