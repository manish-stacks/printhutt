import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Product from '@/models/productModel';
// import SubCategory from '@/models/subCategoryModel';
// import Category from '@/models/categoryModel';


export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);

    const limitParam = searchParams.get('limit');
    const type = searchParams.get('type');

    const limit = limitParam === 'all' || !limitParam ? 10 : Math.max(parseInt(limitParam, 10) || 10, 1);

    if (type && !['customize', 'pre', 'all'].includes(type)) {
      return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }

    const query: any = {};
    if (type === 'customize') query.isCustomize = true;
    if (type === 'pre') query.isCustomize = false;
    query.status = true;
    
    // Fetch random products with all details and populated categories/subcategories
    const products = await Product.aggregate([
      { $match: query },
      { $sample: { size: limit } }, // Random selection
      {
        $lookup: {
          from: 'categories',
          localField: 'category',
          foreignField: '_id',
          as: 'category',
        },
      },
      {
        $lookup: {
          from: 'subcategories',
          localField: 'subcategory',
          foreignField: '_id',
          as: 'subcategory',
        },
      },
      {
        $addFields: {
          category: { $arrayElemAt: ['$category', 0] },
          subcategory: { $arrayElemAt: ['$subcategory', 0] },
        },
      },
    ]);

    return NextResponse.json({ success: true, products }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { error: (error as Error).message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}

/*
normal data fetch 
export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);

    const limitParam = searchParams.get('limit');
    const type = searchParams.get('type');

    const limit = limitParam === 'all' || !limitParam ? 10 : Math.max(parseInt(limitParam, 10) || 10, 1);

    if (type && !['customize', 'pre', 'all'].includes(type)) {
      return NextResponse.json({ error: 'Invalid type parameter' }, { status: 400 });
    }


    const query: any = {};
    if (type === 'customize') query.isCustomize = true;
    if (type === 'pre') query.isCustomize = false;
  

    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .limit(limit)
      .populate({ path: 'category', model: Category, select: 'name slug' })
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
*/
