
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    try {
        const reponse = NextResponse.json({
            message: "Logout successfully",
            success: true
        }, { status: 200 })

        reponse.cookies.set("token", "", {
            httpOnly: true,
            expires: new Date(0)
        })

        return reponse;

    } catch (error: any) {
        return NextResponse.json({
            error: error.message || 'Internal server error',
        }, { status: 500 });
    }
}