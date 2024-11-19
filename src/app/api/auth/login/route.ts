import { connect } from '@/dbConfig/dbConfig'
import UserModal from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

connect()
export const POST = async (NextRequest: NextRequest) => {
    try {

        const reqBody = await NextRequest.json();
        const { email, password } = reqBody

        if (!email || !password) {
            return NextResponse.json({
                message: "All fields are required",
                success: false,
            }, { status: 400 });
        }
        const user = await UserModal.findOne({ email })

        if (!user) {
            return NextResponse.json({
                error: 'User does not exists',
            }, { status: 400 })
        }

        if (!user.isVerified) {
            return NextResponse.json({
                message: "User not verify",
                success: false,
            }, { status: 400 });
        }

        const passwordMatch = await user.comparePassword(password)
        if (!passwordMatch) {
            return NextResponse.json({
                success: false,
                message: "Check your credentials"
            }, { status: 401 })
        }
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: '1d' })

        const reponse = NextResponse.json({
            message: "Logged In Success",
            success: true,
        })

        reponse.cookies.set("token", token, {
            httpOnly: true
        })
        return reponse
       
    } catch (error: any) {
        return NextResponse.json({
            error: error.message || 'Internal server error'
        }, { status: 500 })
    }
}