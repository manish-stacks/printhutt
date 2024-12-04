import mongoose from "mongoose";

const returnPolicySchema = new mongoose.Schema(
  {
    returnPeriod: String, // e.g., "30 days"
    restockingFee: Number, // optional restocking fee
    policyDetails: String, // details of the return policy
  },
  { timestamps: true }
);

const ReturnPolicy = mongoose.models.ReturnPolicy || mongoose.model("ReturnPolicy", returnPolicySchema);
export default ReturnPolicy