const nodemailer = require("nodemailer");
import { v4 as uuidv4 } from 'uuid';
import UserModel from '@/models/userModel'
import { mallerType, OrderEmailData } from '@/lib/types';
import { formatCurrency } from './helpers';


const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: process.env.SMTP_SECURE === 'true',
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
    },
});




export const sendVerifyEmail = async ({ email, emailType, userId }: mallerType) => {
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

        const mailOption = {
            from: '"' + process.env.APP_NAME + '" ' + process.env.MAIL_FROM_ADDRESS,
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
            html: `
                click <a href="${process.env.APP_URL}/verifyemail?token=${hashedToken}">here</a>
                to ${emailType === 'VERIFY' ? "verify your email" : "reset your password"}
                or copy and paste the link below in your browser.</p>
            `,
        }


        const mailResponce = await transporter.sendMail(mailOption)
        return mailResponce;
    } catch (error: any) {
        throw new Error(error.message)
    }
}

export const sendOtpByEmail = async (email: string, otp: string) => {

    const mailOption = {
        from: '"' + process.env.APP_NAME + '" ' + process.env.MAIL_FROM_ADDRESS,
        to: email,
        subject: 'Your OTP Code',
        html: `Your OTP is ${otp}`
    }

    try {
        const mailResponce = await transporter.sendMail(mailOption)
        return mailResponce;
    } catch (error: any) {
        throw new Error(error.message)
    }


}

export const sendOtpBySms = async (mobile: string, otp: string) => {
    // Replace with your SMS service logic
    // return someSmsService.send({
    //     to: mobile,
    //     message: `Your OTP is ${otp}`,
    // });
}



export async function sendOrderConfirmationEmail(data: OrderEmailData) {
    const { email, orderId, totalAmount, items } = data;

    const itemsHtml = items
        .map(item => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb;">
          <p style="margin: 0; color: #374151; font-weight: 500;">${item.name}</p>
          <p style="margin: 4px 0 0; color: #6b7280; font-size: 14px;">Quantity: ${item.quantity}</p>
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e5e7eb; text-align: right; color: #374151;">
          ${formatCurrency(item.price)}
        </td>
      </tr>
    `)
        .join('');

    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <title>Order Confirmation</title>
      </head>
      <body style="background-color: #f3f4f6; margin: 0; padding: 0; font-family: system-ui, -apple-system, sans-serif;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="margin: auto;">
          <tr>
            <td align="center" style="padding: 40px 0;">
              <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #ffffff; max-width: 600px; margin: auto; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
                <!-- Header -->
                <tr>
                  <td style="padding: 40px 40px 32px; text-align: center; background-color: #000000; border-radius: 8px 8px 0 0;">
                    <h1 style="margin: 0; color: #ffffff; font-size: 24px; font-weight: 700;">Order Confirmation</h1>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 32px 40px;">
                    <p style="margin: 0 0 24px; color: #374151; font-size: 16px;">Thank you for your order!</p>
                    
                    <!-- Order Info -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                      <tr>
                        <td style="padding: 16px; background-color: #f9fafb; border-radius: 6px;">
                          <p style="margin: 0 0 8px; color: #6b7280; font-size: 14px;">Order ID</p>
                          <p style="margin: 0; color: #111827; font-weight: 500;">${orderId}</p>
                        </td>
                      </tr>
                    </table>

                    <!-- Order Items -->
                    <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 32px;">
                      <tr>
                        <td colspan="2" style="padding-bottom: 16px;">
                          <h2 style="margin: 0; color: #111827; font-size: 18px; font-weight: 600;">Order Summary</h2>
                        </td>
                      </tr>
                      ${itemsHtml}
                      <tr>
                        <td colspan="2" style="padding-top: 24px;">
                          <table width="100%" cellpadding="0" cellspacing="0">
                            <tr>
                              <td style="padding: 8px 0; color: #111827; font-weight: 600;">Total Amount</td>
                              <td style="padding: 8px 0; text-align: right; color: #111827; font-weight: 600;">
                                ${formatCurrency(totalAmount)}
                              </td>
                            </tr>
                          </table>
                        </td>
                      </tr>
                    </table>

                    <!-- CTA Button -->
                    <table width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td style="padding: 32px 0;">
                          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard/orders" 
                             style="display: inline-block; padding: 12px 24px; background-color: #000000; color: #ffffff; text-decoration: none; border-radius: 6px; font-weight: 500; text-align: center;">
                            View Order Details
                          </a>
                        </td>
                      </tr>
                    </table>

                    <!-- Footer -->
                    <p style="margin: 32px 0 0; padding-top: 32px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; text-align: center;">
                      If you have any questions, please contact our support team.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
  `;

    try {
        await transporter.sendMail({
            from: process.env.SMTP_FROM,
            to: email,
            subject: `Order Confirmation - ${orderId}`,
            html,
        });
        return true;
    } catch (error: any) {
        throw new Error(`Error sending email: ${error?.message}`);
    }

}
