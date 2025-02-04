import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Product from '@/models/productModel';
import SubCategory from '@/models/subCategoryModel';
import Category from '@/models/categoryModel';

export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    
    const limitParam = searchParams.get('limit');
    const type = searchParams.get('type');

    // Validate limit: If invalid, set a default value (10)
    const limit = limitParam === 'all' || !limitParam ? 10 : Math.max(parseInt(limitParam, 10) || 10, 1);

    // Validate type
    if (type && !['customize', 'pre'].includes(type)) {
      return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }

    // Build query based on type
    const query: any = {};
    if (type === 'customize') query.isCustomize = true;
    if (type === 'pre') query.isCustomize = false;

    // Fetch products with category and subcategory populated
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate({ path: 'category', model: Category, select: 'name slug' }) // Fetch only required fields
      .populate({ path: 'subcategory', model: SubCategory, select: 'name slug' })
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
