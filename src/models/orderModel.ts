import mongoose, { Model, Schema } from "mongoose";
import type { IOrder } from "@/lib/types/order";



const orderSchema: Schema<IOrder> = new Schema({
    orderId: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [
        {
            productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
            slug: { type: String, required: true },
            name: { type: String, required: true },
            quantity: { type: Number, required: true },
            price: { type: Number, required: true },
            sku: { type: String, required: true },
            _id: false,
        },
    ],
    totalAmount: { type: Number, required: true },
    payAmt: { type: Number, required: true },
    paymentType: { type: String, enum: ['online', 'offline'], required: true },
    payment: {
        method: { type: String, required: true },
        transactionId: { type: String },
        isPaid: { type: Boolean, default: false },
        paidAt: { type: Date },
    },
    offerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Offer',
    },
    shipping: {
        userName: { type: String, required: true },
        addressLine: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        postCode: { type: String, required: true },
        mobileNumber: { type: String, required: true },
        email: { type: String, required: true, default: 'shivankarora87@gmail.com' },
    },
    shipment: {
        provider: { type: String },
        trackingId: { type: String },
        order_id: { type: String },
        height: { type: String },
        width: { type: String },
        length: { type: String },
        weight: { type: String },
    },
    coupon: {
        code: { type: String, default: '' },
        discountAmount: { type: Number, default: 0 },
        discountType: { type: String },
        isApplied: { type: Boolean, default: false },
    },
    totalquantity: {
        type: Number,
        required: true
    },

    status: {
        type: String,
        enum: ['pending', 'confirmed', 'shipped', 'delivered', 'cancelled', 'returned', 'progress'],
        default: 'pending'
    },
}, { timestamps: true });

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

export default Order;

