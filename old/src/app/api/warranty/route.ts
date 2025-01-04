import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import WarrantyInformation from '@/models/warrantyInformationModel';

connect();

export async function POST(req: NextRequest) {
  try {
    const { role } = await getDataFromToken(req)
    if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });


    const { warrantyType, durationMonths, coverage, claimProcess } = await req.json();

    const warranty = new WarrantyInformation({
      warrantyType,
      durationMonths,
      coverage,
      claimProcess,
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
      ? { warrantyType: { $regex: search, $options: 'i' } }
      : {};

    const skip = (page - 1) * limit;

    const [warranty, total] = await Promise.all([
      WarrantyInformation.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      WarrantyInformation.countDocuments(query)
    ]);

    return NextResponse.json({
      warranty,
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



