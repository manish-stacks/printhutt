import { NextRequest, NextResponse } from 'next/server';
import { PhonePePayment } from '@/lib/phonepay';
import OrderModel from '@/models/orderModel';
import { sendOrderConfirmationEmail } from '@/lib/mail/mailer';
import UserModel from '@/models/userModel';

const phonePe = new PhonePePayment(
    process.env.PHONEPE_MERCHANT_ID!,
    process.env.PHONEPE_SALT_KEY!,
    process.env.PHONEPE_SALT_INDEX!,
    process.env.NODE_ENV === 'production' ? 'PROD' : 'UAT'
);

const baseUrl = process.env.APP_URL || 'http://localhost:3000';

export async function POST(request: NextRequest) {
    try {

        const formData = await request.formData();
        const merchantTransactionId = formData.get('merchantTransactionId')?.toString() ||
            formData.get('transactionId')?.toString();

        // const searchParams = request.nextUrl.searchParams;
        // const merchantTransactionId = searchParams.get('id');

        if (!merchantTransactionId) {
            return NextResponse.json(
                { error: 'merchantTransactionId is required' },
                { status: 400 }
            );
        }

        const response = await phonePe.checkStatus(merchantTransactionId);

        if (!response.success) {
            return NextResponse.redirect(`${baseUrl}/orders/payment-failure`, { status: 301, });
        }

        const order = await OrderModel.findOne({ orderId: merchantTransactionId }).populate({ path: 'userId', model: UserModel });

        if (!order) {
            return NextResponse.redirect(`${baseUrl}/orders/confirmation?id=${merchantTransactionId}&success=false`, { status: 301, });

        }

        order.payment = {
            ...order.payment,
            transactionId: response?.data?.transactionId,
            isPaid: true,
            paidAt: new Date(),
            method: response?.data?.paymentInstrument?.type || 'unknown',
        };
        order.status = 'confirmed';

        await order.save();
        await sendOrderConfirmationEmail(order);
        
        return NextResponse.redirect(`${baseUrl}/orders/confirmation?id=${merchantTransactionId}&success=true`, { status: 301, });

    } catch (error) {
        console.error('Payment status check error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}
