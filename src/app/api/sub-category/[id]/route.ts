import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import Category from '@/models/categoryModel';

import { getDataFromToken } from '@/helpers/getDataFromToken';
import { deleteImage, uploadImage } from '@/lib/cloudinary';

connect()

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { role } = await getDataFromToken(request)
        if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });


        const post = await Category.findById(params.id);
        if (!post) {
            return NextResponse.json(
                { error: "Post not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(post);
    } catch (error) {
        return NextResponse.json(
            { error: "Failed to fetch post" },
            { status: 500 }
        );
    }
}

export async function PUT(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { role } = await getDataFromToken(request);
        if (role !== 'admin') {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const formData = await request.formData();

        const file = formData.get('imageUrl');

        const existingCategory = await Category.findById(params.id);

        if (!existingCategory) {
            return NextResponse.json(
                { error: 'Category not found' },
                { status: 404 }
            );
        }


        let imageUrl;

        if (file && file instanceof File) {
            imageUrl = await uploadImage(file, 'categories');
            await deleteImage(existingCategory.image);
        } else {
            imageUrl = existingCategory.image;
        }


        existingCategory.name = formData.get('name') || existingCategory.name;
        existingCategory.slug = formData.get('slug') || existingCategory.slug;
        existingCategory.description = formData.get('description') || existingCategory.description;
        existingCategory.metaKeywords = formData.get('metaKeywords') || existingCategory.metaKeywords;
        existingCategory.metaDescription = formData.get('metaDescription') || existingCategory.metaDescription;
        existingCategory.parentCategory = formData.get('parentCategory') || existingCategory.parentCategory;
        existingCategory.level = formData.get('level') || existingCategory.level;
        existingCategory.status = formData.get('status') || existingCategory.status;
        existingCategory.image = imageUrl;

        await existingCategory.save();

        return NextResponse.json(
            {
                success: true,
                message: 'Category updated successfully',
                data: existingCategory,
            },
            { status: 201 }
        );
    } catch (error) {
        console.error(error);
        return NextResponse.json(
            { error: 'Failed to update category' },
            { status: 500 }
        );
    }
}


export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {

        const { role } = await getDataFromToken(request)
        if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

        const deleteData = await Category.findByIdAndDelete(params.id);
        await deleteImage(deleteData.image.public_id);
       
        if (!deleteData) {
            return NextResponse.json({ error: "Category not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "Category Deleted successfully!",
        });

    } catch (error) {
        return NextResponse.json(
            { error: "Failed to delete post" },
            { status: 500 }
        );
    }
}


export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const { role } = await getDataFromToken(request);

        // Check for admin role
        if (role !== 'admin') {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { status } = await request.json();

        const updatedCategory = await Category.findByIdAndUpdate(
            params.id,
            { status },
            { new: true } 
        );

        if (!updatedCategory) {
            return NextResponse.json(
                { success: false, message: 'Category not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Successfully updated category"
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            { error: "Something went wrong" },
            { status: 500 }
        );
    }
}