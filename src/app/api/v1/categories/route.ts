import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import Category from '@/models/categoryModel';
import SubCategory from '@/models/subCategoryModel';

connect();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get('limit');
  const limit = limitParam === 'all' || !limitParam ? null : parseInt(limitParam);

  try {
    const categoriesQuery = Category.find().sort({ createdAt: -1 }).lean();
    if (limit) {
      categoriesQuery.limit(limit);
    }
    const categories = await categoriesQuery;

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
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

