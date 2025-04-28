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
import { ShippingInformation } from "../types/shipping";
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
    const rawToken = uuidv4();
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    if (emailType === 'VERIFY') {
      await UserModel.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === 'RESET') {
      await UserModel.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const actionURL = `${process.env.APP_URL}/${emailType === 'VERIFY' ? 'verifyemail' : 'resetpassword'}?token=${rawToken}`;

    const mailOptions = {
      from: `"${process.env.APP_NAME}" <${process.env.SMTP_FROM}>`,
      to: email,
      subject: emailType === 'VERIFY' ? 'Verify your email' : 'Reset your password',
      html: `
        <p>Click the link below to ${emailType === 'VERIFY' ? 'verify your email' : 'reset your password'}:</p>
        <a href="${actionURL}" target="_blank">Click here</a>
        <p>Or copy and paste this URL in your browser:</p>
        <p>${actionURL}</p>
      `,
    };

    const mailResponse = await transporter.sendMail(mailOptions);
    return mailResponse;
  } catch (error) {
    console.error("Error while sending email:", error);
    throw new Error((error as Error).message);
  }
};



export const sendOtpByEmail = async (email: string, otp: string) => {
  const mailOptions = {
    from: `"${process.env.APP_NAME}" <${process.env.SMTP_FROM}>`,
    to: email,
    subject: 'Your One-Time Password (OTP)',
    html: `
      <div style="font-family: Arial, sans-serif; line-height:1.5; color:#333;">
        <h2 style="color:#4CAF50;">Your OTP Code</h2>
        <p>Use the following OTP to proceed:</p>
        <div style="font-size:32px; font-weight:bold; color:#4CAF50; margin:20px 0; text-align:center;">
          ${otp}
        </div>
        <p>Valid for 10 minutes. Do not share it with anyone.</p>
      </div>
    `,
  };

  try {
    return await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error("OTP Email Error:", error);
    throw new Error((error as Error).message);
  }
};




export const sendOtpBySms = async (mobile: string, otp: string) => {
  const receiver = `+91${mobile}`;
  const template = "OTP1";

  const smsUrl = `https://2factor.in/API/V1/${process.env.TWO_FACTOR_API}/SMS/${receiver}/${otp}/${template}`;

  const wappMsg = `
  Your OTP is *${otp}*. 
  Valid for 10 minutes. Do not share it with anyone.`;

  // const wappUrl = `${process.env.WAPP_URL}send?apikey=${process.env.WAPP_KEY}&mobile=${mobile}&msg=${encodeURIComponent(wappMsg)}`;


  // try {
  //   await Promise.all([
  //     axios.post(smsUrl),
  //     axios.post(wappUrl)
  //   ]);
  // } catch (error) {
  //   console.error('OTP Send Error:', error);
  //   throw new Error((error as Error).message);
  // }

  return { to: mobile, message: `Your OTP is ${otp}` };
};


export async function sendOrderConfirmationEmail(orderData: {
  userId: { email: string };
  orderId: string;
  items: { name: string; quantity: number; price: number }[];
  totalAmount: { discountPrice: number; shippingTotal: number; totalPrice: number };
  payment: string;
  shipping: ShippingInformation;
  coupon?: string;
  payAmt: number;
  status: string;
}) {
  const { orderId, items, totalAmount, payment, shipping, coupon, payAmt, userId, status } = orderData;

  const commonData = { orderId, items, totalAmount, payment, shipping, coupon, paymentType: payment, payAmt, formatCurrency };

  const emails = [
    {
      to: userId.email,
      subject: `Order Confirmation - ${orderId}`,
      html: getCustomerEmailTemplate(commonData),
    },
    {
      to: process.env.SHOP_OWNER_EMAIL,
      subject: `New Order Received - ${orderId}`,
      html: getOwnerEmailTemplate(commonData),
    },
  ];

  await Promise.all(emails.map(mail => transporter.sendMail({ from: process.env.SMTP_FROM, ...mail })));

  if (shipping?.mobileNumber) {
    const itemsList = items.map((item, i) => `${i + 1}. ${item.name} x ${item.quantity}`).join('\n');

    const wappMsg = `
Hello ${shipping.userName},

Thank you for your order!

🧾 Order ID: ${orderId}
Status: *${status}*

🛒 Items:
${itemsList}

💰 Total: ${formatCurrency(totalAmount.discountPrice)}
💵 Paid: ${formatCurrency(payAmt)}
💳 Payment: ${payment === 'offline' ? 'COD' : 'Prepaid'}
🚚 Address: ${shipping.addressLine}, ${shipping.city}, ${shipping.state} ${shipping.postCode}

We are processing your order. You'll be notified when it's shipped.

Thank you!`;

    const wappUrl = `${process.env.WAPP_URL}send?apikey=${process.env.WAPP_KEY}&mobile=${shipping.mobileNumber}&msg=${encodeURIComponent(wappMsg)}`;

    try {
      await axios.post(wappUrl);
    } catch (error) {
      console.error('Whatsapp Send Error:', error);
      throw new Error((error as Error).message);
    }
  }
}


export async function sendOrderStatus(order: OrderDetails) {
  const emailContent = order.status === 'shipped'
    ? getShippedEmailTemplate(order)
    : generateOrderStatusEmail(order);

  const emailPromise = transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: order.shipping.email,
    subject: `Order Status - ${order.orderId}`,
    html: emailContent,
  });

  let wappPromise = Promise.resolve();

  if (order?.shipping?.mobileNumber) {
    const itemsList = order.items.map((item, i) => {
      const price = item.discountType === 'percentage'
        ? item.price - (item.price * item.discountPrice) / 100
        : item.price - item.discountPrice;

      return `${i + 1}. ${item.name} x ${item.quantity} = ₹${price * item.quantity}`;
    }).join('\n');

    const wappMsg = `
Hello ${order.shipping.userName},

Your order with ID: ${order.orderId} is currently *${order.status}*.

🧾 Order Details:
${itemsList}

💵 Total: ${formatCurrency(order.totalAmount.discountPrice)}

If you have any questions, feel free to reply to this message.

Thank you for shopping with us!`;

    const wappUrl = `${process.env.WAPP_URL}send?apikey=${process.env.WAPP_KEY}&mobile=${order.shipping.mobileNumber}&msg=${encodeURIComponent(wappMsg)}`;

    wappPromise = axios.post(wappUrl);
  }

  await Promise.all([emailPromise, wappPromise]);
}
