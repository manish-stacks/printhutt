import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import { addressSchema } from '@/lib/types/address';
import { ZodError } from 'zod';
import { Address } from '@/models/addressModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Order from '@/models/orderModel';
import { sendOrderConfirmationEmail } from '@/helpers/mailer';

connect();

export async function GET(request: NextRequest) {
    const { id } = await getDataFromToken(request)

    if (!id) {
        return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
    try {
        const orders = await Order.find({ userId: id });
        return NextResponse.json(orders, { status: 200 });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ message: 'Error fetching orders' }, { status: 500 });
    }
}

export async function POST(request: NextRequest) {
    try {
        const tokenData = await getDataFromToken(request)

        if (!tokenData.id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const body = await request.json();

        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 8);
        body.orderId = `ORD-${timestamp}-${randomStr}`;



        // await sendOrderConfirmationEmail({
        //     email: orderData.email,
        //     orderId: order.orderId,
        //     totalAmount: order.totalAmount,
        //     items: order.items
        // });

        console.log(body)


        // items: [
        //     {
        //       id: '676e9866dae2b3922aeaa26b',
        //       quantity: 1,
        //       name: 'Customize Acrylic Photo Frame',
        //       price: 999
        //     }
        //   ],
        //   getTotalItems: 1,
        //   totalPrice: 999,
        //   paymentMethod: 'online',
        //   couponCode: '',
        //   address: '67711007005bbe3f04ee9ad9'

        // const order = new Order({
        //     userId: tokenData.id,
        // });

        // await order.save()

        return NextResponse.json({
            success: true,
            message: 'Order saved successfully',
            // address: order
        });

    } catch (error) {
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}