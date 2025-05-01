import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Coupon from '@/models/couponModel';


export async function POST(req: NextRequest) {
  try {
    await dbConnect();
    // Extract role from token and ensure admin access
    const { role } = await getDataFromToken(req);
    if (role !== "admin") {
      return NextResponse.json({ success: false, message: "Unauthorized" }, { status: 401 });
    }

    // Parse and validate request body
    const requestBody = await req.json();

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
      isActive,
      isShow
    } = requestBody;

    // Check required fields
    if (!code || !discountValue || !validFrom || !validUntil) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }


    const activeStatus = typeof isActive === 'boolean' ? isActive : Boolean(isActive);
    const activeisShow = typeof isShow === 'boolean' ? isShow : Boolean(isShow);

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
      isActive: activeStatus,
      isShow: activeisShow,
    });

    // Save the coupon to the database
    const savedCoupon = await newCoupon.save();

    return NextResponse.json(
      {
        success: true,
        message: "Coupon created successfully",
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

    // Build the query object based on search
    const query = search
      ? { code: { $regex: search, $options: 'i' } }  // Changed from 'returnPeriod' to 'code' for relevancy
      : {};

    const skip = (page - 1) * limit;

    // Fetch coupons and total count
    const [coupons, total] = await Promise.all([
      Coupon.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Coupon.countDocuments(query),
    ]);

    return NextResponse.json({
      success: true,
      coupons,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        page,
        limit,
      },
    });
  } catch (error: unknown) {
    console.error("Error in GET /api/coupons:", error);
    return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
  }
}
