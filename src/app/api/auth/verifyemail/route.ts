import dbConnect from '@/dbConfig/dbConfig';
import UserModel from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const { token } = reqBody;

        // Handle missing token
        if (!token) {
            return NextResponse.json({
                message: "Token is required",
                success: false,
            }, { status: 400 });
        }

        // Find user by token and check expiry
        const user = await UserModel.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });

        if (!user) {
            return NextResponse.json({
                message: "Invalid or expired token",
                success: false,
            }, { status: 400 });
        }

        // Mark user as verified and clear token
        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();

        return NextResponse.json({
            message: "Email verified successfully",
            success: true
        }, { status: 200 });

    } catch (error: unknown) {
        console.error("Error in email verification:", error);
        return NextResponse.json({
            message: (error instanceof Error) ? error.message : 'Internal server error',
            success: false,
        }, { status: 500 });
    }
}
