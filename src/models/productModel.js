import mongoose from "mongoose";

const dimensionsSchema = new mongoose.Schema(
  {
    width: Number,
    height: Number,
    depth: Number,
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    tags: [String],
    brand: String,
    sku: String,
    weight: Number,
    dimensions: dimensionsSchema,
    warrantyInformation: String,
    shippingInformation: String,
    availabilityStatus: String,
    returnPolicy: String,
    minimumOrderQuantity: Number,
    meta: {
      discription: String,
      keywords: String,
    },
    images: [String],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Reference to Reviews
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model("Product", productSchema);
