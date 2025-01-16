import { NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import Order from '@/models/orderModel';
import { shiprocketAuth } from '@/helpers/helpers';
import axios from 'axios';
import { sendOrderStatus } from '@/lib/mail/mailer';
connect()
export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = await params;
        const { status } = await request.json();

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!order) {
            return NextResponse.json(
                { error: 'Order not found' },
                { status: 404 }
            );
        }
        if (order.status === 'cancelled' && order.shipment) {

            const token = await shiprocketAuth();

            var data = JSON.stringify({
                "ids": [order.shipment.order_id]
            });

            const config = {
                method: 'post',
                maxBodyLength: Infinity,
                url: 'https://apiv2.shiprocket.in/v1/external/orders/cancel',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                data: data
            };
            await axios(config);
        }

        if (order.status !== 'shipped') {
            await sendOrderStatus(order)
        }

        return NextResponse.json(order);
    } catch (error) {
        
        console.error('Error creating shipment:', error.response);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }
}