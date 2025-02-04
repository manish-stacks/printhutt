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



const serverErrorResponse = (error: Error) => {
    console.error('Error fetching product:', error.message);
    return NextResponse.json(
        { error: 'Internal Server Error', details: error.message },
        { status: 500 }
    );
};


export async function GET(request: NextRequest, context: { params: { slug: string } }) {
    try {
        const { slug } = await context.params;
        await dbConnect();
        
        if (!slug) {
            return NextResponse.json(
                { error: 'Product slug is required' },
                { status: 400 }
            );
        }

        
        const product = await ProductModel.findOne({ slug })
            .populate({ path: 'category', model: Category })
            .populate({ path: 'subcategory', model: SubCategory })
            .populate({ path: 'warrantyInformation', model: WarrantyInformation })
            .populate({ path: 'shippingInformation', model: ShippingInformation })
            .populate({ path: 'returnPolicy', model: ReturnPolicy })
            .populate({ path: 'reviews', model: Review })
            .populate({ path: 'offers', model: Offer })
            .exec();

        if (!product) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json(product, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return serverErrorResponse(error);
        }
        return serverErrorResponse(new Error('Unknown error occurred'));
    }
}