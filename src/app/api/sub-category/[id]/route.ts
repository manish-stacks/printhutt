import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import { deleteImage, uploadImage } from '@/lib/cloudinary';
import SubCategory from '@/models/subCategoryModel';
import mongoose from 'mongoose';


export async function GET(request: NextRequest, context: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Product ID" }, { status: 400 });
        }

        const { role } = await getDataFromToken(request);
        if (role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const post = await SubCategory.findById(id);
        if (!post) {
            return NextResponse.json({ error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json(post);
    } catch {
        return NextResponse.json({ error: "Failed to fetch post" }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, context: { params: { id: string } }) {
    try {
        await dbConnect();

        const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Product ID" }, { status: 400 });
        }

        const { role } = await getDataFromToken(request);
        if (role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const formData = await request.formData();

        const existingCategory = await SubCategory.findById(id);
        if (!existingCategory) {
            return NextResponse.json({ error: 'Category not found' }, { status: 404 });
        }

        const file = formData.get('imageUrl');
        let imageUrl = existingCategory.image;

        if (file instanceof File) {
            imageUrl = await uploadImage(file, 'categories', 800, 800);
            if (existingCategory.image?.public_id) {
                await deleteImage(existingCategory.image.public_id);
            }
        }

        const getStringValue = (key: string): string => {
            const value = formData.get(key);
            return value && typeof value === 'string' ? value : '';
        };

        const updates = {
            name: getStringValue('name') || existingCategory.name,
            slug: getStringValue('slug') || existingCategory.slug,
            description: getStringValue('description') || existingCategory.description,
            metaKeywords: getStringValue('metaKeywords') || existingCategory.metaKeywords,
            metaDescription: getStringValue('metaDescription') || existingCategory.metaDescription,
            parentCategory: getStringValue('parentCategory') || existingCategory.parentCategory,
            level: getStringValue('level') || existingCategory.level,
            status: getStringValue('status') || existingCategory.status,
            image: imageUrl
        };

        Object.assign(existingCategory, updates);
        await existingCategory.save();

        return NextResponse.json({
            success: true,
            message: 'Category updated successfully',
            data: existingCategory,
        }, { status: 201 });
    } catch (error) {
        console.error('Error updating category:', error);
        return NextResponse.json({ error: 'Failed to update category' }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
    try {
        await dbConnect();

        const { id } = await context.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Product ID" }, { status: 400 });
        }

        const { role } = await getDataFromToken(request);
        if (role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const deleteData = await SubCategory.findById(id);
        if (!deleteData) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        if (deleteData.image?.public_id) {
            await deleteImage(deleteData.image.public_id);
        }

        await SubCategory.findByIdAndDelete(id);

        return NextResponse.json({
            success: true,
            message: "Category deleted successfully!",
        });

    } catch (error) {
        console.error('Error deleting category:', error);
        return NextResponse.json({ error: "Failed to delete category" }, { status: 500 });
    }
}

export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Product ID" }, { status: 400 });
        }

        const { role } = await getDataFromToken(request);
        if (role !== 'admin') {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const { status } = await request.json();

        const updatedCategory = await SubCategory.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!updatedCategory) {
            return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Successfully updated category"
        }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
    }
}
