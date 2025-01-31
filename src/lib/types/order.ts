import mongoose, { Document } from "mongoose";

export interface IOrder extends Document {
    orderId: string;
    custom_data: object;
    items: {
        productId: mongoose.Types.ObjectId;
        slug: string;
        name: string;
        quantity: number;
        price: number;
        sku: string;
        product_image?: string;
        isCustomized?: boolean;
        discountType?: string;
        discountPrice?: number;
    }[];
    totalAmount: {
        discountPrice: number;
        shippingTotal: number;
        totalPrice: number;
    };
    payAmt: number;
    paymentType: string;
    payment: {
        method: string;
        transactionId?: string;
        isPaid: boolean;
        paidAt?: Date;
    };
    offerId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    shipping: {
        userName: string;
        addressLine: string;
        city: string;
        state: string;
        postCode: string;
        mobileNumber: string;
        email: string;
    };
    shipment: {
        provider: string;
        trackingId: string;
        order_id: string;
        height: string;
        width: string;
        length: string;
        weight: string;
    },
    coupon: {
        code: string;
        discountAmount: number;
        discountType: string;
        isApplied: boolean;
    };
    totalquantity: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}