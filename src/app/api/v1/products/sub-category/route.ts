import { NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import Product from '@/models/productModel';
import Category from '@/models/categoryModel';
import SubCategory from '@/models/subCategoryModel';

connect();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const subCategory = searchParams.get('subCategory');
    const limit = limitParam === 'all' || !limitParam ? null : parseInt(limitParam);

    const category = await SubCategory.findOne({ slug: subCategory }).lean();

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    const query = Product.find({ subcategory: category._id, status: true }).sort({ createdAt: -1 });

    if (limit !== null) {
      query.limit(limit);
    }
    const productsData = await query.lean();


    return NextResponse.json(
      { products: productsData },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error('Error fetching trending products:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}


