import { Document, Types } from 'mongoose';

export type DiscountType = 'percentage' | 'fixed' | 'free_shipping';

export interface CouponAttributes {
  code: string;
  description: string;
  discountType: DiscountType;
  discountValue: number;
  minimumPurchaseAmount: number;
  maxDiscountAmount?: number;
  validFrom: Date;
  validUntil: Date;
  usageLimit: number | null;
  usedCount: number;
  applicableProducts: Types.ObjectId[];
  applicableCategories: Types.ObjectId[];
  isActive: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface CouponMethods {
  isValidForUse(): boolean;
}

export interface CouponDocument extends CouponAttributes, Document, CouponMethods {}