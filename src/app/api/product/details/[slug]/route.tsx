import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import ProductModel from '@/models/productModel';
import Category from '@/models/categoryModel';
import SubCategory from '@/models/subCategoryModel';
import WarrantyInformation from '@/models/warrantyInformationModel';
import ShippingInformation from '@/models/shippingInformationModel';
import ReturnPolicy from '@/models/returnPolicyModule';
import Review from '@/models/reviewModel';
import Offer from '@/models/offerModel';

connect()

export async function GET(request: NextRequest, context: { params: { slug: string } }) {
    try {
        const { slug } = await context.params;

        const product =
            await ProductModel.findOne({ slug: slug })
                .populate({ path: 'category', model: Category })
                .populate({ path: 'subcategory', model: SubCategory })
                .populate({ path: 'warrantyInformation', model: WarrantyInformation })
                .populate({ path: 'shippingInformation', model: ShippingInformation })
                .populate({ path: 'returnPolicy', model: ReturnPolicy })
                .populate({ path: 'reviews', model: Review })
                .populate({ path: 'offers', model: Offer })
                .exec();
                
        if (!product) return NextResponse.json({ error: "Product not found" }, { status: 404 });

        return NextResponse.json(product);

    } catch (error) {
        if(error instanceof Error){
            
            return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
        }
    }


}