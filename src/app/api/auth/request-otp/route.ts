import { sendOtpByEmail, sendOtpBySms } from '@/helpers/mailer';
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { emailOrMobile } = reqBody
        if (!emailOrMobile) {
            return NextResponse.json(
                { error: 'emailOrMobile is required' },
                { status: 400 }
            );
        }
        const otp = Math.floor(100000 + Math.random() * 900000).toString(); 


        if (isEmail(emailOrMobile)) {
            await sendOtpByEmail(emailOrMobile, otp);
        } else {
            await sendOtpBySms(emailOrMobile, otp);
        }

        
        return NextResponse.json(
            { message: 'OTP sent successfully' },
            { status: 200 }
        );
    } catch (error: any) {
        return NextResponse.json({
            error: error.message || 'Internal server error',
        }, { status: 500 });
    }
}

function isEmail(input: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(input);
}
