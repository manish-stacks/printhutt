import { NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import Category from '@/models/categoryModel';

connect();

export async function GET() {
    try {
        const category = await Category.find().select('_id name')
        // console.log(category)
        return NextResponse.json(
            {
                message: 'data fetch',
                category: category
            },
            { status: 201 }
        );

    } catch (error: unknown) {
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
    }
}
