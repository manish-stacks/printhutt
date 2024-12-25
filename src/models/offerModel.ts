import mongoose, { Model, Schema } from "mongoose";
import { IOffer } from "@/lib/types/offer";


const offerSchema: Schema<IOffer> = new Schema(
  {
    offerTitle: {
      type: String,
      required: true,
      index: true,
    },
    offerDescription: String,
    discountPercentage: {
      type: Number,
    },
    validFrom: {
      type: Date,
    },
    validTo: {
      type: Date,
    },
  },
  { timestamps: true }
);

offerSchema.index({ validFrom: 1, validTo: 1 });

const Offer: Model<IOffer> = mongoose.models.Offer || mongoose.model<IOffer>("Offer", offerSchema);

export default Offer;