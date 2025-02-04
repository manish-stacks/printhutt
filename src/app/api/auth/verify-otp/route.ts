import dbConnect from '@/dbConfig/dbConfig';
import UserModel from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import { isEmail } from '@/helpers/helpers';
import { SignJWT } from 'jose';


export const POST = async (request: NextRequest) => {
    try {
        await dbConnect();
        const reqBody = await request.json();
        const { otp, emailOrMobile } = reqBody;

        // Validate input
        if (!emailOrMobile || !otp) {
            return NextResponse.json({
                message: "OTP and emailOrMobile are required.",
                success: false,
            }, { status: 400 });
        }

        // Validate OTP format
        if (isNaN(Number(otp))) {
            return NextResponse.json({
                message: "Invalid OTP format.",
                success: false,
            }, { status: 400 });
        }

        // Determine query key (email or phone number)
        const isEmailInput = isEmail(emailOrMobile);
        const queryKey = isEmailInput ? 'email' : 'number';

        // Find user by email or phone
        const user = await UserModel.findOne({ [queryKey]: emailOrMobile });
        
        if (!user) {
            return NextResponse.json({
                message: 'User not found.',
                success: false,
            }, { status: 404 });
        }

        // Validate OTP
        if (user.otpVerification !== Number(otp) || Date.now() > user.otpVerificationExpiry) {
            return NextResponse.json({
                message: "Invalid or expired OTP.",
                success: false,
            }, { status: 401 });
        }

        // Check if the user is verified
        if (!user.isVerified) {
            return NextResponse.json({
                message: "User not verified.",
                success: false,
            }, { status: 403 });
        }

        // Clear OTP fields after successful verification
        user.otpVerification = null;
        user.otpVerificationExpiry = null;
        await user.save();

        // Prepare JWT token
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role,
        };

        const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!);
        const token = await new SignJWT(tokenData)
            .setProtectedHeader({ alg: 'HS256' })
            .sign(secret);

        const response = NextResponse.json({
            message: "OTP verified successfully.",
            success: true,
            role: user.role,
            user: tokenData,
        }, { status: 200 });

        // Set the token in cookies
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60, // 1 week
            path: '/',
        });

        return response;
    } catch (error: unknown) {
        console.error("Error in OTP verification:", error);
        return NextResponse.json({
            error: (error instanceof Error) ? error.message : 'Internal server error',
            success: false,
        }, { status: 500 });
    }
};
