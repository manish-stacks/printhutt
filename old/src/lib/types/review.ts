import mongoose, { Document } from "mongoose";

export interface IReview extends Document {
    rating: number;
    comment: string;
    reviewerName: string;
    productId: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}