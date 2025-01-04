import { Document } from 'mongoose';

export interface IOffer extends Document {
  offerTitle: string;
  offerDescription?: string;
  discountPercentage?: number;
  validFrom?: Date;
  validTo?: Date;
  createdAt: Date;
  updatedAt: Date;
}


export interface Offer {
  _id: string;
  offerTitle: string;
  offerDescription: string;
  discountPercentage: number | string;
  validFrom: string;
  validTo: string;
  createdAt?: string;
  updatedAt?: string;
}