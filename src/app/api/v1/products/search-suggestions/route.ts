import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Product from '@/models/productModel';

await dbConnect();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q')?.trim() || ''; 
    const limit = parseInt(searchParams.get('limit') || '10', 10); 

    const products = await Product.find(
      query ? { title: { $regex: query, $options: 'i' } } : {} 
    )
      .select('title slug _id')
      .limit(limit)
      .lean(); 

    return NextResponse.json({ success: true, products }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
