import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig'
import Product from '@/models/productModel';
import Category from '@/models/categoryModel';

await dbConnect();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const limit = limitParam === 'all' || !limitParam ? null : parseInt(limitParam);

    const query = Product.find({ trending: true, status: true }).populate({ path: 'category', model: Category }).sort({ createdAt: -1 });
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


