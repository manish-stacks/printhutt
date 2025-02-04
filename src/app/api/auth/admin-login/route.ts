import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import UserModel from '@/models/userModel';
import { SignJWT } from 'jose';

export const POST = async (request: NextRequest) => {
    try {
        await dbConnect(); 

        const reqBody = await request.json();
        const { email, password } = reqBody;

        if (!email || !password) {
            return NextResponse.json(
                { message: "All fields are required", success: false },
                { status: 400 }
            );
        }

        const user = await UserModel.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { message: 'User does not exist', success: false },
                { status: 400 }
            );
        }

        if (!user.isVerified) {
            return NextResponse.json(
                { message: "User not verified", success: false },
                { status: 400 }
            );
        }

        const passwordMatch = await user.comparePassword(password);
        if (!passwordMatch) {
            return NextResponse.json(
                { success: false, message: "Check your credentials" },
                { status: 401 }
            );
        }

        if (!process.env.TOKEN_SECRET) {
            throw new Error("TOKEN_SECRET is not defined");
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email,
            role: user.role
        };

        const secret = new TextEncoder().encode(process.env.TOKEN_SECRET);
        const token = await new SignJWT(tokenData)
            .setProtectedHeader({ alg: 'HS256' })
            .sign(secret);

        const responseBody = {
            message: "Logged In Success.",
            success: true,
            role: user.role,
        };

        return new Response(JSON.stringify(responseBody), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Set-Cookie': `token=${token}; HttpOnly; Path=/; Max-Age=${7 * 24 * 60 * 60}; SameSite=Strict; ${process.env.NODE_ENV === 'production' ? 'Secure;' : ''}`
            }
        });

    } catch (error) {
        console.error("Error during login:", (error as Error).message);
        return NextResponse.json(
            { error: (error as Error).message || 'Internal server error' },
            { status: 500 }
        );
    }
};
