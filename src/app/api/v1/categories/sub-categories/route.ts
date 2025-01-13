import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import Category from '@/models/categoryModel';
import SubCategory from '@/models/subCategoryModel';
import Product from '@/models/productModel';

connect();

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limitParam = searchParams.get('limit');
  const categorySlug = searchParams.get('category');

  const limit = limitParam === 'all' || !limitParam ? null : parseInt(limitParam);

  try {
    const category = await Category.findOne({ slug: categorySlug }).sort({ createdAt: -1 }).lean();

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const subcategoriesQuery = SubCategory.find({ parentCategory: category._id }).lean();

    if (limit) {
      subcategoriesQuery.limit(limit);
    }

    const subcategories = await subcategoriesQuery;

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
    console.error(error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
