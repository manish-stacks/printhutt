import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import { getDataFromToken } from '@/helpers/getDataFromToken';
import mongoose from 'mongoose';
import Order from '@/models/orderModel';

connect()

export async function GET(request: NextRequest, context: { params: { id: string } }) {
    try {
        const { id } = await context.params;
        // console.log(id)
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json({ success: false, message: "Invalid Product ID" }, { status: 400 });
        }


        const tokenData = await getDataFromToken(request)

        if (!tokenData.id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }
        const order = await Order.findById(id)
            // .populate('items.productId')
            .lean();


        if (!order) {
            return NextResponse.json({ error: "Order not found" }, { status: 404 });
        }
        return NextResponse.json(order, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { error: "Failed to fetch post" },
            { status: 500 }
        );
    }
}



