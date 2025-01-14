import { NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import Product from '@/models/productModel';
import SubCategory from '@/models/subCategoryModel';
import Category from '@/models/categoryModel';

connect();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const categoryId = searchParams.get('id');

    const limit = limitParam === 'all' || !limitParam ? null : parseInt(limitParam);

    const productsQuery = Product.find({ category: categoryId }).sort({ createdAt: -1 }).populate({ path: 'category', model: Category })
      .populate({ path: 'subcategory', model: SubCategory });
    if (limit !== null) {
      productsQuery.limit(limit);
    }

    const productsData = await productsQuery.lean();

    return NextResponse.json(
      { products: productsData },
      { status: 200 }
    );
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
