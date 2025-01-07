import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import Category from '@/models/categoryModel';
import SubCategory from '@/models/subCategoryModel';
import Product from '@/models/productModel';

connect();


export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const page = parseInt(searchParams.get('page') || '1')
  const search = searchParams.get('search') || ''
  const categories = searchParams.get('categories')?.split(',').filter(Boolean) || []
  const minPrice = parseFloat(searchParams.get('minPrice') || '0')
  const maxPrice = parseFloat(searchParams.get('maxPrice') || '999999')
  const rating = parseInt(searchParams.get('rating') || '0')
  const tags = searchParams.get('tags')?.split(',').filter(Boolean) || []

  const products = await Product.find().populate({ path: 'category', model: Category }).populate({ path: 'subcategory', model: SubCategory });;

  let filteredProducts = [...products]

  // Apply filters
  if (search) {
    filteredProducts = filteredProducts.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase())
    )
  }

  if (categories.length > 0) {
    filteredProducts = filteredProducts.filter(p =>
      categories.includes(p.category.name)
    )
  }

  filteredProducts = filteredProducts.filter(p =>
    p.price >= minPrice && p.price <= maxPrice
  )

  if (rating > 0) {
    filteredProducts = filteredProducts.filter(p => p.rating >= rating)
  }

  if (tags.length > 0) {
    filteredProducts = filteredProducts.filter(p =>
      p.tags?.some(t => tags.includes(t))
    )
  }

  // Pagination
  const perPage = 12
  const total = filteredProducts.length
  const totalPages = Math.ceil(total / perPage)
  const offset = (page - 1) * perPage

  const paginatedProducts = filteredProducts.slice(offset, offset + perPage)

  return NextResponse.json({
    products: paginatedProducts,
    pagination: {
      page,
      perPage,
      pages: Math.ceil(total / perPage),
      total,
      totalPages
    }
  })
}


