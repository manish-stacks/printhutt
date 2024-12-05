import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import Category from '@/models/categoryModel';

connect()
export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    
    const category = await Category.create(data);
    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
    try {
      const url = new URL(req.url);
      const page = parseInt(url.searchParams.get('page') || '1');
      const limit = parseInt(url.searchParams.get('limit') || '10');
      const search = url.searchParams.get('search') || '';
  
      const query = search
        ? { name: { $regex: search, $options: 'i' } }
        : {};
  
      const skip = (page - 1) * limit;
      
      const [categories, total] = await Promise.all([
        Category.find(query)
          .populate('parentCategory', 'name')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit),
        Category.countDocuments(query)
      ]);
  
      return NextResponse.json({
        categories,
        pagination: {
          total,
          pages: Math.ceil(total / limit),
          page,
          limit
        }
      });
    } catch (error: any) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }