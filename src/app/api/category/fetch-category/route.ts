import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Category from '@/models/categoryModel';


export async function GET() {
    try {
        await dbConnect();
        // Fetch categories with only _id and name
        const categories = await Category.find().select('_id name');

        return NextResponse.json(
            {
                success: true,
                message: 'Categories fetched successfully',
                data: categories
            },
            { status: 200 }
        );

    } catch (error: unknown) {
        console.error('Error fetching categories:', error);
        return NextResponse.json({
            success: false,
            error: (error as Error).message || 'Internal server error'
        }, { status: 500 });
    }
}
