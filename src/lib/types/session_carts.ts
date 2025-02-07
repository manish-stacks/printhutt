import mongoose, { Document } from 'mongoose';

export interface ISessionCarts extends Document {
  productId: mongoose.Types.ObjectId;
  session: string;

}

