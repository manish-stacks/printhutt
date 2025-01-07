import { NextRequest, NextResponse } from 'next/server';
import { PhonePePayment } from '@/lib/phonepay';
import OrderModel from '@/models/orderModel';


// Initialize PhonePe with your credentials
const phonePe = new PhonePePayment(
    process.env.PHONEPE_MERCHANT_ID!,
    process.env.PHONEPE_SALT_KEY!,
    process.env.PHONEPE_SALT_INDEX!,
    process.env.NODE_ENV === 'production' ? 'PROD' : 'UAT'
);


const APP_Url = process.env.APP_URL;

export async function POST(request: NextRequest) {
    try {
        const { orderId, amount, transactionId, userDetails } = await request.json();
        const callbackUrl = `${APP_Url}/api/payment/callback`

        const response = await phonePe.initiatePayment(
            amount,
            transactionId,
            callbackUrl,
            userDetails
        );
      
        if (!response.success) {
            return NextResponse.json(
                { error: response.error || 'Payment initiation failed' },
                { status: 400 }
            );
        }

        const updateOrder = await OrderModel.findById(orderId)

        if (updateOrder) {
            updateOrder.payment.transactionId = response?.data?.merchantTransactionId
            await updateOrder.save()
        }
        return NextResponse.json(response.data);

    } catch (error) {
        console.error('Payment initiation error:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}