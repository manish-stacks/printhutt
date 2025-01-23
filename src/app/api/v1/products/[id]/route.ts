import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
// import { getDataFromToken } from '@/helpers/getDataFromToken';
import ProductModel from '@/models/productModel';
// import { deleteImage, uploadImage } from '@/lib/cloudinary';
import mongoose from 'mongoose';
// import type { ProductUpdateData } from '@/lib/types/product';

connect()

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Product ID" }, { status: 400 });
        }
        
        const product = await ProductModel.findById(id);
        if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });
        return NextResponse.json(product);
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
        }
    }

}


