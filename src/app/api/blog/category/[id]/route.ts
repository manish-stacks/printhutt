import { getDataFromToken } from "@/helpers/getDataFromToken";
import { deleteImage, uploadImage } from "@/lib/cloudinary";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import dbConnect from '@/dbConfig/dbConfig';
import BlogCategory from "@/models/blogCategoryModel";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } = await params;
    const { role } = await getDataFromToken(request);

    if (role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const blogCategory = await BlogCategory.findById(id);
    if (!blogCategory) {
      return NextResponse.json({ success: false, message: 'Blog category not found' }, { status: 404 });
    }

    const formData = await request.formData();
    blogCategory.name = formData.get('name')?.toString() || blogCategory.name;
    blogCategory.isActive = formData.get('isActive') === 'true' ? true : blogCategory.isActive;

    await blogCategory.save();
    return NextResponse.json({ success: true, message: 'Blog category updated successfully' }, { status: 200 });

  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await dbConnect();
    const { id } = await params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ success: false, message: "Invalid Blog Category ID" }, { status: 400 });
    }

    const { role } = await getDataFromToken(request);
    if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    const blogCategory = await BlogCategory.findById(id);
    if (!blogCategory) return NextResponse.json({ success: false, message: "Blog category not found" }, { status: 404 });

    if (blogCategory.image?.public_id) {
      await deleteImage(blogCategory.image.public_id); // delete the blog category image from Cloudinary
    }

    await blogCategory.deleteOne(); // delete the blog category record

    return NextResponse.json({ success: true, message: 'Blog category deleted successfully' }, { status: 200 });

  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unexpected error occurred' }, { status: 500 });
  }
}
