import { getDataFromToken } from "@/helpers/getDataFromToken";
import { deleteImage, uploadImage } from "@/lib/cloudinary";
import Slider from "@/models/sliderModel";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";



export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
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

    if (sliderImage instanceof File) {
      const sliderResponse = await uploadImage(sliderImage, 'slider', 1900, 550);
      if (sliderResponse) {
        const cloudinaryImage = slider.imageUrl.public_id
        if (cloudinaryImage) await deleteImage(cloudinaryImage);
        slider.imageUrl = sliderResponse;
      }
    }

    slider.title = formData.get('title')?.toString() || slider.title;
    slider.link = formData.get('link')?.toString() || slider.link;
    slider.isActive = formData.get('isActive')?.toString() || slider.isActive;
    slider.level = formData.get('level') || slider.level;

    await slider.save();

    return NextResponse.json({ success: true, message: 'Slider updated successfully' }, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}


export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid Product ID" }, { status: 400 });
    }
    const { role } = await getDataFromToken(request)
    if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const slider = await Slider.findById(id);
    if (!slider) return NextResponse.json({ success: false, message: "Slider not found" }, { status: 404 });

    const CloudinaryImage = slider.imageUrl.public_id
    if (CloudinaryImage) {
      await deleteImage(CloudinaryImage);
    }
    await slider.deleteOne();
    return NextResponse.json({ success: true, message: 'Slider deleted successfully' }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}