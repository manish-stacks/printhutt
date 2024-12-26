import mongoose, { Schema, Model } from "mongoose";
import type { IWarrantyInformation } from "@/lib/types/warranty";

const warrantyInfoSchema = new Schema<IWarrantyInformation>(
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


const WarrantyInformation: Model<IWarrantyInformation> =
  mongoose.models.WarrantyInformation ||
  mongoose.model<IWarrantyInformation>("WarrantyInformation", warrantyInfoSchema);

export default WarrantyInformation;
