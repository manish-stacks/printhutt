import { getDataFromToken } from "@/helpers/getDataFromToken";
import { deleteImage, uploadImage } from "@/lib/cloudinary";
import Testimonials from "@/models/testimonialsModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@/dbConfig/dbConfig';

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } = await params;
    const { role } = await getDataFromToken(request);

    if (role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const testimonial = await Testimonials.findById(id);
    if (!testimonial) {
      return NextResponse.json({ success: false, message: 'Testimonial not found' }, { status: 404 });
    }

    const formData = await request.formData();
    const userImage = formData.get('userImage');

    // Handle image update
    if (userImage instanceof File) {
      const imageResponse = await uploadImage(userImage, 'testimonial', 280, 280);
      if (imageResponse) {
        if (testimonial.image?.public_id) {
          await deleteImage(testimonial.image.public_id); // delete old image
        }
        testimonial.image = imageResponse;
      }
    }

    // Update the testimonial fields
    testimonial.name = formData.get('name')?.toString() || testimonial.name;
    testimonial.feedback = formData.get('feedback')?.toString() || testimonial.feedback;
    testimonial.isActive = formData.get('isActive') === 'true' ? true : testimonial.isActive;

    await testimonial.save();

    return NextResponse.json({ success: true, message: 'Testimonial updated successfully' }, { status: 200 });

  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid Product ID" }, { status: 400 });
    }

    const { role } = await getDataFromToken(request);
    if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const testimonial = await Testimonials.findById(id);
    if (!testimonial) return NextResponse.json({ success: false, message: "Testimonial not found" }, { status: 404 });

    if (testimonial.image?.public_id) {
      await deleteImage(testimonial.image.public_id); // delete the testimonial image from Cloudinary
    }

    await testimonial.deleteOne(); // delete the testimonial record

    return NextResponse.json({ success: true, message: 'Testimonial deleted successfully' }, { status: 200 });

  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}
