import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import BlogCategory from '@/models/blogCategoryModel';

// Handle GET request with pagination and search
export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const search = url.searchParams.get('search') || '';

    const query = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};

    const skip = (page - 1) * limit;

    const [blogCategories, total] = await Promise.all([
      BlogCategory.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      BlogCategory.countDocuments(query)
    ]);

    return NextResponse.json({
      blogCategories,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit
      }
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

// Handle POST request to create a blog category
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { role } = await getDataFromToken(req);
    if (role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const returnData = new BlogCategory({
      name: formData.get('name')?.toString() || '',
      isActive: formData.get('isActive')?.toString() === 'true',
    });

    await returnData.save();

    return NextResponse.json({
      success: true,
      message: 'Data inserted successfully',
      data: returnData
    }, {
      status: 201
    });
  } catch (error: unknown) {
    return NextResponse.json({
      error: (error as Error).message
    }, { status: 500 });
  }
}
