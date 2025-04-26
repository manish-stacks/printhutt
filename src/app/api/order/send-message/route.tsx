import dbConnect from "@/dbConfig/dbConfig";
import Order from "@/models/orderModel";
import User from "@/models/userModel";
import axios from "axios";
import { NextResponse } from "next/server";
import dotenv from "dotenv";
dotenv.config();

export async function POST(req: Request) {
    try {
        await dbConnect();
        const { orderId, message } = await req.json();

        if (!orderId || !message) {
            return NextResponse.json(
                { error: "Order ID and message are required" },
                { status: 400 }
            );
        }

        const order = await Order.findById(orderId).populate({ path: 'userId', model: User });

        if (!order) {
            return NextResponse.json(
                { error: "Order not found" },
                { status: 404 }
            );
        }

        const number = order?.userId?.number

        const wappUrl = `${process.env.WAPP_URL}send?apikey=${process.env.WAPP_KEY}&mobile=${6200027897}&msg=${encodeURIComponent(message)}`;

        try {
            await axios.post(wappUrl);
        } catch (error) {
            console.error('Whatsapp Send Error:', error);
            throw new Error((error as Error).message);
        }


        return NextResponse.json(
            { success: true, message: "Message sent successfully" },
            { status: 200 }
        );

    } catch (error) {
        console.error("Error sending message:", error);
        return NextResponse.json(
            { error: "Failed to send message" },
            { status: 500 }
        );
    }
}
