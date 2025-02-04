import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Category from '@/models/categoryModel';
import SubCategory from '@/models/subCategoryModel';
import Product from '@/models/productModel';


export async function GET(request: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get('limit');
  const limit = limitParam === 'all' || !limitParam ? null : Math.max(parseInt(limitParam), 1);

  try {
    let categoriesQuery = Category.find().sort({ createdAt: -1 }).lean();
    if (limit) {
      categoriesQuery = categoriesQuery.limit(limit);
    }
    const categories = await categoriesQuery;

    const categoriesData = await Promise.all(
      categories.map(async (category) => {
        const subcategories = await SubCategory.find({ parentCategory: category._id }).lean();

        const totalCategoryProducts = await Product.countDocuments({ category: category._id });

        const subcategoriesWithProductCount = await Promise.all(
          subcategories.map(async (subcategory) => {
            const totalSubcategoryProducts = await Product.countDocuments({ subcategory: subcategory._id });
            return {
              ...subcategory,
              totalProducts: totalSubcategoryProducts,
            };
          })
        );

        const totalProducts = totalCategoryProducts + subcategoriesWithProductCount.reduce((acc, sub) => acc + sub.totalProducts, 0);

        return {
          ...category,
          subcategories: subcategoriesWithProductCount,
          totalProducts,
        };
      })
    );

    return NextResponse.json(
      { categories: categoriesData },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Error fetching categories and subcategories:', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}