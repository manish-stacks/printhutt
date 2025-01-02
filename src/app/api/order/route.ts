import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig'
import { Address } from '@/models/addressModel';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import Order from '@/models/orderModel';
import { sendOrderConfirmationEmail } from '@/lib/mail/mailer';
import User from '@/models/userModel';

connect();

export async function GET(request: NextRequest) {
    try {
        const { id, role } = await getDataFromToken(request);
        if (!id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const url = new URL(request.url);
        const page = Math.max(parseInt(url.searchParams.get('page') || '1', 10), 1); // Ensure `page` is at least 1
        const limit = Math.min(Math.max(parseInt(url.searchParams.get('limit') || '10', 10), 1), 100); // Limit between 1 and 100
        const search = url.searchParams.get('search') || '';
        const status = url.searchParams.get('status') || '';


        const query: any = {};
        
        if(status) {
            query.status = status;
        }

        if (role !== 'admin') {
            query.userId = id;
        }

        if (search) {
            query.orderId = { $regex: search, $options: 'i' };
        }

        const skip = (page - 1) * limit;


        const [orders, total] = await Promise.all([
            Order.find(query)
                .sort({ createdAt: -1 })
                .skip(skip)
                .limit(limit),
            Order.countDocuments(query),
        ]);

        // Response with paginated data
        return NextResponse.json({
            orders,
            pagination: {
                total,
                pages: Math.ceil(total / limit),
                page,
                limit,
            },
        });
    } catch (error: any) {
        console.error('Error fetching orders:', error);
        return NextResponse.json(
            { error: error.message || 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function POST(request: NextRequest) {
    try {
        const tokenData = await getDataFromToken(request)

        if (!tokenData.id) {
            return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
        }

        const userData = await User.findById(tokenData.id) as any;

        if (!userData.email) {
            return NextResponse.json({ message: 'Email address is required to send order confirmation.' }, { status: 401 });
        }


        const body = await request.json();

        const timestamp = Date.now();
        const randomStr = Math.random().toString(36).substring(2, 8);

        const addressData = await Address.findById(body.address) as any;


        const orderData = {
            orderId: `ORD-${timestamp}-${randomStr}`,
            items: body.items,
            totalAmount: body.totalPrice,
            payAmt: body.totalPrice,
            payment: {
                method: body.paymentMethod,
                transactionId: '',
                isPaid: false,
                paidAt: null
            },
            offerId: null,
            shipping: {
                addressLine: addressData.addressLine,
                city: addressData.city,
                state: addressData.state,
                postCode: addressData.postCode,
                mobileNumber: addressData.mobileNumber
            },
            coupon: {
                code: body.couponCode,
                discountAmount: 0,
                discountType: '',
                isApplied: false
            },
            totalquantity: body.getTotalItems,
            status: 'pending',
            userId: tokenData.id,
            email: userData.email
        }


        const order = new Order(orderData);
        await order.save();

        await sendOrderConfirmationEmail(orderData);


        return NextResponse.json({
            success: true,
            message: 'Order saved successfully',
            order: order
        });

    } catch (error) {
        console.log(error)
        return NextResponse.json(
            { success: false, message: 'Internal server error' },
            { status: 500 }
        );
    }
}