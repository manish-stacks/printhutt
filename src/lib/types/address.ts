import mongoose, { Document } from 'mongoose';

export interface IAddress extends Document {
  userId: mongoose.Types.ObjectId;
  fullName: string;
  mobileNumber: string;
  alternatePhone?: string;
  addressLine: string;
  city: string;
  state: string;
  postCode: string;
  addressType: 'home' | 'work';
  isDefault: boolean;
  createdAt: Date;
  updatedAt: Date;
}