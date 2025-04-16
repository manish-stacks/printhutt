import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Product from '@/models/productModel';
import SubCategory from '@/models/subCategoryModel';


export async function GET(request: Request) {
  try {
    await dbConnect();
    const { searchParams } = new URL(request.url);
    const subCategorySlug = searchParams.get('subCategory');
    const limitParam = searchParams.get('limit');
    const pageParam = searchParams.get('page');

    // Validate and parse pagination values
    const page = pageParam ? Math.max(1, parseInt(pageParam, 10)) : 1;
    const limit = limitParam === 'all' || !limitParam ? 40 : Math.max(1, parseInt(limitParam, 10));

    // Ensure subCategorySlug is provided
    if (!subCategorySlug) {
      return NextResponse.json({ error: 'Subcategory is required' }, { status: 400 });
    }

    // Find the subcategory
    const subcategory = await SubCategory.findOne({ slug: subCategorySlug }).lean();
    if (!subcategory) {
      return NextResponse.json({ error: 'Subcategory not found' }, { status: 404 });
    }

    // Fetch products associated with the subcategory
    const [productsData, totalProducts] = await Promise.all([
      Product.find({ subcategory: subcategory._id, status: true })
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      Product.countDocuments({ subcategory: subcategory._id, status: true }),
    ]);

    return NextResponse.json({
      success: true,
      products: productsData,
      pagination: {
        total: totalProducts,
        page,
        limit,
        totalPages: Math.ceil(totalProducts / limit),
      },
    }, { status: 200 });

  } catch (error: unknown) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: (error as Error).message || 'Internal Server Error' },
      { status: 500 }
    );
  }
}
