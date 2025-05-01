import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import mongoose from 'mongoose';
import Order from '@/models/orderModel';
import Product from '@/models/productModel';


export async function GET(request: NextRequest, context: { params: { id: string } }) {
    try {
        await dbConnect();
        const { id } = await context.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Order ID" }, { status: 400 });
        }

        const tokenData = await getDataFromToken(request);

        if (!tokenData?.id) {
            return NextResponse.json({ success: false, message: 'Unauthorized user' }, { status: 401 });
        }

        const order = await Order.findById(id)
            .populate({ path: 'items.productId', model: Product })
            .lean();

        if (!order) {
            return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
        }


        const [prevOrder, nextOrder] = await Promise.all([
            Order.findOne({
                createdAt: { $lt: order.createdAt },
                status: { $in: ['confirmed', 'shipped', 'delivered', 'cancelled', 'returned', 'progress'] }
            })
                .sort({ createdAt: -1 })
                .select('_id')
                .lean(),

            Order.findOne({
                createdAt: { $gt: order.createdAt },
                status: { $in: ['confirmed', 'shipped', 'delivered', 'cancelled', 'returned', 'progress'] }
            })
                .sort({ createdAt: 1 })
                .select('_id')
                .lean()
        ]);

        return NextResponse.json({
            success: true,
            data: {
                ...order,
                prevOrderId: prevOrder?._id || null,
                nextOrderId: nextOrder?._id || null
            }
        }, { status: 200 });

    } catch (error: unknown) {
        console.error('Error fetching order:', error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch order" },
            { status: 500 }
        );
    }
}
