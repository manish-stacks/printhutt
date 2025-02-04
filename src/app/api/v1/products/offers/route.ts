import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Product from '@/models/productModel';
import Category from '@/models/categoryModel';
import Offer from '@/models/offerModel';


export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');

    // Ensure limit is a valid number (default: 10)
    const limit = limitParam === 'all' || !limitParam ? 10 : Math.max(parseInt(limitParam, 10) || 10, 1);

    // Fetch products that have at least one offer
    const products = await Product.find({
      offers: { $exists: true, $not: { $size: 0 } } 
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate({ path: 'category', model: Category, select: 'name slug' }) // Fetch only necessary fields
      .populate({ path: 'offers', model: Offer, select: 'title discount' }) // Fetch only necessary fields
      .lean();

    return NextResponse.json(
      { success: true, products },
      { status: 200 }
    );

  } catch (error: unknown) {
    console.error('Error fetching products with offers:', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
