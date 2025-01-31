import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Coupon from '@/models/couponModel';

connect();

export async function POST(req: NextRequest) {
  try {
    // Extract role from token
    const { role } = await getDataFromToken(req);
    if (role !== "admin") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // Parse request body
    const requestBody = await req.json();
    
    // Extract fields and explicitly convert isActive to a boolean
    const {
      code,
      description,
      discountType,
      discountValue,
      minimumPurchaseAmount,
      maxDiscountAmount,
      validFrom,
      validUntil,
      usageLimit,
      isActive
    } = requestBody;


    const activeStatus = Boolean(isActive);
    // console.log("Parsed Data:", { ...requestBody, isActive: activeStatus });

    const newCoupon = new Coupon({
      code,
      description,
      discountType,
      discountValue,
      minimumPurchaseAmount,
      maxDiscountAmount,
      validFrom,
      validUntil,
      usageLimit,
      isActive: activeStatus // Ensure correct boolean value
    });

    // Save to database
    const savedCoupon = await newCoupon.save();
    // console.log("Saved Data:", savedCoupon);

    return NextResponse.json(
      {
        success: true,
        message: "Coupon inserted successfully",
        data: savedCoupon,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    console.error("Error in POST /api/coupons:", error);
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
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
  } catch (error: unknown) {
    console.log("fetching",error)
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}