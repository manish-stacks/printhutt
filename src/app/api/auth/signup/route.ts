import { connect } from '@/dbConfig/dbConfig'
import UserModel from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import { sendEmail } from '@/helpers/mailer'

connect();

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const { username, email, password,number} = reqBody
        
        if (!username || !email || !password || !number) {
            return NextResponse.json({
                message: "All fields are required",
                success: false,
            },{ status: 400 });
        }
        
        const user = await UserModel.findOne({ email })

        if (user) {
            return NextResponse.json({
                error: 'User already exit',
            }, { status: 400 })
        }
        const newUser = new UserModel({
            username,
            email,
            number,
            password
        })

        const saveUser = await newUser.save()
        
        await sendEmail({ email, emailType: 'VERIFY', userId: saveUser._id })

        return NextResponse.json({
            message: "user registered successfully",
            success: true,
            saveUser
        })
    

    } catch (error: any) {
        return NextResponse.json({
            error: error.message || 'Internal server error',
        },{ status: 500 });
    }
}