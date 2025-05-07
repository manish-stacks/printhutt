import dbConnect from "@/dbConfig/dbConfig";
import Order from "@/models/orderModel";
import User from "@/models/userModel";
import axios from "axios";
import cron from 'node-cron';


// startOrderReminderCron();

export function startOrderReminderCron() {
    cron.schedule('*/15 * * * *', async () => {
        console.log('Running every-second order reminder check...');
        try {
            await dbConnect();

            const todayStart = new Date();
            todayStart.setHours(0, 0, 0, 0);

            const todayEnd = new Date();
            todayEnd.setHours(23, 59, 59, 999);

            const pendingOrders = await Order.find({
                status: 'pending',
                createdAt: {
                    $gte: todayStart,
                    $lte: todayEnd
                },
                reminderSent: { $ne: true }
            }).populate<{ userId: { username: string, number: string, _id: string } }>({
                path: 'userId',
                model: User
            });



            const usersReminded = new Set<string>();

            for (const order of pendingOrders) {
                if (!usersReminded.has(order.userId._id.toString())) {
                    // Send WhatsApp message
                    const wappUrl = `${process.env.WAPP_URL}send?apikey=${process.env.WAPP_KEY}&mobile=${order.userId.number}&msg=${encodeURIComponent(wappMsg(order.userId.username))}`;
                    await axios.post(wappUrl);

                    usersReminded.add(order.userId._id.toString());
                }
                await Order.findByIdAndUpdate(order._id, { reminderSent: true });
            }

            console.log(`Check finished. Processed ${pendingOrders.length} orders.`);

        } catch (error) {
            console.error('Error in every-second order reminder check:', error);
        }
    });
}

function wappMsg(name: string) {
    return `Hi ${name},

We noticed you've placed an order on PrintHutt, but it's still pending. We totally understand that trust matters — that's why we want to offer you an exclusive ₹150 OFF on your first prepaid order!

Use code TRUST50 at checkout to grab your discount.

💳 We support secure payment options, and your order is always backed by our 100% satisfaction guarantee.

If you have any questions or need help completing your order, feel free to reach out to us on WhatsApp or call us directly.

Complete your order now and get your custom tee delivered with love!
👉 Complete My Order https://www.printhutt.com/cart

Cheers,
Team PrintHutt
Printed with passion. Delivered with care.`;
}