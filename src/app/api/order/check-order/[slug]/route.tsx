import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import ProductModel from '@/models/productModel';
import Category from '@/models/categoryModel';
import SubCategory from '@/models/subCategoryModel';
import WarrantyInformation from '@/models/warrantyInformationModel';
import ShippingInformation from '@/models/shippingInformationModel';
import ReturnPolicy from '@/models/returnPolicyModule';
import Review from '@/models/reviewModel';
import Offer from '@/models/offerModel';
import User from '@/models/userModel';
import Order from '@/models/orderModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';



const serverErrorResponse = (error: Error) => {
    console.error('Error fetching product:', error.message);
    return NextResponse.json(
        { error: 'Internal Server Error', details: error.message },
        { status: 500 }
    );
};


export async function GET(request: NextRequest, context: { params: { slug: string } }) {

    const userAgent = await getDataFromToken(request);
    if (!userAgent) {
        return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const userId = userAgent.id;

    try {
        const { slug } = await context.params;
        await dbConnect();

        const product = await ProductModel.findOne({ slug }).lean();
        if (!product) {
            return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
        }

        const [orderCheck, reviewCheck] = await Promise.all([
            Order.findOne({ userId, "items.productId": product._id }).lean(),
            Review.findOne({ userId, productId: product._id }).lean()
        ]);

        return NextResponse.json({
            success: true,
            orderExists: !!orderCheck,
            reviewExists: !!reviewCheck
        }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return serverErrorResponse(error);
        }
        return serverErrorResponse(new Error('Unknown error occurred'));
    }
}