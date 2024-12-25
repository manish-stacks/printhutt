import mongoose, {Model, Schema } from "mongoose";
import { IReturnPolicy } from "@/lib/types/return";


const returnPolicySchema = new Schema<IReturnPolicy>(
  {
    returnPeriod: String, // e.g., "30 days"
    restockingFee: Number, // optional restocking fee
    policyDetails: String, // details of the return policy
  },
  { timestamps: true }
);

const ReturnPolicy: Model<IReturnPolicy> = mongoose.models.ReturnPolicy || mongoose.model<IReturnPolicy>("ReturnPolicy", returnPolicySchema);

export default ReturnPolicy;

