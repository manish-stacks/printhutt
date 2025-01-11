import React from 'react'
import type { Product } from '@/lib/types/product';
import ProductCard from './ProductCard';

interface ProductGridProps {
    products: Product[]
    viewMode: 'grid' | 'list'
}

export function ProductGrid({ products, viewMode }: ProductGridProps) {


    if (products.length === 0) {
        return (
            <div className="flex justify-center text-center mt-8">
                <p className="text-lg text-gray-600 px-5">No products found.</p>
            </div>
        )
    }


    return (
        <>
            {products.map((product, index) => (
                <div
                    key={index}
                    className={`min-[768px]:w-[33.33%] w-[50%] max-[480px]:w-full px-[12px] mb-[24px] pro-bb-content ${viewMode === 'list' ? 'width-100' : ''}`}
                    data-aos="fade-up"
                    data-aos-duration={1000}
                    data-aos-delay={200}
                >
                    <ProductCard product={product}  />
                </div>
            ))}

        </>
    )
}

export default ProductGrid
