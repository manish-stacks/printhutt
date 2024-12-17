import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import ProductModel from '@/models/productModel';
import { deleteImage } from '@/lib/cloudinary';


connect()

export async function GET(
    request: NextRequest,
    { params }: { params: { id: string } }
) {
    try {
        const { role } = await getDataFromToken(request)
        if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });


        const product = await ProductModel.findById(params.id);
        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }
        return NextResponse.json(product);
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
        if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        const formData = await request.formData();
        console.log(formData)
        return NextResponse.json(
            {
                success: true,
                message: 'Offer updated successfully',
                // data: existing,
            },
            { status: 201 }
        );
    } catch (error) {
        // console.error(error);
        return NextResponse.json(
            { error: 'Failed to update' },
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

        const product = await ProductModel.findById(params.id);

        if (!product) {
            return NextResponse.json({ error: "Return not found" }, { status: 404 });
        }

        const images = product.images

        for (const image of images) {
            await deleteImage(image.public_id);
        }

        await deleteImage(product.thumbnail.public_id);

        await product.delete();

        return NextResponse.json({
            success: true,
            message: "Deleted successfully!",
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
        if (role !== 'admin') {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { status } = await request.json();

        const updatedCategory = await ProductModel.findByIdAndUpdate(
            params.id,
            { status },
            { new: true }
        );

        if (!updatedCategory) {
            return NextResponse.json(
                { success: false, message: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(
            {
                success: true,
                message: "Successfully updated product"
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

