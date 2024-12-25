import mongoose, { Model, Schema } from "mongoose";
import { IOrder } from "@/lib/types/order";



const orderSchema: Schema<IOrder> = new Schema({
    offerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Offer', required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    addressId: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>("Order", orderSchema);

export default Order;

