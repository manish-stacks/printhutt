import mongoose, { Document} from "mongoose";

export interface IOrder extends Document {
    offerId: mongoose.Types.ObjectId;
    userId: mongoose.Types.ObjectId;
    addressId: mongoose.Types.ObjectId;
    quantity: number;
    totalPrice: number;
    status: 'pending' | 'completed' | 'cancelled';
    createdAt: Date;
    updatedAt: Date;
}