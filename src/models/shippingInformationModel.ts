import mongoose, { Model, Schema } from "mongoose";
import type { IShippingInformation } from "@/lib/types/shipping";


const shippingInformationSchema = new Schema<IShippingInformation>(
  {
    shippingMethod: String, // e.g., "Standard Shipping"
    shippingFee: Number, // fee amount
    shippingTime: String, // e.g., "3-5 business days"
    isFreeShipping: { type: Boolean, default: false }, // if shipping is free
  },
  { timestamps: true }
);

const ShippingInformation: Model<IShippingInformation> = mongoose.models.ShippingInformation || mongoose.model<IShippingInformation>("ShippingInformation", shippingInformationSchema);

export default ShippingInformation;

