import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import SubCategory from '@/models/subCategoryModel';

connect();


export async function POST(request: NextRequest) {
    try {
        const { id } = await request.json();

        if (!id) {
            return NextResponse.json({ error: 'Missing `id` in request body' }, { status: 400 });
        }

        const categories = await SubCategory.find({ parentCategory: id }).select('_id name').exec();

        return NextResponse.json(
            {
                message: 'Data fetched successfully',
                category:categories, 
            },
            { status: 200 } 
        );
    } catch (error: unknown) {
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'An unexpected error occurred' },
            { status: 500 }
        );
    }
}