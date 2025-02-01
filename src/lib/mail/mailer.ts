import nodemailer from "nodemailer";
import { v4 as uuidv4 } from 'uuid';
import UserModel from '@/models/userModel'
import type { mallerType, OrderDetails } from '@/lib/types';
import { formatCurrency } from '../../helpers/helpers';
import { getCustomerEmailTemplate } from './templates/customer';
import { getOwnerEmailTemplate } from './templates/owner';
import dotenv from "dotenv"
import { generateOrderStatusEmail, getShippedEmailTemplate } from "./templates/order-status";
import axios from "axios";
dotenv.config()

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  // secure: process.env.SMTP_SECURE === 'true',
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
      from: '"' + process.env.APP_NAME + '" ' + process.env.SMTP_FROM,
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
  } catch (error) {
    if (error instanceof Error) {

      throw new Error((error as Error).message)
    }
  }
}

// export const sendOtpByEmail = async (email: string, otp: string) => {
//   const mailOption = {
//     from: '"' + process.env.APP_NAME + '" ' + process.env.SMTP_FROM,
//     to: email,
//     subject: 'Your OTP Code',
//     html: `Your OTP is ${otp}`
//   }

//   try {
//     const mailResponce = await transporter.sendMail(mailOption)
//     return mailResponce;
//   } catch (error) {
//     if(error instanceof Error){

//       throw new Error((error as Error).message)
//     }
//   }
// }

export const sendOtpByEmail = async (email: string, otp: string) => {
  const mailOption = {
    from: `"${process.env.APP_NAME}" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: 'Your One-Time Password (OTP)',
    html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #4CAF50;">Your OTP Code</h2>
        <p>Dear User,</p>
        <p>Thank you for using ${process.env.APP_NAME}. To proceed, please use the following One-Time Password (OTP):</p>
        <div style="font-size: 24px; font-weight: bold; color: #4CAF50; margin: 20px 0;">
          ${otp}
        </div>
        <p>Please note that this OTP is valid for a limited time and should not be shared with anyone.</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p>If you did not request this OTP, please ignore this email or contact support at <a href="mailto:${process.env.SMTP_FROM}" style="color: #4CAF50;">${process.env.SMTP_FROM}</a>.</p>
        <p>Best regards,</p>
        <p>The ${process.env.APP_NAME} Team</p>
      </div>
    `,
  };

  try {
    const mailResponse = await transporter.sendMail(mailOption);
    return mailResponse;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error((error as Error).message);
    }
  }
};



export const sendOtpBySms = async (mobile: string, otp: string) => {

  const receiver = `+91${mobile}`;
  const template = "OTP1";
  const apiKey = process.env.TWO_FACTOR_API;

  const url = `https://2factor.in/API/V1/${apiKey}/SMS/${receiver}/${otp}/${template}`;
  // console.log('url', url)
  try {
    const response = await axios.post(url);
    // console.log('OTP sent successfully:', response.data);
  } catch (error) {
    if (error instanceof Error) {
      throw new Error((error as Error).message);
    }
  }

  return ({
    to: mobile,
    message: `Your OTP is ${otp}`,
  });
}

export async function sendOrderConfirmationEmail(orderData: {
  userId: { email: string };
  orderId: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: {
    discountPrice: number;
    shippingTotal: number;
    totalPrice: number;
  };
  payment: string;
  shipping: string;
  coupon?: string;
}) {
  // Send customer confirmation
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: orderData.userId.email,
    subject: `Order Confirmation - ${orderData.orderId}`,
    html: getCustomerEmailTemplate({
      orderId: orderData.orderId,
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      payment: orderData.payment,
      shipping: orderData.shipping,
      coupon: orderData.coupon,
      paymentType: orderData.payment,
      payAmt: orderData.payAmt,
      formatCurrency,
    }),
  });

  // Send owner notification
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.SHOP_OWNER_EMAIL,
    subject: `New Order Received - ${orderData.orderId}`,
    html: getOwnerEmailTemplate({
      orderId: orderData.orderId,
      items: orderData.items,
      totalAmount: orderData.totalAmount,
      payment: orderData.payment,
      shipping: orderData.shipping,
      coupon: orderData.coupon,
      paymentType: orderData.payment,
      payAmt: orderData.payAmt,
      formatCurrency,
    }),
  });
}


export async function sendOrderStatus(order: OrderDetails) {

  let emailContent;

  if (order.status === 'shipped') {
    emailContent = getShippedEmailTemplate(order);
  } else {
    emailContent = generateOrderStatusEmail(order);
  }

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: order.shipping.email,
    subject: `Order Status - ${order.orderId}`,
    html: emailContent,
  });

}