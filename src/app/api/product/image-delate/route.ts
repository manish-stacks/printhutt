import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import ProductModel from '@/models/productModel';
import { deleteImage } from '@/lib/cloudinary';

connect();


export async function POST(req: NextRequest) {
    try {
        const { role } = await getDataFromToken(req);
        if (role !== 'admin') {
            return NextResponse.json(
                { success: false, message: 'Unauthorized' },
                { status: 401 }
            );
        }

        const { productId, image } = await req.json();
        const product = await ProductModel.findById(productId);

        if (!product) {
            return NextResponse.json(
                { error: "Product not found" },
                { status: 404 }
            );
        }

        const imageIndex = product.images.findIndex(
            (img: any) => img.public_id === image.public_id
        );

        if (imageIndex === -1) {
            return NextResponse.json(
                { error: "Image not found in product" },
                { status: 404 }
            );
        }


        await deleteImage(image.public_id);

        product.images.splice(imageIndex, 1);
        await product.save();

        return NextResponse.json(
            {
                success: true,
                message: "Image deleted successfully",
            },
            { status: 200 }
        );
    } catch (error: any) {
        console.error('Product image delete:', error);
        return NextResponse.json(
            { success: false, message: error.message },
            { status: 500 }
        );
    }
}
