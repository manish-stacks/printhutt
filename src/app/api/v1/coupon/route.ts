import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Coupon from '@/models/couponModel';

export async function GET(req: NextRequest) {
    try {
        await dbConnect();
        const coupons = await Coupon.find({ isActive: true, isShow: true }).sort({ createdAt: -1 }).lean();
        // console.log(coupons);
        return NextResponse.json({
            success: true,
            coupons
        });
    } catch (error: unknown) {
        console.error("Error in GET /api/coupons:", error);
        return NextResponse.json({ success: false, error: (error as Error).message }, { status: 500 });
    }
}