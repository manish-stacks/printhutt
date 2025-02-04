import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import mongoose from 'mongoose';
import Order from '@/models/orderModel';

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    try {
        await dbConnect(); 

        const { id } = await context.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Order ID" }, { status: 400 });
        }

        const tokenData = await getDataFromToken(request);

        if (!tokenData.id) {
            return NextResponse.json({ success: false, message: 'Unauthorized' }, { status: 401 });
        }

        const order = await Order.findById(id)
            .populate('items.productId') 
            .lean();

        if (!order) {
            return NextResponse.json({ success: false, message: "Order not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: order }, { status: 200 });

    } catch (error: unknown) {
        console.error('Error fetching order:', error);
        return NextResponse.json(
            { success: false, message: "Failed to fetch order" },
            { status: 500 }
        );
    }
}
