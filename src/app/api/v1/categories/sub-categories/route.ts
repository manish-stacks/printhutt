import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Category from '@/models/categoryModel';
import SubCategory from '@/models/subCategoryModel';
import Product from '@/models/productModel';


export async function GET(request: NextRequest) {
  await dbConnect();

  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get('limit');
  const categorySlug = searchParams.get('category');

  const limit = limitParam === 'all' || !limitParam ? null : Math.max(parseInt(limitParam), 1);  // Ensure limit is a valid number

  try {
    // Fetch the category using the slug
    const category = await Category.findOne({ slug: categorySlug }).sort({ createdAt: -1 }).lean();

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // Create the query to fetch subcategories for the category
    const subcategoriesQuery = SubCategory.find({ parentCategory: category._id }).lean();

    if (limit) {
      subcategoriesQuery.limit(limit);
    }

    const subcategories = await subcategoriesQuery;

    // Fetch the product count for each subcategory
    const categoriesWithProductCount = await Promise.all(subcategories.map(async (subcategory) => {
      const productCount = await Product.countDocuments({ subcategory: subcategory._id });
      return {
        ...subcategory,
        productCount,
      };
    }));

    return NextResponse.json(
      { categories: categoriesWithProductCount },
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
