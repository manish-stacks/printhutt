import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const response = NextResponse.json({
            message: "Logout successfully",
            success: true
        }, { status: 200 });

        response.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            maxAge: 0,
            path: "/", 
        });

        return response;

    } catch (error: unknown) {
        return NextResponse.json({
            error: (error as Error).message || "Internal server error",
        }, { status: 500 });
    }
}
