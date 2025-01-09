import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Slider from '@/models/sliderModel';
import { uploadImage } from '@/lib/cloudinary';

connect();

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const search = url.searchParams.get('search') || '';

    const query = search
      ? { offerTitle: { $regex: search, $options: 'i' } }
      : {};

    const skip = (page - 1) * limit;

    const [sliders, total] = await Promise.all([
      Slider.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Slider.countDocuments(query)
    ]);

    return NextResponse.json({
      sliders,
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

export async function POST(req: NextRequest) {
  try {
    const { role } = await getDataFromToken(req)
    if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const formData = await req.formData();
    
  
    const slider = formData.get('slider');

    if (!slider || !(slider instanceof File)) {
      return NextResponse.json(
        { success: false, message: 'Slider is required and must be a file' },
        { status: 400 }
      );
    }

    const sliderResponse = await uploadImage(slider, 'slider', 1900, 550);

    const returnData = new Slider({
      title: formData.get('title')?.toString() || '',
      imageUrl: sliderResponse || '',
      link: formData.get('link')?.toString() || '',
      isActive: formData.get('isActive')?.toString() === 'true',
      level: formData.get('level') || '',
    });
    await returnData.save();
    return NextResponse.json({
      success: true,
      message: 'Slider created successfully',
      data: returnData
    }, {
      status: 201
    });
  } catch (error: unknown) {
    return NextResponse.json({
      error: (error as Error).message
    },
      { status: 500 });
  }
}




