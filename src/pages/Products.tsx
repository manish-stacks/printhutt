'use client'

import React, { Suspense, useEffect, useState } from "react";
import Breadcrumb from "@/components/Breadcrumb";
import { ProductSidebar } from "@/components/products/ProductSidebar";
import type { FilterState } from "@/lib/types";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductHeader } from "@/components/products/ProductHeader";
import ProductGrid from "@/components/products/ProductGrid";
import LoadingSpinner from "@/components/LoadingSpinner";
import { useCartStore } from "@/store/useCartStore";
import type { Product } from "@/lib/types/product";
import { Pagination } from "@/components/admin/Pagination";

function Products() {

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [pagination, setPagination] = useState();
  const router = useRouter();
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [0, 1000],
    rating: null,
    tags: []
  })
  // console.log(filters)

  const searchParams = useSearchParams();
  const page = searchParams?.get('page') || '1';
  const search = searchParams?.get('search') || '';


  const fetchProducts = async () => {
    try {
      const queryParams = new URLSearchParams({
        page,
        search,
        categories: filters.categories.join(','),
        minPrice: String(filters.priceRange[0]),
        maxPrice: String(filters.priceRange[1]),
        ...(filters.rating && { rating: String(filters.rating) }),
        tags: filters.tags.join(',')
      })

      console.log(`/api/products?${queryParams}`)
      const response = await fetch(`/api/products?${queryParams}`)
      const data = await response.json()
      // console.log(data)
      setProducts(data.products)
      setPagination(data.pagination);
      // const response = await get_all_products(page, search) as any;
      // setProducts(response.products);
    } catch (error) {
      if(error instanceof Error){
            
        toast.error('Failed to fetch products')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [page, search, filters])



  const items = useCartStore(state => state.items);
  console.log(items)




  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams!);
    params.set('page', newPage.toString());
    router.push(`?${params.toString()}`);
    return params;
  };

  if (loading) {
    return (
      <LoadingSpinner />
    );
  }

  return (
    <>

 <Suspense fallback={<div>Loading...</div>}>

      <Breadcrumb title={"Shop Page"} />

      <section className="section-shop pb-[50px] max-[1199px]:pb-[35px]">
        <div className="flex flex-wrap justify-between relative items-center mx-auto min-[1400px]:max-w-[1320px] min-[1200px]:max-w-[1140px] min-[992px]:max-w-[960px] min-[768px]:max-w-[720px] min-[576px]:max-w-[540px]">
          <div className="flex flex-wrap w-full mb-[-24px]">
            <div className="min-[992px]:w-[25%] w-full px-[12px] mb-[24px]">

              <ProductSidebar
                products={products}
                filters={filters}
                onFilterChange={(newFilters) => setFilters(prev => ({ ...prev, ...newFilters }))}
              />

            </div>
            <div className="min-[992px]:w-[75%] w-full px-[12px] mb-[24px]">
              <div className="bb-shop-pro-inner">
                <div className="flex flex-wrap mx-[-12px] mb-[-24px]">

                  <ProductHeader
                    viewMode={viewMode}
                    onViewModeChange={setViewMode}
                    totalProducts={products.length}
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
 </Suspense>
    </>
  );
}

export default Products;
