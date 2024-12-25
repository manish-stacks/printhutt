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
