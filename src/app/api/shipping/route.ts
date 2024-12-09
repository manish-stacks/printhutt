import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import ShippingInformation from '@/models/shippingInformationModel';

connect();

export async function POST(req: NextRequest) {
  try {
    const { role } = await getDataFromToken(req)
    if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });


    const { shippingMethod, shippingFee, shippingTime } = await req.json();

    const warranty = new ShippingInformation({
      shippingMethod,
      shippingFee,
      shippingTime,
    });
    await warranty.save()

    return NextResponse.json(
      {
        success: true,
        message: 'Data inserted successfully',
        data: warranty
      },
      { status: 201 }
    );
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
      ? { warrantyType: { $regex: search, $options: 'i' } }
      : {};

    const skip = (page - 1) * limit;

    const [shipping, total] = await Promise.all([
      ShippingInformation.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      ShippingInformation.countDocuments(query)
    ]);

    return NextResponse.json({
      shipping,
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


