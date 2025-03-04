import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Blog from '@/models/blogModel';
import mongoose from 'mongoose';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import { deleteImage, uploadImage } from '@/lib/cloudinary';

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    try {
        await dbConnect();

        const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Blog ID" }, { status: 400 });
        }

        const { role } = await getDataFromToken(request);
        if (role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const blog = await Blog.findById(id);
        if (!blog) {
            return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json(blog);
    } catch (error) {
        console.error('Error in GET blog:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch blog' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    try {
        await dbConnect();

        const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Blog ID" }, { status: 400 });
        }

        const { role } = await getDataFromToken(request);
        if (role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('imageUrl');
        const existingBlog = await Blog.findById(id);

        if (!existingBlog) {
            return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
        }

        let imageUrl = existingBlog.image;
        
        console.log("imageUrl: " + imageUrl);
        if (file && typeof file !== 'string') {  
            imageUrl = await uploadImage(file, 'blogs', 800, 500);
            if (existingBlog.image?.public_id) {
                await deleteImage(existingBlog.image.public_id);
            }
        }

        existingBlog.title = formData.get('title') || existingBlog.title;
        existingBlog.slug = formData.get('slug') || existingBlog.slug;
        existingBlog.description = formData.get('description') || existingBlog.description;
        existingBlog.short_description = formData.get('short_description') || existingBlog.short_description;
        existingBlog.metaKeywords = formData.get('metaKeywords') || existingBlog.metaKeywords;
        existingBlog.metaTitle = formData.get('metaTitle') || existingBlog.metaTitle;
        existingBlog.metaDescription = formData.get('metaDescription') || existingBlog.metaDescription;
        existingBlog.author = formData.get('author') || existingBlog.author;
        existingBlog.status = formData.get('status') || existingBlog.status;
        existingBlog.image = imageUrl;

        await existingBlog.save();

        return NextResponse.json({
            success: true,
            message: 'Blog updated successfully',
            data: existingBlog,
        }, { status: 200 });
    } catch (error) {
        console.error('Error in PUT blog:', error);
        return NextResponse.json({ success: false, message: 'Failed to update blog' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    try {
        await dbConnect();

        const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Blog ID" }, { status: 400 });
        }

        const { role } = await getDataFromToken(request);
        if (role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const blogToDelete = await Blog.findByIdAndDelete(id);
        if (!blogToDelete) {
            return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
        }

        await deleteImage(blogToDelete.image.public_id);
        return NextResponse.json({ success: true, message: 'Blog deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error in DELETE blog:', error);
        return NextResponse.json({ success: false, message: 'Failed to delete blog' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
    try {
        await dbConnect();

        const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Blog ID" }, { status: 400 });
        }

        const { role } = await getDataFromToken(request);
        if (role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { status } = await request.json();
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedBlog) {
            return NextResponse.json({ success: false, message: 'Blog not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Blog status updated successfully',
            data: updatedBlog,
        }, { status: 200 });
    } catch (error) {
        console.error('Error in PATCH blog:', error);
        return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 });
    }
}
