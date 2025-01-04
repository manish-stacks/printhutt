import { NextResponse } from 'next/server'

export async function GET() {
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

    } catch (error: unknown) {
        return NextResponse.json({
            error: (error as Error).message || 'Internal server error',
        }, { status: 500 });
    }
}