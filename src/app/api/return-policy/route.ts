import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import ReturnPolicy from '@/models/returnPolicyModule';

const errorHandler = (message: string, status: number) => {
  return NextResponse.json({ error: message }, { status });
};

const checkAdminRole = async (req: NextRequest) => {
  const { role } = await getDataFromToken(req);
  if (role !== 'admin') {
    throw new Error('Unauthorized');
  }
};

export async function POST(req: NextRequest) {
  
  try {
    await dbConnect();
    await checkAdminRole(req);

    const { returnPeriod, restockingFee, policyDetails } = await req.json();

    const returnData = new ReturnPolicy({
      returnPeriod,
      restockingFee,
      policyDetails,
    });
    
    await returnData.save();

    return NextResponse.json({
      success: true,
      message: 'Data inserted successfully',
      data: returnData,
    }, { status: 201 });
  } catch (error: unknown) {
    return errorHandler((error as Error).message, 500);
  }
}

export async function GET(req: NextRequest) {
  
  try {
    await dbConnect();
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
      ReturnPolicy.countDocuments(query),
    ]);

    return NextResponse.json({
      returndata,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    });
  } catch (error: unknown) {
    return errorHandler((error as Error).message, 500);
  }
}
