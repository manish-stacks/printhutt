import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import Category from '@/models/categoryModel';
import { uploadImage } from '@/lib/cloudinary';
import { File } from 'buffer';

connect();


export async function GET() {
    try {
        const category = await Category.find().select('_id name');
        // console.log(category)
        return NextResponse.json(
            {
                message: 'data fetch',
                category: category
            },
            { status: 201 }
        );

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
