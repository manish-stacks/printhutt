import mongoose, { Schema } from 'mongoose';
import type { IAddress } from '@/lib/types/address';


const AddressSchema = new Schema<IAddress>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  mobileNumber: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    trim: true
  },
  alternatePhone: {
    type: String,
    trim: true
  },
  addressLine: {
    type: String,
    required: true,
    trim: true
  },
  city: {
    type: String,
    required: true,
    trim: true
  },
  state: {
    type: String,
    required: true,
    trim: true
  },
  postCode: {
    type: String,
    required: true,
    trim: true
  },
  addressType: {
    type: String,
    enum: ['home', 'work'],
    default: 'home'
  },
  isDefault: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

AddressSchema.pre('save', async function (next) {
  if (this.isDefault) {
    await this.model('Address').updateMany(
      { userId: this.userId, _id: { $ne: this._id } },
      { isDefault: false }
    );
  }
  next();
});

AddressSchema.index({ userId: 1, isDefault: 1 });
export const Address = mongoose.models.Address || mongoose.model<IAddress>('Address', AddressSchema);