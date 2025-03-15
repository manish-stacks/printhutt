import mongoose, { Document } from "mongoose";
import { IMedia } from "./product";

export interface IReview extends Document {
    rating: number;
    review: string;
    userId: mongoose.Types.ObjectId;
    productId: mongoose.Types.ObjectId;
    images: IMedia[];
    status: boolean;
    createdAt: Date;
    updatedAt: Date;
}