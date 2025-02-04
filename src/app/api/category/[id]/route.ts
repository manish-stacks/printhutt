import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Category from '@/models/categoryModel';
import mongoose from 'mongoose';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import { deleteImage, uploadImage } from '@/lib/cloudinary';


export async function GET(request: NextRequest, context: { params: { id: string } }) {
    try {
        await dbConnect();

        const { id } = context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Category ID" }, { status: 400 });
        }

        const { role } = await getDataFromToken(request);
        if (role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const category = await Category.findById(id);
        if (!category) {
            return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
        }

        return NextResponse.json(category);
    } catch (error) {
        console.error('Error in GET category:', error);
        return NextResponse.json({ success: false, message: 'Failed to fetch category' }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    try {
        await dbConnect();

        const { id } = context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Category ID" }, { status: 400 });
        }

        const { role } = await getDataFromToken(request);
        if (role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();
        const file = formData.get('imageUrl');
        const existingCategory = await Category.findById(id);

        if (!existingCategory) {
            return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
        }

        let imageUrl = existingCategory.image;
        if (file && file instanceof File) {
            imageUrl = await uploadImage(file, 'categories', 60, 60);
            await deleteImage(existingCategory.image.public_id);
        }

        existingCategory.name = formData.get('name') || existingCategory.name;
        existingCategory.slug = formData.get('slug') || existingCategory.slug;
        existingCategory.description = formData.get('description') || existingCategory.description;
        existingCategory.metaKeywords = formData.get('metaKeywords') || existingCategory.metaKeywords;
        existingCategory.metaDescription = formData.get('metaDescription') || existingCategory.metaDescription;
        existingCategory.level = formData.get('level') || existingCategory.level;
        existingCategory.status = formData.get('status') || existingCategory.status;
        existingCategory.image = imageUrl;

        await existingCategory.save();

        return NextResponse.json({
            success: true,
            message: 'Category updated successfully',
            data: existingCategory,
        }, { status: 200 });
    } catch (error) {
        console.error('Error in PUT category:', error);
        return NextResponse.json({ success: false, message: 'Failed to update category' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    try {
        await dbConnect();

        const { id } = context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Category ID" }, { status: 400 });
        }

        const { role } = await getDataFromToken(request);
        if (role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const categoryToDelete = await Category.findByIdAndDelete(id);
        if (!categoryToDelete) {
            return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
        }

        await deleteImage(categoryToDelete.image.public_id);
        return NextResponse.json({ success: true, message: 'Category deleted successfully' }, { status: 200 });
    } catch (error) {
        console.error('Error in DELETE category:', error);
        return NextResponse.json({ success: false, message: 'Failed to delete category' }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
    try {
        await dbConnect();

        const { id } = context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Category ID" }, { status: 400 });
        }

        const { role } = await getDataFromToken(request);
        if (role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { status } = await request.json();
        const updatedCategory = await Category.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedCategory) {
            return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: 'Category status updated successfully',
            data: updatedCategory,
        }, { status: 200 });
    } catch (error) {
        console.error('Error in PATCH category:', error);
        return NextResponse.json({ success: false, message: 'Something went wrong' }, { status: 500 });
    }
}
