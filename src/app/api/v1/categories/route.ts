import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Category from '@/models/categoryModel';
import SubCategory from '@/models/subCategoryModel';


export async function GET(request: NextRequest) {
  await dbConnect();
  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get('limit');
  const limit = limitParam === 'all' || !limitParam ? null : Math.max(parseInt(limitParam), 1);  // Ensuring limit is a valid positive number

  try {
    // Fetch categories with sorting
    const categoriesQuery = Category.find().sort({ createdAt: -1 }).lean();
    if (limit) {
      categoriesQuery.limit(limit);
    }
    const categories = await categoriesQuery;

    // Fetch subcategories for each category
    const categoriesData = await Promise.all(
      categories.map(async (category) => {
        const subcategories = await SubCategory.find({ parentCategory: category._id }).lean();
        return {
          ...category,
          subcategories,
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
