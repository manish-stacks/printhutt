import { getDataFromToken } from "@/helpers/getDataFromToken";
import { deleteImage, uploadImage } from "@/lib/cloudinary";
import Slider from "@/models/sliderModel";
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

    const slider = await Slider.findById(id);
    if (!slider) {
      return NextResponse.json({ success: false, message: 'Slider not found' }, { status: 404 });
    }

    const formData = await request.formData();
    const sliderImage = formData.get('slider');

    if (typeof File !== 'undefined' && sliderImage instanceof File) {

      const sliderResponse = await uploadImage(sliderImage, 'slider', 1900, 550);
      if (sliderResponse) {
        if (slider.imageUrl?.public_id) await deleteImage(slider.imageUrl.public_id);
        slider.imageUrl = sliderResponse;
      }
    }

    slider.title = formData.get('title')?.toString() || slider.title;
    slider.link = formData.get('link')?.toString() || slider.link;
    slider.isActive = formData.get('isActive')?.toString() || slider.isActive;
    slider.level = formData.get('level') || slider.level;

    await slider.save();

    return NextResponse.json({ success: true, message: 'Slider updated successfully' }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;
    await dbConnect();

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid Slider ID" }, { status: 400 });
    }

    const { role } = await getDataFromToken(request);
    if (role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const slider = await Slider.findById(id);
    if (!slider) {
      return NextResponse.json({ success: false, message: "Slider not found" }, { status: 404 });
    }

    if (slider.imageUrl?.public_id) {
      await deleteImage(slider.imageUrl.public_id);
    }

    await slider.deleteOne();

    return NextResponse.json({ success: true, message: 'Slider deleted successfully' }, { status: 200 });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
