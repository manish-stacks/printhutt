import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    offerTitle: {
      type: String,
      required: true,
    },
    offerDescription: String,
    applicableTo: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
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



const Offer = mongoose.models.Offer || mongoose.model("Offer", offerSchema);
export default Offer
