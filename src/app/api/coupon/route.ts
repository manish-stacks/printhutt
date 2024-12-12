import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Coupon from '@/models/couponModel';

connect();

export async function POST(req: NextRequest) {
  try {
    const { role } = await getDataFromToken(req)
    if (role !== 'admin') return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
    const { code, description, discountType, discountValue, minimumPurchaseAmount, maxDiscountAmount, validFrom, validUntil, usageLimit, isActive } = await req.json();

    const returnData = new Coupon({
      code, description, discountType, discountValue, minimumPurchaseAmount, maxDiscountAmount, validFrom, validUntil, usageLimit, isActive
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

    const [coupons, total] = await Promise.all([
      Coupon.find(query)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Coupon.countDocuments(query)
    ]);

    return NextResponse.json({
      coupons,
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


