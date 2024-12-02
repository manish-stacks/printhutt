import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import UserModel from '@/models/userModel'
import { SignJWT } from 'jose';

connect()


export const POST = async (request: NextRequest) => {
    try {
        const reqBody = await request.json();
        const { email, password } = reqBody;

        if (!email || !password) {
            return NextResponse.json({
                message: "All fields are required",
                success: false,
            }, { status: 400 });
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return NextResponse.json({
                message: 'User does not exist',
                success: false,
            }, { status: 400 });
        }

        if (!user.isVerified) {
            return NextResponse.json({
                message: "User not verified",
                success: false,
            }, { status: 400 });
        }

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return NextResponse.json({
                success: false,
                message: "Check your credentials",
            }, { status: 401 });
        }


        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };


        const secret = new TextEncoder().encode(process.env.TOKEN_SECRET!);
        const token = await new SignJWT(tokenData)
            .setProtectedHeader({ alg: 'HS256' })
            .sign(secret);

        const response = NextResponse.json({
            message: "Logged In Success.",
            success: true,
            role: user.role,
        }, { status: 200 });

        // Set the token in cookies
        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60,
            path: '/',
        });

        return response;

    } catch (error: any) {
        console.error("Error during login:", error.message);
        return NextResponse.json({
            error: error.message || 'Internal server error',
        }, { status: 500 });
    }
};