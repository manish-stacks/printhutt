import mongoose, { Document } from "mongoose";

export interface IOrder extends Document {
    orderId: string;
    items: {
        productId: mongoose.Types.ObjectId;
        slug: string;
        name: string;
        quantity: number;
        price: number;
    }[];
    totalAmount: number;
    payAmt: number;
    payment: {
        method: 'online' | 'offline';
        transactionId?: string;
        isPaid: boolean;
        paidAt?: Date;
    };
    offerId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    shipping: {
        addressLine: string;
        city: string;
        state: string;
        postCode: string;
        mobileNumber: string;
    };
    coupon: {
        code: string;
        discountAmount: number;
        discountType:string;
        isApplied: boolean;
    };
    totalquantity: number;
    status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}