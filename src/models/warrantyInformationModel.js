import mongoose from "mongoose";

const warrantyInfoSchema = new mongoose.Schema(
  {
    warrantyType: {
      type: String,
      enum: ["limited", "full", "extended", "others"],
      required: true,
    },
    durationMonths: {
      type: Number,
      required: true,
    },
    coverage: {
      type: String,
      required: true,
    },
    claimProcess: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const WarrantyInformation =
  mongoose.models.WarrantyInformation ||
  mongoose.model("WarrantyInformation", warrantyInfoSchema);
export default WarrantyInformation;
