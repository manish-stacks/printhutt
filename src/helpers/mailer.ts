const nodemailer = require("nodemailer");
import { v4 as uuidv4 } from 'uuid';
import UserModel from '@/models/userModel'

interface mallerType {
    email: String,
    emailType: String,
    userId: String
}


export const sendEmail = async ({ email, emailType, userId }: mallerType) => {
    try {
        const hashedToken = uuidv4();
        if (emailType === 'VERIFY') {
            await UserModel.findByIdAndUpdate(userId, {
                verifyToken: hashedToken, verifyTokenExpiry: Date.now() + 3600000
            })
        } else if (emailType === 'RESET') {
            await UserModel.findByIdAndUpdate(userId, {
                forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000
            })
        }
        const transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
        });

        const mailOption = {
            from: '"' + process.env.APP_NAME + '" ' + process.env.MAIL_FROM_ADDRESS,
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `
                click <a href="${process.env.APP_URL}/verifyemail?token=${hashedToken}">here</a>
                to ${emailType=== 'VERIFY' ? "verify your email":"reset your password"}
                or copy and paste the link below in your browser.</p>
            `,
        }


        const mailResponce = await transporter.sendMail(mailOption)
        return mailResponce;
    } catch (error: any) {
        throw new Error(error.message)
    }
}