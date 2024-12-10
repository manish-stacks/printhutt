import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import ReturnPolicy from '@/models/returnPolicyModule';

connect();

export async function POST(req: NextRequest) {
  try {
    const { role } = await getDataFromToken(req)
    if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });

    
    const { returnPeriod, restockingFee, policyDetails } = await req.json();


    const returnData = new ReturnPolicy({
      returnPeriod,
      restockingFee,
      policyDetails,
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
      ? { returnPeriod: { $regex: search, $options: 'i' } }
      : {};

    const skip = (page - 1) * limit;

    const [returndata, total] = await Promise.all([
      ReturnPolicy.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      ReturnPolicy.countDocuments(query)
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
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}


