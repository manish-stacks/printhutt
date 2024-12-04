import mongoose from "mongoose";

const warrantyInfoSchema = new mongoose.Schema(
  {
    size: { type: String, required: true }, // For example: "Small", "Medium", "Large"
    color: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    weight: Number,
    sku: String,
    discountPercentage: { type: Number },
    discountPrice: { type: Number },
    images: [
      {
        url: String,
        public_id: String,
      },
    ],
  },
  { timestamps: true }
);


const WarrantyInformation = mongoose.models.WarrantyInformation || mongoose.model("WarrantyInformation", warrantyInfoSchema);
export default WarrantyInformation;