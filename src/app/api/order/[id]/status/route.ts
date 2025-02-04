import { NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import Order from '@/models/orderModel';
import { shiprocketAuth } from '@/helpers/helpers';
import axios from 'axios';
import { sendOrderStatus } from '@/lib/mail/mailer';

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        await dbConnect(); 

        const { id } = await params;
        const { status } = await request.json();

        if (!status) {
            return NextResponse.json(
                { success: false, message: 'Status is required' },
                { status: 400 }
            );
        }

        const order = await Order.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );

        if (!order) {
            return NextResponse.json(
                { success: false, message: 'Order not found' },
                { status: 404 }
            );
        }

        
        if (status === 'cancelled' && order.shipment?.order_id) {
            try {
                const token = await shiprocketAuth();

                const data = JSON.stringify({
                    ids: [order.shipment.order_id]
                });

                await axios.post(
                    'https://apiv2.shiprocket.in/v1/external/orders/cancel',
                    data,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
            } catch (shiprocketError) {
                console.error('Error cancelling Shiprocket order:', shiprocketError);
            }
        }

        
        if (status !== 'shipped') {
            await sendOrderStatus(order);
        }

        return NextResponse.json({
            success: true,
            message: 'Order updated successfully',
            data: order
        });
    } catch (error: unknown) {
        console.error('Error updating order status:', error);
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}
