import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import { uploadImage } from '@/lib/cloudinary';
import Testimonials from '@/models/testimonialsModel';



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

    const [testimonials, total] = await Promise.all([
      Testimonials.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
        // .populate({ path: 'userId', model: UserModel })
      Testimonials.countDocuments(query)
    ]);

    return NextResponse.json({
      testimonials,
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

// Handle POST request to create a testimonial
export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    const { role } = await getDataFromToken(req);
    if (role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const formData = await req.formData();
    const userImage = formData.get('image');

    // Validate image upload
    if (!userImage || !(userImage instanceof File)) {
      return NextResponse.json({ success: false, message: 'Slider image is required and must be a file' }, { status: 400 });
    }

    // Upload the image to Cloudinary
    const imageResponse = await uploadImage(userImage, 'testimonial', 280, 280);

    // Create the new testimonial
    const returnData = new Testimonials({
      name: formData.get('name')?.toString() || '',
      image: imageResponse || '',
      feedback: formData.get('feedback')?.toString() || '',
      isActive: formData.get('isActive')?.toString() === 'true',
    });

    await returnData.save();

    return NextResponse.json({
      success: true,
      message: 'Testimonial created successfully',
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
