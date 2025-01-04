import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Offer from '@/models/offerModel';

connect();

export async function POST(req: NextRequest) {
  try {
    const { role } = await getDataFromToken(req)
    if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });


    const { offerTitle, offerDescription, discountPercentage, validFrom, validTo } = await req.json();

    const returnData = new Offer({
      offerTitle,
      offerDescription,
      discountPercentage,
      validFrom,
      validTo
    });
    await returnData.save()

    return NextResponse.json(
      {
        success: true,
        message: 'Data inserted successfully',
        data: returnData
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const search = url.searchParams.get('search') || '';

    const query = search
      ? { offerTitle: { $regex: search, $options: 'i' } }
      : {};

    const skip = (page - 1) * limit;

    const [returndata, total] = await Promise.all([
      Offer.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Offer.countDocuments(query)
    ]);

    return NextResponse.json({
      returndata,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit
      }
    });
  } catch (error: unknown) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}


