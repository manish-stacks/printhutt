import mongoose, { Schema } from 'mongoose';
import type{ CouponDocument } from '@/lib/types/coupon';


const couponSchema = new Schema<CouponDocument>({
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
  },
  discountType: {
    type: String,
    enum: ['percentage', 'fixed', 'free_shipping'],
    required: true,
  },
  discountValue: {
    type: Number,
   
    min: 0,
  },
  minimumPurchaseAmount: {
    type: Number,
    default: 0,
  },
  maxDiscountAmount: {
    type: Number,
  },
  validFrom: {
    type: Date,
    default: Date.now,
  },
  validUntil: {
    type: Date,
    // required: true,
  },
  usageLimit: {
    type: Number,
    default: null,
  },
  usedCount: {
    type: Number,
    default: 0,
  },
  applicableProducts: [{
    type: Schema.Types.ObjectId,
    ref: 'Product',
  }],
  applicableCategories: [{
    type: Schema.Types.ObjectId,
    ref: 'Category',
  }],
  isActive: { type: Boolean, required: true, default: true },
  isShow: { type: Boolean, required: true, default: true },
}, { 
  timestamps: true 
});


// couponSchema.index({ code: 1});


// couponSchema.pre('save', function(next) {
//   if (this.validUntil < new Date()) {
//     this.isActive = false;
//   }
//   next();
// });


couponSchema.methods.isValidForUse = function(): boolean {
  return (
    this.isActive &&
    this.validFrom <= new Date() &&
    this.validUntil >= new Date() &&
    (this.usageLimit === null || this.usedCount < this.usageLimit)
  );
};

const Coupon = mongoose.models.Coupon || mongoose.model<CouponDocument>('Coupon', couponSchema);

export default Coupon;