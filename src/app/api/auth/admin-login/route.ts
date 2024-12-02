import { connect } from '@/dbConfig/dbConfig'
import { NextRequest, NextResponse } from 'next/server'
import UserModel from '@/models/userModel'
import jwt from 'jsonwebtoken'

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

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '7d' });

        
        const response = NextResponse.json({
            message: "Logged In Success",
            success: true,
            role: user.role, 
        });

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', 
            path: '/', 
            maxAge: 7 * 24 * 60 * 60, 
        });

        return response;

    } catch (error: any) {
        console.error("Error during login:", error.message);
        return NextResponse.json({
            error: error.message || 'Internal server error',
        }, { status: 500 });
    }
};