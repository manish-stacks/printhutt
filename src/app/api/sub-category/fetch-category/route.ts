import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import SubCategory from '@/models/subCategoryModel';


export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Missing `id` in request body' }, { status: 400 });
        }

        // Fetch categories related to the parent category ID
        const categories = await SubCategory.find({ parentCategory: id })
            .select('_id name')
            .exec();

        if (categories.length === 0) {
            return NextResponse.json({ message: 'No categories found for the given parent ID' }, { status: 404 });
        }

        return NextResponse.json(
            {
                message: 'Data fetched successfully',
                category: categories,
            },
            { status: 200 }
        );
    } catch (error: unknown) {
        console.error('Error fetching categories:', error); // Adding logging for debugging
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}
