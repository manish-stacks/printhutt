import React from 'react'
import Image from 'next/image';
import { useCartStore } from '@/store/useCartStore';
import Link from 'next/link';
import { toast } from 'react-toastify';
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
                <div key={index}>
                    <ProductCard product={product} viewMode={viewMode} />
                </div>
            ))}

        </>
    )
}

export default ProductGrid
