import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import SubCategory from '@/models/subCategoryModel';
import { uploadImage } from '@/lib/cloudinary';
import { getDataFromToken } from '@/helpers/getDataFromToken';



export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { role } = await getDataFromToken(req);
    if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const formData = await req.formData();
    const file = formData.get('imageUrl');

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'No valid file uploaded' },
        { status: 400 }
      );
    }

    const uploadResponse = await uploadImage(file, 'categories', 60, 60);

    const newCategory = new SubCategory({
      name: formData.get('name')?.toString(),
      slug: formData.get('slug')?.toString(),
      description: formData.get('description')?.toString(),
      metaKeywords: formData.get('metaKeywords')?.toString(),
      metaDescription: formData.get('metaDescription')?.toString(),
      parentCategory: formData.get('parentCategory')?.toString() || null,
      level: formData.get('level')?.toString(),
      status: formData.get('status') === 'true',
      image: uploadResponse,
    });

    await newCategory.save();

    return NextResponse.json({
      success: true,
      message: 'Category created successfully',
      data: newCategory,
    }, { status: 201 });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const search = url.searchParams.get('search') || '';

    const query = search ? { name: { $regex: search, $options: 'i' } } : {};
    const skip = (page - 1) * limit;

    const [categories, total] = await Promise.all([
      SubCategory.find(query)
        .populate('parentCategory', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      SubCategory.countDocuments(query)
    ]);

    return NextResponse.json({
      success: true,
      message: 'Categories fetched successfully',
      categories,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
