import React, { useMemo, useState } from 'react'
import { CategoryFilter } from './filters/category-filter'
import { PriceFilter } from './filters/price-filter'
import { RatingFilter } from './filters/rating-filter'
import { TagFilter } from './filters/tag-filter'
import type { FilterState } from '@/lib/types'
import type { Product } from '@/lib/types/product'
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'
import { CategoryAttributes } from '@/lib/types/category'

interface ProductSidebarProps {
    products: Product[]
    filters: FilterState
    onFilterChange: (filters: Partial<FilterState>) => void
    categoriesData:CategoryAttributes[]
}
 
export function ProductSidebar({ products, filters, categoriesData, onFilterChange }: ProductSidebarProps) {
    // console.log(categoriesData)
    const categories = useMemo(() => Array.from(new Set(categoriesData.map(p => p.name))), [products])
    const priceRange = useMemo(() => ({
        min: Math.min(...products.map(p => p.price)),
        max: Math.max(...products.map(p => p.price))
    }), [products])
    
    const tags = useMemo(() => Array.from(new Set(products.flatMap(p => p.tags || []))), [products])

    const [activeFilter, setActiveFilter] = useState(true);

    return (
        <>
            <div className="bb-shop-wrap bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px] sticky top-[0] mb-4 p-3 grid grid-cols-2 min-[768px]:hidden">
                <div className="font-quicksand text-[18px] tracking-[0.03rem] leading-[1.2] font-bold text-[#3d4750] ">
                    Filter
                </div>
                <div className='text-end'>
                    {
                        activeFilter ? (
                            <button className="py-
                            [1.5rem] px-[2rem] rounded-[10px] hover:bg-[#
                            3d4750]"
                                onClick={() => setActiveFilter(false)}
                            >
                                <FaChevronDown />
                            </button>
                        ) : (
                            <button className="py-
                                [1.5rem] px-[2rem] rounded-[10px] hover:bg>[
                                #3d4750]"
                                onClick={() => setActiveFilter(true)}
                            >
                                <FaChevronUp />
                            </button>
                        )
                    }

                </div>
            </div>

            <div className={`bb-shop-wrap bg-[#f8f8fb] border-[1px] border-solid border-[#eee] rounded-[20px] sticky top-[0]  max-[480px]:${activeFilter ? 'hidden' : ''}`}>
                <CategoryFilter
                    categories={categories}
                    selectedCategories={filters.categories}
                    onChange={(categories) => onFilterChange({ categories })}
                />
                <PriceFilter
                    range={priceRange}
                    value={filters.priceRange}
                    onChange={(priceRange) => onFilterChange({ priceRange })}
                />
                <RatingFilter
                    selectedRating={filters.rating}
                    onChange={(rating) => onFilterChange({ rating })}
                />
                <TagFilter
                    tags={tags}
                    selectedTags={filters.tags}
                    onChange={(tags) => onFilterChange({ tags })}
                />
            </div>
        </>
    )
}
