import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Product from '@/models/productModel';
import Category from '@/models/categoryModel';

export async function GET(request: Request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get('limit');
    const categorySlug = searchParams.get('category');

    
    const limit = limitParam === 'all' || !limitParam
      ? 10 
      : Math.max(parseInt(limitParam, 10) || 10, 1); 

    if (!categorySlug) {
      return NextResponse.json({ error: 'Category slug is required' }, { status: 400 });
    }

    
    const category = await Category.findOne({ slug: categorySlug }).select('_id').lean();

    if (!category) {
      return NextResponse.json({ error: 'Category not found' }, { status: 404 });
    }

    // Fetch products associated with the category
    const products = await Product.find({ category: category._id, status: true })
      .sort({ createdAt: -1 })
      .limit(limit)
      .lean();

    return NextResponse.json(
      { success: true, products },
      { status: 200 }
    );

  } catch (error: unknown) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
