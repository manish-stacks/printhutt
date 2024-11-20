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
    title: { type: String, required: true, trim: true },
    slug: String,
    description: String,
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: Number,
    discountPercentage: Number,
    discountPrice: Number,
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
      keywords: [String],
    },
    files: [
      {
        url: {},
        public_id: {},
        fileType: {},
      },
    ],
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }], // Reference to Reviews
  },
  { timestamps: true }
);

export default mongoose.models.Product ||
  mongoose.model("Product", productSchema);



//   size: accoding price|(stock)
// verient status 

// offer->cat and product
//  warrantyInformation relation
//  shippingInformation->relation
// returnPolicy ->relation

// shipping  -> true
// shipping fee -> 10

// discription->limi 160


// status 
// ishome
// tranding
// hot 
// sale 
// new
