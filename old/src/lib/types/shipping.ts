import { Document } from "mongoose";

export interface IShippingInformation extends Document {
    shippingMethod?: string;
    shippingFee?: number;
    shippingTime?: string;
    isFreeShipping: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface ShippingInformation {
    _id: string;
    shippingMethod: string;
    shippingFee: string | number;
    shippingTime: string;
    isFreeShipping: boolean;
    createdAt?: string;
    updatedAt?: string;
}