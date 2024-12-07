import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import Category from '@/models/categoryModel';
import { uploadImage } from '@/lib/cloudinary';
import { File } from 'buffer';
import { getDataFromToken } from '@/helpers/getDataFromToken';

connect();

export async function POST(req: NextRequest) {
  try {
    const { role } = await getDataFromToken(req)
    if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });


    const formData = await req.formData();
    console.log(formData)
    const file = formData.get('imageUrl');
    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: 'No valid file uploaded' },
        { status: 400 }
      );
    }

    const uploadResponse = await uploadImage(file, 'categories')

    const category = new Category({
      name: formData.get('name'),
      slug: formData.get('slug'),
      description: formData.get('description'),
      metaKeywords: formData.get('metaKeywords'),
      metaDescription: formData.get('metaDescription'),
      parentCategory: formData.get('parentCategory') || null,
      level: formData.get('level'),
      status: formData.get('status') || true,
      image: uploadResponse,
    });
    await category.save()

    return NextResponse.json(
      {
        success: true,
        message: 'Data inserted successfully',
        data: category
      },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const search = url.searchParams.get('search') || '';

    const query = search
      ? { name: { $regex: search, $options: 'i' } }
      : {};

    const skip = (page - 1) * limit;

    const [categories, total] = await Promise.all([
      Category.find(query)
        .populate('parentCategory', 'name')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Category.countDocuments(query)
    ]);

    return NextResponse.json({
      categories,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit
      }
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


