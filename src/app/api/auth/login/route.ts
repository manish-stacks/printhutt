import dbConnect from '@/dbConfig/dbConfig';
import { sendOtpByEmail, sendOtpBySms } from '@/lib/mail/mailer';
import { NextRequest, NextResponse } from 'next/server';
import UserModel from '@/models/userModel';
import { isEmail } from '@/helpers/helpers';

export async function POST(request: NextRequest) {
    try {
        await dbConnect(); 

        const reqBody = await request.json();
        const { emailOrMobile } = reqBody;

        if (!emailOrMobile) {
            return NextResponse.json(
                { error: 'emailOrMobile is required' },
                { status: 400 }
            );
        }

        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = Date.now() + 3600000; // 1 hour expiry

        const isEmailInput = isEmail(emailOrMobile); // Check if input is email
        const queryKey = isEmailInput ? 'email' : 'number';

        let user = await UserModel.findOne({
            [queryKey]: emailOrMobile
        });

        if (!user) {
            const userData = {};
            userData[queryKey] = emailOrMobile;
            userData.otpVerification = otp;
            userData.otpVerificationExpiry = otpExpiry;
            
            user = new UserModel(userData);
            await user.save();
        } else {
            user.otpVerification = otp;
            user.otpVerificationExpiry = otpExpiry;
            await user.save();
        }

        // Send OTP via email or SMS
        isEmailInput
            ? await sendOtpByEmail(emailOrMobile, otp)
            : await sendOtpBySms(emailOrMobile, otp);

        return NextResponse.json(
            { message: 'OTP sent successfully' }, 
            { status: 200 }
        );
    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : 'Internal server error';
        console.error('Error in OTP generation:', error);
        return NextResponse.json(
            { error: errorMessage },
            { status: 500 }
        );
    }
}
