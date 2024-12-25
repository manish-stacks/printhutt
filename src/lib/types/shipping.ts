import { Document } from "mongoose";

export interface IShippingInformation extends Document {
    shippingMethod?: string;
    shippingFee?: number;
    shippingTime?: string;
    isFreeShipping: boolean;
    createdAt: Date;
    updatedAt: Date;
}