import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Category from '@/models/categoryModel';
import SubCategory from '@/models/subCategoryModel';
import Product from '@/models/productModel';

await dbConnect();

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);

    // Pagination parameters
    const page = Math.max(parseInt(searchParams.get('page') || '1', 10), 1);
    const perPage = 12;
    const skip = (page - 1) * perPage;

    // Filters
    const search = searchParams.get('search') || '';
    const categories = searchParams.get('categories')?.split(',').filter(Boolean) || [];
    const minPrice = parseFloat(searchParams.get('minPrice') || '0');
    const maxPrice = parseFloat(searchParams.get('maxPrice') || '999999');
    const rating = parseInt(searchParams.get('rating') || '0', 10);
    const tags = searchParams.get('tags')?.split(',').filter(Boolean) || [];
    const sort = searchParams.get('sort') || 'newest';

    // Build MongoDB query
    const query: any = {};

    if (search) {
      query.title = { $regex: search, $options: 'i' }; // Case-insensitive search
    }

    if (categories.length > 0) {
      const categoryDocs = await Category.find({ name: { $in: categories } }).select('_id').lean();
      query.category = { $in: categoryDocs.map((c) => c._id) };
    }

    query.price = { $gte: minPrice, $lte: maxPrice };

    if (rating > 0) {
      query.rating = { $gte: rating };
    }

    if (tags.length > 0) {
      query.tags = { $in: tags }; // Matches any of the provided tags
    }

    // Sorting logic
    const sortOptions: Record<string, any> = {
      featured: { featured: -1 },
      newest: { createdAt: -1 },
      'price-asc': { price: 1 },
      'price-desc': { price: -1 },
    };

    const sortQuery = sortOptions[sort] || { createdAt: -1 };

    // Fetch data with MongoDB filters
    const [products, total] = await Promise.all([
      Product.find(query)
        .populate('category', Category)
        .populate('subcategory', SubCategory)
        .sort(sortQuery)
        .skip(skip)
        .limit(perPage)
        .lean(),
      Product.countDocuments(query), // Get total product count for pagination
    ]);

    return NextResponse.json({
      success: true,
      products,
      totalProducts: total,
      pagination: {
        page,
        perPage,
        total,
        totalPages: Math.ceil(total / perPage),
      },
    });
  } catch (error: unknown) {
    console.error('Error fetching products:', error);
    return NextResponse.json({ error: (error as Error).message || 'Internal Server Error' }, { status: 500 });
  }
}
