import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import Category from '@/models/categoryModel';
import SubCategory from '@/models/subCategoryModel';
import Product from '@/models/productModel';

connect();



export async function GET() {
  try {

    const categories = await Category.find()
      .sort({ createdAt: -1 })
      .limit(6)
      .lean();


    const categoriesData = await Promise.all(
      categories.map(async (category) => {
        const subcategories = await SubCategory.find({ parentCategory: category._id }).lean();
        return {
          ...category,
          subcategories,
        };
      })
    );

    const productsData = await Product.find({ trending: true })
      .sort({ createdAt: -1 })
      .limit(6);

    return NextResponse.json({
      categories: categoriesData,
      products: productsData
    }, { status: 200 });
  } catch (error: unknown) {
    console.log(error);
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}


