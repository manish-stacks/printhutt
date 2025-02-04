import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Offer from '@/models/offerModel';

export async function POST(req: NextRequest) {
  try {
    await dbConnect(); 

    const { role } = await getDataFromToken(req);
    if (role !== 'admin') {
      return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    }

    const { offerTitle, offerDescription, discountPercentage, validFrom, validTo } = await req.json();

    const data = new Offer({
      offerTitle,
      offerDescription,
      discountPercentage,
      validFrom,
      validTo
    });

    await data.save();

    return NextResponse.json(
      {
        success: true,
        message: 'Data inserted successfully',
        data
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error('Error in POST /api/offers:', error); // ✅ Debugging
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    await dbConnect(); 

    const url = new URL(req.url);
    const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
    const limit = Math.max(1, parseInt(url.searchParams.get('limit') || '10'));
    const search = url.searchParams.get('search')?.trim() || '';

    const query = search ? { offerTitle: { $regex: search, $options: 'i' } } : {};

    const skip = (page - 1) * limit;

    const [offers, total] = await Promise.all([
      Offer.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Offer.countDocuments(query)
    ]);

    return NextResponse.json({
      success: true,
      message: 'Offers fetched successfully',
      data: offers,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit
      }
    });
  } catch (error: unknown) {
    console.error('Error in GET /api/offers:', error); 
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
