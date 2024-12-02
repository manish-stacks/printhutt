import mongoose from 'mongoose';

const reviewSchema = new mongoose.Schema({
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
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true
  },
}, { timestamps: true });

export default mongoose.models.Review || mongoose.model('Review', reviewSchema);
