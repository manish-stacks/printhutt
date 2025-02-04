import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Product from '@/models/productModel';
import SubCategory from '@/models/subCategoryModel';
import Category from '@/models/categoryModel';

const serverErrorResponse = (error: Error) => {
    console.error('Error fetching products:', error.message);
    return NextResponse.json(
        { error: 'Internal Server Error', details: error.message },
        { status: 500 }
    );
};


export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        await dbConnect();
        
        const limitParam = searchParams.get('limit');
        const categoryId = searchParams.get('id');

        // Validate category ID
        if (!categoryId) {
            return NextResponse.json(
                { error: 'Category ID is required' },
                { status: 400 }
            );
        }

        
        const limit = limitParam === 'all' || !limitParam ? null : parseInt(limitParam);

        // Build the query
        const productsQuery = Product.find({ category: categoryId })
            .sort({ createdAt: -1 }) 
            .populate({ path: 'category', model: Category }) 
            .populate({ path: 'subcategory', model: SubCategory }); 

        // Apply limit if specified
        if (limit !== null) {
            productsQuery.limit(limit);
        }

        // Execute the query
        const productsData = await productsQuery.lean();

        // Return the response
        return NextResponse.json(
            { products: productsData },
            { status: 200 }
        );
    } catch (error) {
        if (error instanceof Error) {
            return serverErrorResponse(error);
        }
        return serverErrorResponse(new Error('Unknown error occurred'));
    }
}