import mongoose, { Model, Schema } from "mongoose";
import type { IReview } from "@/lib/types/review";



const reviewSchema = new Schema<IReview>(
  {
    rating: {
      type: Number,
      required: [true, "Please give Rating"],
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must not be more than 5"],
    },
    comment: {
      type: String,
      required: true,
      maxlength: [200, "Comment must not be more than 200 characters"]
    },
    reviewerName: {
      type: String,
      required: true
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true
    },
  },
  { timestamps: true }
);

const Review: Model<IReview> = mongoose.models.Review || mongoose.model<IReview>("Review", reviewSchema);

export default Review;

