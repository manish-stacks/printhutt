import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Coupon from '@/models/couponModel';
import User from '@/models/userModel';


export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const body = await request.json();
        const tokenData = await getDataFromToken(request);

        if (!tokenData?.id) {
            return NextResponse.json({ success: true, message: "Unauthorized User" }, { status: 401 });
        }

        const userData = await User.findById(tokenData.id);
        if (userData?.couponCollection.includes(body.coupon.id)) {
            return NextResponse.json(
                { success: true, message: "Coupon already used." },
                { status: 200 }
            );
        }
    } catch (error: unknown) {
        console.error("Database connection error:", error);
        return NextResponse.json({ success: false, message: "Database connection error" }, { status: 500 });
    }

}