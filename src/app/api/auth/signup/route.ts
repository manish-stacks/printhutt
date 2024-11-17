import { connect } from '@/dbConfig/dbConfig'
import UserModel from '@/models/userModel'
import { NextRequest as req, NextResponse as res } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'

connect()

export async function POST(request: req) {
    try {
        const reqBody = request.json()
        console.log(reqBody)
        const { username, email, password } = reqBody

        const user = await UserModel.findOne({ email })
        if (user) {
            return res.json({
                error: 'User already exit',
            }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt)

        const newUser = new UserModel({
            username,
            email,
            password: hashedPassword
        })

        const saveUser = await newUser.save()
        console.log(saveUser)
        await sendEmail({ email, emailType: 'emailType', userId: saveUser._id })

        //    send email vetificaiton
        return res.json({
            message:"user registered successfully",
            success:true,
            saveUser
        })

    } catch (error: any) {
        return res.json({
            error: error.message
        }, { status: 500 })
    }
}