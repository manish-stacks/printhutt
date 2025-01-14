import { NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import Product from '@/models/productModel';

connect();

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    const products = await Product.find({
      title: { $regex: query, $options: 'i' }, 
    }).select('title slug _id');
    console.log(products)
    return NextResponse.json({ products }, { status: 200 });
  } catch (error: unknown) {
    console.error('Error fetching trending products:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}


