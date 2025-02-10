import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig'
import Category from '@/models/categoryModel';
import SubCategory from '@/models/subCategoryModel';



export async function GET(request: NextRequest, context: { params: { slug: string } }) {
    try {
        await dbConnect();
        const { slug } = await context.params;
        const { searchParams } = new URL(request.url);
        const type = searchParams.get('type');

        if (!slug) {
            return NextResponse.json({ success: false, message: "Invalid Category" }, { status: 400 });
        }

        if(type=='category'){
            const category = await Category.findOne({slug});
            if (!category) return NextResponse.json({ error: "Category not found" }, { status: 404 });
            return NextResponse.json(category);
        }

        if(type=='subcategory'){
            const subcategory = await SubCategory.findOne({slug});
            if (!subcategory) return NextResponse.json({ error: "Subcategory not found" }, { status: 404 });
            return NextResponse.json(subcategory);
        }
        
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: "Failed to fetch category" }, { status: 500 });
        }
    }

}


