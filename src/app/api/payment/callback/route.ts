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

export async function POST(request: NextRequest) {
    try {

        const formData = await request.formData();
        const merchantTransactionId = formData.get('merchantTransactionId')?.toString() ||
            formData.get('transactionId')?.toString();
        if (!merchantTransactionId) {
            return NextResponse.json(
                { error: 'merchantTransactionId is required' },
                { status: 400 }
            );
        }

        const response = await phonePe.checkStatus(merchantTransactionId);

        if (!response.success) {
            const failureRedirect = new URL('/payment-failure', request.url);
            return NextResponse.redirect(failureRedirect);
        }



        const order = await OrderModel.findOne({ 'payment.transactionId': merchantTransactionId }).populate({ path: 'userId', model: UserModel });

        if (!order) {
            const errorUrl = new URL('/payment-failure', request.url);
            // errorUrl.searchParams.set('error', 'order_not_found');
            return NextResponse.redirect(errorUrl);
        }

        order.payment = {
            ...order.payment,
            transactionId: response.data.data.transactionId,
            isPaid: true,
            paidAt: new Date(),
            method: response.data.data.paymentInstrument?.type || 'unknown',
        };
        order.status = 'confirmed';

        await order.save();

        await sendOrderConfirmationEmail(order);

        const successRedirect = new URL(`/orders/${order?._id}/confirmation`, request.url);
        return NextResponse.redirect(successRedirect);

    } catch (error) {
        console.error('Payment status check error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}