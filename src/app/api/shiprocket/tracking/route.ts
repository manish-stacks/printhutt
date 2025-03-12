import { shiprocketAuth } from "@/helpers/helpers";
import Order from "@/models/orderModel";
import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    try {
        const { trackingId } = await request.json();

        const token = await shiprocketAuth();
        const config = {
            method: 'get',
            maxBodyLength: Infinity,
            url: `https://apiv2.shiprocket.in/v1/external/courier/track/shipment/${trackingId}`,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token} `
            }
        };

        const response = await axios(config);
        const shipment = response.data[trackingId]
        const order = await Order.findOne({ "shipment.trackingId": trackingId });
        // console.log('shipment',shipment)

        // console.log(response.data);
        return NextResponse.json(
            { message: 'Data fetched successfully', shipment, order  },
            { status: 200 }
        );
    } catch (error) {
        console.error('Error creating shipment:', error);
        return NextResponse.json(
            { error: 'Internal server error' },
            { status: 500 }
        );
    }

}

